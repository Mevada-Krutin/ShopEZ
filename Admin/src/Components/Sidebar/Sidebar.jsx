import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaList, FaShoppingCart, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Add Product", icon: <FaBoxOpen />, path: "/admin/addProduct" },
    { name: "Product List", icon: <FaList />, path: "/admin/listProduct" },
    { name: "User List", icon: <FaUsers />, path: "/admin/userList" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orderdlist" },
  ];

  const handleLogout = () => {
    // Remove admin token from localStorage
    localStorage.removeItem("admin-token");

    // Optionally clear any other admin-related data
    localStorage.removeItem("admin-info");

    // Redirect to admin login page
    navigate("/admin-login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center mb-8 space-x-4">
  <img src="/logo.jpg" alt="Logo" className="w-20 h-20 rounded-3xl object-cover" />
  <h2 className="text-2xl font-extrabold text-blue-100 tracking-wide">
    Admin Panel
  </h2>
</div>
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
