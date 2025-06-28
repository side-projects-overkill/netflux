import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/context';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToHome = () => {
    navigate('/netflux');
  };

  const isPaymentPage = location.pathname === '/payment';
  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <header className={`netflix-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={navigateToHome}>
        Netflux
      </div>
      <nav>
        <Link to="/netflux" className={location.pathname === '/netflux' ? 'active' : ''}>
          Home
        </Link>
        <Link 
          to="/cart" 
          className={`cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
        >
          Cart ({cart.length})
        </Link>
        {cart.length > 0 && !isPaymentPage && (
          <Link 
            to="/checkout" 
            className={isCheckoutPage ? 'active' : ''}
          >
            Checkout
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
