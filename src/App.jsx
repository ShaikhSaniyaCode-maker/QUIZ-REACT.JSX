// import { Routes, Route } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import SubjectSelection from "./components/SubjectSelection";
// import Quiz from "./components/Quiz";

// export default function App() {
//   return (
//     <Routes>
//       {/* Default route */}
//       <Route path="/" element={<Signup />} />

//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/subjects" element={<SubjectSelection />} />
//       <Route path="/quiz/:subject" element={<Quiz />} />
//     </Routes>
//   );
// }
import Leaderboard from "./components/Leaderboard";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SubjectSelection from "./components/SubjectSelection";
import Quiz from "./components/Quiz";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subjects" element={<SubjectSelection />} />
      <Route path="/quiz/:subject" element={<Quiz />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}
