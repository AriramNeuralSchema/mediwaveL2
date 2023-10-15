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
  Card,
} from "react-bootstrap";
import Add from "./Add";
import apiClient from "./axios";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [cribsData, setCribsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    apiClient
      .get("/cribs")
      .then((res) => {
        setCribsData(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const lowerCaseValue = search.toLowerCase().trim();
    let filterData = [];
    filterData = cribsData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseValue) ||
        item.location.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredData(filterData);
  }, [search]);
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
      </Container>
      <Row>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Add handleClose={handleClose} />
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
          {filteredData.length > 0 ? (
            filteredData.map((val, i) => (
              <>
                <Col className="mt-2" sm={3} key={i}>
                  <Card key={i}>
                    <Card.Img variant="top" src={val.image} />
                    <Card.Body>
                      <Card.Title>{val.name}</Card.Title>
                      <Card.Text>{val.location}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))
          ) : (
            <Col style={{ fontWeight: "bold" }} align="center">
              No Record Found
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default App;
