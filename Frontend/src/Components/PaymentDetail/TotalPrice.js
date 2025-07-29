import React, { useState } from 'react';
import TotalView from './TotalView';
import Payment from './Payment';

function ParentComponent() {
  const [cartItems, setCartItems] = useState([
    // Example cart items
    { price: { mrp: 1000, cost: 900 } },
    { price: { mrp: 500, cost: 450 } }
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <div>
      <TotalView cartItems={cartItems} onTotalChange={setTotalAmount} />
      <Payment totalAmount={totalAmount} />
    </div>
  );
}

export default ParentComponent;