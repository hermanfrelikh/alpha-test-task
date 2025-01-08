import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import Layout from './Layout';
import { useEffect } from 'react';
import CreateProduct from './pages/CreateProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { RootState } from '../app/store';

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.value);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        {products.map((product) => (
          <Route
            key={product.id}
            path={`/products/${product.id}`}
            element={<Product product={product} />}
          />
        ))}
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
