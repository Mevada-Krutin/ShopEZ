import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const res = await axios.get("http://localhost:3001/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Keep only the most recent order per user
        const latestUserOrders = getLatestOrderPerUser(res.data);
        setOrders(latestUserOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to get only the most recent order per user
  const getLatestOrderPerUser = (orders) => {
    const userOrderMap = new Map();
    
    // Sort orders by date (newest first)
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    sortedOrders.forEach(order => {
      const userName = order.userId?.name || order.address?.name || "Guest";
      
      // Only keep the first occurrence (newest order) for each user
      if (!userOrderMap.has(userName)) {
        userOrderMap.set(userName, order);
      }
    });
    
    // Convert back to array and sort by date (newest first)
    return Array.from(userOrderMap.values()).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-2">#</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Products</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {order.userId?.name || order.address?.name || "Guest"}
                </td>
                <td className="p-2">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.productId?.title || "Unknown Product"} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-2">₹{order.totalPrice}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">{order.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;