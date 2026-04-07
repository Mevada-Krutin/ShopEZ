import axios from "axios";

// Login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: "USER_LOGIN", payload: data.user });
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error(error);
  }
};

// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "USER_LOGOUT" });
};

// Fetch Wishlist
export const fetchWishlist = (token) => async (dispatch) => {
  const { data } = await axios.get("/api/users/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "SET_WISHLIST", payload: data });
};

// Fetch Cart
export const fetchCart = (token) => async (dispatch) => {
  const { data } = await axios.get("/api/users/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "SET_CART", payload: data });
};

// Fetch Orders
export const fetchOrders = (token) => async (dispatch) => {
  const { data } = await axios.get("/api/users/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "SET_ORDERS", payload: data });
};
