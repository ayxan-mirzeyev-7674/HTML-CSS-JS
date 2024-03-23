import styles from "./Launcher.module.css";
import Background from "./images/background.webp";
import EditIcon from "./images/edit.svg";
import Form from "react-bootstrap/Form";
import images from "/Users/ayxanmirzayev/Documents/GitHub/HTML-CSS-JS/whoisthespy/frontend/whoisthespy/src/iconpack";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ChangeProfileModal(props) {
  const [selectedImage, setSelectedImage] = useState(props.selectedone);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-320w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Set Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.hiddenradio}>
          {images.map((image, i) => (
            <div key={i} className={styles.eachAvatarDiv}>
              <label>
                <input
                  onChange={() => {
                    setSelectedImage(i);
                  }}
                  type="radio"
                  name="test"
                  value="small"
                  checked={i === selectedImage}
                />
                <img className={styles.editAvatar} src={image} />
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className={styles.createButton}
          onClick={() => {
            props.onHide(selectedImage);
          }}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function Launcher() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [username, setUsername] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const createRoom = () => {
    if (username !== "" && username) {
      console.log({ username: username, avatar: selectedImage });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className={styles.body}
    >
      <div className={styles.main}>
        <div className={styles.changeImageDiv}>
          <div className={styles.innerDiv}>
            <img
              alt="Avatar"
              className={styles.pp}
              src={images[selectedImage]}
            ></img>
            <button
              onClick={() => {
                setModalShow(true);
              }}
              className={styles.editDiv}
            >
              <img alt="Edit" className={styles.edit} src={EditIcon}></img>
            </button>
          </div>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder=""
          />
        </Form.Group>
        <button onClick={createRoom} className={styles.createButton}>
          Create a Room
        </button>
        <button className={styles.joinButton}>Join a room</button>
      </div>
      <ChangeProfileModal
        show={modalShow}
        onHide={(index) => {
          setModalShow(false);
          index && setSelectedImage(index);
          console.log(selectedImage);
        }}
        selectedone={selectedImage}
      />
    </div>
  );
}

export default Launcher;
