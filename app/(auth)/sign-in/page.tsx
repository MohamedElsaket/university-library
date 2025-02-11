"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";

export default function page() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValue={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
}
