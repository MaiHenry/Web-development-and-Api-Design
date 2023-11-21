import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "../../LoginContext";
// import '../../Styles.css';

export function LoginFooter() {
  const { profileName } = useContext(LoginContext);

  let profileStatus;

  if (profileName) {
    profileStatus = <footer>Logged in as: <Link className="footerLink" to={"/profile"}>{profileName}</Link></footer>;
  } else {
    profileStatus = <div>Log in to explore features!</div>;
  }

  return profileStatus;
}