import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Progress() {
  const [lastScore, setLastScore] = useState(0);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Last score & username localStorage se nikalna
    const storedUser = localStorage.getItem("loggedInUser");
    const storedScore = localStorage.getItem("lastScore");

    if (storedUser) setUsername(storedUser);
    if (storedScore) setLastScore(storedScore);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Progress Report</h1>
      <p>
        <strong>{username}</strong>, your last score was:{" "}
        <strong>{lastScore}</strong>
      </p>

      <button
        onClick={() => navigate("/leaderboard")}
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        View Leaderboard
      </button>
    </div>
  );
}
