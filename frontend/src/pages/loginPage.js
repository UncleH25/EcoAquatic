import React, { useState } from 'react';
import Footer from '../components/layout/footer';
import '../styles/login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigateToMain = () => {
    // Navigation logic to route to your main page
    window.location.href = "/home";  // or use useNavigate() from 'react-router-dom'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password, rememberMe });
  };

  return (
    <>
      <header className="login-header">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
          <div className="login-logo">
            <img src="../images/logos/EcoAquatic_LogoMain.png" alt="EcoAquatic Logo" />
          </div>
        </header>
      <div className="page-container">
      <form  className="login-form" onSubmit={handleSubmit}>
        <h1 className="title">WELCOME BACK!</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className='remember-label'>Remember Me</label>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" onClick={navigateToMain} className="button primary">Login</button>
        <div className="or-with">Or With</div>
        <button type="button" className="button">Login with an Institute</button>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
    <Footer /> {/* Common Footer */}
    </>   
  );
}

export default LoginPage;