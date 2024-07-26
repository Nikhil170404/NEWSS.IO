// src/components/CategoryFilter.js
import React from 'react';
import PropTypes from 'prop-types'; // added PropTypes for type checking

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = 'category-filter', // added a default className
}) => {
  const handleCategoryChange = (event) => {
    onSelectCategory(event.target.value);
  };

  return (
    <div className={className}>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="Select a category" // added aria-label for accessibility
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <span className="category-filter-icon">&#x25BC;</span>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CategoryFilter;
