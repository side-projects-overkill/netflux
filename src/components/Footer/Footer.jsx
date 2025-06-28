import React from 'react';
import './Footer.scss'; 

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="netflix-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Netflux</h3>
            <p>Your ultimate destination for digital movie streaming</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/netflux">Home</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/checkout">Checkout</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#youtube" aria-label="YouTube">📺</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} Netflux. All rights reserved.</p>
          <p>Made with ❤️ for movie lovers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
