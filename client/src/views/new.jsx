import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/new.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { Redirect } from "react-router";

function titleToUrl(title) {
  var titleFormat = title
    .trim() // remove whitespaces at the start and end of string
    .toLowerCase()
    .replace(/^-+/g, "") // remove one or more dash at the start of the string
    .replace(/[^\w-]+/g, "-") // convert any on-alphanumeric character to a dash
    .replace(/-+/g, "-") // convert consecutive dashes to singuar one
    .replace(/-+$/g, ""); // remove one or more dash at the end of the string
  if (titleFormat === "") titleFormat = "1";
  return titleFormat;
}

async function checkBlogUrl(url) {
  const queryUrl = "http://localhost:5000/api/blogs/blogUrl/" + url;
  // Check if formatted title is the same as another title by the same user
  const response = await axios.get(queryUrl);
  return response.data;
}

async function findSimilarUrl(url) {
  let newUrl = url;
  var idx = 1;
  while ((await checkBlogUrl(newUrl)) === false) {
    newUrl = url + "-" + idx;
    idx += 1;
  }
  return newUrl;
}

function New(props) {
  const [redirect, setRedirect] = useState(false);

  const publishBlog = async (event) => {
    event.preventDefault();
    const username = props.user["http://localhost:3000/username"];
    const title = event.target.form[0].value;
    const content = event.target.form[1].value;
    const url = titleToUrl(title);
    const newUrl = await findSimilarUrl(url);
    const blog = {
      username: username,
      title: title,
      content: content,
      url: newUrl,
    };
    const response = await axios.post("http://localhost:5000/api/blogs", blog);
    if (response.data) {
      setRedirect(true);
    }
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
