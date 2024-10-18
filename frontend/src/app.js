import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/mainLayout';
import SplashPage from './pages/splashPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import LoginInstitutionPage from './pages/loginInstitutionPage';
import SignupPage from './pages/signupPage';
import SignupInstitutionPage from './pages/signupInstitutionPage';
import DashboardPage from './pages/dashboardPage';
import SpeciesSearchPage from './pages/speciesSearchPage';
import SpeciesProfilesPage from './pages/speciesProfilesPage';
import UserPreferencesPage from './pages/userPreferencesPage';
import PasswordResetPage from './pages/passwordResetPage';
import InteractiveMapPage from './pages/interactiveMapPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-with-your-institution" element={<LoginInstitutionPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup-with-your-institution" element={<SignupInstitutionPage />} />
      <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/species-search" element={<SpeciesSearchPage />} />
          <Route path="/species-profiles" element={<SpeciesProfilesPage />} />
          <Route path="/user-preferences" element={<UserPreferencesPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/interactive-map" element={<InteractiveMapPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
