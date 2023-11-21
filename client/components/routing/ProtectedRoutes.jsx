import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../../LoginContext';

export function ProtectedRoutes({ children }) {
  const { user } = useContext(LoginContext);
  const location = useLocation(); // Remember the route redirection

  if (!user) {
    console.log("Must login to access that route")
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
