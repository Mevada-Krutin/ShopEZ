import * as actionTypes from "../constants/WishlistConstants";

const initialState = {
  wishlistItems: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (existItem) {
        return state; // Already in wishlist → no duplicate
      }

      return {
        ...state,
        wishlistItems: [...state.wishlistItems, item],
      };

    case actionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (x) => x._id !== action.payload
        ),
      };

    case actionTypes.LOAD_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
      };

    case actionTypes.CLEAR_WISHLIST:
      return {
        ...state,
        wishlistItems: [],
      };

    default:
      return state;
  }
};
