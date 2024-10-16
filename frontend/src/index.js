import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';  // Import App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure 'root' exists in index.html
);
