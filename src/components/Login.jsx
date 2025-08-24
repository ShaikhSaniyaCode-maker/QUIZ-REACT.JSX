import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // username or phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) =>
        (u.username === identifier.trim() || u.phone === identifier.trim()) &&
        u.password === password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", validUser.username);
      navigate("/SubjectSelection");
    } else {
      alert("⚠️ Invalid username/phone or password");
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
            placeholder="👤 Username or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <div className="waves">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,50 C150,150 350,-50 500,50 L500,150 L0,150 Z" style={{ fill: "#b88cff" }} />
            <path d="M0,80 C200,150 300,-30 500,80 L500,150 L0,150 Z" style={{ fill: "#8a4fff" }} />
            <path d="M0,110 C250,150 300,-10 500,110 L500,150 L0,150 Z" style={{ fill: "#6c47ff" }} />
          </svg>
        </div>
        <p className="note">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}
