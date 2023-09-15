import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange, filterValue }) => {
  return (
    <div className="filter">
      <label className="filter-label" htmlFor="contact-filter">
        Find contact by name
        <input
          onChange={onFilterChange}
          name="filter"
          id="contact-filter"
          filter={filterValue}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filterValue: PropTypes.string,
};

export default Filter;
