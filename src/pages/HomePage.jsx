import { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import BookItem from "../components/BookItem";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";

function HomePage() {
  const {
    books,
    loading,
    error,
    fetchBooks,
    currentPage,
    totalPages,
    activeQuery,
  } = useBooks();

  const [fade, setFade] = useState(true);

  // 🔥 анимация при смене страницы
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 150);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (page) => {
    fetchBooks(activeQuery, page);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          📚 Google Books
        </h1>

        <SearchForm onSearch={(q) => fetchBooks(q, 1)} />

        {loading && <p className="mt-6 text-center">Загрузка...</p>}
        {error && <p className="mt-6 text-center text-red-500">{error}</p>}

        <div
          className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            transition-opacity duration-300
            ${fade ? "opacity-100" : "opacity-0"}
          `}
        >
          {books.map(book => (
            <Link key={book.id} to={`/book/${book.id}`}>
              <BookItem book={book} />
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default HomePage;
