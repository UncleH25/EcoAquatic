import React from 'react';
import { useEffect } from 'react';
import Footer from '../components/layout/footer'; // Common Footer
import '../styles/splash.css';  // CSS for splash screen

const SplashScreen = () => {
  const navigateToMain = () => {
    // Navigation logic to route to your main page
    window.location.href = "/home";  // or use useNavigate() from 'react-router-dom'
  };

  return (
    <>
      <header className="splash-header">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
        <div className="splash-logo">
          <img src="../images/logos/EcoAquatic_LogoMain.png" alt="EcoAquatic Logo" />
        </div>
      </header>
      <div className="splash-container">
        <div className="splash-content">
            <h1>WELCOME TO ECOAQUATIC</h1>
            <p>
            EcoAquatic brings real-time insights on fish species across the globe, empowering you to contribute to the <span>conservation</span> of endangered species.
            </p>
            <button onClick={navigateToMain} className="explore-button">Start Exploring</button>
        </div>
    </div>
      <Footer /> {/* Common Footer */}
    </>
  );
};

export default SplashScreen;