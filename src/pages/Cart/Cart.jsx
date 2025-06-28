import React from 'react';
import { useCart } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import "./Cart.scss";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, movie) => sum + movie.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/netflux');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any movies to your cart yet.</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <button 
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((movie) => (
              <div key={movie.id} className="cart-item">
                <div className="cart-item__image">
                  <img src={movie.poster} alt={movie.title} />
                </div>
                <div className="cart-item__details">
                  <h3 className="cart-item__title">{movie.title}</h3>
                  <p className="cart-item__year">{movie.year}</p>
                  <p className="cart-item__genre">{movie.genre}</p>
                </div>
                <div className="cart-item__price">
                  <span className="price">${movie.price.toFixed(2)}</span>
                </div>
                <div className="cart-item__actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({cart.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
              <div className="summary-actions">
                <button 
                  className="continue-shopping-btn"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
