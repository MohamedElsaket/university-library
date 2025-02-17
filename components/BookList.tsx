import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  className?: string;
  userId?: string;
}

export default function BookList({ title, books, className, userId }: Props) {
  // if (books.length < 2) return;
  return (
    <section>
      <h2 className="font-bebas-neue text-4xl text-light-100 mt-3">{title}</h2>(
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
      )
    </section>
  );
}
