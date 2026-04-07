import { USER_LOGIN, USER_LOGOUT, SET_WISHLIST, SET_CART, SET_ORDERS } from "./constants/userConstants.js";

const initialState = {
  user: null,
  wishlist: [],
  cart: [],
  orders: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case USER_LOGOUT:
      return initialState;
    case SET_WISHLIST:
      return { ...state, wishlist: action.payload };
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};
