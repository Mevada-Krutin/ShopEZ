import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full mt-8 bg-white py-4 border-t border-gray-200">
      {/* Links section */}
      <div className="flex justify-center space-x-8 mb-4">
        <Link to="/Return" className="text-gray-500 text-lg hover:text-gray-800 transition">
          Return Policy
        </Link>
        <Link to="/About" className="text-gray-500 text-lg hover:text-gray-800 transition">
          About Us
        </Link>
        <Link to="/Contact" className="text-gray-500 text-lg hover:text-gray-800 transition">
          Contact Us
        </Link>
        <Link to="/Exchange" className="text-gray-500 text-lg hover:text-gray-800 transition">
          Exchange Policy
        </Link>
        <Link to="/Feedback" className="text-gray-500 text-lg hover:text-gray-800 transition">
          Feedback
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mb-2">
        ©2025 Digital Shop.in
      </div>

      {/* Social icons */}
      <div className="flex justify-center space-x-6 text-gray-500 text-2xl">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          <FaFacebook />
        </a>

        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 transition"
        >
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
