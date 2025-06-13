import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/context';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <header className="netflix-header" >
      <div className="logo" onClick={navigateToHome}>Netflux</div>
      <nav>
        <a href="/">Home</a>
        <a href="/netflux/cart">Cart ({cart.length})</a>
        <a href="/netflux/checkout">Checkout</a>
      </nav>
    </header>
  );
}

export default Header;
