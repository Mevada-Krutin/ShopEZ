import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Redux/actions/cartActions";
import { addElipsis } from "../../Utils/common-utils";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex border-t border-gray-200 bg-white p-4">
      {/* Left Side - Image */}
      <div className="flex flex-col mr-6">
        <img
          src={`http://localhost:3001${item.image}`} // ✅ Updated to use backend path
          alt="product"
          className="h-36 w-28 object-contain p-4"
        />
      </div>

      {/* Right Side - Details */}
      <div className="flex flex-col justify-start">
        <p className="text-base font-medium">
          
          {addElipsis(item?.title?.longTitle || "")}
        </p>
        <p className="text-sm text-gray-500 mt-2">Seller: RetailNet</p>

        {/* Price */}
        <div className="mt-3 flex items-center space-x-4">
          <span className="text-lg font-semibold text-black">
            ₹{item.price}         
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItemFromCart(item._id)} // ✅ Changed id → _id
          className="mt-4 w-fit bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
