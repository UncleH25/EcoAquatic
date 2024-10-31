import React, { useState } from 'react';
import '../../../styles/sidebar.css';

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.querySelector('.main-content').classList.toggle('left-sidebar-open');
  };

  return (
    <>
      <button 
        className={`left-sidebar-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      />
      <div className={`left-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="left-sidebar-content">
          <h2 className="left-sidebar-heading">Filter By Taxonomy</h2>
          <div className="filter-section">
            <div>Taxonomies</div>
          </div>
          
          <h2 className="left-sidebar-heading">Filter By Observation Date</h2>
          <div className="filter-section">
            <div>Observation Timelines</div>
          </div>
          
          <h2 className="left-sidebar-heading">Custom Filter</h2>
          <div className="filter-section">
            <div>Custom Filters</div>
          </div>

          <div className='button-container-leftbar'>
            <button className="apply-filters btn-apply-filters">Apply Filters</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default LeftSidebar;