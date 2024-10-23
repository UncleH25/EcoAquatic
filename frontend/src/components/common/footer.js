import React from 'react';
import '../../styles/global.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left-links">
                <p> &copy; 2024 - 2024 www.ecoaquatic.com. Last Updated: 09/09/2024</p>
            </div>
            <div className="footer-right-links">
                <ul className="footer-links">
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};


export default Footer;
