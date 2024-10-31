import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMain from '../components/common/headerMain';
import Footer from '../components/common/footer';
import '../styles/home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <HeaderMain />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">
            WELCOME TO ECOAQUATIC
          </h1>
          <p className="hero-description">
            your gateway to exploring the beauty and diversity of aquatic life. Monitor fish species in real time
            and dive deep into conservation efforts aimed at protecting endangered ecosystems.
          </p>
          <p className="hero-description">
            Stay informed, take action, and be a part of the movement to preserve our planet's aquatic treasures for future generations
          </p>
          <div className="button-container-header">
            <button
              onClick={() => handleNavigation('/interactive-map')}
              className="primary-button"
            >
              Explore Map
            </button>
            <button
              onClick={() => handleNavigation('/species-search')}
              className="primary-button"
            >
              Species Search
            </button>
          </div>
        </div>
      </div>

      {/* Latest Highlights Section */}
      <div className="highlights-section">
        <h2 className="highlights-title">
          LATEST HIGHLIGHTS
        </h2>
        <div className="highlights-container">
          {/* Conservation Programs Card */}
          <div className="highlight-card">
            <p className="card-description">
              Discover our latest conservation programs designed to protect aquatic habitats from the ongoing threats of overfishing, pollution, and climate change. Learn how you can contribute to safeguarding these fragile ecosystems.
            </p>
            <button
              onClick={() => handleNavigation('/interactive-map')}
              className="card-button"
            >
              View Latest Conservation Efforts
            </button>
          </div>

          {/* Real-time Monitoring Card */}
          <div className="highlight-card">
            <p className="card-description">
              Access real-time monitoring of fish populations and habitat health, from serene freshwater lakes to the vast expanses of the world's oceans. Our live data offers insights into the current state of aquatic biodiversity and environmental conditions.
            </p>
            <button
              onClick={() => handleNavigation('/interactive-map')}
              className="card-button"
            >
              View Real Time Monitoring
            </button>
          </div>

          {/* Species Profiles Card */}
          <div className="highlight-card">
            <p className="card-description">
              Explore detailed profiles of endangered species, including their habitats, threats, and recovery efforts. Learn about ongoing projects to restore these species and how technological advancements are supporting aquatic conservation.
            </p>
            <button
              onClick={() => handleNavigation('/interactive-map')}
              className="card-button"
            >
              Explore Map
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;