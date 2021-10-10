import React, { Component } from "react";
import "./css/blogItem.css";

class BlogItem extends Component {
  render() {
    return (
      <div className="blogItemDiv rounded-div truncate-text">
        <a
          href={
            "http://localhost:3000/user/" +
            this.props.username +
            "/" +
            this.props.title
          }
          className="title-link truncate-text"
        >
          {this.props.title}
        </a>
        <div>
          <a href={"http://localhost:3000/user/" + this.props.username}>
            {this.props.username}
          </a>
        </div>
      </div>
    );
  }
}

export default BlogItem;
