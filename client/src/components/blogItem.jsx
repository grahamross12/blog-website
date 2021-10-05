import React, { Component } from "react";
import "./css/blogItem.css";

class BlogItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="blogItemDiv rounded-div truncate-text">
        <h1 className="title-link truncate-text">{this.props.title}</h1>
      </div>
    );
  }
}

export default BlogItem;
