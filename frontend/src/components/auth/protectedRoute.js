import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;  // Redirect to login if no token
  }

  const decoded = jwtDecode(token);
  const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  // Check if the user has the required role
  if (!userRoles.includes(requiredRole)) {
    return <Navigate to="/not-authorized" />;  // Redirect to Not Authorized page if role is missing
  }

  return children;  // Render the component if the user has the required role
};

export default ProtectedRoute;
