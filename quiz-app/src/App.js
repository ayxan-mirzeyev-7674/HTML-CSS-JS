import "./App.css";
import Setting from "./components/Setting";
import Quiz from "./components/Quiz";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from "./components/Result";

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route index element={<Setting />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="*" element={<Setting />} />
            <Route path="results" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
