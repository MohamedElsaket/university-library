"use server";

import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password"> // Just to pick needed email and password from AuthCredentials
) => {
  const { email, password } = params;

  // const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  // const { success } = await ratelimit.limit(ip);

  // if (!success) return redirect("/too-fast");

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return { success: false, error: res.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Sign in failed");
    return { success: false, error: "Sign in failed" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId } = params;

  // const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  // const { success } = await ratelimit.limit(ip);

  // if (!success) return redirect("/too-fast");

  const existedUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existedUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassowrd = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassowrd,
      universityId,
      // universityCard,
    });

    signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Sign up failed");
    return { success: false, error: "Sign up failed" };
  }
};
