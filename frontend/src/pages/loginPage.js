import React from "react";
import Login from "../components/auth/login";
import HeaderOther from '../components/common/headerOther';
import Footer from '../components/common/footer';

// LoginPage component
const LoginPage = () => {
  return (
    <div>
    <HeaderOther />
      <Login />
    <Footer />
    </div>
  );
};

export default LoginPage;