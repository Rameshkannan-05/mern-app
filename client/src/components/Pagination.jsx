

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null; // No pagination if only one page

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5; // Max visible page buttons
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(pages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="mx-1 px-3 py-1 rounded bg-gray-200"
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="start-ellipsis" className="mx-1">
            ...
          </span>
        );
      }
    }

    // Add visible page buttons
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (end < pages) {
      if (end < pages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="mx-1">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={pages}
          onClick={() => onPageChange(pages)}
          className="mx-1 px-3 py-1 rounded bg-gray-200"
        >
          {pages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      {renderPageButtons()}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
