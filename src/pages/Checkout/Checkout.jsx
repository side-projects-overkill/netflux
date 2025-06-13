import React, { useState } from 'react';
import './Checkout.scss';

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    paymentMethod: 'credit',
  });

  // Mock selected movies
  const selectedMovies = [
  ];

  const total = selectedMovies.reduce((sum, movie) => sum + movie.price, 0).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.fullName}! Your order has been placed.`);
  };

  return (
    <>
      <main className="checkout-page">
        <h2>Checkout</h2>
        <div className="checkout-container">
          <section className="order-summary">
            <h3>Your Order</h3>
            {selectedMovies.map((movie, idx) => (
              <div key={idx} className="order-item">
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p>{movie.title}</p>
                  <p>${movie.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ${total}</strong>
            </div>
          </section>

          <section className="checkout-form">
            <h3>Billing Information</h3>
            <form onSubmit={handleCheckout}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="upi">UPI</option>
              </select>
              <button type="submit" className="buy-btn">
                Place Order
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default Checkout;
