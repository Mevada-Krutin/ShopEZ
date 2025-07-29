// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { authenticConfirmUser } from "../../Services/Api";

// export default function ConfirmOrder() {
//   const cartItems = useSelector((state) => state.cart.cartItems) || [];
//   const cartArray = Array.isArray(cartItems) ? cartItems : Object.values(cartItems);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!cartArray || cartArray.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     const orderData = {
//       userId: localStorage.getItem("userId"),
//       items: cartArray.map((item) => ({
//         productId: item._id,
//         quantity: item.qty,
//       })),
//       totalPrice: cartArray.reduce(
//         (acc, item) => acc + item.price * item.qty,
//         0
//       ),
//       address: formData,
//     };

//     try {
//       const response = await authenticConfirmUser(orderData);
//       alert("✅ Order placed successfully!");
//       console.log("Order placed:", response);
//       navigate("http://localhost:3001/api/orders/all");
//     } catch (err) {
//       console.error("❌ Failed to confirm order:", err);
//       alert("Order failed!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Order</h2>
//       <form onSubmit={handleSubmit}>
//         {["name", "phone", "city", "state", "pincode"].map((field) => (
//           <input
//             key={field}
//             type="text"
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             value={formData[field]}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-500 outline-none"
//           />
//         ))}
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-[1.02] active:scale-95"
//         >
//           Confirm Order
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticConfirmUser } from "../../Services/Api";
import { clearCart } from "../../Redux/actions/cartActions"; // ✅ Import action

export default function ConfirmOrder() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const cartArray = Array.isArray(cartItems) ? cartItems : Object.values(cartItems);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartArray.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      userId: localStorage.getItem("userId"),
      items: cartArray.map((item) => ({
        productId: item._id,
        quantity: item.qty,
      })),
      totalPrice: cartArray.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      ),
      address: formData,
    };

    try {
      const response = await authenticConfirmUser(orderData);
      alert("✅ Order placed successfully!");
      console.log("Order placed:", response);

      // ✅ CLEAR CART HERE
      dispatch(clearCart());

      // ✅ Navigate to Orders Page
      navigate("/orders");
    } catch (err) {
      console.error("❌ Failed to confirm order:", err);
      alert("Order failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Order</h2>
      <form onSubmit={handleSubmit}>
        {["name", "phone", "city", "state", "pincode"].map((field) => (
          <input
            key={field}
            type="text"
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
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-[1.02] active:scale-95"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
