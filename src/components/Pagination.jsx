import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

export const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= totalPages && i <= 5; i++) {
        if (i <= 3) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
            >
              {i}
            </button>
          );
        } else {
          pageNumbers.push(<span key="span1">...</span>);
        }
      }
    } else if (currentPage > 3 && currentPage <= totalPages - 3) {
      pageNumbers.push(
        <button key={1} onClick={() => handleClick(1)}>
          1
        </button>
      );
      pageNumbers.push(<span key="span1">...</span>);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
          >
            {i}
          </button>
        );
      }
      pageNumbers.push(<span key="span2">...</span>);
      pageNumbers.push(
        <button key={totalPages} onClick={() => handleClick(totalPages)}>
          {totalPages}
        </button>
      );
    } else {
      pageNumbers.push(
        <button key={1} onClick={() => handleClick(1)}>
          1
        </button>
      );
      pageNumbers.push(<span key="span3">...</span>);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };
  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
