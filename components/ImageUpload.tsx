"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import config from "@/lib/config";

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

export default function ImageUpload({
  onFileChange,
}: {
  onFileChange: (file: string) => void;
}) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    console.error(err);

    toast({
      title: "Failed to upload file",
      description: "Failed to upload file, please try again",
      // varient: 'destructive'
    });
  };

  const onSuccess = (res: any) => {
    // console.log(res);
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "File uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="file-upload.png"
      />

      <button
        className="upload-btn"
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
        <p className="text-base text-light-100">Upload File</p>
      </button>

      {file && (
        <div className="flex-col">
          <p className="upload-filename">{file.filePath}</p>
          <IKImage
            path={file.filePath}
            alt={file.filePath}
            width={500}
            height={500}
          />
        </div>
      )}
    </ImageKitProvider>
  );
}
