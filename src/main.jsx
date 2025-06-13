import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./components/Header/Header"
import "./components/Footer/Footer"
import App from './App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_GITHUB_REPOSITORY ? `/${import.meta.env.VITE_GITHUB_REPOSITORY.split('/')[1]}` : ''}>
      <Header />
        <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
