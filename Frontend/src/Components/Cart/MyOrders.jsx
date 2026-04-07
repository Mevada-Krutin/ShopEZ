import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT from login
        if (!token) {
          alert("Please login to view your orders.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading your orders...</div>;

  if (!orders.length) return <div className="text-center mt-10">No orders found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow p-5 border hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              Ordered on {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-3 border-t pt-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span className="font-medium">{item.productId?.title || "Product"}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
