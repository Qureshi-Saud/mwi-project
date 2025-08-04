import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../assets/login-bg.png";

function Login() {
  const navigate = useNavigate();
  const { token, login } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-transparent-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/30"
      >
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          ADMIN LOGIN
        </h1>

        {error && (
          <p className="text-red-300 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-white/70" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-white/70" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              autoComplete="current-password"
              disabled={loading}
            />
            <div
              className={`absolute right-3 top-3 text-white/70 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (!loading) setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1.0 : 1.03 }}
            whileTap={{ scale: loading ? 1.0 : 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg shadow-md transition ${
              loading
                ? "bg-white/40 text-indigo-300 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-gray-100"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
