import "@/styles/admin.css";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ asAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0].asAdmin === "ADMIN");

  if (!isAdmin) redirect("/no-access");

  return (
    <main className="flex flex-row min-h-screen w-full">
      <Sidebar session={session} />

      <div className="admin-container">
        <AdminHeader session={session} />
        {children}
      </div>
    </main>
  );
}
