import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageNotFound } from "./";
import { Container, Row, Col } from "reactstrap";

function BlogView() {
  const [blogData, setBlogData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { username, blogTitle } = useParams();

  async function fetchBlogPost(username, title) {
    try {
      const path = "http://localhost:5000/api/users/" + username + "/" + title;
      const response = await fetch(path);
      if (response.status == 404) setNotFound(true);
      const blogData = await response.json();
      if (!blogData[0]) {
        setNotFound(true);
      }
      setBlogData(blogData[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(async () => {
    await fetchBlogPost(username, blogTitle);
  }, []);

  function showResult() {
    return (
      <Container>
        <Row>
          <Col />
          <Col sm="12" md="10" lg="8">
            <div id="postFormDiv">
              <div id="post-content" className="rounded-div">
                <div className="post-form post-form-title">
                  <h1 className="title-input">{blogData.title}</h1>
                </div>
                <hr className="line-break" />
                <div className="post-form post-form-content">
                  {blogData.content}
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }

  return <>{blogData == null ? <PageNotFound /> : showResult()}</>;
}

export default BlogView;
