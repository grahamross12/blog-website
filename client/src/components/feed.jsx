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
      const blogsData = await response.json();
      this.setState({ blogs: blogsData });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    console.log(this.state.blogs);
    return (
      <div>
        {this.state.blogs
          ? this.state.blogs.map((blog, index) => (
              <BlogItem
                key={index}
                username={blog.username}
                title={blog.title}
              ></BlogItem>
            ))
          : ""}
      </div>
    );
  }
}

export default Feed;
