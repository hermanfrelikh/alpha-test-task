import { Movie } from '../../../types';

interface ProductsProps {
  movies: Movie[];
}

export default function Products({ movies }: ProductsProps) {
  console.log(movies);
  return <div>Products</div>;
}
