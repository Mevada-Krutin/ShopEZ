import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  const [query, setQuery] = useState("");
  const { products } = useSelector((state) => state.getProducts);

  const productsArray = Array.isArray(products)
    ? products
    : products
    ? Object.values(products)
    : [];

  const filteredProducts = productsArray.filter((product) =>
    product.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Box */}
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 shadow-sm focus-within:shadow-md transition">
        <BiSearch className="text-gray-500 dark:text-gray-300 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Dropdown Results */}
      {query && (
        <ul className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <li
                key={item.id || item._id}
                className="p-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700"
              >
                <Link to={`/product/${item.id || item._id}`}>
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="p-3 text-sm text-gray-500 dark:text-gray-400">
              No products found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
