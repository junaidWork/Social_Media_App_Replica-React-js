import React from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";

export default function CommentsModal({
  handleshuted,
  showed,
  Singleposts,
  postComments,
}) {
  return (
    <>
      {" "}
      <Modal show={showed} onHide={handleshuted}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{Singleposts.title}</h1>
          <p>{Singleposts.description}</p>
          <strong>{Singleposts.created_at}</strong>
        </Modal.Body>
        {postComments.map((cmnt, index) => {
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
                </Col>
              </Row>
            </Container>
          );
        })}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleshuted}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
