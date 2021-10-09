import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <a
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      type="button"
      tabIndex="0"
      role="menuitem"
      className="dropdown-item"
    >
      Log Out
    </a>
  );
}

export default LogoutButton;
