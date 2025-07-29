import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { DataContext } from "../../Context/DataProvider";
import { authenticLogin, authenticsingup } from "../../Services/Api";
import { CART_SET } from "../../Redux/constants/CartConstans"; // ✅ create constant

export default function LoginDialog({ open, setopen }) {
  const [account, toggleAccount] = useState({ view: "login" });
  const [signup, setSignup] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setopen(false);
    toggleAccount({ view: "login" });
    setError(false);
  };

  const toggleSignup = () => toggleAccount({ view: "signup" });

  const onSignupChange = (e) =>
    setSignup({ ...signup, [e.target.name]: e.target.value });

  const onLoginChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  // ✅ Fetch user's cart from backend
  const fetchUserCart = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: CART_SET, payload: data });

      localStorage.setItem("cartItems", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      dispatch({ type: CART_SET, payload: [] });
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  };

  // ✅ Signup user
  const signupUser = async () => {
    const payload = {
      name: `${signup.firstname} ${signup.lastname}`.trim(),
      email: signup.email,
      password: signup.password,
    };

    const response = await authenticsingup(payload);
    if (response && response.status === 201) {
      localStorage.setItem("account", payload.name);
      setAccount(payload.name);
      handleClose();
    }
  };

  // ✅ Login user
  const loginUser = async () => {
    const response = await authenticLogin(login);

    if (response && response.status === 200) {
      const { token, name } = response.data;

      // ✅ Save user info
      localStorage.setItem("token", token);
      localStorage.setItem("account", name);
      setAccount(name);

      // ✅ Clear old cart (important when switching users)
      localStorage.removeItem("cartItems");
      dispatch({ type: CART_SET, payload: [] });

      // ✅ Fetch user's cart from backend
      await fetchUserCart(token);

      handleClose();
      navigate("/");
    } else {
      setError(true);
    }
  };

  const adminLoginRedirect = () => {
    window.location.href = "http://localhost:5174/adminLogin";
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {account.view === "login" ? (
              <>
                <h1 className="text-center text-3xl font-bold text-gray-800">
                  Welcome Back
                </h1>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Please login to continue
                </p>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={onLoginChange}
                  className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={onLoginChange}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />

                {error && (
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    Invalid email or password
                  </p>
                )}

                <button
                  onClick={loginUser}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                  Login
                </button>

                <div className="flex items-center justify-center mt-6">
                  <div className="h-px bg-gray-300 w-1/3"></div>
                  <p className="text-gray-500 text-sm px-2">OR</p>
                  <div className="h-px bg-gray-300 w-1/3"></div>
                </div>

                <button
                  onClick={adminLoginRedirect}
                  className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                  Login as Admin
                </button>

                <div className="flex items-center justify-center mt-6">
                  <div className="h-px bg-gray-300 w-1/3"></div>
                  <p className="text-gray-500 text-sm px-2">OR</p>
                  <div className="h-px bg-gray-300 w-1/3"></div>
                </div>

                <p
                  onClick={toggleSignup}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  New here? Create an account
                </p>
              </>
            ) : (
              <>
                <h1 className="text-center text-3xl font-bold text-gray-800">
                  Create Account
                </h1>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Fill in the details to sign up
                </p>

                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter First Name"
                  onChange={onSignupChange}
                  className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter Last Name"
                  onChange={onSignupChange}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={onSignupChange}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={onSignupChange}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />

                <button
                  onClick={signupUser}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                  Continue
                </button>

                <p
                  onClick={() => toggleAccount({ view: "login" })}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  Already have an account? Log In
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
