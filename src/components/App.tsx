import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
