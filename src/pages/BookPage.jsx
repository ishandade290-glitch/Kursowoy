import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/googleBooksApi";

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      <p>{book.volumeInfo.description}</p>
    </div>
  );
}
export default BookPage