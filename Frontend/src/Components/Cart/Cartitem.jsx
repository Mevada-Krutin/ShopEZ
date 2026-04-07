import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../Redux/actions/cartActions";
import { addElipsis } from "../../Utils/common-utils";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseQuantity = (id, currentQty) => {
    dispatch(updateCartQuantity(id, currentQty + 1));
  };

  const decreaseQuantity = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateCartQuantity(id, currentQty - 1));
    }
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

      {/* Quantity Buttons */}
        <div>
          <button
            onClick={() => decreaseQuantity(item._id, item.qty)}
            className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-l hover:bg-gray-300"
          >
            −
          </button>
          <span className="px-4 py-1 text-base">{item.qty || 1}</span>
          <button
            onClick={() => increaseQuantity(item._id, item.qty)}
            className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-r hover:bg-gray-300"
          >
            +
          </button>
        </div>

      {/* Right Side - Details */}
      <div className="flex flex-col justify-start">
        <p className="text-base font-medium">
          
          {addElipsis(item?.title?.longTitle || "")}
        </p>
        <p className="text-sm text-gray-500 mt-2">Seller: RetailNet</p>

        {/* Price */}
        {/* <div className="mt-3 flex items-center space-x-4">
          <span className="text-lg font-semibold text-black">
            ₹{item.price}         
          </span>
        </div> */}

        {/* Price */}
<div className="mt-3 flex items-center space-x-4">
  <span className="text-lg font-semibold text-black">
    ₹{item.price * item.qty}
  </span>

  {item.qty > 1 && (
    <span className="text-sm text-gray-500 line-through">
      ₹{item.price}
    </span>
  )}
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
