import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/netflux" element={<Home />} />
      <Route path="/details" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
