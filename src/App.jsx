import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import Details from './pages/Details/Details';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/netflux" element={<Home />} />
      <Route sensitive={false} path="/details/:title" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
