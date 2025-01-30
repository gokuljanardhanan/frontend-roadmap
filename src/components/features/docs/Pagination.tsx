interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-600"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-1 text-sm ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "border border-gray-300 dark:border-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-600"
      >
        Next
      </button>
    </div>
  );
}
