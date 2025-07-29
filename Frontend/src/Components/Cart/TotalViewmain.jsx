import React, { useEffect, useState } from 'react';

function TotalViewmain({ cartItems }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = (items) => {
      let total = 0;
      items.forEach((item) => {
        total += item.price; // ✅ Now assumes each item has a single price (not item.price.mrp)
      });
      return total;
    };

    const totalPrice = calculateTotalPrice(cartItems);
    const totalAmount = totalPrice + 40; // Add delivery charge
    localStorage.setItem('totalAmount', totalAmount);
    setPrice(totalPrice);
  }, [cartItems]);

  const formatPrice = (num) => num.toLocaleString('en-IN');

  return (
    <div className="bg-white w-full md:w-[300px] shadow-md rounded-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-gray-500 text-sm font-medium">PRICE DETAILS</p>
      </div>
      <div className="px-6 py-4 text-sm">
        <p className="mb-5 flex justify-between">
          <span>Price ({cartItems?.length} item)</span>
          <span>₹{formatPrice(price)}</span>
        </p>
        <p className="mb-5 flex justify-between">
          <span>Delivery Charges</span>
          <span>₹40</span>
        </p>
        <hr className="my-4" />
        <p className="mb-3 flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹{formatPrice(price + 40)}</span>
        </p>
      </div>
    </div>
  );
}

export default TotalViewmain;
