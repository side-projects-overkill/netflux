import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import './Payment.scss';

function Payment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Redirect to cart if no items
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  const subtotal = cart.reduce((sum, movie) => sum + movie.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  // Format CVV (numbers only)
  const formatCVV = (value) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on field type
    switch (name) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvv':
        formattedValue = formatCVV(value);
        break;
      case 'zipCode':
        formattedValue = value.replace(/\D/g, '').slice(0, 10);
        break;
      default:
        formattedValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  const validateExpiryDate = (expiryDate) => {
    const match = expiryDate.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10) + 2000;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    return month >= 1 && month <= 12 && 
           (year > currentYear || (year === currentYear && month >= currentMonth));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    // Payment method specific validation
    if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!validateExpiryDate(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid future date (MM/YY)';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'CVV must be 3-4 digits';
      }
      
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) element.focus();
      }
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      clearCart();
      navigate('/netflux');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <button 
            className="back-button" 
            onClick={handleBackToCheckout}
            disabled={isProcessing}
          >
            ← Back to Checkout
          </button>
          <h2>Complete Your Payment</h2>
        </div>

        <div className="payment-content">
          <section className="order-summary-mini">
            <h3>Order Summary</h3>
            <div className="summary-items">
              <div className="summary-row">
                <span>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <section className="payment-form">
            <form onSubmit={handlePayment} noValidate>
              <div className="form-section">
                <h3>Billing Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.fullName && touchedFields.fullName ? 'error' : ''}
                      disabled={isProcessing}
                      autoComplete="name"
                    />
                    {errors.fullName && touchedFields.fullName && (
                      <span className="error-message">{errors.fullName}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.email && touchedFields.email ? 'error' : ''}
                      disabled={isProcessing}
                      autoComplete="email"
                    />
                    {errors.email && touchedFields.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={errors.address && touchedFields.address ? 'error' : ''}
                    disabled={isProcessing}
                    autoComplete="street-address"
                  />
                  {errors.address && touchedFields.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.city && touchedFields.city ? 'error' : ''}
                      disabled={isProcessing}
                      autoComplete="address-level2"
                    />
                    {errors.city && touchedFields.city && (
                      <span className="error-message">{errors.city}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Enter ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.zipCode && touchedFields.zipCode ? 'error' : ''}
                      disabled={isProcessing}
                      autoComplete="postal-code"
                    />
                    {errors.zipCode && touchedFields.zipCode && (
                      <span className="error-message">{errors.zipCode}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.country && touchedFields.country ? 'error' : ''}
                      disabled={isProcessing}
                      autoComplete="country"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IN">India</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                    {errors.country && touchedFields.country && (
                      <span className="error-message">{errors.country}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                
                <div className="payment-methods">
                  {[
                    { value: 'credit', label: 'Credit Card', icon: '💳' },
                    { value: 'debit', label: 'Debit Card', icon: '💳' },
                    { value: 'paypal', label: 'PayPal', icon: '🏦' },
                    { value: 'upi', label: 'UPI', icon: '📱' }
                  ].map(method => (
                    <label key={method.value} className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                      />
                      <span className="payment-method-label">
                        <span className="method-icon">{method.icon}</span>
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>

                {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                  <div className="card-details">
                    <div className="form-group">
                      <label htmlFor="cardName">Cardholder Name *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder="Name on card"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={errors.cardName && touchedFields.cardName ? 'error' : ''}
                        disabled={isProcessing}
                        autoComplete="cc-name"
                      />
                      {errors.cardName && touchedFields.cardName && (
                        <span className="error-message">{errors.cardName}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={errors.cardNumber && touchedFields.cardNumber ? 'error' : ''}
                        disabled={isProcessing}
                        autoComplete="cc-number"
                        maxLength="19"
                      />
                      {errors.cardNumber && touchedFields.cardNumber && (
                        <span className="error-message">{errors.cardNumber}</span>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.expiryDate && touchedFields.expiryDate ? 'error' : ''}
                          disabled={isProcessing}
                          autoComplete="cc-exp"
                          maxLength="5"
                        />
                        {errors.expiryDate && touchedFields.expiryDate && (
                          <span className="error-message">{errors.expiryDate}</span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.cvv && touchedFields.cvv ? 'error' : ''}
                          disabled={isProcessing}
                          autoComplete="cc-csc"
                          maxLength="4"
                        />
                        {errors.cvv && touchedFields.cvv && (
                          <span className="error-message">{errors.cvv}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={handleBackToCheckout}
                  disabled={isProcessing}
                >
                  Back to Checkout
                </button>
                <button 
                  type="submit" 
                  className="pay-now-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing">
                      <span className="spinner"></span>
                      Processing Payment...
                    </span>
                  ) : (
                    `Pay Now - $${total.toFixed(2)}`
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        {isProcessing && (
          <div className="processing-overlay">
            <div className="processing-modal">
              <div className="processing-spinner"></div>
              <h3>Processing Your Payment</h3>
              <p>Please don't close this window...</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment; 