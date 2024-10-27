import React from 'react';
import '../../styles/global.css';
import logo from '../../assets/logos/EcoAquatic_Logo.png';  // Adjust the path if necessary

const HeaderOther = () => {
    return (
        <header className="header-other">
            <div className="logo-container-other">
                <img src={logo} alt="EcoAquatic Logo" className="logo-other" />
            </div>
        </header>
    );
};

export default HeaderOther;
