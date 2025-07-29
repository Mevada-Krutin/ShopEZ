import React from "react";

const Dashboard = () => {
  const cards = [
    { label: "Total Products", value: 84, color: "bg-blue-500" },
    { label: "Active Users", value: 3, color: "bg-green-500" },
    { label: "Pending Orders", value: 6, color: "bg-purple-500" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage{" "}
        <span className="font-semibold text-blue-600">Products</span>,{" "}
        <span className="font-semibold text-green-600">Users</span>, and{" "}
        <span className="font-semibold text-purple-600">Orders</span> efficiently.
      </p>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map(({ label, value, color }) => (
          <div
            key={label}
            className={`${color} text-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105`}
          >
            <h2 className="text-4xl font-bold">{value}</h2>
            <p className="text-lg mt-2">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
