import React, { Component } from "react";
import "./blogItem.css";

class BlogItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="blogItemDiv">
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default BlogItem;
