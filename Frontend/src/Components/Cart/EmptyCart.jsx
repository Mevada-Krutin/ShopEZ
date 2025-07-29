import React from 'react'
import Footer from '../Home/Footer/Footer'

function EmptyCart() {
  const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

  return (
    <>
      <div className="bg-white w-[80%] h-[60vh] mx-[140px] mt-20">
        <div className="text-center pt-[12%]">
          <img src={imgurl} alt="Empty" className="w-[15%] mx-auto" />
          <p className="text-lg font-medium mt-4">Your Cart is Empty!</p>
          <p className="text-base text-gray-600">Add items to it now</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmptyCart;
