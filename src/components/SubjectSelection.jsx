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
          <button className="subject-btn physics" onClick={() => handleSelect("physics")}>
            ⚛️ Physics
          </button>
          <button className="subject-btn chemistry" onClick={() => handleSelect("chemistry")}>
            🧪 Chemistry
          </button>
        </div>
      </div>
    </div>
  );
}
