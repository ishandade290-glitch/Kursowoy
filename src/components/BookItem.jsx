function BookItem({ book }) {
  const { title, authors, imageLinks } = book.volumeInfo;

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm transition hover:shadow-lg">
      <img
        src={
          imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x192?text=No+Cover"
        }
        alt={title}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />

      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="text-sm text-slate-500">
        {authors?.join(", ") || "Автор неизвестен"}
      </p>
    </div>
  );
}

export default BookItem;
