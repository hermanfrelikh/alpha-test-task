import { Product as ProductType } from '../../../types';
import styles from './Product.module.scss';
import Back from '../../ui/Back';
interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  return (
    <div className={styles.product}>
      <Back />
      <h2 className={styles.product__title}>{product.title}</h2>
      <img
        className={styles.product__img}
        src={product.img}
        alt="фото карточки"
      />
      <p>{product.description}</p>
    </div>
  );
}
