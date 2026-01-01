import { useState, useEffect } from "react";
import { searchBooks } from "../services/googleBooksApi";

const BOOKS_PER_PAGE = 10;
const DEFAULT_QUERY = "bestseller";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY);

  const fetchBooks = async (query = DEFAULT_QUERY, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const startIndex = (page - 1) * BOOKS_PER_PAGE;
      const data = await searchBooks(query, startIndex);

      setBooks(data.items || []);
      setTotalPages(Math.ceil((data.totalItems || 0) / BOOKS_PER_PAGE));
      setCurrentPage(page);
      setActiveQuery(query);
    } catch {
      setError("Ошибка загрузки книг");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(DEFAULT_QUERY, 1);
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    currentPage,
    totalPages,
    activeQuery,
  };
}
