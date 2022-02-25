import React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Setting() {
  const [loggedinUser, setloggedinUser] = useState("");
  useEffect(() => {
    getloggedinUser();
  }, []);

  // get logged in user
  const getloggedinUser = async () => {
    let logedUserId = localStorage.getItem("id");
    let Usertoken = localStorage.getItem("token");
    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/users/${logedUserId}`,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setloggedinUser(response.data.data);
    }
  };
  // update username
  const updateName = async () => {
    let logedUserId = localStorage.getItem("id");
    let Usertoken = localStorage.getItem("token");
    let user = { name: loggedinUser };
    const response = await axios.put(
      `https://taskforum.herokuapp.com/api/users/${logedUserId}`,
      user,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("username has been updated");
      setloggedinUser("");
      window.location.href = "/";
    }
  };
  return (
    <Container>
      <Link to="/">
        <Button className="mt-3">Back To Home</Button>
      </Link>
      <Card style={{ width: "25rem" }} className="m-5">
        <Card.Title>Modify Your Name</Card.Title>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={loggedinUser.name}
              onChange={(e) => {
                setloggedinUser(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your Infomartion with anyone else.
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            onClick={() => {
              updateName();
            }}
          >
            Update
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
