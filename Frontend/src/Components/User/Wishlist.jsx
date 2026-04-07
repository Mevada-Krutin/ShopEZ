import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/actions/wishlistActions";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Your Wishlist is Empty 💔
        </h2>
        <Link
          to="/"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist ❤️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 shadow-md rounded-md flex flex-col items-center"
          >
            <img
              src={`http://localhost:3001${item.image}`}
              alt={item.title}
              className="h-40 object-contain mb-3"
            />
            <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            <p className="text-gray-700 font-semibold mb-3">₹{item.price}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
              <Link
                to={`/product/${item._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
