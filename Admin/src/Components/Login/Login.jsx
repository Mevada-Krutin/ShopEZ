import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/admin/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("auth-token", res.data.token);
      localStorage.setItem("role", "admin");
      alert("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
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

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          required
        />

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
  );
};

export default Login;
