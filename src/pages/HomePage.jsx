import { useBooks } from "../hooks/useBooks";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";

function HomePage() {
  const { books, loading, error, fetchBooks } = useBooks();

  return (
    <div>
      <SearchForm onSearch={fetchBooks} />

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {books.map(book => (
        <Link key={book.id} to={`/book/${book.id}`}>
          <BookItem book={book} />
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
