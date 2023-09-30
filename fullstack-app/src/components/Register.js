import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from "react";
import Feedback from 'react-bootstrap/Feedback'


import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);


  const submit = (e) => {
    e.preventDefault();
    if (formValid()) {
      console.log(username + " " + password);
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      try {
        fetch("http://192.168.31.94/fullstack-php/register.php", {
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
    if (data.status === "TAKEN"){
      setUsernameError(true);
    }
    if (data.status === true){
      setUsernameError(false);
      setRegisterStatus(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {window.location.href = "../login"},2000)
    }
  };

  const formValid = () => {
    return username.length > 0 && password.length > 0 && email.length > 0;
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
            isInvalid = {usernameError}
          />
          <p className={"error"} style={!usernameError ? {display : "none"} : {display : "block"}}>Username is already taken.</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" required/>
        </Form.Group>
        <Button disabled={!formValid()} variant="primary" type="submit">
          Submit
        </Button>
        <Button href="../login" style={{marginLeft: "10px"}} variant="outline-secondary">
          Have an account?
        </Button>
      </Form>
      <Alert hidden = {!registerStatus} className="alert" variant={"success"}>
          You have registered successfully! Redirecting to Login Page.
        </Alert>
    </div>
  );
}

export default Register;
