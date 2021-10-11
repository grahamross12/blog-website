import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageNotFound } from "./";
import { Container, Row, Col } from "reactstrap";
import { Loading } from "./";

function BlogView() {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username, blogUrl } = useParams();

  useEffect(() => {
    async function fetchBlogPost(username, blogUrl) {
      try {
        const path =
          "http://localhost:5000/api/users/" + username + "/" + blogUrl;
        const response = await fetch(path);
        const blogData = await response.json();
        setBlogData(blogData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    fetchBlogPost(username, blogUrl);
  }, [blogUrl, username]);

  function renderResult() {
    if (blogData == null) {
      return <PageNotFound />;
    }
    return showResult(blogData.title, blogData.content);
  }

  function showResult(blogTitle, blogContent) {
    return (
      <Container>
        <Row>
          <Col />
          <Col sm="12" md="10" lg="8">
            <div id="postFormDiv">
              <div id="post-content" className="rounded-div">
                <div className="post-form post-form-title">
                  <h1 className="title-input">{blogTitle}</h1>
                </div>
                <hr className="line-break" />
                <div className="post-form post-form-content">{blogContent}</div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }

  return <div>{isLoading ? <Loading /> : renderResult()}</div>;
}

export default BlogView;
