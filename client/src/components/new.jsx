import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/new.css";
import { FormGroup, Form, Label, Input } from "reactstrap";

function New() {
  return (
    <Container>
      <Row>
        <Col />
        <Col sm="12" md="10" lg="8">
          <div id="postFormDiv">
            <div id="post-content" className="rounded-div">
              <div className="post-form post-form-title">
                <form className="post-form-element">
                  <textarea
                    id="title-input"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title..."
                    autoComplete="off"
                  />
                </form>
              </div>
              <hr className="line-break" />
              <div className="post-form post-form-content">
                <form className="post-form-element">
                  <textarea
                    id="content-input"
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Content..."
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default New;
