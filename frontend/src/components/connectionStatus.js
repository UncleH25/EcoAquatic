import React, { useState, useEffect } from 'react';
import { getConnectionStatus } from '../services/api';

const ConnectionStatus = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch connection status on component mount
    const fetchMessage = async () => {
      try {
        const statusMessage = await getConnectionStatus();
        setMessage(statusMessage);
      } catch (error) {
        console.error("Failed to fetch connection status", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Connection Status</h1>
      <p>{message}</p>
    </div>
  );
};

export default ConnectionStatus;
