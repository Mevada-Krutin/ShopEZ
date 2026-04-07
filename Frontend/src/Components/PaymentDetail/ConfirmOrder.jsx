// ✅ Final Version with better validation and UX
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticConfirmUser } from "../../Services/Api";
import { clearCart } from "../../Redux/actions/cartActions";

export default function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const cartArray = Array.isArray(cartItems) ? cartItems : Object.values(cartItems);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartArray.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const totalPrice = cartArray.reduce((acc, item) => acc + item.price * item.qty, 0);

    const orderData = {
      items: cartArray.map((item) => ({
        productId: item._id,
        quantity: item.qty,
      })),
      totalPrice,
      address: formData,
    };

    setLoading(true);

    try {
      const response = await authenticConfirmUser(orderData); // ✅ This now sends JWT if exists
      alert("✅ Order placed successfully!");

      dispatch(clearCart()); // clear cart
      navigate("/"); // redirect to orders page
    } catch (err) {
      console.error("❌ Failed to confirm order:", err);
      alert(err.response?.data?.message || "Order failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Order</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "city", "state", "pincode"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-[1.02] active:scale-95 text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Processing..."
            : `Confirm Order - ₹${cartArray.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
              )}`}
        </button>
      </form>
    </div>
  );
}
