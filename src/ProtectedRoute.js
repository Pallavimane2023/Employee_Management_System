import React from "react";
import { Navigate, useLocation,Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet/>;
};

export default ProtectedRoute;