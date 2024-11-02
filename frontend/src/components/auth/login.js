import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import '../../styles/login.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverErrors, setServerErrors] = useState({
    email: '',
    password: ''
  });

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        // Reset server errors before attempting login
        setServerErrors({ email: '', password: '' });

        await login(values.email, values.password);
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', values.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

      } catch (error) {
        console.error("Login failed:", error);
        
        if (error.response?.data) {
          const { error: errorType, message } = error.response.data;
          
          // Reset both error messages first
          setServerErrors({
            email: '',
            password: ''
          });

          // Set the specific error message based on the error type
          if (errorType === 'email') {
            setServerErrors(prev => ({
              ...prev,
              email: message
            }));
          } else if (errorType === 'password') {
            setServerErrors(prev => ({
              ...prev,
              password: message
            }));
          } else {
            // If the error type is not specified, show generic error
            setServerErrors({
              email: 'An error occurred during login',
              password: 'An error occurred during login'
            });
          }
        }
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
              className={`input-field ${
                (formik.touched.email && formik.errors.email) || serverErrors.email 
                  ? 'input-error' 
                  : ''
              }`}
              {...formik.getFieldProps('email')}
            />
            {((formik.touched.email && formik.errors.email) || serverErrors.email) && (
              <div className="error-message">
                {serverErrors.email || formik.errors.email}
              </div>
            )}
          </div>

          <div className="input-group password-group">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              className={`input-field ${
                (formik.touched.password && formik.errors.password) || serverErrors.password 
                  ? 'input-error' 
                  : ''
              }`}
              {...formik.getFieldProps('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {((formik.touched.password && formik.errors.password) || serverErrors.password) && (
              <div className="error-message">
                {serverErrors.password || formik.errors.password}
              </div>
            )}
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