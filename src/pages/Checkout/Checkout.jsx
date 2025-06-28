import React, { useCallback } from 'react';
import { useCart } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';

function Checkout() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, movie) => sum + movie.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleProceedToPayment = useCallback(() => {
    navigate('/payment');
  }, [navigate]);

  const handleContinueShopping = useCallback(() => {
    navigate('/netflux');
  }, [navigate]);

  const handleRemoveItem = useCallback((movieId) => {
    removeFromCart(movieId);
  }, [removeFromCart]);

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <div className="empty-checkout-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Add some movies to your cart before checking out.</p>
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
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Review Your Order</h2>
        </div>
        
        <div className="checkout-content">
          <section className="order-review">
            <div className="order-header">
              <h3>Order Summary</h3>
              <span className="item-count">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            <div className="order-items">
              {cart.map((movie) => (
                <div key={movie.id} className="order-item">
                  <div className="item-image">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">{movie.title}</h4>
                    <p className="item-year">{movie.year}</p>
                    {movie.genre && <p className="item-genre">{movie.genre}</p>}
                  </div>
                  <div className="item-actions">
                    <p className="item-price">${movie.price.toFixed(2)}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(movie.id)}
                      title={`Remove ${movie.title} from cart`}
                      aria-label={`Remove ${movie.title} from cart`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row shipping">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button 
                className="proceed-payment-btn"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment →
              </button>
            </div>
          </section>

          <section className="checkout-info">
            <div className="info-card security-card">
              <div className="info-header">
                <h4>🔒 Secure Checkout</h4>
              </div>
              <ul className="security-features">
                <li>✓ SSL Encrypted Payment</li>
                <li>✓ Money-back Guarantee</li>
                <li>✓ 24/7 Customer Support</li>
                <li>✓ Instant Digital Delivery</li>
              </ul>
            </div>

            <div className="info-card payment-card">
              <div className="info-header">
                <h4>💳 Payment Methods</h4>
              </div>
              <div className="payment-icons">
                <div className="payment-method">💳 Credit Card</div>
                <div className="payment-method">💳 Debit Card</div>
                <div className="payment-method">🏦 PayPal</div>
                <div className="payment-method">📱 UPI</div>
              </div>
            </div>

            <div className="info-card delivery-card">
              <div className="info-header">
                <h4>📦 Delivery Info</h4>
              </div>
              <ul className="delivery-features">
                <li>📧 Instant email delivery</li>
                <li>🔗 Download links included</li>
                <li>♾️ Lifetime access</li>
                <li>📱 Stream on any device</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
