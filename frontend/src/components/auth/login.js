import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
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
        const decoded = jwtDecode(response.data.token);
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
