import React from 'react';
import '../../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="main-content">
      <div className="top-section">
        <div className="dashboard-card species-count">
          <h2>Endangered Species Count</h2>
        </div>
       
        <div className="dashboard-card recent-threats">
          <h2>Recent Threats</h2>
          <div className="button-container-dashboard">
            <button className="dashboard-button">View Full Reports</button>
            <button className="dashboard-button">View Threat Map</button>
          </div>
        </div>
      </div>
     
      <div className="middle-section">
        <div className="dashboard-card observations">
          <h2>Global Observations</h2>
          <div className="button-container-dashboard">
            <button className="dashboard-button">View Full Observations</button>
          </div>
        </div>
       
        <div className="dashboard-card activity">
          <h2>Your Activity</h2>
          <div className="button-container-dashboard">
            <button className="dashboard-button">View Full Activity History</button>
            <button className="dashboard-button">View Your Full Dashboard</button>
          </div>
        </div>
      </div>
     
      <div className="bottom-section">
        <div className="dashboard-card status-section">
          <div className="status-header">
            <h2>Conservation Status</h2>
            <h2>Species Status</h2>
            <h2>Environmental Conditions</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;