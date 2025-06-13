import React from 'react';
import './Header.scss';

function Header() {
  return (
    <header className="netflix-header">
      <div className="logo">🎬 Netflix Clone</div>
      <nav>
        <a href="/">Home</a>
        <a href="/netflux/cart">Cart</a>
        <a href="/netflux/checkout">Checkout</a>
      </nav>
    </header>
  );
}

export default Header;
