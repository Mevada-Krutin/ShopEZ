import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth-token');
  const role = localStorage.getItem('role');

  return (token && role === 'admin') ? children : <Navigate to="/adminLogin" />;
};

export default ProtectedRoute;
 