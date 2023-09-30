import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoPage from "./components/NoPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
