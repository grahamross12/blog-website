import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <a className="navbar-button" onClick={() => loginWithRedirect()}>
      Log in
    </a>
  );
}

export default LoginButton;
