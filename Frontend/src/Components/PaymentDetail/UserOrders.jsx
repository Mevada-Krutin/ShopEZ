// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3001/api/orders";

// export default function UserOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Get JWT token from localStorage
//   const token = localStorage.getItem("user-token");
//   console.log("User token:", token);

//   useEffect(() => {
//     const loadOrders = async () => {
//       if (!token) {
//         setError("Please login to view your orders.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`${API_URL}/my-orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to fetch orders:", err);
//         setError(err.response?.data?.message || "Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadOrders();
//   }, [token]);

//   // ✅ Cancel order securely
//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const res = await axios.put(
//         `${API_URL}/${orderId}/cancel`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(res.data.message || "Order cancelled successfully!");
//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: "Cancelled" } : order
//         )
//       );
//     } catch (err) {
//       console.error("Failed to cancel order:", err);
//       alert(err.response?.data?.message || "❌ Failed to cancel order");
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Loading orders...</p>;
//   if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border p-4 rounded-lg shadow-sm bg-gray-50"
//             >
//               {/* ✅ Status Badge */}
//               <p className="mt-2">
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
//                     ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "Cancelled"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                 >
//                   {order.status}
//                 </span>
//               </p>

//               <p>
//                 <strong>Total:</strong> ₹{order.totalPrice}
//               </p>

//               <p className="mt-2 font-semibold">Items:</p>
//               <ul className="list-disc ml-6">
//                 {order.items?.map((item, index) => (
//                   <li key={item.productId?._id || index}>
//                     {item.productId?.title || "Unknown"} × {item.quantity} - ₹
//                     {item.productId?.price || 0}
//                   </li>
//                 ))}
//               </ul>

//               {order.address && (
//                 <>
//                   <p className="mt-2 font-semibold">Shipping Address:</p>
//                   <p>
//                     {order.address?.name}, {order.address?.phone}
//                   </p>
//                   <p>
//                     {order.address?.city}, {order.address?.state} -{" "}
//                     {order.address?.pincode}
//                   </p>
//                 </>
//               )}

//               {/* ✅ Cancel Button for Pending Orders */}
//               {order.status === "Pending" && (
//                 <button
//                   onClick={() => handleCancel(order._id)}
//                   className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// ✅ NEW COE FOR ORDER LIST WITH IMPROVEMENTS
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Get JWT token from localStorage
  const token = localStorage.getItem("user-token");

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Cancel order
  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.put(
        `${API_URL}/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message || "Order cancelled successfully!");

      // Update order status locally
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert(err.response?.data?.message || "❌ Failed to cancel order");
    }
  };

  // Delivery stepper helper
  const getStepClass = (current, step) => {
    const steps = ["Pending", "Shipped", "Delivered"];
    const currentIndex = steps.indexOf(current);
    const stepIndex = steps.indexOf(step);
    if (currentIndex > stepIndex) return "bg-green-600";
    if (currentIndex === stepIndex) return "bg-yellow-500";
    return "bg-gray-300";
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-600">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="mt-2">
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>

              <p className="mt-2 font-semibold">Items:</p>
              <ul className="list-disc ml-6">
                {order.items?.map((item, index) => (
                  <li key={index}>
                    {item.productId?.title || "Unknown"} × {item.quantity} — ₹
                    {item.productId?.price || 0}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Details
                </button>

                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[400px] sm:w-[600px] p-6 rounded-xl shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Order Details
            </h3>

            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedOrder.status === "Delivered"
                    ? "text-green-600"
                    : selectedOrder.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p>
              <strong>Total:</strong> ₹{selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            {/* Items */}
            <div className="mt-3">
              <p className="font-semibold mb-1">Items:</p>
              <ul className="divide-y">
                {selectedOrder.items?.map((item, i) => (
                  <li key={i} className="py-2 flex items-center space-x-3">
                    {item.productId?.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <p>{item.productId?.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.productId?.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
