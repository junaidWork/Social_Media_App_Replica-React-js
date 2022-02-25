import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Button, Nav, Navbar, Modal } from "react-bootstrap";

import { useState, useEffect } from "react";
import axios from "axios";
export default function Profile() {
  const [allPost, setAllPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [singleDetails, setSingleDetails] = useState([]);
  const [show, setShow] = useState(false);

  let logedUserId = localStorage.getItem("id");

  useEffect(() => {
    getAllPosts();
    getAllComments();
    handleshut();
  }, []);

  const handleShow = () => {
    setShow(true);
  };
  const handleshut = () => {
    setShow(false);
  };
  // Get All Post
  const getAllPosts = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://taskforum.herokuapp.com/api/post/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setAllPosts(response.data.data);
    }
  };

  // Get all Comments
  const getAllComments = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://taskforum.herokuapp.com/api/comment/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setAllComments(response.data.data);
    }
  };
  // Get all Comments of Single post
  const getPostComments = async (id) => {
    console.log(id);
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/comment/post/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setSingleDetails(response.data.data);
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Link to="/">
          <Button className="btn btn-light m-2">Back To Home</Button>
        </Link>
        <Container>
          <Nav className="me-auto" style={{ marginLeft: "40%" }}>
            <strong>My Activity</strong>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {allComments.map((item, index) => {
          if (item.user._id === logedUserId) {
            return (
              <Card
                key={index}
                style={{ width: "18rem", cursor: "pointer" }}
                className=" m-3 mb-2 bg-Info"
                onClick={() => {
                  handleShow();
                  getPostComments(item.post._id);
                }}
              >
                <Card.Body>
                  <Card.Title className="mt-3"> {item.post.title}</Card.Title>
                  <Card.Text>{item.post.description}</Card.Text>
                  <Card.Text>
                    {" "}
                    <strong>{item.post.created_at}</strong>{" "}
                  </Card.Text>
                </Card.Body>
                <div>
                  <span style={{ marginRight: "80px" }}>
                    <strong style={{ textDecoration: "underline" }}>
                      {item.user.name}
                    </strong>
                  </span>
                  <span style={{ wordBreak: "break-word" }}>
                    {item.comment}
                  </span>
                </div>
              </Card>
            );
          }
        })}
        <Modal show={show} onHide={handleshut}>
          <Modal.Header closeButton>
            <Modal.Title>Details of Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {singleDetails.map((item, index) => {
              return (
                <Card
                  key={index}
                  style={{ width: "18rem", cursor: "pointer" }}
                  className=" m-3 mb-2 bg-Info"
                >
                  <Card.Body>
                    <div>
                      <span style={{ marginRight: "80px" }}>
                        <strong style={{ textDecoration: "underline" }}>
                          {item.user.name}
                        </strong>
                      </span>
                      <span style={{ wordBreak: "break-word" }}>
                        {item.comment}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleshut}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
