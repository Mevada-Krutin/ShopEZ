import { Link } from 'react-router-dom';

function ProductsItem({ products }) {
  const productsArray = Array.isArray(products)
    ? products
    : products
    ? Object.values(products)
    : [];

  return (
    <div className="mt-2 bg-white w-full pl-2 flex flex-wrap items-center">
      {productsArray.map((product, index) => (
  <Link
    to={`product/${product.id || index}`}
    key={product.id || index}
    className="no-underline"
  >
    <div className="p-4 border border-gray-300 text-center w-[225px] m-1 mt-2 rounded-sm hover:shadow transition">
      <img
        src={product.url}
        alt="product"
        className="h-36 object-contain mx-auto"
      />
      <p className="text-sm font-semibold text-gray-900 mt-2">
        {product.title?.shortTitle || 'No Title'}
      </p>
      <p className="text-sm text-green-600">{product.discount || ''}</p>
      <p className="text-sm text-gray-700 opacity-70">
        {product.tagline || ''}
      </p>
    </div>
  </Link>
))}

    </div>
  );
}
export default ProductsItem