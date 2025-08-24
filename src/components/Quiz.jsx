import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { physicsHardQuestions, chemistryHardQuestions } from "../Question.jsx";
import "./Quiz.css";

// Helper: shuffle and pick random questions
function getRandomQuestions(allQuestions, count = 10) {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Quiz() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);

  // Initialize questions & start time
  useEffect(() => {
    let allQuestions = [];
    if (subject === "physics") allQuestions = physicsHardQuestions;
    else if (subject === "chemistry") allQuestions = chemistryHardQuestions;

    const randomQuestions = getRandomQuestions(allQuestions);
    setQuestions(randomQuestions);
    setStartTime(Date.now());
  }, [subject]);

  const currentQuestion = questions[currentIndex];

  // Load previously selected option if user navigates back
  useEffect(() => {
    if (answers[currentIndex] !== undefined) {
      setSelectedOption(answers[currentIndex]);
    } else {
      setSelectedOption(null);
    }
  }, [currentIndex, answers]);

  if (!currentQuestion) return <div>Loading...</div>;

  const handleNext = () => {
    if (selectedOption === null) {
      const userName = localStorage.getItem("loggedInUser") || "Guest";
      alert(`${userName}, please attempt this question first!`);
      return;
    }

    const updatedAnswers = { ...answers, [currentIndex]: selectedOption };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz complete
      const endTime = Date.now();
      const timeTakenMinutes = Number(
        ((endTime - startTime) / 60000).toFixed(2)
      );

      // ✅ Score calculation (2 marks per correct answer) + wrong questions
      let score = 0;
      let wrongQuestions = [];

      questions.forEach((q, index) => {
        if (updatedAnswers[index] === q.answer) {
          score += 2;
        } else {
          wrongQuestions.push({
            question: q.question,
            yourAnswer: updatedAnswers[index] || "Not Attempted",
            correctAnswer: q.answer,
          });
        }
      });

      const resultData = {
        name: localStorage.getItem("loggedInUser") || "Guest",
        subject,
        score,
        totalMarks: questions.length * 2, // ✅ total marks instead of totalQuestions
        timeTakenMinutes,
        date: new Date().toLocaleDateString("en-GB"),
        wrongQuestions, // ✅ store wrong questions
      };

      // Save last score
      localStorage.setItem("lastScore", score);

      // Update leaderboard
      const leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push(resultData);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      navigate("/leaderboard");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Heading */}
        <h2>
          Question {currentIndex + 1} of {questions.length}
          <p className="note">Best of Luck! 🎯</p>
        </h2>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <h3 className="question-text">
          {currentIndex + 1}. {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="options">
          {currentQuestion.options.map((opt, i) => (
            <label key={i} className="option-label">
              <input
                type="radio"
                name="option"
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="navigation-buttons">
          {currentIndex > 0 && (
            <button className="prev-btn" onClick={handlePrevious}>
              ← Previous
            </button>
          )}
          <button className="submit-btn" onClick={handleNext}>
            {currentIndex < questions.length - 1
              ? "Submit →"
              : "Finish Quiz"}
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
