import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Add Product", path: "/admin/product/create" },
];

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          {isSidebarOpen ? "Admin Panel" : "AP"}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            >
              {isSidebarOpen ? item.name : item.name.charAt(0)}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-600 hover:bg-gray-500 p-2 rounded"
          >
            {isSidebarOpen ? "Profile" : "P"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Sidebar
        </button>

        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the Admin Panel!</p>
      </div>
    </div>
  );
};

export default Admin;
