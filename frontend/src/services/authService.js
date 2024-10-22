import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
  },

  signup: async (fullName, instituteName, email, password) => {
    await axios.post("/api/auth/signup", { fullName, instituteName, email, password });
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  }
};

export default AuthService;
