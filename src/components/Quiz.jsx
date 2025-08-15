import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { physicsQuestions, chemistryQuestions } from "../Question.jsx";
import "./Quiz.css";

export default function Quiz() {
  const { subject } = useParams();
  const navigate = useNavigate();
  let questions = [];

  if (subject === "physics") {
    questions = physicsQuestions;
  } else if (subject === "chemistry") {
    questions = chemistryQuestions;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);

  const currentQuestion = questions[currentIndex];

  // Quiz start time set karna
  useEffect(() => {
    const now = Date.now();
    setStartTime(now);
  }, [subject]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const updatedAnswers = {
      ...answers,
      [currentIndex]: selectedOption,
    };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // Quiz complete
      const endTime = Date.now();
      const timeTakenMinutes = Number(((endTime - startTime) / 60000).toFixed(2));

      // Score calculate
      let score = 0;
      questions.forEach((q, index) => {
        if (updatedAnswers[index] === q.answer) score++;
      });

      const resultData = {
        name: localStorage.getItem("loggedInUser") || "Guest",
        subject,
        score,
        totalQuestions: questions.length,
        timeTakenMinutes,
        date: new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
      };

      // Last score save for progress page
      localStorage.setItem("lastScore", score);

      // Leaderboard save
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push(resultData);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      // Leaderboard pe le jao
      navigate("/leaderboard");
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3 className="question-text">
        {currentIndex + 1}. {currentQuestion.question}
      </h3>
      <p className="supporting-text">Supporting Text</p>

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

      <button className="submit-btn" onClick={handleNext}>
        {currentIndex < questions.length - 1
          ? "Submit & Continue →"
          : "Finish Quiz"}
      </button>
    </div>
  );
}
