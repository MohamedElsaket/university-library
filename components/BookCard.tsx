import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BookCover from "./BookCover";
import { Button } from "./ui/button";

export default function BookCard({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
        href={`/books/${id}`}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={"/icons/calender.svg"}
                alt="calender"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100"> 11 Days Left To Return </p>
            </div>
            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
}
