import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin/Admin.jsx';
import Login from './Components/Login/Login.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/adminLogin" />} />
      </Routes>
    </Router>
  );
}

export default App;
