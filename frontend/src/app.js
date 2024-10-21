import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';

// App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>App</h1>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;