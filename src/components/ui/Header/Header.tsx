import { Link } from 'react-router';
import styles from './Header.module.scss';
export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to="/">
        <h1>Header</h1>
      </Link>
    </header>
  );
}
