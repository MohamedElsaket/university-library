import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

export default function page() {
  return (
    <>
      <form
        action={async () => {
          "use server";

          return await signOut();
        }}
      >
        <Button>Sign out</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
}
