import React, { useState } from 'react';
import Footer from '../components/layout/footer';
import '../styles/login.css';
import Button from '../components/common/button';
import Input from '../components/common/input';
import Form from '../components/common/form';
import Checkbox from '../components/common/checkbox';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigateToMain = () => {
    // Navigation logic to route to your main page
    window.location.href = "/home"; // or use useNavigate() from 'react-router-dom'
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
        <Form onSubmit={handleSubmit}>
          <h1 className="title">WELCOME BACK!</h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Button type="submit" onClick={navigateToMain} className="button primary">Login</Button>
          <div className="or-with">Or With</div>
          <Button type="button" className="button">Login with an Institute</Button>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </Form>
      </div>
      <Footer /> {/* Common Footer */}
    </>
  );
}

export default LoginPage;