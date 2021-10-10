import React from "react";
import { Feed, TagSuggestions, BlogSuggestions } from "../components/";
import { Container, Row, Col } from "reactstrap";
import { useParams, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home(props) {
  const { username } = useParams();
  let query = useQuery();
  let searchQuery = query.get("search");
  return (
    <Container>
      <Row>
        <Col className="d-none d-md-block">
          <TagSuggestions />
        </Col>
        <Col md="8" lg="6">
          <Feed
            username={username}
            searchQuery={searchQuery}
            user={props.user}
          />
        </Col>
        <Col className="d-none d-lg-block">
          <BlogSuggestions />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
