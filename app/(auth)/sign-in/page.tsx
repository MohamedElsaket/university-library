"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

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
