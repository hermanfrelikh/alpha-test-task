import { Link } from 'react-router';
import styles from './CreateProductButton.module.scss';
export default function CreateProductButton() {
  return (
    <Link to="/create-product">
      <button className={styles.button}>+</button>
    </Link>
  );
}
