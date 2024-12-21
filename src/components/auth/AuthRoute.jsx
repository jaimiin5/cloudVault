import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ element, isAuth }) => {
  if (!isAuth) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Otherwise, render the requested element (protected page)
  return element;
};

export default AuthRoute;
