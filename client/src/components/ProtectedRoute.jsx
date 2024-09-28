// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// Mock function to check authentication (replace this with actual logic)
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Assuming auth token is stored in local storage
  return token !== null;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
