import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';  // <-- react-icons instead of MUI
import { Link } from 'react-router-dom';

// Components
import Loginialog from '../Login/Loginialog';
import Profile from './Profile';
import { DataContext } from '../../Context/DataProvider';

const Custombtn = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const { cartItems } = useSelector((state) => state.cart);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="flex ml-auto mr-12 items-center gap-x-16 max-md:block">
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <button
          className="bg-white text-blue-600 font-semibold px-6 py-1 h-8 rounded text-sm shadow-none"
          onClick={openDialog}
        >
          LogIn
        </button>
      )}

      {/* <p className="text-sm w-32 hover:text-white">Become a Seller</p> */}
      <p className=" text-sm hover:text-white">More</p>
     

      <Link to="/cart" className="flex items-center ml mt-1 text-white no-underline ">
        <div className="relative">
          <FaShoppingCart className="text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1.5">
            {cartItems?.length}
          </span>
        </div>
        <p className="ml-2">Cart</p>
      </Link>

      <Loginialog open={open} setopen={setOpen} />
    </div>
  );
};

export default Custombtn;
