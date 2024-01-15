import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Create from "./components/Create";
import Redirect from "./components/Redirect";


function App() {
  return (
    <Router>
      <Routes>
        <Route index element = {<Create/>} ></Route>
        <Route path='/:id' element = {<Redirect/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
