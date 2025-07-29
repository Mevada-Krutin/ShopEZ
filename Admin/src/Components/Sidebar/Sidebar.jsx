import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaList, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Add Product", icon: <FaBoxOpen />, path: "/admin/addProduct" },
    { name: "Product List", icon: <FaList />, path: "/admin/listProduct" },
    { name: "User List", icon: <FaUsers />, path: "/admin/userList" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orderdlist" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed shadow-xl">
      <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">Admin Panel</h2>
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
  );
};

export default Sidebar;
