import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <header className="netflix-header" >
      <div className="logo" onClick={navigateToHome}>Netflux</div>
      <nav>
        <a href="/">Home</a>
        <a href="/netflux/cart">Cart</a>
        <a href="/netflux/checkout">Checkout</a>
      </nav>
    </header>
  );
}

export default Header;
