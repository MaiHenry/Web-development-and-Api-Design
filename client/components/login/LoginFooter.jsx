import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "../../LoginContext";
import "../../Styles.css";

export function LoginFooter() {
  const navigate = useNavigate();
  const { user, profileName, unloadUser } = useContext(LoginContext);

  async function handleSubmitLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to log out " + res.statusText);
    }
    unloadUser();
    navigate("/");
  }

  let profileStatus;

  if (profileName) {
    profileStatus = (
      <footer>
        Logged in as:{" "}
        <Link className="footerLink" to={"/profile"}>
          {profileName}
        </Link>
        <p>
          <button className="footerButton" onClick={handleSubmitLogout}>
            Log out
          </button>
        </p>
      </footer>
    );
  } else {
    profileStatus = <div>Log in to explore features!</div>;
  }

  return profileStatus;
}
