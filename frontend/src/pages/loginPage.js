import React from "react";
import Login from "../components/auth/login";
import HeaderOther from '../components/common/headerOther';
import Footer from '../components/common/footer';

// LoginPage component
const LoginPage = () => {
  return (
    <div>
    <HeaderOther />
      <h1>Please Login</h1>
      <Login />
    <Footer />
    </div>
  );
};

export default LoginPage;