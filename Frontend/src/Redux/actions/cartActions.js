// import axios from "axios";
// import * as actionTypes from "../constants/CartConstans.js";

// const API_URL = "http://localhost:3001";

// // ✅ Add to Cart
// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   try {
//     const { data } = await axios.get(`${API_URL}/api/products/${id}`);

//     dispatch({
//       type: actionTypes.ADD_TO_CART,
//       payload: {
//         _id: data._id,
//         title: data.title,
//         price: data.price,
//         image: data.image,
//         qty,
//       },
//     });
//       saveCartToLocalStorage(getState);
//     // Save cart in localStorage (user-specific)
//     const userId = localStorage.getItem("userId");
//     localStorage.setItem(
//       `cartItems_${userId}`,
//       JSON.stringify(getState().cart.cartItems)
//     );
//   } catch (error) {
//     dispatch({
//       type: actionTypes.ADD_TO_CART_ERROR,
//       payload: error.message,
//     });
//   }
// };

// // ✅ Remove from Cart
// export const removeFromCart = (id) => (dispatch, getState) => {
//   try {
//     dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });
// saveCartToLocalStorage(getState);

//     const userId = localStorage.getItem("userId");
//     localStorage.setItem(
//       `cartItems_${userId}`,
//       JSON.stringify(getState().cart.cartItems)
//     );
//   } catch (error) {
//     dispatch({
//       type: actionTypes.REMOVE_FROM_CART_ERROR,
//       payload: error.message,
//     });
//   }
// };

// // ✅ Clear Cart
// export const clearCart = () => (dispatch) => {
//   const userId = localStorage.getItem("userId");

//   // Remove from localStorage
//   localStorage.removeItem(`cartItems_${userId}`);

//   dispatch({
//     type: actionTypes.CLEAR_CART,
//   });
// };

// // ✅ Load User Cart
// export const loadUserCart = () => (dispatch) => {
//   const userId = localStorage.getItem("userId");
//   const savedCart = localStorage.getItem(`cartItems_${userId}`);

//   dispatch({
//     type: actionTypes.CART_SET,
//     payload: savedCart ? JSON.parse(savedCart) : [],
//   });
// };

// // ✅ Update Cart Quantity
// export const updateCartQuantity = (id, qty) => async (dispatch, getState) => {
//   dispatch({
//     type: actionTypes.UPDATE_CART_QUANTITY, // ✅ use constant, not plain string
//     payload: { id, qty },
//   });

//   const userId = localStorage.getItem("userId");
//   localStorage.setItem(
//     `cartItems_${userId}`,
//     JSON.stringify(getState().cart.cartItems)
//   );
// saveCartToLocalStorage(getState);
// };

// // ✅ Helper function
// const saveCartToLocalStorage = (getState) => {
//   const cartItems = getState().cart.cartItems;
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };

import axios from "axios";
import * as actionTypes from "../constants/CartConstans.js";

const API_URL = "http://localhost:3001";

// ✅ Add to Cart
export const addToCart = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/${id}`);

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        _id: data._id,
        title: data.title,
        price: data.price,
        image: data.image,
      },
    });

    saveCartToLocalStorage(getState);
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART_ERROR,
      payload: error.message,
    });
  }
};

// ✅ Remove from Cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });
  saveCartToLocalStorage(getState);
};

// ✅ Update Cart Quantity
export const updateCartQuantity = (id, qty) => (dispatch, getState) => {
  dispatch({ type: actionTypes.UPDATE_CART_QUANTITY, payload: { id, qty } });
  saveCartToLocalStorage(getState);
};

// ✅ Clear Cart
export const clearCart = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  if (userId) localStorage.removeItem(`cartItems_${userId}`);

  dispatch({ type: actionTypes.CLEAR_CART });
};

// ✅ Load User Cart
export const loadUserCart = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  const savedCart = userId ? localStorage.getItem(`cartItems_${userId}`) : null;

  dispatch({
    type: actionTypes.CART_SET,
    payload: savedCart ? JSON.parse(savedCart) : [],
  });
};

// ✅ Helper function
const saveCartToLocalStorage = (getState) => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const cartItems = getState().cart.cartItems;
  localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
};
