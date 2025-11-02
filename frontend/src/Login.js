import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      alert(res.data.message || "✅ Login successful!");
      localStorage.setItem("loggedUser", res.data.username);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "❌ Invalid login credentials");
    }
  };

  // 📝 Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      alert(res.data.message || "✅ Registration successful!");
      setIsLogin(true);
      setUsername("");
      setPassword("");
    } catch (err) {
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
