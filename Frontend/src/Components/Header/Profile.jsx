// import React, { useState } from 'react';
// import { FaPowerOff } from 'react-icons/fa';

// export default function Profile({ account, setAccount }) {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen((prev) => !prev);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const LogoutUser = () => {
//     setAccount('');
//     handleClose();
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <button
//           onClick={handleClick}
//           className="mt-0.5 cursor-pointer text-gray-800"
//           type="button"
//           aria-haspopup="true"
//           aria-expanded={open}
//         >
//           {account}
//         </button>
//       </div>

//       {open && (
//         <div
//           className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="menu-button"
//           tabIndex={-1}
//           onBlur={handleClose}
//         >
//           <div className="py-1" role="none">
//             <button
//               onClick={LogoutUser}
//               className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-0"
//             >
//               <FaPowerOff className="mr-2 text-blue-600" />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// ✅ UPDATED CODE

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPowerOff, FaUser, FaHeart, FaTags, FaShoppingBag } from "react-icons/fa";

// export default function Profile({ account, setAccount }) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = () => setOpen((prev) => !prev);
//   const handleClose = () => setOpen(false);

//   const LogoutUser = () => {
//     setAccount("");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     handleClose();
//     navigate("/");
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     handleClose();
//   };

//   return (
//     <div className="relative inline-block text-left">
//       {/* Account Button */}
//       <button
//         onClick={handleClick}
//         className="mt-0.5 cursor-pointer text-gray-800 hover:text-blue-600"
//         type="button"
//       >
//         {account || "Account"}
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div
//           className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
//           role="menu"
//         >
//           <div className="py-1 text-sm text-gray-700">
//             {/* My Orders */}
//             <button
//               onClick={() => handleNavigate("/my-orders")}
//               className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
//             >
//               <FaShoppingBag className="mr-2 text-blue-600" /> My Orders
//             </button>

//             {/* Wishlist */}
//             <button
//               onClick={() => handleNavigate("/wishlist")}
//               className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
//             >
//               <FaHeart className="mr-2 text-blue-600" /> Wishlist
//             </button>

//             {/* Coupons */}
//             <button
//               onClick={() => handleNavigate("/coupons")}
//               className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
//             >
//               <FaTags className="mr-2 text-blue-600" /> Coupons
//             </button>

//             {/* Profile */}
//             <button
//               onClick={() => handleNavigate("/profile")}
//               className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
//             >
//               <FaUser className="mr-2 text-blue-600" /> My Profile
//             </button>

//             {/* Logout */}
//             <button
//               onClick={LogoutUser}
//               className="flex items-center w-full px-4 py-2 hover:bg-gray-100 border-t border-gray-200"
//             >
//               <FaPowerOff className="mr-2 text-red-500" /> Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// ✅ ANOTHER NEW CODE

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPowerOff, FaHeart, FaTicketAlt, FaUser, FaBox } from "react-icons/fa";

export default function Profile({ account, setAccount }) {
  const [open, setOpen] = useState(false);


  const handleClick = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const LogoutUser = () => {
    setAccount("");
    setCart([]);                       // Clear cart state immediately
    localStorage.removeItem("user-token");  
    localStorage.removeItem("cart"); 
    handleClose();
    navigate("/login");   
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleClick}
          className="mt-0.5 cursor-pointer text-gray-800 font-medium"
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {account}
        </button>
      </div>

      {open && (
        <div
          className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          onMouseLeave={handleClose}
        >
          <div className="py-1">
            <Link
              to="/my-profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              <FaUser className="mr-2 text-blue-600" /> My Profile
            </Link>
            <Link
              to="/my-orders"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              <FaBox className="mr-2 text-green-600" /> My Orders
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              <FaHeart className="mr-2 text-pink-500" /> Wishlist
            </Link>
            <Link
              to="/coupons"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              <FaTicketAlt className="mr-2 text-yellow-500" /> Coupons
            </Link>

            <button
              onClick={LogoutUser}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <FaPowerOff className="mr-2 text-red-500" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
