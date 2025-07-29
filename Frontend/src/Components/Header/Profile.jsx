import React, { useState } from 'react';
import { FaPowerOff } from 'react-icons/fa';

export default function Profile({ account, setAccount }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const LogoutUser = () => {
    setAccount('');
    handleClose();
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleClick}
          className="mt-0.5 cursor-pointer text-gray-800"
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {account}
        </button>
      </div>

      {open && (
        <div
          className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onBlur={handleClose}
        >
          <div className="py-1" role="none">
            <button
              onClick={LogoutUser}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              <FaPowerOff className="mr-2 text-blue-600" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
