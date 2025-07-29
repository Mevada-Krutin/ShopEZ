import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleProceedToConfirm = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/confirm-order");
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleProceedToConfirm}
        className="w-full max-w-xs bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 hover:shadow-xl active:scale-95 transition-transform duration-200 ease-in-out"
      >
        ✅ Proceed to Confirm Order
      </button>
    </div>
  );
}
