import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;

    // fake logIn success
    // navigate("/home");
    api.post("/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (!err.response) {
          alert("Server unreachable. Make sure backend is running: cd backend && npm start");
        } else {
          alert(err.response.data?.error || "Invalid login");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <form
        onSubmit={handleLogIn}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8">
          LogIn to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password "
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-200 transition"
        >
          LogIn
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-white cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>

    </div>
  );
};

export default Login;
