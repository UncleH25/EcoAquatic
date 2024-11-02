import axios from 'axios';

const API_URL = 'http://localhost:5232/api/auth'; // Update with your API URL

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  register: async (fullName, instituteName, email, password) => {
    return await axios.post(`${API_URL}/register`, {
      fullName,
      instituteName,
      email,
      password
    });
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setAuthHeader: () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};

export default authService;