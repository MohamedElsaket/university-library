"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/auth";
import { signUpSchema } from "@/lib/validation";
import React from "react";

export default function page() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValue={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
}
