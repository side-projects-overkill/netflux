import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_GITHUB_REPOSITORY ? `/${import.meta.env.VITE_GITHUB_REPOSITORY.split('/')[1]}` : ''}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
