import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      instituteName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5232/api/auth/register", values);
        alert("Registration successful!");
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed!");
      }
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="fullName"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          placeholder="Full Name"
        />
        <input
          name="instituteName"
          onChange={formik.handleChange}
          value={formik.values.instituteName}
          placeholder="Institute Name (Optional)"
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
