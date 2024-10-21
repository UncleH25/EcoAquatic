import axios from 'axios';

const API_BASE_URL = "http://localhost:5232/api";

// Fetch connection status from the backend
export const getConnectionStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/connection`);
    return response.data;
  } catch (error) {
    console.error("Error fetching connection status:", error);
    throw error;
  }
};