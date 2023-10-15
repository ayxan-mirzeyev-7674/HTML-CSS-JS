import { useEffect, useState , useRef } from "react";
import "./App.css";

function App() {
  // X = 1 , Empty = 0, O = -1

  const [vars] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const ref = useRef(null);
  const [bar, setBar] = useState(null)

  useEffect(() => {
    setBar(ref.current);
  }, []);

  const clicked = (e, index) => {
    e.preventDefault();
    if (!winner) {
      if (!(e.target.classList.length > 1)) {
        if (turn === 1) {
          e.target.classList.add("x");
          vars[index] = turn;
          setTurn(-1);
        } else {
          e.target.classList.add("o");
          vars[index] = turn;
          setTurn(1);
        }
      }
      check();
    }
  };

  const check = () => {
    if (areEqual(vars.slice(0, 3))) {
      setWinner(vars[0]);
      bar.style.display = "block";
      bar.classList.add("top-horizantal");
    }
    if (areEqual(vars.slice(3, 6))) {
      setWinner(vars[3]);
      bar.style.display = "block";
      bar.classList.add("mid-horizantal");
    }
    if (areEqual(vars.slice(6, 9))) {
      setWinner(vars[6]);
      bar.style.display = "block";
      bar.classList.add("bot-horizantal");
    }
    if (areEqual([vars[0],vars[3],vars[6]])) {
      setWinner(vars[0]);
      bar.style.display = "block";
      bar.classList.add("left-vertical");
    }
    if (areEqual([vars[1],vars[4],vars[7]])) {
      setWinner(vars[1]);
      bar.style.display = "block";
      bar.classList.add("mid-vertical");
    }
    if (areEqual([vars[2],vars[5],vars[8]])) {
      setWinner(vars[2]);
      bar.style.display = "block";
      bar.classList.add("right-vertical");
    }
    if (areEqual([vars[0],vars[4],vars[8]])) {
      setWinner(vars[0]);
      bar.style.display = "block";
      bar.classList.add("cross-1");
    }
    if (areEqual([vars[2],vars[4],vars[6]])) {
      setWinner(vars[2]);
      bar.style.display = "block";
      bar.classList.add("cross-2");
    }
  };

  useEffect(() => {
    if(winner){
      console.log(winner === 1 ? "X won!" : "O won!");
    }
  }, [winner])

  function areEqual(array) {
    var len = array.length;
    for (var i = 1; i < len; i++) {
      if (array[i] === null || array[i] !== array[i - 1]) return false;
    }
    return true;
  }

  return (
    <>
      <div
        className="background"
        style={{ width: "100%", backgroundColor: "black" }}
      >
        <div className="main">
          <div ref={ref} id="bar"></div>
          <div className="grid-container">
            <button
              onClick={(e) => {
                clicked(e, 0);
              }}
              className="grid-item"
              style={{ borderRadius: "10% 0 0 0" }}
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 1);
              }}
              className="grid-item"
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 2);
              }}
              className="grid-item"
              style={{ borderRadius: "0 10% 0 0" }}
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 3);
              }}
              className="grid-item"
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 4);
              }}
              className="grid-item"
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 5);
              }}
              className="grid-item"
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 6);
              }}
              className="grid-item"
              style={{ borderRadius: "0 0 0 10%" }}
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 7);
              }}
              className="grid-item"
            ></button>
            <button
              onClick={(e) => {
                clicked(e, 8);
              }}
              className="grid-item"
              style={{ borderRadius: "0 0 10% 0" }}
            ></button>
          </div>
          {winner ? (<div className="res">{winner === 1 ? "X won!" : "O won!"}</div>) : (<></>)}
        </div>
      </div>
      
    </>
  );
}

export default App;
