import { useLocation } from "react-router-dom";
import { MDBRadio, MDBBtnGroup } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import "./Quiz.css";
import Result from "./Result";

function Quiz() {
  const location = useLocation();
  const questions = JSON.parse(location.state.questions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [variants, setVariants] = useState([]);
  const [corrects, setCorrects] = useState(0);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([])

  useEffect(() => {
    if (atob(currentQuestion.type) === "multiple") {
      let variantsx = currentQuestion.incorrect_answers.map((item) =>
        atob(item)
      );
      variantsx.push(atob(currentQuestion.correct_answer));
      variantsx.sort(() => Math.random() - 0.5);
      setVariants(variantsx);
    } else {
      setVariants(["True", "False"]);
    }
  }, [currentQuestion]);

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
  }, [currentIndex]);

  const click = (value) => {
    setCurrentVariant(value);
  };

  const submit = (e) => {
    e.preventDefault();
    setResults((item) => {
      return ([...item, {question: atob(currentQuestion.question), correct_answer: atob(currentQuestion.correct_answer), variants : variants, answer : currentVariant}]);
    });
    if (currentVariant) {
      if (currentVariant === atob(currentQuestion.correct_answer)) {
        console.log("True");
        setCorrects((item) => item + 1);
      } else {
        console.log("False");
      }
      if (currentIndex != questions.length - 1) {
        setCurrentIndex((item) => item + 1);
        setVariants([]);
        setCurrentVariant(null);
      } else {
        console.log("Finished! Correct answers: " + corrects);
        console.log(results);
        setFinished(true);
      }
    }
  };

  return (
    <>
      <div style={!finished ? { minWidth : "320px", top: "50%" , transform : "translate(-50%,-50%)" } : {minWidth : "320px"}} className="main">
        {!finished ? (
          <>
            <p>{atob(currentQuestion.question)}</p>
            <div className="variants">
              <MDBBtnGroup>
                {variants.map((variant) => {
                  return (
                    <MDBRadio
                      btn
                      btnColor="light"
                      id={variant}
                      name="options"
                      wrapperTag="div"
                      label={variant}
                      labelClass="variant"
                      value={variant}
                      onClick={(e) => click(e.target.value)}
                    />
                  );
                })}
              </MDBBtnGroup>
            </div>
            <hr />
            <div className="footer">
              <div className="index">
                <b>{currentIndex + 1}</b> of <b>{questions.length}</b> Questions
              </div>
              <Button
                disabled={!currentVariant}
                onClick={submit}
                style={{ textTransform: "initial", marginLeft: "auto" }}
                variant="primary"
                type="submit"
              >
                Next Question
              </Button>
            </div>
          </>
        ) : (
          <><h1>You answered {corrects}/{questions.length} correctly.</h1>
          {results.map((item) => {
            return (<Result data = {item}  />)
          })}
          <Button
                onClick={(e) => {e.preventDefault(); window.location.href = "./setting"}}
                style={{ textTransform: "initial", width: "100%"}}
                variant="success"
                type="submit"
              >Restart</Button></>
        )}
      </div>
    </>
  );
}

export default Quiz;
