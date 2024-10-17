// src/components/Footer.js
import React from 'react';
import '../../styles/global.css';
import '../../styles/variables.css';

const Footer = () => {
  return (
    <footer className="footer-container">
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
      <p>&copy; 2024 ECOAQUATIC. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
    </footer>
  );
};

export default Footer;
