import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/splashPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import DashboardPage from './pages/dashboardPage';
import SpeciesSearchPage from './pages/speciesSearchPage';
import SpeciesProfilePage from './pages/speciesProfilePage';
import UserPreferencesPage from './pages/userPreferencesPage';
import PasswordResetPage from './pages/passwordResetPage';
import InteractiveMapPage from './pages/interactiveMapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/species-search" element={<SpeciesSearchPage />} />
        <Route path="/species-profile" element={<SpeciesProfilePage />} />
        <Route path="/user-preferences" element={<UserPreferencesPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/interactive-map" element={<InteractiveMapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
