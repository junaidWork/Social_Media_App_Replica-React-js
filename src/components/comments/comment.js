import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import "./comments.css";

export default function Comment({ item, postId }) {
  const [postComments, setPostComments] = useState([]);
  const [editFlag, setEditFlag] = useState(true);
  const [comment, setComment] = useState("");
  const [selectedcomment, setSelectedcomment] = useState("");

  useEffect(() => {
    getPostComments();
  }, []);

  // Get all Comments of one post
  const getPostComments = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/comment/post/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setPostComments(response.data.data);
    }
  };
  // Delete comment
  const deleteComment = async (cmnt) => {
    // const logedUserId = localStorage.getItem("id");
    // if (cmnt.user._id === logedUserId) {}

    const Usertoken = localStorage.getItem("token");
    const response = await axios.delete(
      `https://taskforum.herokuapp.com/api/comment/${cmnt._id}`,

      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("Successfully deleted");
      getPostComments();
      // getAllComments();
    }
  };
  // edit and update comment
  const editComment = async (cmnt) => {
    const logedUserId = localStorage.getItem("id");
    if (logedUserId === cmnt.user._id) {
      setComment(cmnt.comment);
      setSelectedcomment(cmnt);
      setEditFlag(!editFlag);
    }
  };
  //  Add comment
  const addComment = async (p) => {
    const Usertoken = localStorage.getItem("token");
    const logedUserId = localStorage.getItem("id");
    const comnt = { user: logedUserId, comment: comment, post: p._id };
    const response = await axios.post(
      "https://taskforum.herokuapp.com/api/comment/",

      comnt,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("Successfully added");
      getPostComments();
      setComment("");
    }
  };
  // update comment
  const updateComment = async (item) => {
    const Usertoken = localStorage.getItem("token");
    const comnt = { comment: comment };

    const response = await axios.put(
      `https://taskforum.herokuapp.com/api/comment/${selectedcomment._id}`,

      comnt,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("Successfully updated");
      setComment("");
      getPostComments();
      setEditFlag(!editFlag);
    }
  };
  return (
    <div>
      {postComments
        .sort((a, b) => {
          var dateA = new Date(a.created_at),
            dateB = new Date(b.created_at);
          return dateB - dateA;
        })
        .slice(0, 3)
        .map((cmnt, index) => {
          const UserId = localStorage.getItem("id");

          return (
            <Container key={index}>
              <Row className="border border-dark mt-2 bg-light text-dark">
                <Col
                  className="d-flex"
                  style={{ alignItems: "center", gap: "35px" }}
                >
                  <span>
                    {" "}
                    <strong style={{ textDecoration: "underline" }}>
                      {cmnt.user.name}
                    </strong>
                  </span>
                  <span style={{ wordBreak: "break-word" }}>
                    {cmnt.comment}
                  </span>
                  {cmnt.user._id === UserId && (
                    <div>
                      <Button
                        className="m-1 comment_button"
                        onClick={() => {
                          editComment(cmnt);
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        className="btn-danger m-1 comment_button"
                        onClick={() => {
                          deleteComment(cmnt);
                        }}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          );
        })}
      <InputGroup className="mt-3">
        <FormControl
          placeholder="Add a Comment"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={comment}
          onChange={(e) => {
            if (item._id) {
              setComment(e.target.value);
            }
          }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => {
            if (editFlag) {
              addComment(item);
            } else {
              updateComment(item);
            }
          }}
        >
          <i className="bi bi-plus-square-dotted"> Add</i>
        </Button>
      </InputGroup>
    </div>
  );
}
