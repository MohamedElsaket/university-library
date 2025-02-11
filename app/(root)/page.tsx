import { desc } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        className="mt-28"
        title="Latest Books"
        books={latestBooks.slice(1)}
      />
    </>
  );
}
