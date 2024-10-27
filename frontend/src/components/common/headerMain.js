import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import '../../styles/global.css';
import logo from '../../assets/logos/EcoAquatic_Logo.png';

const HeaderMain = () => {
  return (
    <header className="header-main">
      <NavLink to="/home" className="logo-container-main">
        <img 
          src={logo}
          alt="EcoAquatic Logo" 
          className="logo-main"
        />
      </NavLink>

      <nav className="nav-links">
        <NavLink 
          to="/home"
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/species-search"
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span>Species Search</span>
        </NavLink>
        
        <NavLink 
          to="/species-profile"
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span>Species Profiles</span>
        </NavLink>
        
        <NavLink 
          to="/interactive-map"
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span>Interactive Map</span>
        </NavLink>
      </nav>
      
      <NavLink to="/user-settings" className="user-icon">
        <UserCircle size={40} />
      </NavLink>
    </header>
  );
};

export default HeaderMain;