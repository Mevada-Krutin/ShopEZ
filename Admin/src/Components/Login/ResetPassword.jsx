// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const [form, setForm] = useState({
//     username: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.newPassword !== form.confirmPassword) {
//       alert("❌ Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3001/api/admin/forgot-password", {
//         username: form.username,
//         newPassword: form.newPassword,
//       });

//       alert(res.data.message);
//       navigate("/"); // redirect back to login
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>
//         <p className="text-center text-gray-500 text-sm">
//           Enter your username and set a new password
//         </p>

//         {/* Username */}
//         <div>
//           <label className="block text-gray-700 mb-1">Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>

//         {/* New Password */}
//         <div>
//           <label className="block text-gray-700 mb-1">New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             placeholder="Enter new password"
//             value={form.newPassword}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <label className="block text-gray-700 mb-1">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm new password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-[1.02] active:scale-95"
//         >
//           Update Password
//         </button>

//         {/* Back to login */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Remember your password?{" "}
//           <span
//             onClick={() => navigate("/")}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Back to Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [form, setForm] = useState({ otp: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Email passed from ForgotPassword

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/api/admin/reset-password-otp", {
        email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      alert(res.data.message);
      navigate("/"); // back to login
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm">
          Enter OTP and your new password
        </p>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        {message && <p className="text-red-600 text-sm mt-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
