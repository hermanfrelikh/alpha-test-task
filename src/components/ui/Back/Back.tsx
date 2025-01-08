import { Link } from 'react-router';
import styles from './Back.module.scss';
export default function Back() {
  return (
    <Link className={styles.back} to="/">
      Назад
    </Link>
  );
}
