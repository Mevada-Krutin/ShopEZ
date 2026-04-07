// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// import { DataContext } from "../../Context/DataProvider";
// import { authenticLogin, authenticsingup } from "../../Services/Api";
// import { CART_SET } from "../../Redux/constants/CartConstans";

// export default function LoginDialog({ open, setopen }) {
//   const [account, toggleAccount] = useState({ view: "login" });
//   const [signup, setSignup] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [login, setLogin] = useState({ email: "", password: "" });

//   // Forgot Password via OTP
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [forgotMessage, setForgotMessage] = useState("");

//   // Reset password via OTP
//   const [reset, setReset] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [resetMessage, setResetMessage] = useState("");

//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState(false);

//   const { setAccount } = useContext(DataContext);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleClose = () => {
//     setopen(false);
//     toggleAccount({ view: "login" });
//     setError(false);
//     setForgotMessage("");
//     setForgotEmail("");
//     setOtp("");
//     setReset({ newPassword: "", confirmPassword: "" });
//     setResetMessage("");
//     setLoading(false);
//   };

//   const toggleSignup = () => toggleAccount({ view: "signup" });
//   const toggleForgotPassword = () => toggleAccount({ view: "forgotEmail" });

//   const onSignupChange = (e) =>
//     setSignup({ ...signup, [e.target.name]: e.target.value });
//   const onLoginChange = (e) =>
//     setLogin({ ...login, [e.target.name]: e.target.value });
//   const onResetChange = (e) =>
//     setReset({ ...reset, [e.target.name]: e.target.value });

//   const fetchUserCart = async (token) => {
//     try {
//       const { data } = await axios.get("http://localhost:3001/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       dispatch({ type: CART_SET, payload: data });
//       localStorage.setItem("cartItems", JSON.stringify(data));
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//       dispatch({ type: CART_SET, payload: [] });
//       localStorage.setItem("cartItems", JSON.stringify([]));
//     }
//   };

//   const signupUser = async () => {
//     const payload = {
//       name: `${signup.firstname} ${signup.lastname}`.trim(),
//       email: signup.email,
//       password: signup.password,
//     };
//     const response = await authenticsingup(payload);
//     if (response && response.status === 201) {
//       localStorage.setItem("account", payload.name);
//       setAccount(payload.name);
//       handleClose();
//     }
//   };

//   const loginUser = async () => {
//     try {
//       const response = await authenticLogin(login);
//       if (response && response.status === 200) {
//         const { token, name, role, status } = response.data.data;

//         if (status === "blocked") {
//           setError("Your account has been blocked");
//           return;
//         }

//         localStorage.setItem("token", token);
//         localStorage.setItem("account", name);
//         localStorage.setItem("role", role);
//         localStorage.setItem("status", status);

//         setAccount(name);

//         localStorage.removeItem("cartItems");
//         dispatch({ type: CART_SET, payload: [] });

//         await fetchUserCart(token);

//         handleClose();
//         navigate("/");
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   // ✅ Send OTP to user's email
//   const sendOtp = async () => {
//     if (!forgotEmail) {
//       setForgotMessage("Please enter your email");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         "http://localhost:3001/api/users/forgot-password-otp",
//         { email: forgotEmail }
//       );
//       setForgotMessage(res.data.message);
//       toggleAccount({ view: "otpReset" });
//     } catch (err) {
//       setForgotMessage(err.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   // ✅ Reset password using OTP
//   const resetPasswordWithOtp = async () => {
//     if (reset.newPassword !== reset.confirmPassword) {
//       return alert("Passwords do not match!");
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3001/api/users/reset-password-otp",
//         { email: forgotEmail, otp, newPassword: reset.newPassword, confirmPassword: reset.confirmPassword }
//       );
//       setResetMessage(res.data.message);
//       setLoading(false);
//       toggleAccount({ view: "login" });
//       setForgotEmail("");
//       setOtp("");
//       setReset({ newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       setLoading(false);
//       setResetMessage(err.response?.data?.message || "Failed to reset password");
//     }
//   };

//   return (
//     <>
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
//           <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             {/* LOGIN VIEW */}
//             {account.view === "login" && (
//               <>
//                 <h1 className="text-center text-3xl font-bold text-gray-800">
//                   Welcome Back
//                 </h1>
//                 <p className="text-center text-gray-500 mt-1 text-sm">
//                   Please login to continue
//                 </p>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email"
//                   onChange={onLoginChange}
//                   className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter Password"
//                   onChange={onLoginChange}
//                   className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />
//                 {error && (
//                   <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>
//                 )}

//                 <button
//                   onClick={loginUser}
//                   className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
//                 >
//                   Login
//                 </button>

//                 <p
//                   onClick={toggleForgotPassword}
//                   className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
//                 >
//                   Forgot Password?
//                 </p>

//                 <div className="flex items-center justify-center mt-6">
//                   <div className="h-px bg-gray-300 w-1/3"></div>
//                   <p className="text-gray-500 text-sm px-2">OR</p>
//                   <div className="h-px bg-gray-300 w-1/3"></div>
//                 </div>

//                 <p
//                   onClick={toggleSignup}
//                   className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
//                 >
//                   New here? Create an account
//                 </p>
//               </>
//             )}

//             {/* SIGNUP VIEW */}
//             {account.view === "signup" && (
//               <>
//                 <h1 className="text-center text-3xl font-bold text-gray-800">
//                   Create Account
//                 </h1>
//                 <p className="text-center text-gray-500 mt-1 text-sm">
//                   Fill in the details to sign up
//                 </p>

//                 <input
//                   type="text"
//                   name="firstname"
//                   placeholder="Enter First Name"
//                   onChange={onSignupChange}
//                   className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />
//                 <input
//                   type="text"
//                   name="lastname"
//                   placeholder="Enter Last Name"
//                   onChange={onSignupChange}
//                   className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email"
//                   onChange={onSignupChange}
//                   className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter Password"
//                   onChange={onSignupChange}
//                   className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />

//                 <button
//                   onClick={signupUser}
//                   className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
//                 >
//                   Continue
//                 </button>

//                 <p
//                   onClick={() => toggleAccount({ view: "login" })}
//                   className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
//                 >
//                   Already have an account? Log In
//                 </p>
//               </>
//             )}

//             {/* FORGOT PASSWORD VIA EMAIL + OTP */}
//             {account.view === "forgotEmail" && (
//               <>
//                 <h1 className="text-center text-2xl font-bold text-gray-800">
//                   Forgot Password
//                 </h1>
//                 <p className="text-center text-gray-500 mt-1 text-sm">
//                   Enter your email to receive OTP
//                 </p>

//                 <input
//                   type="email"
//                   placeholder="Enter Email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />

//                 {forgotMessage && (
//                   <p className="text-red-600 text-sm mt-2">{forgotMessage}</p>
//                 )}

//                 <button
//                   onClick={sendOtp}
//                   className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
//                 >
//                   Send OTP
//                 </button>

//                 <p
//                   onClick={() => toggleAccount({ view: "login" })}
//                   className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
//                 >
//                   Back to Login
//                 </p>
//               </>
//             )}

//             {/* OTP RESET VIEW */}
//             {account.view === "otpReset" && (
//               <>
//                 <h1 className="text-center text-2xl font-bold text-gray-800">
//                   Reset Password
//                 </h1>
//                 <p className="text-center text-gray-500 mt-1 text-sm">
//                   Enter OTP and new password
//                 </p>

//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
//                 />

//                 {/* New Password */}
//                 <div className="relative mt-4">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     placeholder="New Password"
//                     value={reset.newPassword}
//                     onChange={(e) =>
//                       setReset({ ...reset, newPassword: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showNewPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative mt-4">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm New Password"
//                     value={reset.confirmPassword}
//                     onChange={(e) =>
//                       setReset({ ...reset, confirmPassword: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showConfirmPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>

//                 {resetMessage && (
//                   <p
//                     className={`text-sm mt-2 ${
//                       resetMessage.includes("successful")
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {resetMessage}
//                   </p>
//                 )}

//                 <button
//                   onClick={resetPasswordWithOtp}
//                   disabled={loading}
//                   className={`mt-6 w-full ${
//                     loading
//                       ? "bg-orange-300"
//                       : "bg-orange-500 hover:bg-orange-600"
//                   } text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200`}
//                 >
//                   {loading ? "Updating..." : "Update Password"}
//                 </button>

//                 <p
//                   onClick={() => toggleAccount({ view: "login" })}
//                   className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
//                 >
//                   Back to Login
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// ✅ NEW

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { DataContext } from "../../Context/DataProvider";
import { authenticLogin, authenticsingup } from "../../Services/Api";
import { CART_SET } from "../../Redux/constants/CartConstans";

export default function LoginDialog({ open, setopen }) {
  const [account, toggleAccount] = useState({ view: "login" });
  const [signup, setSignup] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });

  // Forgot Password via OTP
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  // Reset password via OTP
  const [reset, setReset] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setopen(false);
    toggleAccount({ view: "login" });
    setError("");
    setForgotMessage("");
    setForgotEmail("");
    setOtp("");
    setReset({ newPassword: "", confirmPassword: "" });
    setResetMessage("");
    setLoading(false);
    setLogin({ email: "", password: "" });
  };

  const toggleSignup = () => toggleAccount({ view: "signup" });
  const toggleForgotPassword = () => toggleAccount({ view: "forgotEmail" });

  const onSignupChange = (e) =>
    setSignup({ ...signup, [e.target.name]: e.target.value });
  const onLoginChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const onResetChange = (e) =>
    setReset({ ...reset, [e.target.name]: e.target.value });

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

  const signupUser = async () => {
    const payload = {
      name: `${signup.firstname} ${signup.lastname}`.trim(),
      email: signup.email,
      password: signup.password,
    };
    try {
      const response = await authenticsingup(payload);
      if (response && response.status === 201) {
        localStorage.setItem("account", payload.name);
        setAccount(payload.name);
        handleClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // const loginUser = async () => {
  //   try {
  //     setError(""); // Clear previous errors
  //     console.log("Login payload ->", login);

  //     const response = await authenticLogin(login);
  //     if (response && response.status === 200) {
  //       const { token, name, role, status } = response.data.data;

  //       if (status === "blocked") {
  //         setError("Your account has been blocked");
  //         return;
  //       }

  //       // Save login data
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("account", name);
  //       localStorage.setItem("role", role);
  //       localStorage.setItem("status", status);

  //       setAccount(name);

  //       // Fetch user cart after login
  //       localStorage.removeItem("cartItems");
  //       dispatch({ type: CART_SET, payload: [] });
  //       await fetchUserCart(token);

  //       handleClose();
  //       navigate("/");
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed");
  //   }
  // };

  const loginUser = async () => {
  try {
    setError("");

    const response = await authenticLogin(login);

    // HTTP status check
    if (response.status === 200) {
      const userData = response.data.data;

      if (!userData) {
        setError("Invalid response from server.");
        return;
      }

      const { token, name, role, status } = userData;

      if (status === "blocked") {
        setError("Your account has been blocked");
        return;
      }

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("account", name);
      localStorage.setItem("role", role);
      localStorage.setItem("status", status);

      setAccount(name);

      // Clear old cart
      localStorage.removeItem("cartItems");
      dispatch({ type: CART_SET, payload: [] });

      // Fetch cart after login
      await fetchUserCart(token);

      handleClose();
      navigate("/");
    }
  } catch (err) {
    console.log("Login Error:", err);
    setError(err.response?.data?.message || "Login failed");
  }
};


  // ✅ Send OTP to user's email
  const sendOtp = async () => {
    if (!forgotEmail) {
      setForgotMessage("Please enter your email");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/forgot-password-otp",
        { email: forgotEmail }
      );
      setForgotMessage(res.data.message);
      toggleAccount({ view: "otpReset" });
    } catch (err) {
      setForgotMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // ✅ Reset password using OTP
  const resetPasswordWithOtp = async () => {
    if (reset.newPassword !== reset.confirmPassword) {
      return alert("Passwords do not match!");
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/reset-password-otp",
        {
          email: forgotEmail,
          otp,
          newPassword: reset.newPassword,
          confirmPassword: reset.confirmPassword,
        }
      );

      setResetMessage(res.data.message);
      setLoading(false);

      // Clear reset states
      setForgotEmail("");
      setOtp("");
      setReset({ newPassword: "", confirmPassword: "" });

      // Go back to login view after successful reset
      toggleAccount({ view: "login" });
      setError("Password reset successful. Please login with new password.");
    } catch (err) {
      setLoading(false);
      setResetMessage(err.response?.data?.message || "Failed to reset password");
    }
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

            {/* LOGIN VIEW */}
            {account.view === "login" && (
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
                  value={login.email}
                  onChange={onLoginChange}
                  className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={login.password}
                  onChange={onLoginChange}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />
                {error && (
                  <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>
                )}

                <button
                  onClick={loginUser}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                  Login
                </button>

                <p
                  onClick={toggleForgotPassword}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  Forgot Password?
                </p>

                <p
                  onClick={toggleSignup}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  New here? Create an account
                </p>
              </>
            )}

            {/* SIGNUP VIEW */}
            {account.view === "signup" && (
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

            {/* FORGOT PASSWORD VIEW */}
            {account.view === "forgotEmail" && (
              <>
                <h1 className="text-center text-2xl font-bold text-gray-800">
                  Forgot Password
                </h1>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Enter your email to receive OTP
                </p>

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="mt-6 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />

                {forgotMessage && (
                  <p className="text-red-600 text-sm mt-2">{forgotMessage}</p>
                )}

                <button
                  onClick={sendOtp}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                  Send OTP
                </button>

                <p
                  onClick={() => toggleAccount({ view: "login" })}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  Back to Login
                </p>
              </>
            )}

            {/* OTP RESET VIEW */}
            {account.view === "otpReset" && (
              <>
                <h1 className="text-center text-2xl font-bold text-gray-800">
                  Reset Password
                </h1>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Enter OTP and new password
                </p>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700"
                />

                {/* New Password */}
                <div className="relative mt-4">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={reset.newPassword}
                    onChange={(e) =>
                      setReset({ ...reset, newPassword: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mt-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={reset.confirmPassword}
                    onChange={(e) =>
                      setReset({ ...reset, confirmPassword: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-700 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {resetMessage && (
                  <p
                    className={`text-sm mt-2 ${
                      resetMessage.includes("successful")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {resetMessage}
                  </p>
                )}

                <button
                  onClick={resetPasswordWithOtp}
                  disabled={loading}
                  className={`mt-6 w-full ${
                    loading
                      ? "bg-orange-300"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200`}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>

                <p
                  onClick={() => toggleAccount({ view: "login" })}
                  className="text-center text-blue-600 font-semibold cursor-pointer hover:underline mt-4"
                >
                  Back to Login
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
