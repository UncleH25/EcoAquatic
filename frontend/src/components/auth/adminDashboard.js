import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      
      // Extract roles from the token
      const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (userRoles.includes("Admin")) {
        setIsAdmin(true); // Set isAdmin to true if user has Admin role
      }
    }
  }, []);

  if (!isAdmin) {
    return <Navigate to="/login" />;  // Redirect non-admins to login
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You have access to this page.</p>
    </div>
  );
};

export default AdminDashboard;
