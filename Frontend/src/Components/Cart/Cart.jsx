import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TotalViewmain from './TotalViewmain';

// Components
import CartItem from './CartItem';
// import TotalViewmain from './TotalViewmain';
import EmptyCart from './EmptyCart';

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      {cartItems.length ? (
        <div className="flex flex-col lg:flex-row px-6 md:px-16 py-6 bg-gray-100">
          {/* Left Component */}
          <div className="lg:w-3/4 w-full lg:pr-4 mb-6 lg:mb-0">
            {/* Header */}
            <div className="bg-white p-4">
              <h1 className="text-lg font-semibold">My Cart ({cartItems.length})</h1>
            </div>

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
              
              
            ))}

            {/* Place Order Button */}
            <Link to="/Payment" className="no-underline">
              <div className="bg-white p-4 border-t border-gray-200 shadow-inner mt-4 flex justify-end">
                <button className="bg-orange-600 text-white px-6 py-3 rounded-sm w-64 h-12 text-base font-medium hover:bg-orange-700 transition">
                  Place Order
                </button>
              </div>
            </Link>
          </div>

          {/* Right Component */}
          <div className="lg:w-1/4 w-full  lg:pl-4 mb-6 lg:mb-0">
            <TotalViewmain cartItems={cartItems} />
            
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
