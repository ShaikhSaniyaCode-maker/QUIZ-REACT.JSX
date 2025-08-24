import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername && trimmedPhone && trimmedPassword) {
      if (!/^\d{10}$/.test(trimmedPhone)) {
        alert("⚠️ Please enter a valid 10-digit phone number!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find((u) => u.phone === trimmedPhone)) {
        alert("⚠️ Phone number already registered!");
        return;
      }

      users.push({ username: trimmedUsername, phone: trimmedPhone, password: trimmedPassword });
      localStorage.setItem("users", JSON.stringify(users));
      alert("🎉 Signup successful! Please login.");
      navigate("/login");
      onSignup && onSignup();
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
            required
          />
          <input
            type="tel"
            placeholder="📱 Student Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit">Start Quiz 🚀</button>
        </form>

        <div className="waves">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,50 C150,150 350,-50 500,50 L500,150 L0,150 Z" style={{ fill: "#b88cff" }} />
            <path d="M0,80 C200,150 300,-30 500,80 L500,150 L0,150 Z" style={{ fill: "#8a4fff" }} />
            <path d="M0,110 C250,150 300,-10 500,110 L500,150 L0,150 Z" style={{ fill: "#6c47ff" }} />
          </svg>
        </div>

        <p className="note">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
