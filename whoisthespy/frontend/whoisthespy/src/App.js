import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Launcher from "./components/Launcher/Launcher";
import NoPage from "./components/NoPage";
import Game from "./components/Game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<Launcher />} />
        <Route path="/game/:roomId" element={<Game />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
