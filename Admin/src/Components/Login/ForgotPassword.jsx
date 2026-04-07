// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setMessage("Please enter your email");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:3001/api/admin/forgot-password-otp", { email });
//       setMessage(res.data.message);
//       // Redirect to reset password page, passing email in state
//       navigate("/reset-password", { state: { email } });
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
//       <form
//         onSubmit={handleSendOtp}
//         className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800">Forgot Password</h2>
//         <p className="text-center text-gray-500 text-sm">
//           Enter your email to receive OTP
//         </p>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           required
//         />

//         {message && <p className="text-red-600 text-sm mt-2">{message}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
//         >
//           Send OTP
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

// ✅ New CODE for SIMPLE FORGOT-PASS
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminForgotPassword = () => {
  const [form, setForm] = useState({
    username: "",
    resetKey: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/reset-password",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || "Password reset successful!");
      navigate("/adminLogin");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Password Reset
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Admin Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Secret Reset Key */}
        <input
          type="text"
          placeholder="Secret Reset Key"
          value={form.resetKey}
          onChange={(e) => setForm({ ...form, resetKey: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* New Password */}
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Reset Password
        </button>

        <p className="text-center text-gray-600 text-sm">
          Back to login?{" "}
          <Link to="/adminLogin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminForgotPassword;

