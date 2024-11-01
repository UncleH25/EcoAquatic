import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import dotenv from 'dotenv';
dotenv.config();
const { ApiConfigs, ApiClients } = require('./apiConfig');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);