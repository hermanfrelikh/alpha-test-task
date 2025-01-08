import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Products.module.scss';
import ProductsItem from '../../ui/ProductsItem';
import CreateProductButton from '../../ui/CreateProductButton';
import {
  deleteProduct,
  toggleFavorite,
} from '../../../features/products/productsSlice';
import { RootState } from '../../../app/store';

interface ProductsProps {}

export default function Products({}: ProductsProps) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.value);
  const [filter, setFilter] = useState<string>('Все');

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleFavoriteToggle = (id: number, favorites: boolean) => {
    dispatch(toggleFavorite({ id, favorites }));
  };

  const filteredProducts =
    filter === 'Избранные'
      ? products.filter((product) => product.favorites)
      : products;

  // Reverse the order of filteredProducts
  const reversedFilteredProducts = [...filteredProducts].reverse();

  return (
    <>
      <CreateProductButton />
      <div className={styles.products}>
        <h1 className={styles.products__title}>Список карточек</h1>
        <div className={styles.products__filters}>
          {filter === 'Все' ? (
            <p className={styles.products__filtersItem_active}>Все</p>
          ) : (
            <p
              onClick={() => setFilter('Все')}
              className={styles.products__filtersItem}
            >
              Все
            </p>
          )}

          {filter === 'Избранные' ? (
            <p className={styles.products__filtersItem_active}>Избранные</p>
          ) : (
            <p
              onClick={() => setFilter('Избранные')}
              className={styles.products__filtersItem}
            >
              Избранные
            </p>
          )}
        </div>

        <ol className={styles.products__list}>
          {reversedFilteredProducts.map((product) => (
            <ProductsItem
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
