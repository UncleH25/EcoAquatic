import React from "react";
import Login from "../components/auth/login";
import HeaderOther from '../components/common/headerOther';

// LoginPage component
const LoginPage = () => {
  return (
    <div>
    <HeaderOther />
      <h1>Please Login</h1>
      <Login />
    </div>
  );
};

export default LoginPage;