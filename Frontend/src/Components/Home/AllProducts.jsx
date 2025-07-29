import React from 'react';
import { Link } from 'react-router-dom';

function AllProducts({ products }) {
  return (
    <div className="mt-2 bg-white w-full pl-2 flex flex-wrap items-center">
      {products.map((product) => (
        <Link
          to={`product/${product.id}`}
          key={product.id}
          className="no-underline"
        >
          <div className="p-4 border border-gray-300 text-center w-[225px] m-1 mt-2 rounded-sm hover:shadow-sm transition">
            <img
              src={product.url}
              alt="product"
              className="h-[150px] object-contain mx-auto"
            />
            <p className="text-sm font-semibold text-gray-900 mt-2">
              {product.title.shortTitle}
            </p>
            <p className="text-sm text-green-600">{product.discount}</p>
            <p className="text-sm text-gray-700 opacity-70">
              {product.tagline}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllProducts;
