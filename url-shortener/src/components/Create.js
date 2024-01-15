import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Create.css";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Create() {
  const [link, setLink] = useState(null);
  const [genLink, setGenLink] = useState(null);
  const [notify, setNotify] = useState(null);
  const [variant, setVariant] = useState(null);
  const [show, setShow] = useState(false);

  const API_URL = "http://192.168.31.94:4000/insert_url"

  const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const submit = (e) => {
    e.preventDefault();
    if (isValidURL(link)) {
        const data = {
            url: link
        };
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            setGenLink(window.location.href  + result.url_id)
            setVariant("success");
            setNotify("Link created successfully : ");
            setShow(true);
        })
        .catch(error => {
            setVariant("danger");
            setNotify(error);
            setShow(true);
        });

    } else {
      setVariant("danger");
      setNotify("Invalid URL");
      setShow(true);
    }
  };

  return (
    <div
      className="main"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form onSubmit={submit} className="form">
        <Form.Group className="mb-3" controlId="link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            onInput={(e) => {
              setLink(e.target.value);
            }}
            type="text"
            placeholder="Enter the link."
          />
        </Form.Group>
        <Button disabled={!link} variant="primary" type="submit">
          Submit
        </Button>
        {show ? <Alert className="alert" variant={variant}>{notify} {variant === "success" ? <Alert.Link href={genLink}>{genLink}</Alert.Link> : <></>}</Alert> : <></>}
      </Form>
    </div>
  );
}

export default Create;
