import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterAdmin = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/create",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      // Save token → auto login
      if (res.data.token) {
        localStorage.setItem("admin-token", res.data.token);
        localStorage.setItem("role", "admin");
      }

      alert("✅ Admin account created successfully!");
      navigate("/admin/dashboard"); // ⬅️ Redirect directly to dashboard
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Admin Account
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform"
        >
          Register
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/adminLogin" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterAdmin;
