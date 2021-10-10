import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/new.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { Redirect } from "react-router";

function New(props) {
  const [redirect, setRedirect] = useState(false);
  const publishBlog = async (event) => {
    event.preventDefault();
    const username = props.user["http://localhost:3000/username"];
    const title = event.target.form[0].value;
    const content = event.target.form[1].value;
    const blog = { username: username, title: title, content: content };
    await axios.post("http://localhost:5000/api/blogs", blog);
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/" />;
  return (
    <Container>
      <Row>
        <Col />
        <Col sm="12" md="10" lg="8">
          <div id="postFormDiv">
            <form className="post-form-element">
              <div id="post-content" className="rounded-div">
                <div className="post-form post-form-title">
                  <TextareaAutosize
                    style={{ height: "100% !important" }}
                    id="title-input"
                    type="text"
                    name="title"
                    placeholder="Title..."
                    autoComplete="off"
                  />
                </div>
                <hr className="line-break" />
                <div className="post-form post-form-content">
                  <TextareaAutosize
                    id="content-input"
                    type="text"
                    name="content"
                    placeholder="Content..."
                    autoComplete="off"
                  />
                </div>
              </div>
              <Row id="form-publish-buttons">
                <Col>
                  <button
                    onClick={publishBlog}
                    id="publish-button"
                    className="navbar-button-fill"
                  >
                    Publish
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default New;
