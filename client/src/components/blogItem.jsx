import React, { Component } from "react";
import "./css/blogItem.css";

class BlogItem extends Component {
  convertDate = (datestring) => {
    const date = new Date(datestring);
    const monthNo = date.getUTCMonth();
    const day = date.getUTCDate();
    const monthStrDict = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
    const dateFormat = day + " " + monthStrDict[monthNo];
    return dateFormat;
  };
  render() {
    return (
      <div className="blogItemDiv rounded-div truncate-text">
        <div className="blog-post-top">
          <div className="f-left full-height">
            <div className="profile-picture-div user-info-picture">
              <a href={"http://localhost:3000/user/" + this.props.username}>
                <img
                  id="profile-picture"
                  src={this.props.picture}
                  alt="Profile"
                ></img>
              </a>
            </div>

            <div className="f-right stack-user-info full-width">
              <div className="full-width user-info">
                <a
                  className="username-link"
                  href={"http://localhost:3000/user/" + this.props.username}
                >
                  {this.props.username}
                </a>
              </div>
              <div className="full-width user-info ">
                <time className="date" dateTime={this.props.date}>
                  {this.convertDate(this.props.date)}
                </time>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-post-mid">
          <a
            href={
              "http://localhost:3000/user/" +
              this.props.username +
              "/" +
              this.props.url
            }
            className="title-link truncate-text"
          >
            {this.props.title}
          </a>
        </div>
      </div>
    );
  }
}

export default BlogItem;
