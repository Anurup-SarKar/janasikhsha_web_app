// main.jsx
// Entry point for the Janasiksha Prochar Kendra React application.
// Renders the App component into the root DOM node and applies global styles.
// Uses React 18+ createRoot API and StrictMode for best practices.

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Main render function
 * Mounts the App component into the #root element
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
