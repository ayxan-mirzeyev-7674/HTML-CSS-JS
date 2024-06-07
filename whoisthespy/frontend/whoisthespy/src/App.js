import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketContext, socket } from "./components/context";
import Launcher from "./components/Launcher/Launcher";
import NoPage from "./components/NoPage";
import Game from "./components/Game/Game";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route index path="/start" element={<Launcher />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
