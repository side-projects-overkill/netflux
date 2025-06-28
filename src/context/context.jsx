// src/context/CartContext.js
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success'); // success, error, info

  const showToastMessage = useCallback((message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastMessage('');
        setToastType('success');
      }, 300); // Clear message after fade out
    }, 3000);
  }, []);

  const addToCart = useCallback((movie) => {
    setCart((prev) => {
      const isAlreadyAdded = prev.find(item => item.id === movie.id);
      if (isAlreadyAdded) {
        showToastMessage(`${movie.title} is already in your cart!`, 'info');
        return prev;
      }
      showToastMessage(`${movie.title} added to cart!`, 'success');
      return [...prev, movie];
    });
  }, [showToastMessage]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const movie = prev.find(item => item.id === id);
      if (movie) {
        showToastMessage(`${movie.title} removed from cart`, 'info');
      }
      return prev.filter(item => item.id !== id);
    });
  }, [showToastMessage]);

  const clearCart = useCallback(() => {
    setCart((prev) => {
      if (prev.length > 0) {
        showToastMessage('Cart cleared successfully', 'info');
      }
      return [];
    });
  }, [showToastMessage]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    toastMessage,
    showToast,
    toastType
  }), [cart, addToCart, removeFromCart, clearCart, toastMessage, showToast, toastType]);

  const getToastIcon = () => {
    switch (toastType) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      default: return '✓';
    }
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      {showToast && (
        <div className={`toast-notification ${toastType} ${showToast ? 'show' : ''}`}>
          <div className="toast-content">
            <span className="toast-icon">{getToastIcon()}</span>
            <span className="toast-message">{toastMessage}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;