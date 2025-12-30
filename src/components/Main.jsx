import { useState, useEffect } from "react";
import { fetchBooks } from "../services/googleBooksApi.js";
import BookItem from "./BookItem";
import Pagination from "./Pagination";
import BookDetails from "./BookDetails";

const Main = () => {
  const [activeBook, setActiveBook] = useState(null);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeQuery, setActiveQuery] = useState("bestseller"); // сохраняем текущий поиск

  const booksPerPage = 10;

  useEffect(() => {
    handleSearch(1, "bestseller");
  }, []);

  const handleSearch = async (page = 1, customQuery) => {
    const searchTerm = customQuery ?? query ?? "bestseller"; // query или customQuery или дефолт
  
    setLoading(true);
    setError(null);
    try {
      const startIndex = (page - 1) * booksPerPage;
      const data = await fetchBooks(searchTerm, startIndex);
      console.log("Books fetched:", data.items); // проверяем здесь
      setBooks(data.items || []);
      setTotalPages(Math.ceil((data.totalItems || 0) / booksPerPage));
      setCurrentPage(page);
      setActiveQuery(searchTerm);
    } catch (err) {
      setError("Ошибка при загрузке книг");
    } finally {
      setLoading(false);
    }
  };
  

  const handlePageChange = (page) => {
    handleSearch(page);
  };

  const handleInputSearch = () => {
    // если поле пустое, ставим поиск по умолчанию
    const searchTerm = query.trim() === "" ? "bestseller" : query;
    handleSearch(1, searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
          Каталог книг
        </h1>

        {/* Поисковая строка */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Название или автор"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 p-3 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleInputSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Поиск
          </button>
        </div>

        {/* Загрузка и ошибки */}
        {loading && <p className="text-center text-gray-500">Загрузка...</p>}
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}

        {/* Список книг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => setActiveBook(book)}
              className="cursor-pointer"
            >
              <BookItem book={book} />
            </div>
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Модалка деталей книги */}
        {activeBook && (
          <BookDetails book={activeBook} onClose={() => setActiveBook(null)} />
        )}
      </div>
    </div>
  );
};

export default Main;
