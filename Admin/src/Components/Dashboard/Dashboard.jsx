import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaClock, FaRupeeSign } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    recentLogins: [],
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/dashboard/dashboard-stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin-token")}` },
      });

      setStats({
        totalProducts: res.data.totalProducts ?? 0,
        totalUsers: res.data.totalUsers ?? 0,
        totalOrders: res.data.totalOrders ?? 0,
        pendingOrders: res.data.pendingOrders ?? 0,
        revenue: res.data.revenue ?? 0,
        recentLogins: res.data.recentLogins || [],
      });

      setRecentOrders(res.data.recentOrders || []);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  const formatCurrency = (value) =>
    "₹" + Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2 });

  const revenueColor = stats.revenue > 0 ? "text-green-600" : "text-gray-400";

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 text-sm mb-4">Last Updated: {lastUpdated || "Loading..."}</p>

      <p className="text-gray-600 mb-6">
        Manage <Link to="/products" className="text-blue-500">Products</Link>,{" "}
        <Link to="/users" className="text-green-500">Users</Link>, and{" "}
        <Link to="/orders" className="text-purple-500">Orders</Link> efficiently.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <DashboardCard label="Total Products" value={stats.totalProducts} color="bg-blue-500" icon={<FaBox className="mx-auto text-3xl mb-2" />} link="/products" />
        <DashboardCard label="Active Users" value={stats.totalUsers} color="bg-green-500" icon={<FaUsers className="mx-auto text-3xl mb-2" />} link="/users" />
        <DashboardCard label="Total Orders" value={stats.totalOrders} color="bg-indigo-500" icon={<FaShoppingCart className="mx-auto text-3xl mb-2" />} link="/orders" />
        <DashboardCard label="Pending Orders" value={stats.pendingOrders} color="bg-yellow-500" icon={<FaClock className="mx-auto text-3xl mb-2" />} link="/orders?status=Pending" />
        <DashboardCard label="Revenue" value={formatCurrency(stats.revenue)} color="bg-pink-500" icon={<FaRupeeSign className="mx-auto text-3xl mb-2" />} textColor={revenueColor} />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable orders={recentOrders} formatCurrency={formatCurrency} />

      {/* Recent Logins */}
      <RecentLoginsTable logins={stats.recentLogins} />
    </div>
  );
};

const DashboardCard = ({ label, value, color, link, icon, textColor }) => (
  <Link
    to={link || "#"}
    className={`${color} text-white ${textColor || ""} text-center p-6 rounded-2xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl`}
  >
    {icon}
    <h2 className="text-3xl font-bold">{value}</h2>
    <p className="mt-2">{label}</p>
  </Link>
);

const RecentOrdersTable = ({ orders, formatCurrency }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-inner mt-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700 font-medium uppercase text-sm">
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="p-3 font-medium">{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{formatCurrency(order.totalAmount)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-400">No recent orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const RecentLoginsTable = ({ logins }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-inner mt-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Logins</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700 font-medium uppercase text-sm">
            <th className="p-3">User</th>
            <th className="p-3">Email</th>
            <th className="p-3">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {logins && logins.length > 0 ? (
            logins.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{new Date(user.lastLogin).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-400">No recent logins found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Dashboard;
