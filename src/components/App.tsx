import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import CreateProduct from './pages/CreateProduct';

interface Product {
  id: number;
  title: string;
  description: string;
  img: string;
  favorites: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
          {
            method: 'GET',
            headers: {
              'X-API-KEY': 'f74db4e6-d859-4aba-bc0b-99c1fae26724',
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();

        const newProducts = data.films.map((movie: any) => ({
          id: movie.filmId,
          title: movie.nameRu || movie.nameEn || 'Untitled',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          img: movie.posterUrl,
          favorites: false,
        }));

        setProducts(newProducts);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  console.log(products);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products products={products} />} />
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
