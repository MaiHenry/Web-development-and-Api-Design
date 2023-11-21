import React from "react";
import { LoginWithOpenIdButton } from "../login/LoginWithOpenIdButton";
import '../../Styles.css';  

export function LoginPage() {

  return (
    <>
      <h2>Choose</h2>
      <div className="headerDivider"></div>
      <LoginWithOpenIdButton />
      <div className="spacer"></div>
    </>
  );
}
