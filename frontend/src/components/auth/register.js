import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Eye, EyeOff } from 'lucide-react';
import '../../styles/register.css';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  instituteName: Yup.string()
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      instituteName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5232/api/auth/register", values);
        alert("Registration successful!");
        navigate("/login");
      } catch (error) {
        const errorMessage = error.response?.data || "Registration failed!";
        alert(errorMessage);
      }
    },
  });

  const handleInstituteSignUp = () => {
    navigate('/register-institute');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>CREATE AN ACCOUNT</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Enter your Full Name"
              className={formik.touched.fullName && formik.errors.fullName ? 'error' : ''}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="error-message">{formik.errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your Email"
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group password-group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter a Password"
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              name="instituteName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.instituteName}
              placeholder="Enter your Institution (Optional)"
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <div className="divider">
          <span>Or With</span>
        </div>

        <button 
          type="button" 
          className="institute-button"
          onClick={handleInstituteSignUp}
        >
          Sign Up with an Institute
        </button>

        <div className="login-link">
          Already have an account? <span onClick={handleLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register;