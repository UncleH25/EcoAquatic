import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage'; 
import NotAuthorizedPage from './pages/notAuthorizedPage';
import ProtectedRoute from './components/auth/protectedRoute';
import AdminDashboard from './components/auth/adminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />  {/* Home route for regular users */}
        
        {/* Protect the Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
