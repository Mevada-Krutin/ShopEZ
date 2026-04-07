import * as actionTypes from "../constants/WishlistConstants";

// ✅ Add to Wishlist
export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_TO_WISHLIST,
    payload: product,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// ✅ Remove from Wishlist
export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_WISHLIST,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// ✅ Load Wishlist (on refresh)
export const loadWishlist = () => (dispatch) => {
  const savedWishlist = localStorage.getItem("wishlistItems");
  dispatch({
    type: actionTypes.LOAD_WISHLIST,
    payload: savedWishlist ? JSON.parse(savedWishlist) : [],
  });
};

// ✅ Clear Wishlist (if needed)
export const clearWishlist = () => (dispatch) => {
  localStorage.removeItem("wishlistItems");
  dispatch({ type: actionTypes.CLEAR_WISHLIST });
};
