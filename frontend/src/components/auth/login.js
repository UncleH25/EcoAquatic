import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();  // Initialize the navigate hook

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5232/api/auth/login", values);
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");

        // Decode the token to check user roles
        const decoded = jwtDecode(response.data.token);
        const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (userRoles) {
          // Check if the user has the "Admin" role
          if (userRoles.includes("Admin")) {
            console.log("Navigating to admin dashboard...");
            navigate("/admin");  // Redirect admins to the admin dashboard
          } else {
            console.log("Navigating to home page...");
            navigate("/home");   // Redirect regular users to the home page
          }
        } else {
          console.error("No roles found in the token.");
        }
        console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed!");
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
