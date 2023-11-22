import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "../../LoginContext";

export function LoginNavLink() {
  const { user } = useContext(LoginContext);

  // Check if user is logged in
  if (user) {
    return <nav>
        <Link to="/" className="navbar-link">Browse rooms</Link>
        <Link to="/people" className="navbar-link">People</Link>
        <Link to="/profile" className="navbar-link">My Profile</Link>
    </nav>;
  }

  return;
}
