import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/googleBooksApi";

function BookPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError("Ошибка загрузки книги");
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center text-lg">Загрузка...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  if (!book) {
    return <p className="p-6 text-center">Книга не найдена</p>;
  }

  const {
    title,
    authors,
    description,
    imageLinks,
    publishedDate,
  } = book.volumeInfo || {};

  const cleanDescription =
    description?.replace(/<[^>]+>/g, "") || "Описание отсутствует";

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Обложка */}
          <img
            src={imageLinks?.thumbnail || "https://via.placeholder.com/150x220"}
            alt={title}
            className="h-55 w-37.5 rounded-md object-cover shadow"
          />

          {/* Информация */}
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold text-slate-800">
              {title}
            </h1>

            {authors && (
              <p className="mb-1 text-slate-600">
                <span className="font-medium">Автор:</span>{" "}
                {authors.join(", ")}
              </p>
            )}

            {publishedDate && (
              <p className="mb-4 text-slate-600">
                <span className="font-medium">Год:</span> {publishedDate}
              </p>
            )}

            <div className="max-h-60 overflow-y-auto rounded-md bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
              {cleanDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
