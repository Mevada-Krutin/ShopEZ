import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProducts from "../Components/ListProduct/ListProducts";
import UserList from "../Components/UserList/UserList";
import OrderList from "../Components/OrderUser/OrderList";
import Dashboard from "../Components/Dashboard/Dashboard";
import ProtectedRoute from "../routes/ProtectedRoute";

function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 ml-64 p-6">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listProduct"
            element={
              <ProtectedRoute>
                <ListProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userList"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderdlist"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
