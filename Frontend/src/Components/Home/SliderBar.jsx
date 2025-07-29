import React from "react";
import { Link } from "react-router-dom";

const SliderBar = ({ products, title, timer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 my-6 p-5 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          {title}
          {timer && (
            <span className="ml-3 text-xs font-medium text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full">
              ⏰ Limited Time
            </span>
          )}
        </h2>
        <Link
          to="/products"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
        >
          View All →
        </Link>
      </div>

      {/* Product Scroll */}
      <div className="flex overflow-x-auto space-x-5 pb-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex-shrink-0 w-44 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <img
                src={`http://localhost:3001${
                  product.image.startsWith("/uploads")
                    ? product.image
                    : `/uploads/${product.image}`
                }`}
                alt={product.title}
                className="h-36 w-full object-contain mb-2 rounded"
              />
              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {product.title}
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm font-bold">
                ₹{product.price}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default SliderBar;
