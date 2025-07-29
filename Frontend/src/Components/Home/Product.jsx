import React from 'react';
import { Link } from 'react-router-dom';

function Product({ products }) {
  return (
    <div className="bg-white flex flex-wrap w-full">
      {products.map((product) => (
        <Link
          to={`product/${product.id}`}
          key={product.id}
          className="no-underline"
        >
          <div className="text-center m-2 p-4 border border-gray-300 hover:shadow transition w-[300px]">
            <img
              src={product.url}
              alt="product"
              className="h-[600px] object-contain mx-auto"
            />
            <p className="text-sm font-semibold text-gray-900 mt-2">
              {product.title.shortTitle}
            </p>
            <p className="text-sm text-green-600">{product.discount}</p>
            <p className="text-sm text-gray-700 opacity-70">{product.tagline}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Product;
