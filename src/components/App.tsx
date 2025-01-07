import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import { Movie } from '../types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

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
        setMovies(data.films);
        // console.log(data.films);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products movies={movies} />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
