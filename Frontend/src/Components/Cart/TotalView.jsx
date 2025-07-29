import React, { useEffect, useState } from 'react';

function TotalView({ cartItems }) {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 40;

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.forEach((item) => {
      price += item.price.mrp;
      discount += item.price.mrp - item.price.cost;
    });
    setPrice(price);
    setDiscount(discount);
  };

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
          <span>Discount</span>
          <span className="text-green-600">− ₹{formatPrice(discount)}</span>
        </p>
        <p className="mb-5 flex justify-between">
          <span>Delivery Charges</span>
          <span>₹{formatPrice(deliveryFee)}</span>
        </p>
        <hr className="my-4" />
        <p className="mb-3 flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹{formatPrice(price - discount + deliveryFee)}</span>
        </p>
        <p className="text-green-600 font-medium">
          You will save ₹{formatPrice(discount - deliveryFee)} on this order
        </p>
      </div>
    </div>
  );
}

export default TotalView;
