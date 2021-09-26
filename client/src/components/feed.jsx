import React, { Component } from "react";
import BlogItem from "./blogItem.jsx";
import "./feed.css";
import { Container, Row, Col } from "reactstrap";

class Feed extends Component {
  constructor() {
    super();
    this.state = { blogs: null };
  }
  componentDidMount = () => {
    this.getBlogsFromApi();
  };

  getBlogsFromApi = async () => {
    const response = await fetch("http://localhost:5000/api/blogs");
    const data = await response.json();
    this.setState({ blogs: data });
  };

  render() {
    return (
      <div id="feedContainer">
        <Col xs="12" md="5">
          {this.state.blogs
            ? this.state.blogs.map((blog, index) => (
                <BlogItem title={blog.title}></BlogItem>
              ))
            : ""}
        </Col>
      </div>
    );
  }
}

export default Feed;
