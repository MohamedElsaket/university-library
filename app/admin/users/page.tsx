import { auth } from "@/auth";
import UsersTable from "@/components/admin/users/UsersTable";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function page() {
  const dbUsers = await db.select().from(users);

  const session = await auth();

  const filteredUsers = dbUsers.filter((x) => x.email !== session?.user?.email);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold">All Users</h2>

      <div className="mt-7 w-full overflow-hidden">
        <UsersTable data={filteredUsers} />
      </div>
    </section>
  );
}
