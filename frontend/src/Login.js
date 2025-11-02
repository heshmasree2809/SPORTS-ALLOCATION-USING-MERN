import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import API_BASE_URL from "./api"; // ✅ Import the base URL

function Login() {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
=======
      const res = await axios.post("https://sports-allocation-using-mern-4.onrender.com/api/auth/login", {
>>>>>>> d9a2e99ca60911e85e6f52d63a1b12d42281fcdb
        username,
        password,
      });
      alert(res.data.message || "✅ Login successful!");
      localStorage.setItem("loggedUser", res.data.username);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "❌ Invalid login credentials");
    }
  };

  // 📝 Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
=======
      const res = await axios.post("https://sports-allocation-using-mern-4.onrender.com/api/auth/register", {
>>>>>>> d9a2e99ca60911e85e6f52d63a1b12d42281fcdb
        username,
        password,
      });
      alert(res.data.message || "✅ Registration successful!");
      setIsLogin(true);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "❌ Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form
        className="login-form"
        onSubmit={isLogin ? handleLogin : handleSignup}
      >
        <input
          type="text"
          placeholder="Username (without @gmail.com)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <div className="toggle-form">
        {isLogin ? (
          <p>
            Don’t have an account?{" "}
            <span className="toggle-link" onClick={() => setIsLogin(false)}>
              Sign up here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="toggle-link" onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
