import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

// Login component
const Login = () => {
  console.log('Login component is being rendered');
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Handle form submission
    onSubmit: async (values) => {
      console.log('Form is being submitted');
      try {
        const response = await axios.post("/api/auth/login", values);
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
      } catch (error) {
        console.error('Login failed:', error);
        alert("Login failed!");
      }
    },
  });

  // Check if token is available in local storage
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded);
  }

  // Set token in axios headers
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  // Render login form
  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.username}
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