export default function BookDetails({ book, onClose }) {
    if (!book) return null;
  
    const info = book.volumeInfo;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mt-16 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
          >
            ×
          </button>
  
          <div className="flex flex-col md:flex-row gap-6">
            {info.imageLinks?.thumbnail && (
              <img
                src={info.imageLinks.thumbnail}
                alt={info.title}
                className="w-full md:w-48 h-auto object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{info.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Авторы:</span> {info.authors?.join(", ")}
              </p>
              {info.publisher && (
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Издательство:</span> {info.publisher}
                </p>
              )}
              {info.publishedDate && (
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Год:</span> {info.publishedDate}
                </p>
              )}
              {info.description && (
                <p className="text-gray-700 mb-4">{info.description}</p>
              )}
              {info.previewLink && (
                <a
                  href={info.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                >
                  Посмотреть на Google Books
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  