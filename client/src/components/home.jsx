import React from "react";
import { Feed, TagSuggestions, BlogSuggestions } from "./";
import { Container, Row, Col } from "reactstrap";

function Home() {
  return (
    <Container>
      <Row>
        <Col className="d-none d-md-block">
          <TagSuggestions />
        </Col>
        <Col md="8" lg="6">
          <Feed />
        </Col>
        <Col className="d-none d-lg-block">
          <BlogSuggestions />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
