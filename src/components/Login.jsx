import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", username);
      navigate("/subjects"); // redirect to subject selection page
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Welcome Back!</h1>
        <p className="subtitle">Login to continue your quiz journey 🚀</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="👤 Student Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔑 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit">Login 🚀</button>
        </form>

        {/* Waves at bottom */}
        <div className="waves">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#b88cff" }}
            />
            <path
              d="M0.00,79.98 C200.00,150.00 300.00,-30.00 500.00,79.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#8a4fff" }}
            />
            <path
              d="M0.00,109.98 C250.00,150.00 300.00,-10.00 500.00,109.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#6c47ff" }}
            />
          </svg>
        </div>

        {/* Note ABOVE waves */}
        <p className="note">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}
