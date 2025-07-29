import axios from "axios";
import * as actionTypes from "../constants/CartConstans.js";

const API_URL = "http://localhost:3001";

// ✅ Add to Cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/${id}`);

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        _id: data._id,
        title: data.title,
        price: data.price,
        image: data.image,
        qty,
      },
    });

    // Save cart in localStorage (user-specific)
    const userId = localStorage.getItem("userId");
    localStorage.setItem(
      `cartItems_${userId}`,
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART_ERROR,
      payload: error.message,
    });
  }
};

// ✅ Remove from Cart
export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });

    const userId = localStorage.getItem("userId");
    localStorage.setItem(
      `cartItems_${userId}`,
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_ERROR,
      payload: error.message,
    });
  }
};

// ✅ Clear Cart
export const clearCart = () => (dispatch) => {
  const userId = localStorage.getItem("userId");

  // Remove from localStorage
  localStorage.removeItem(`cartItems_${userId}`);

  dispatch({
    type: actionTypes.CLEAR_CART,
  });
};

// ✅ Load User Cart
export const loadUserCart = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  const savedCart = localStorage.getItem(`cartItems_${userId}`);

  dispatch({
    type: actionTypes.CART_SET,
    payload: savedCart ? JSON.parse(savedCart) : [],
  });
};
