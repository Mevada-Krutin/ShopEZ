import * as actionTypes from "../constants/CartConstans.js";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? { ...x, qty: x.qty + 1 } // ✅ increase quantity properly
              : x
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, qty: 1 } ],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case actionTypes.CART_SET:
      return {
        ...state,
        cartItems: action.payload,
      };

      case actionTypes.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    default:
      return state;
  }
};
