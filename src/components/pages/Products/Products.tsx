import { useState, useEffect } from 'react';
import styles from './Products.module.scss';
import ProductsItem from '../../ui/ProductsItem';
import { Product } from '../../../types';
import CreateProductButton from '../../ui/CreateProductButton';

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  const [filter, setFilter] = useState<string>('Все');
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleDeleteProduct = (id: number) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  const filteredProducts =
    filter === 'Избранные'
      ? productList.filter((product) => product.favorites)
      : productList;

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
          {filteredProducts.map((product) => (
            <ProductsItem
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
