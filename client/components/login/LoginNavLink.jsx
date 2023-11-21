import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "../../LoginContext";

export function LoginNavLink() {
  const { user } = useContext(LoginContext);

  // Check if user is logged in
  if (user) {
    return <Link to="/profile">My Profile</Link>;
  }

  return <Link to="/login">Log in</Link>;
}
