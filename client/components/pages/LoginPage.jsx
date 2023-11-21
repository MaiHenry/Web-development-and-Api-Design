import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../../LoginContext';
import { LoginWithOpenIdButton } from '../login/LoginWithOpenIdButton';
import '../../Styles.css';

export function LoginPage() {
  const { user } = useContext(LoginContext);

  // Redirect to root page if user is logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h2>Sign in to access features</h2>
      <div className="headerDivider"></div>
      <LoginWithOpenIdButton />
      <div className="spacer"></div>
    </>
  );
}
