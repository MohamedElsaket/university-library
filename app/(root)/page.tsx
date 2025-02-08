import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function Home() {
  const res = await db.select().from(users);
  console.log(JSON.stringify(res, null, 2));

  return (
    <>
      <BookOverview {...sampleBooks[0]} />

      <BookList className="mt-28" title="Latest Books" books={sampleBooks} />
    </>
  );
}
