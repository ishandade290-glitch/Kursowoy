import { useState, useCallback } from "react";
import { searchBooks } from "../services/googleBooksApi";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchBooks(query);
      setBooks(data);
    } catch (err) {
      setError("Ошибка загрузки книг");
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, fetchBooks };
}
