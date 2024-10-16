import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PasswordResetPage from './pages/PasswordResetPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SpeciesSearchPage from './pages/SpeciesSearchPage';
import SpeciesProfilePage from './pages/SpeciesProfilePage';
import MapPage from './pages/MapPage';
import UserPreferencesPage from './pages/UserPreferencesPage';
import TestComponent from './components/TestComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/species" element={<SpeciesSearchPage />} />
        <Route path="/species/:id" element={<SpeciesProfilePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/preferences" element={<UserPreferencesPage />} />
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </Router>
  );
}

export default App;