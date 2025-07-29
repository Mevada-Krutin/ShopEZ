import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Search from "./Search.jsx";
import Custombtn from "./Custombtn";
import { DataContext } from "../../Context/DataProvider";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { account } = useContext(DataContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#2874f0] shadow-md z-40 h-[60px] flex items-center px-4 md:px-8">
        {/* Mobile Menu Button */}
        <button
          className="text-white mr-4 md:hidden hover:opacity-80 transition"
          onClick={handleOpen}
          aria-label="Open menu"
        >
          <FaBars size={22} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="ml-2 text-white font-bold italic text-2xl font-sans tracking-wide hover:opacity-90"
        >
          ShopEZ E-commerce Application 
        </Link>

        {/* Spacer */}
        <div className="flex-auto" />

        {/* Search (Hidden on Mobile) */}
        <div className="hidden md:block mx-4">
          <Search />
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Custombtn />
        </div>
      </header>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClose}
      >
        <aside
          className={`bg-white dark:bg-gray-800 w-64 h-full p-5 transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
            onClick={handleClose}
          >
            <FaTimes size={22} />
          </button>

          {/* Sidebar Content */}
          <div className="mt-10 space-y-5">
            <Custombtn />
            <Link
              to="/products"
              className="block text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
              onClick={handleClose}
            >
              Products
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
