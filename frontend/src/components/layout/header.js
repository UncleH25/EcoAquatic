import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/global.css';
import '../../styles/variables.css';

const Header = () => {
  return (
    <header className="header-container">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
      <div className="logo">
        <img src="../images/logos/EcoAquatic_LogoMain.png" alt="ECOAQUATIC Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/home" className="nav-item">Home</Link>
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/species-search" className="nav-item">Species Search</Link>
        <Link to="/species-profiles" className="nav-item">Species Profiles</Link>
        <Link to="/interactive-map" className="nav-item">Interactive Map</Link>
      </nav>
      <div className="user-icon">
        <Link to="/user-preferences" className="nav-item"><img src="" alt="User" /></Link>
      </div>
    </header>
  );
};

export default Header;
