import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3001/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading wishlist...</div>;

  if (wishlist.length === 0)
    return <div className="p-10 text-center text-gray-500">No items in wishlist.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Wishlist</h1>

      {wishlist.map((item) => (
        <div
          key={item.productId}
          className="flex items-center justify-between border-b pb-4 mb-4"
        >
          <div className="flex items-center">
            <img
              src={`http://localhost:3001${item.image}`}
              alt={item.title}
              className="w-24 h-24 object-contain mr-4"
            />
            <div>
              <h2 className="font-medium text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mt-1">₹{item.price}</p>
            </div>
          </div>

          <button
            onClick={() => removeFromWishlist(item.productId)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full"
          >
            <FaTrashAlt size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
