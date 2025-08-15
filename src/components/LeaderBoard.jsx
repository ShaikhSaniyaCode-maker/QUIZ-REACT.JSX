import { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    // Sort by highest score, then shortest time
    storedScores.sort((a, b) => {
      if (b.score === a.score) {
        return a.timeTakenMinutes - b.timeTakenMinutes; // both are numbers now
      }
      return b.score - a.score;
    });
    setScores(storedScores);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Score</th>
            <th>Time (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.subject}</td>
              <td>{player.score}/{player.totalQuestions}</td>
              <td>{player.timeTakenMinutes}</td>
              <td>{player.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}