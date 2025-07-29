import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Admin from '../Admin.jsx'
function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="http://localhost:5174/adminLogin" element={<Admin/>}></Route>
      </Routes>
    </div>
  )
}

export default AdminRouter