"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";

import config from "@/lib/config";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!res.ok) {
      throw new Error(
        `Failed to authenticate user with status: ${res.status} and message: ${res.statusText}`
      );
    }

    const data = await res.json();
    const { token, expire, signature } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "Image" | "Video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
  onFileChange: (filePath: string) => void;
}

export default function FileUpload({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border border-gray-100",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (err: any) => {
    console.error(err);

    toast({
      title: `Failed to upload ${type}`,
      description: `Failed to upload ${type}, please try again`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    // console.log(res);
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
      variant: "destructive",
    });
  };

  const onValidate = (file: File) => {
    if (type === "Image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "Video") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current)
            // @ts-ignore
            ikUploadRef.current.click();
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="Upload-File"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
      </button>

      {file && (
        <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
      )}

      {progress > 0 && progress !== 100 && (
        <div className="w-full bg-green-200 rounded-full">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === "Image" ? (
          <IKImage
            path={file.filePath}
            alt={file.filePath}
            width={500}
            height={500}
          />
        ) : type === "Video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
}
