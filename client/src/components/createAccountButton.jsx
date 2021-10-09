import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function CreateAccountButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <a
      className="navbar-button-fill"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Create account
    </a>
  );
}

export default CreateAccountButton;
