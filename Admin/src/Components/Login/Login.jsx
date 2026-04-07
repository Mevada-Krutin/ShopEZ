import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/admin/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("admin-token", res.data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Logo on top-left */}
      <div className="p-4">
  <img src="/logo.jpg" alt="Logo" className="w-28 h-auto rounded-3xl" />
</div>

      {/* Centered login form */}
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-full max-w-md transform transition-all hover:scale-[1.02]"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Admin Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            required
          />

          <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register-admin"
              className="text-green-600 hover:underline"
            >
              Create Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-[1.02] active:scale-95"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm">
            Only authorized admins can access the dashboard.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
