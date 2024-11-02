import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = authService.getToken();
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          handleLogout();
        } else {
          setUser({
            email: decoded.email,
            roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          });
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token } = response.data;
      const decoded = jwtDecode(token);
      
      setUser({
        email: decoded.email,
        roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      });
      setIsAuthenticated(true);

      // Redirect based on role
      if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes("Admin")) {
        navigate('/admin');
      } else {
        navigate('/home');
      }

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    hasRole,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};