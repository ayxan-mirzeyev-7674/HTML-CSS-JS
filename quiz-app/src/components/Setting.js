import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Setting.css";
import { useState } from "react";
import Quiz from "./Quiz";
import { Route , Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Setting(props) {

    const [number, setNumber] = useState(10);
    const [category, setCategory] = useState("any");
    const [difficulty, setDifficulty] = useState("any");
    const [type, setType] = useState("any");

    const navigate = useNavigate();

    const submit = (e) => {
        let API_KEY = "https://opentdb.com/api.php?";
        e.preventDefault();
        API_KEY += "amount=" + number;
        if(category != "any") {
            API_KEY += "&category=" + category;
        }
        if(difficulty != "any") {
            API_KEY += "&difficulty=" + difficulty;
        }
        if(type != "any") {
            API_KEY += "&type=" + type;
        }
        API_KEY += "&encode=base64";
        console.log(API_KEY);
        try {
            fetch(API_KEY)
            .then((res) => res.json())
            .then((data) => lastStep(data));
        } catch (e) {console.log(e);}
    };

    const lastStep = (data) => {
        navigate("quiz",{state : {questions : JSON.stringify(data.results)}});
    }

    
  return (
    <div style={{top: "50%", transform : "translate(-50%,-50%)"}} className="main">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control onChange={(e) => {setNumber(e.target.value)}} type="number" max={50} min={1} defaultValue={10} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="13">
          <Form.Label>Select Category</Form.Label>
          <Form.Select onChange={(e) => {setCategory(e.target.value)}} aria-label="Default select example">
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="2">
          <Form.Label>Select Difficulty</Form.Label>
          <Form.Select onChange={(e) => {setDifficulty(e.target.value)}} aria-label="Default select example">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>{" "}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="3">
          <Form.Label>Select Type</Form.Label>
          <Form.Select onChange={(e) => {setType(e.target.value)}} aria-label="Default select example">
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>{" "}
          </Form.Select>
        </Form.Group>
        <Button style={{textTransform : "initial",width : "100%"}} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Setting;
