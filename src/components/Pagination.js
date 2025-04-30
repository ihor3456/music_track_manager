import React from "react";
import "../styles/Pagination.css";

function Pagination({ total, perPage, current, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination">
      <button
        onClick={() => onPageChange(Math.max(current - 1, 1))}
        disabled={current === 1}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === current ? "active" : ""}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(current + 1, totalPages))}
        disabled={current === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
