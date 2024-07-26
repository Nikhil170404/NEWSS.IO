// src/components/Pagination.js

import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = 'pagination',
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handlePreviousClick}
        disabled={isFirstPage}
        aria-disabled={isFirstPage}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={isLastPage}
        aria-disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
