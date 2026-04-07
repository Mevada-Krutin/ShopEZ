// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   const token = localStorage.getItem("admin-token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (!token) {
//           setError("No admin token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:3001/api/orders/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || "Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token, orders]);

//   // Cancel order
//   const handleCancelOrder = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const res = await axios.put(
//         `http://localhost:3001/api/orders/${id}/cancel`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders(orders.map((order) => (order._id === id ? res.data : order)));
//     } catch (err) {
//       console.error("Error cancelling order:", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   // Mark as Delivered
//   const handleDeliverOrder = async (id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3001/api/orders/${id}/deliver`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders(orders.map((order) => (order._id === id ? res.data : order)));
//     } catch (err) {
//       console.error("Error delivering order:", err);
//       alert("Failed to mark as delivered.");
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-6 text-gray-700">Loading orders...</p>;

//   if (error)
//     return <p className="text-center mt-6 text-red-500 font-semibold">{error}</p>;

//   // Filter by search and status
//   const filteredOrders = orders
//     .filter((order) => {
//       const customerName = order.userId?.username?.toLowerCase() || order.address?.name?.toLowerCase() || "";
//       const productNames = order.items.map((item) => item.productId?.title?.toLowerCase() || "").join(" ");
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || productNames.includes(search);
//     })
//     .filter((order) => (statusFilter ? order.status === statusFilter : true));

//   // Sort orders
//   const sortedOrders = [...filteredOrders].sort((a, b) => {
//     switch (sortBy) {
//       case "dateDesc":
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case "dateAsc":
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       case "priceDesc":
//         return b.totalPrice - a.totalPrice;
//       case "priceAsc":
//         return a.totalPrice - b.totalPrice;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Order List</h2>

//       {/* Search, Filter, Sort */}
//       <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by customer or product..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/3"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Statuses</option>
//           <option value="Pending">Pending</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Sort By</option>
//           <option value="dateDesc">Date: Newest</option>
//           <option value="dateAsc">Date: Oldest</option>
//           <option value="priceDesc">Total: High to Low</option>
//           <option value="priceAsc">Total: Low to High</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded-xl shadow-md">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold">
//               <th className="p-2 border">Id</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Products</th>
//               <th className="p-2 border">Total</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedOrders.length > 0 ? (
//               sortedOrders.map((order, index) => (
//                 <tr key={order._id} className="border-t">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">
//                     {order.userId?.username || order.address?.name || "Guest"}
//                     <div className="text-xs text-gray-500">
//                       {order.userId?.email || order.address?.email || ""}
//                     </div>
//                   </td>
//                   <td className="p-2 border">
//                     {order.items.map((item, i) => (
//                       <div key={i}>
//                         {item.productId?.title
//                           ? `${item.productId.title} × ${item.quantity}`
//                           : `Product not found × ${item.quantity}`}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="p-2 border">₹{order.totalPrice}</td>
//                   <td className="p-2 border">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border">
//                     <span
//                       className={`font-semibold ${
//                         order.status === "Delivered"
//                           ? "text-green-600"
//                           : order.status === "Cancelled"
//                           ? "text-red-600"
//                           : "text-yellow-600"
//                       }`}
//                     >
//                       {order.status || "Pending"}
//                     </span>
//                     {order.status !== "Cancelled" && order.status !== "Delivered" && (
//                       <div className="mt-2">
//                         <button
//                           onClick={() => handleCancelOrder(order._id)}
//                           className="mr-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={() => handleDeliverOrder(order._id)}
//                           className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
//                         >
//                           Mark Delivered
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-4">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderList;


// ✅ NEW CODE OF  ORDERLIST

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const token = localStorage.getItem("admin-token");
  const location = useLocation();

  // Read status filter from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status") || "";
    setStatusFilter(status);
  }, [location.search]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      if (!token) {
        setError("No admin token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3001/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]); // removed `orders` from deps to prevent infinite loop

  // Cancel order
  const handleCancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.put(
        `http://localhost:3001/api/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map((order) => (order._id === id ? res.data : order)));
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order.");
    }
  };

  // Mark as Delivered
  const handleDeliverOrder = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/orders/${id}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map((order) => (order._id === id ? res.data : order)));
    } catch (err) {
      console.error("Error delivering order:", err);
      alert("Failed to mark as delivered.");
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-700">Loading orders...</p>;

  if (error)
    return <p className="text-center mt-6 text-red-500 font-semibold">{error}</p>;

  // Filter by search and status
  const filteredOrders = orders
    .filter((order) => {
      const customerName =
        order.userId?.username?.toLowerCase() ||
        order.address?.name?.toLowerCase() ||
        "";
      const productNames = order.items
        .map((item) => item.productId?.title?.toLowerCase() || "")
        .join(" ");
      const search = searchTerm.toLowerCase();
      return customerName.includes(search) || productNames.includes(search);
    })
    .filter((order) => (statusFilter ? order.status === statusFilter : true));

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "dateDesc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "dateAsc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "priceDesc":
        return (b.totalPrice || 0) - (a.totalPrice || 0);
      case "priceAsc":
        return (a.totalPrice || 0) - (b.totalPrice || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {statusFilter ? `${statusFilter} Orders` : "Order List"}
      </h2>

      {/* Search, Filter, Sort */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by customer or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="dateDesc">Date: Newest</option>
          <option value="dateAsc">Date: Oldest</option>
          <option value="priceDesc">Total: High to Low</option>
          <option value="priceAsc">Total: Low to High</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Products</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order, index) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {order.userId?.username || order.address?.name || "Guest"}
                    <div className="text-xs text-gray-500">
                      {order.userId?.email || order.address?.email || ""}
                    </div>
                  </td>
                  <td className="p-2 border">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.productId?.title
                          ? `${item.productId.title} × ${item.quantity}`
                          : `Product not found × ${item.quantity}`}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">
                    ₹{Number(order.totalPrice || 0).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`font-semibold ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                    {order.status !== "Cancelled" &&
                      order.status !== "Delivered" && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="mr-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeliverOrder(order._id)}
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                          >
                            Mark Delivered
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
