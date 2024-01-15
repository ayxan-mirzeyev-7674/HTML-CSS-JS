import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [id, setId] = useState(null);
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const success = (st_name) => {
    localStorage.setItem("token", JSON.stringify({name: st_name, id: id, group: group}));
    navigate("/");
  }

  const submit = (e) => {
    e.preventDefault();
    if (id !== null && id !== "" && group !== null && group !== "0") {
      fetch(
        "http://192.168.31.94:5000/get_student_name?st_id=" + id + "&group=" + group
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if(data.student_name){
            console.log("Student Name:", data.student_name);
            success(data.student_name);
          }else if(data.error){
            console.log("Error:", data.error);
            setError(data.error);
          }

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div
      className="main"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Form
        onSubmit={submit}
        className="form"
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "15px",
          backgroundColor: "white"
        }}
      >
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>ID</Form.Label>
          <Form.Control
            onInput={(e) => {
              setId(e.target.value);
            }}
            type="text"
            placeholder="Enter you ID"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="group">
          <Form.Label>Group</Form.Label>
          <Form.Select
            onInput={(e) => {
              setGroup(e.target.value);
            }}
            aria-label="Group"
          >
            <option value="0" >Select your group</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </Form.Select>
        </Form.Group>
        <p style={{fontSize : "15px", color: "darkred"}}>{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
