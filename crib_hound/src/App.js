import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Row,
  Nav,
  Button,
  Modal,
  Col,
  Form,
  Alert,
  Table,
} from "react-bootstrap";
import Add from "./Add";
import Edit from "./Edit";
import apiClient from "./axios";

function App() {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [cribsData, setCribsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [editCribeId, setEditCribeId] = useState("");
  const [editModel, setEditModel] = useState(false);
  const handleEditModelClose = () => setEditModel(false);

  useEffect(() => {
    getCribsDataList();
  }, []);
  const getCribsDataList = () => {
    apiClient
      .get("/cribs")
      .then((res) => {
        setCribsData(res.data);
        setFilteredData(res.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    const lowerCaseValue = search.toLowerCase().trim();
    let filterData = [];
    filterData = cribsData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseValue) ||
        item.location.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredData(filterData);
  }, [search, cribsData]);

  function alertShowFunc(params, message) {
    params ? setAlertVariant("success") : setAlertVariant("danger");
    setAlertMsg(message);
    setAlertShow(true);
    getCribsDataList();
  }

  function handleDelete(id) {
    if (id) {
      const isStatus = window.confirm("Are you Sure you want delete?");
      if (isStatus) {
        apiClient
          .delete("/cribs/" + id)
          .then((res) => {
            if (res.data === "succ") {
              alertShowFunc(true, "Crib Deleted");
            } else {
              alertShowFunc(false, "Please Try Again!..");
            }
          })
          .catch(() => {
            alertShowFunc(false, "Network Error!..");
          });
      }
    }
  }

  function handleEditCribe(id) {
    if (id) {
      setEditCribeId(id);
      setEditModel(true);
    }
  }
  return (
    <>
      <Container className=" mt-2 mb-2">
        <Nav className="bg-body-tertiary" variant="pills" activeKey="1">
          <Nav.Item>
            <Nav.Link>
              <Button onClick={handleShow}>Add</Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {alertShow && (
          <>
            <Alert
              variant={alertVariant}
              onClose={() => setAlertShow(false)}
              dismissible
            >
              <p className="m-0">{alertMsg}</p>
            </Alert>
          </>
        )}
      </Container>

      <Row>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Crib</Modal.Title>
            </Modal.Header>
            <Add handleClose={handleClose} alertShowFunc={alertShowFunc} />
          </Modal>
          <Modal show={editModel} onHide={handleEditModelClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Crib</Modal.Title>
            </Modal.Header>
            <Edit
              handleClose={handleEditModelClose}
              alertShowFunc={alertShowFunc}
              id={editCribeId}
            />
          </Modal>
        </div>
      </Row>
      <Container className="mt-5">
        <Row>
          <Col sm={12}>
            <Form.Control
              type="search"
              placeholder="Search by Name, Location"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mt-3">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((val, i) => (
                  <>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.location}</td>
                      <td>
                        <img alt="" src={val.image} width={100} />
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleEditCribe(val.id)}
                          type="button"
                          className="btn btn-success"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(val.id)}
                          type="button"
                          style={{ backgroundColor: "red", color: "white" }}
                          className="btn btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan={5} align="center">
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

export default App;
