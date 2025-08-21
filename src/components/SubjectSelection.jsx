import { useNavigate } from "react-router-dom";
import "./SubjectSelection.css";

export default function SubjectSelection() {
  const navigate = useNavigate();

  const handleSelect = (subject) => {
    navigate(`/quiz/${subject}`);
  };

  return (
    <div className="subject-container">
      <div className="subject-card">
        <h1>📚 Choose Your Subject</h1>
        <p className="subtitle">Get ready to test your knowledge! 🚀</p>

        <div className="button-group">
          <button
            className="subject-btn physics"
            onClick={() => handleSelect("physics")}
          >
            ⚛️ Physics
          </button>
          <button
            className="subject-btn chemistry"
            onClick={() => handleSelect("chemistry")}
          >
            🧪 Chemistry
          </button>
        </div>

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
