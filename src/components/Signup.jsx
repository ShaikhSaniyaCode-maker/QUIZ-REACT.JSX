import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && phone && password) {
      // Phone number validation
      if (!/^\d{10}$/.test(phone)) {
        alert("⚠️ Please enter a valid 10-digit phone number!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Duplicate phone check
      if (users.find((u) => u.phone === phone)) {
        alert("⚠️ Phone number already registered!");
        return;
      }

      users.push({ username, phone, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("🎉 Signup successful! Please login to continue.");
      onSignup && onSignup();
      navigate("/login");
    } else {
      alert("⚠️ Please fill all fields!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>🚀 Join the Ultimate Quiz Challenge!</h1>
        <p className="subtitle">Compete. Learn. Win. 🏆</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="👤 Student Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="tel"
            placeholder="📱 Student Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔑 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit">Start Quiz 🚀</button>
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

        {/* Note text ABOVE waves */}
        <p className="note">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
