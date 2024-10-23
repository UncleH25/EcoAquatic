import React from "react";
import Register from "../components/auth/register";
import HeaderOther from '../components/common/headerOther';
import Footer from '../components/common/footer';
import '../styles/register.css';

// RegisterPage component
const RegisterPage = () => {
  return (
    <div>
      <HeaderOther />
      <h1>Please Register</h1>
      <Register/>
      <Footer />
    </div>
  );
};

export default RegisterPage;
