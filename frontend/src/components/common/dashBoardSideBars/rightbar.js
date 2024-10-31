import React, { useState } from 'react';
import '../../../styles/sidebar.css';

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsOpen(!isOpen);
    document.querySelector('.main-content').classList.toggle('right-sidebar-open');
  };

  return (
    <>
      <button 
        className={`right-sidebar-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleRightSidebar}
      />
      <div className={`right-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="right-sidebar-content">
          <h2 className="right-sidebar-heading">Recent Alerts</h2>
          <div className="alert-section">
            <div>Alerts</div>
          </div>
          <h2 className="right-sidebar-heading">Custom Alerts</h2>
          <div className="alert-section">
            <div>Custom Alerts</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;