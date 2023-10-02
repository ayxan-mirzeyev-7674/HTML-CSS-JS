import "./Results.css";
import Alert from "react-bootstrap/Alert";

function Result(props) {
  const data = props.data;
  return (
    <>
      <div className="box">
        <div className="ques">{data.question}</div>
        <div className="res-variants">
          {data.answer == data.correct_answer ? (
            data.variants.map((item) => {
              return (
                <Alert className="res-variant" variant={item == data.correct_answer ? "success" : "secondary"}>
                  {item}
                </Alert>
              );
            })
          ) : (
            data.variants.map((item) => {
              return (
                <Alert className="res-variant" variant={item == data.correct_answer ? "success" : item == data.answer ? "danger" : "secondary"}>
                  {item}
                </Alert>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Result;
