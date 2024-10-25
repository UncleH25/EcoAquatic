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
      <Register/>
      <Footer />
    </div>
  );
};

export default RegisterPage;
