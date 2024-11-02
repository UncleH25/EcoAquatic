import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../../src/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
    }

  if (!token &&  !isAuthenticated) {

    return <Navigate to="/" />;  // Redirect to splash if no token is found
  }

  const decoded = jwtDecode(token);
  console.log("Decoded token:", decoded);  // Debug: Check the token's contents

  const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];  // Check for roles claim
  console.log("User roles:", userRoles);  // Debug: Print user roles

  // Check if the user has the required role
  if (!requiredRole && !hasRole(requiredRole)) {
    console.log("Redirecting to not-authorized");  // Debug: If the role doesn't match
    return <Navigate to="/not-authorized" />;  // Redirect to Not Authorized page if role is missing
  }

  return children;  // Render the protected component (AdminDashboard)
};


export default ProtectedRoute;
