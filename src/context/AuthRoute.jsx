/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const activeUserId = localStorage.getItem("activeUserId");
    return activeUserId ? true : false; 
  });

  useEffect(() => {
    const activeUserId = localStorage.getItem("activeUserId");
    if (!activeUserId) {
      navigate("/login");
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthRoute;
