import './App.css';
import Movie from './components/Movie';
import Detailed from './components/Detailed';
import {Routes, Route, useNavigate} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/detailed/:id" element={<Detailed />} />
          <Route path="/" element={<Movie />} />
        </Routes>
    </div>
  );
}

export default App;
