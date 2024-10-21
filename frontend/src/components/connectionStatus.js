// src/components/connectionStatus.js
import React, { useState } from 'react';
import axios from 'axios';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('Not connected');

  const testConnection = async () => {
    try {
      // This is your test data for the POST request
      const entity = { name: "Test Fish Species" };

      // Perform the POST request to the backend
      const response = await axios.post("http://localhost:5232/api/databasetest", entity, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Update the status based on the successful response
      setStatus('Connection successful: Data posted');
      console.log('Response:', response);
    } catch (error) {
      // Update the status in case of an error
      setStatus('Failed to connect');
      console.error('Error while connecting:', error);
    }
  };

  return (
    <div>
      <h2>Backend Connection Status</h2>
      <p>Status: {status}</p>
      <button onClick={testConnection}>Test Connection</button>
    </div>
  );
};

export default ConnectionStatus;
