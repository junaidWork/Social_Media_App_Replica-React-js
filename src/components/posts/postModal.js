import React from "react";
import { Modal, FormControl, InputGroup, Button } from "react-bootstrap";

export default function PostModal({
  handleshut,
  updatePost,
  createPost,
  setTitle,
  setDescription,
  setCategory,
  updatePostFlag,
  title,
  description,
  category,
  show,
}) {
  return (
    <div>
      <Modal show={show} onHide={handleshut}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              aria-label="title"
              aria-describedby="basic-addon1"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </InputGroup>{" "}
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Description"
              aria-label="description"
              aria-describedby="basic-addon2"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Category"
              aria-label="category"
              aria-describedby="basic-addon3"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (updatePostFlag) {
                createPost();
              } else {
                updatePost();
              }

              handleshut();
            }}
          >
            Post
          </Button>
          <Button variant="secondary" onClick={handleshut}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
