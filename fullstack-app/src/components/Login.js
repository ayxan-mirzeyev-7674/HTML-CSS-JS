import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (formValid()) {
      console.log(username + " " + password);
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      try {
        fetch("http://192.168.31.94/fullstack-php/login.php", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            answer(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const answer = (data) => {
    if (data.status == true){
      localStorage.setItem("token", username);
      alert("True");
    } else { 
      alert("Wrong");
    }
  }

  const formValid = () => {
    return username.length > 0 && password.length > 0;
  };
  return (
    <div className="main">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button disabled={!formValid()} variant="primary" type="submit">
          Submit
        </Button>
        <Button href="../register" style={{marginLeft: "10px"}} variant="outline-secondary">
          Don't have an account?
        </Button>
      </Form>
    </div>
  );
}

export default Login;
