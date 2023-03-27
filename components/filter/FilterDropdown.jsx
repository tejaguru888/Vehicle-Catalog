import React from 'react';

const FilterDropdown = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div className="filter-dropdown">
      <select value={selectedOption} onChange={onOptionChange}>
        <option value="">All</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterDropdown;

