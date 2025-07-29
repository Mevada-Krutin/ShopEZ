import React from "react";

const FilterBar = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="all">All Categories</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Shoes">Shoes</option>
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="none">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default FilterBar;
