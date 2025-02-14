"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-950 p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button className="mt-6" onClick={() => router.back()}>
        &larr; Go Back
      </Button>
    </div>
  );
}
