import { Link } from 'react-router-dom';
import styles from './ProductsItem.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteProduct,
  toggleFavorite,
} from '../../../features/products/productsSlice';

interface ProductsItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onFavoriteToggle: (id: number, favorites: boolean) => void;
}

export default function ProductsItem({ product }: ProductsItemProps) {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState<boolean>(product.favorites);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    dispatch(toggleFavorite({ id: product.id, favorites: newFavoriteStatus }));
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(deleteProduct(product.id));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  return (
    <Link className={styles.item__link} to={`/products/${product.id}`}>
      <li className={styles.item}>
        <p className={styles.item__title}>{truncateText(product.title, 25)}</p>
        <img
          className={styles.item__img}
          src={product.img}
          alt="фото карточки"
        />
        <p className={styles.item__description}>
          {truncateText(product.description, 65)}
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
