import { Link } from 'react-router-dom';
import styles from './ProductsItem.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

interface ProductsItemProps {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductsItem({ product, onDelete }: ProductsItemProps) {
  const [favorite, setFavorite] = useState<boolean>(product.favorites);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorite(!favorite);
    product.favorites = !favorite; // Обновляем состояние избранного в объекте продукта
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete(product.id);
  };

  return (
    <Link className={styles.item__link} to={`/products/${product.id}`}>
      <li className={styles.item}>
        <p className={styles.item__title}>{product.title}</p>
        <img
          className={styles.item__img}
          src={product.img}
          height="250px"
          alt="фото карточки"
        />
        <p className={styles.item__description}>
          Таким образом консультация с широким активом обеспечивает широкому...
        </p>
        <div className={styles.item__icons}>
          {favorite === false ? (
            <FavoriteBorderIcon
              style={{ fontSize: '28px' }}
              className={styles.item__icon}
              onClick={handleFavoriteClick}
            />
          ) : (
            <FavoriteIcon
              style={{ fontSize: '28px' }}
              className={styles.item__icon}
              onClick={handleFavoriteClick}
            />
          )}
          <DeleteOutlineIcon
            style={{ fontSize: '28px' }}
            className={styles.item__icon}
            onClick={handleDeleteClick}
          />
        </div>
      </li>
    </Link>
  );
}
