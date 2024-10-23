import React from "react";
import { useNavigate } from 'react-router-dom';
import HeaderOther from '../components/common/headerOther';
import Footer from '../components/common/footer';
import '../styles/splash.css';

const SplashPage = () => {
  const navigate = useNavigate();  // useNavigate hook to programmatically navigate

  // Function to navigate to login screen
  const handleExploreClick = () => {
      navigate('/login');  // Replace with the correct login route
  };

  return (
      <div className="splash-container">
          <HeaderOther />
          <div className="splash-body">
              <div className="splash-content">
                  <h1>WELCOME TO ECOAQUATIC</h1>
                  <h2>Nurturing Nature, One Fish At A Time</h2>
                  <p>
                      EcoAquatic brings real-time insights on fish species across the globe,
                      empowering you to contribute to the <span className="highlight">conservation</span> of endangered species.
                  </p>
                  <button className="explore-btn" onClick={handleExploreClick}>
                      Start Exploring
                  </button>
              </div>
          </div>
          <Footer />
      </div>
  );
};

export default SplashPage;