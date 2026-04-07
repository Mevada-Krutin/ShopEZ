import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin/Admin.jsx';
import RegisterAdmin from "./Components/Login/RegisterAdmin";
import Login from './Components/Login/Login.jsx';
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";

// Import your Dashboard
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import UserList from './Components/UserList/UserList.jsx';
import ListProducts from './Components/ListProduct/ListProducts.jsx';
import OrderList from './Components/OrderUser/OrderList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and Password Routes */}
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />  
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<Admin />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/products" element={<ListProducts />} />
        <Route path="/orders" element={<OrderList />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/adminLogin" />} />
      </Routes>
    </Router>
  );
}

export default App;
