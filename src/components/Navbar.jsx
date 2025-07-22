import React from "react";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-violet-700 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-white">MyShop</div>

      <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
        <li className="hover:text-black cursor-pointer">Home</li>
        <li className="hover:text-black cursor-pointer">Shop</li>
        <li className="hover:text-black cursor-pointer">About</li>
        <li className="hover:text-black cursor-pointer">Contact</li>
      </ul>

      <div className="flex items-center gap-4">
        <button className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
        </button>

        {/* Mobile menu icon - optional */}
        <button className="md:hidden text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
