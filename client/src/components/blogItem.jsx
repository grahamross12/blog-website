import React, { Component } from "react";
import "./css/blogItem.css";

class BlogItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="blogItemDiv rounded-div truncate-text">
        <a
          href={this.props.user + "/" + this.props.title}
          className="title-link truncate-text"
        >
          {this.props.title}
        </a>
        <p>{this.props.username}</p>
      </div>
    );
  }
}

export default BlogItem;
