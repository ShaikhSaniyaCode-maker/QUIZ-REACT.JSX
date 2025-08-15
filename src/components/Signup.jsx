import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // NEW

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && phone && password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ username, phone, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("🎉 Signup successful! Please login to continue.");
      onSignup && onSignup();
      navigate("/login"); // redirect to login page
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

        <p className="note">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
