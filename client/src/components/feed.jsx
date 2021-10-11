import React, { Component } from "react";
import BlogItem from "./blogItem.jsx";
import "./css/feed.css";

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
      let response;
      if (this.props.username) {
        const apiUrl = "http://localhost:5000/api/users/" + this.props.username;
        response = await fetch(apiUrl);
      } else if (this.props.searchQuery) {
        const apiUrl =
          "http://localhost:5000/api/blogs/" + this.props.searchQuery;
        response = await fetch(apiUrl);
      } else {
        response = await fetch("http://localhost:5000/api/blogs");
      }
      const blogsData = await response.json();
      this.setState({ blogs: blogsData });
    } catch (err) {
      console.error(err);
    }
  };

  findUsername(blog) {
    if (blog.user) {
      return blog.user.username;
    }
    return "error";
  }

  findPicture(blog) {
    if (blog.user) {
      return blog.user.picture;
    }
    return "";
  }

  render() {
    return (
      <div>
        {this.state.blogs ? (
          this.state.blogs[0] ? (
            this.state.blogs.map((blog, index) => (
              <BlogItem
                key={index}
                username={this.findUsername(blog)}
                title={blog.title}
                picture={this.findPicture(blog)}
                date={blog.createdAt}
                url={blog.url}
              ></BlogItem>
            ))
          ) : (
            <div>
              <h2 id="no-results">No results</h2>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Feed;
