import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../../styles/login.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5232/api/auth/login", values);
        const { token } = response.data;
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', values.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        localStorage.setItem("token", token);
        
        const decoded = jwtDecode(token);
        const userRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
        if (userRoles?.includes("Admin")) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Login failed:", error);
        formik.setErrors({
          email: 'Invalid credentials',
          password: 'Invalid credentials'
        });
      }
    },
  });

  const handleInstituteLogin = () => {
    navigate('/institute-login');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">WELCOME BACK!</h1>
        
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className={`input-field ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
              {...formik.getFieldProps('email')}
            />
          </div>

          <div className="input-group password-group">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              className={`input-field ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
              {...formik.getFieldProps('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="forgot-password"
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="divider">
          <span>Or With</span>
        </div>

        <button
          onClick={handleInstituteLogin}
          className="institute-login-button"
        >
          Login with an Institute
        </button>

        <div className="signup-prompt">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="signup-link"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;