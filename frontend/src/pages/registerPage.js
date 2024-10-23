import React from "react";
import Register from "../components/auth/register";
import HeaderOther from '../components/common/headerOther';
import '../styles/register.css';

// RegisterPage component
const RegisterPage = () => {
  return (
    <div>
      <HeaderOther />
      <h1>Please Register</h1>
      <Register/>
    </div>
  );
};

export default RegisterPage;
