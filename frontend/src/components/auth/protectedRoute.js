import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;  // Redirect to login if no token is found
  }

  const decoded = jwtDecode(token);
  console.log("Decoded token:", decoded);  // Debug: Check the token's contents

  const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];  // Check for roles claim
  console.log("User roles:", userRoles);  // Debug: Print user roles

  // Check if the user has the required role
  if (!userRoles.includes(requiredRole)) {
    console.log("Redirecting to not-authorized");  // Debug: If the role doesn't match
    return <Navigate to="/not-authorized" />;  // Redirect to Not Authorized page if role is missing
  }

  return children;  // Render the protected component (AdminDashboard)
};


export default ProtectedRoute;
