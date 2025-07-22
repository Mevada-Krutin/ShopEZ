import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 shadow-inner mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Logo/Description */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">MyShop</h1>
          <p className="mt-2 text-sm">
            Your favorite destination for quality products at amazing prices.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Shop</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm">Email: support@myshop.com</p>
          <p className="text-sm mt-1">Phone: +1 (234) 567-8901</p>
        </div>
      </div>

      <div className="text-center py-4 border-t text-sm">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
