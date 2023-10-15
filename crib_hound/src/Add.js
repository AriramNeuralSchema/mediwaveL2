import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import apiClient from "./axios";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Add = ({ handleClose }) => {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    file: "",
  });
  let [formError, setFormError] = useState({
    name: false,
    location: false,
    file: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    let validation = true;
    let errJSON = { name: false, location: false, file: false };
    if (formData.name.trim()) {
      errJSON.name = false;
    } else {
      validation = false;
      errJSON.name = true;
    }
    if (formData.location.trim()) {
      errJSON.location = false;
    } else {
      validation = false;
      errJSON.location = true;
    }
    if (formData.file) {
      errJSON.file = false;
    } else {
      validation = false;
      errJSON.file = true;
    }
    setFormError(errJSON);
    if (validation) {
      let data = {};
      const imageRef = ref(storage, `cribs/${formData.file.name + v4()}`);
      await uploadBytes(imageRef, formData.file).then(async (res) => {
        return getDownloadURL(ref(storage, res.metadata.fullPath)).then(
          (url) => {
            data.image = url;
          }
        );
      });
      data.name = formData.name;
      data.location = formData.location;
      apiClient
        .post("/cribs", data)
        .then((res) => {
          setDisabled(false);
        })
        .catch((err) => {
          setDisabled(false);
        });
    } else {
      setDisabled(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
                e.target.value
                  ? setFormError({ ...formError, name: false })
                  : setFormError({ ...formError, name: true });
              }}
            />

            {formError.name && (
              <>
                <span className="text-danger">Name is Required</span>
              </>
            )}
          </Form.Group>

          <Form.Group controlId="formlocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={(e) => {
                handleChange(e);
                e.target.value
                  ? setFormError({ ...formError, location: false })
                  : setFormError({ ...formError, location: true });
              }}
            />
            {formError.location && (
              <>
                <span className="text-danger">Location is Required</span>
              </>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(e) => {
                setFormData({ ...formData, file: e.target.files[0] });
                e.target.files[0]
                  ? setFormError({ ...formError, file: false })
                  : setFormError({ ...formError, file: true });
              }}
            />
            {formError.file && (
              <>
                <span className="text-danger">Image is Required</span>
              </>
            )}
          </Form.Group>
          {/* {!formError.file && (
            <img
              key={i}
              src={URL.createObjectURL(formData.file)} // Use createObjectURL to display local images
              alt={`Selected Image`}
              width="100"
              height="100"
            />
          )} */}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={disabled} variant="primary" type="submit">
            {!disabled ? "Submit" : "Progress"}
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default Add;
