const BookDetails = ({ book, onClose }) => {
  if (!book) return null;

  const info = book.volumeInfo || {};
  const { title, authors, description, imageLinks, publishedDate, categories } =
    info;

  return (
    <h1 className="text-red-500 text-5xl">TEST</h1>

  );
};

export default BookDetails;
