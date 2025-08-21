import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    // Sort by highest score, then shortest time
    storedScores.sort((a, b) => {
      if (b.score === a.score) {
        return a.timeTakenMinutes - b.timeTakenMinutes;
      }
      return b.score - a.score;
    });
    setScores(storedScores);
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h1>Leaderboard 🏆</h1>
        <p className="subtitle">Top Performers of Quiz</p>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Time (min)</th>
              <th>Date</th>
              <th>Wrong Questions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.subject}</td>
                <td>
                  {player.score}/{player.totalMarks}
                </td>
                <td>{player.timeTakenMinutes}</td>
                <td>{player.date}</td>
                <td>
                  {player.wrongQuestions &&
                  player.wrongQuestions.length > 0 ? (
                    <details>
                      <summary>View</summary>
                      <ul>
                        {player.wrongQuestions.map((wq, i) => (
                          <li key={i}>
                            <strong>Q:</strong> {wq.question} <br />
                            <strong>Your Ans:</strong> {wq.yourAnswer} <br />
                            <strong>Correct:</strong> {wq.correctAnswer}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    "✔ All Correct"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

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
      </div>
    </div>
  );
}
