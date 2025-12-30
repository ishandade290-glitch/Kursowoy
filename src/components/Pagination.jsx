export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Back
      </button>

      <span className="px-3 py-2 text-gray-700 font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}
