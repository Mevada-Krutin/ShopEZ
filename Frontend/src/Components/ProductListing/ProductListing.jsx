import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [topOffers, setTopOffers] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setTopOffers(data.filter((p) => p.category === "top-offer"));
        setDealProducts(data.filter((p) => p.category === "deal-of-the-day"));
        setBestDeals(data.filter((p) => p.category === "best-deal"));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const renderProducts = (products) => (
    <div className="flex overflow-x-auto pb-4 -mx-2">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}  // ✅ Now navigates to detail page
          className="flex-shrink-0 w-40 p-3 border border-gray-200 rounded-lg shadow-sm bg-white mx-2 text-center"
        >
          <img
            src={`http://localhost:3001${product.image}`}
            alt={product.title}
            className="max-w-full h-auto block mx-auto mb-3"
          />
          <div className="text-sm text-gray-700">{product.title}</div>
          <div className="text-green-600 font-bold">₹{product.price}</div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="p-5">
      {/* Deal of the Day */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            Deal of the Day <span className="text-sm text-gray-600 ml-2">⏰ 05:00:00 Left</span>
          </h2>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm no-underline"
          >
            View All
          </a>
        </div>
        {renderProducts(dealProducts)}
      </div>

      {/* Top Offers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top Offers</h2>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm no-underline"
          >
            View All
          </a>
        </div>
        {renderProducts(topOffers)}
      </div>

      {/* Best Deals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Best Deals</h2>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm no-underline"
          >
            View All
          </a>
        </div>
        {renderProducts(bestDeals)}
      </div>
    </div>
  );
};

export default ProductListing;
