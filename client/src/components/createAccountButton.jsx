import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function CreateAccountButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="navbar-button-fill"
      id="create-account-button"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Create account
    </button>
  );
}

export default CreateAccountButton;
