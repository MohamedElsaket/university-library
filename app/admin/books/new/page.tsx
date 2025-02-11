import Link from "next/link";

import BookForm from "@/components/forms/BookForm";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">&larr; Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
}
