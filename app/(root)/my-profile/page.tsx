import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
      <div className="p-12 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          User Information
        </h1>
        <div className="mb-6">
          <p className="text-lg mb-2">
            <span className="font-semibold">Name:</span> {session?.user?.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {session?.user?.email}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";

              return await signOut();
            }}
          >
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </form>

          <Button asChild>
            <Link href={"/admin"} className="text-dark-200">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
