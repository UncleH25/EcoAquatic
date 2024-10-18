import React, { useState } from 'react';
import Footer from '../components/layout/footer';
import '../styles/signup.css';
import Button from '../components/common/button';
import Input from '../components/common/input';
import Form from '../components/common/form';


function SignupPagePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');

  const navigateToMain = () => {
    // Navigation logic to route to your main page
    window.location.href = "/login"; // or use useNavigate() from 'react-router-dom'
  };

  const navigateToInstitution = () => {
    // Navigation logic to route to your main page
    window.location.href = "/signup-with-your-institution"; // or use useNavigate() from 'react-router-dom'
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Sign Up submitted', { email, name, password, institution });
  };

  return (
    <>
      <header className="signup-header">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
        <div className="signup-logo">
          <img src="../images/logos/EcoAquatic_LogoMain.png" alt="EcoAquatic Logo" />
        </div>
      </header>
      <div className="signup-page-container">
        <Form onSubmit={handleSubmit}>
          <h1 className="title">CREATE AN ACCOUNT</h1>
          <Input
            type="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="institution"
            placeholder="Enter Your Institution Name (Optional)"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <Button type="submit" onClick={navigateToMain} className="button primary">Sign Up</Button>
          <div className="or-with">Or With</div>
          <Button type="button" onClick={navigateToInstitution} className="button">Sign Up with an Institute</Button>
          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </Form>
      </div>
      <Footer /> {/* Common Footer */}
    </>
  );
}

export default SignupPagePage;