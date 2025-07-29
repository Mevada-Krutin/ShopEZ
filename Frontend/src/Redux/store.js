import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ Use named import for Vite
import { composeWithDevTools } from "redux-devtools-extension";

import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/ProductReducer.js";
import { cartReducer } from "./reducers/CartReducer.js";

// ✅ Get user-specific cart from localStorage
const userId = localStorage.getItem("userId"); 
const cartItemsFromStorage = userId && localStorage.getItem(`cartItems_${userId}`)
  ? JSON.parse(localStorage.getItem(`cartItems_${userId}`))
  : [];

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  cart: cartReducer,
});

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
