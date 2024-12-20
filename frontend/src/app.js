import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/splashPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ResetPasswordPage from './pages/resetPasswordPage';
import HomePage from './pages/homePage'; 
import NotAuthorizedPage from './pages/notAuthorizedPage';
import DashboardPage from './pages/dashBoardPage';
import SpeciesSearchPage from './pages/speciesSearchPage';
import SpeciesProfilePage from './pages/speciesProfilePage';
import InteractiveMapPage from './pages/interactiveMapPage';
import UserPreferencesPage from './pages/userPreferencesPage';
import AboutUsPage from './pages/aboutUsPage';
import ContactPage from './pages/contactPage';
import PrivacyPolicyPage from './pages/privacyPolicyPage';
import AdminDashboard from './components/auth/adminDashboard';
import ProtectedRoute from './components/auth/protectedRoute';
import { AuthProvider } from './contexts/authContext';
import FishSpeciesDataPage from './pages/fishSpeciesDataPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />  {/* Home route for regular users */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/species-search" element={<SpeciesSearchPage />} />
          <Route path="/species-profile" element={<SpeciesProfilePage />} />
          <Route path="/interactive-map" element={<InteractiveMapPage />} />
          <Route path="/user-settings" element={<UserPreferencesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
