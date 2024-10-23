import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/splashPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage'; 
import NotAuthorizedPage from './pages/notAuthorizedPage';
import DashboardPage from './pages/dashBoardPage';
import SpeciesSearchPage from './pages/speciesSearchPage';
import SpeciesProfilePage from './pages/speciesProfilePage';
import UserPreferencesPage from './pages/userPreferencesPage';
import AdminDashboard from './components/auth/adminDashboard';
import ProtectedRoute from './components/auth/protectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />  {/* Home route for regular users */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/species-search" element={<SpeciesSearchPage />} />
        <Route path="/species-profile" element={<SpeciesProfilePage />} />
        <Route path="/user-settings" element={<UserPreferencesPage />} />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        
        {/* Protect the Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
