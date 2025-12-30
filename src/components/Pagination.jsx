const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = new Set();

    pages.add(1);
    pages.add(totalPages);

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.add(i);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const pages = getPages();

  return (
    <div className="mt-14 flex justify-center">
      <div className="flex items-center gap-1 rounded-2xl bg-white px-5 py-3 shadow-md">
        {/* Назад */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40"
        >
          ←
        </button>

        {pages.map((page, index) => {
          const prev = pages[index - 1];

          const showDots = prev && page - prev > 1;

          return (
            <span key={page} className="flex items-center">
              {showDots && (
                <span className="px-2 text-gray-400">…</span>
              )}

              <button
                onClick={() => onPageChange(page)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition
                  ${
                    page === currentPage
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            </span>
          );
        })}

        {/* Вперёд */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
