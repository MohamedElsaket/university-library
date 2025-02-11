"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
  defaultValue: T;
}

const AuthForm = <T extends FieldValues>({
  schema,
  onSubmit,
  type,
  defaultValue,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have Signed in Successfully"
          : "You have Signed up Successfully",
      });

      router.push("/");
    } else {
      toast({
        title: `Failed to ${
          isSignIn ? "Sign In : You Need to Sign Up First" : "Sign Up"
        }`,
        description: res.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back To BookWise" : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValue).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="Image"
                        accept="image/*"
                        placeholder="Enter Your ID"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        // placeholder={`Enter your ${field.name}...`}
                        className="form-input"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sgin Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? (
          <span>
            Don't have an account?{" "}
            <Link href={"/sign-up"} className="font-bold text-primary">
              Create an account
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <Link href={"/sign-in"} className="font-bold text-primary">
              Sign In
            </Link>
          </span>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
