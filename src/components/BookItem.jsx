export default function BookItem({ book }) {
  const info = book.volumeInfo;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition">
      {info.imageLinks?.thumbnail && (
        <img
          src={info.imageLinks.thumbnail}
          alt={info.title}
          className="w-full md:w-24 h-auto object-cover rounded"
        />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{info.title}</h3>
        <p className="text-gray-600 mb-2">{info.authors?.join(", ")}</p>
        <p className="text-gray-500 text-sm">{info.description?.slice(0, 120)}{info.description && "..."}</p>
      </div>
    </div>
  );
}
