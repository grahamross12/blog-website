import React, { Component } from "react";
import BlogItem from "./blogItem.jsx";
import "./css/feed.css";
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
    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      const data = await response.json();
      this.setState({ blogs: data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        {this.state.blogs
          ? this.state.blogs.map((blog, index) => (
              <BlogItem key={index} title={blog.title}></BlogItem>
            ))
          : ""}
      </div>
    );
  }
}

export default Feed;
