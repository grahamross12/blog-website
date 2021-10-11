import React from "react";
import axios from "axios";
import { Redirect } from "react-router";

function CreateUser(props) {
  function addUserInfo() {
    if (props.user) {
      const username = props.user["http://localhost:3000/username"];
      const email = props.user["email"];
      const picture = props.user["picture"];
      const body = { username: username, email: email, picture: picture };
      axios.post("http://localhost:5000/api/users/", body);
    }
    return <Redirect to="/" />;
  }
  return addUserInfo();
}

export default CreateUser;
