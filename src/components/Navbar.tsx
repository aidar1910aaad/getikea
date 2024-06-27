import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from './UserContext';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Перенаправление на страницу логина после выхода
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h1 className={styles.textlogo}>GetIKEA</h1>
        </Link>
      </div>

      <div className={styles.user}>
        {user ? (
          <Link href="/login">
            <span className={styles.link} onClick={handleLogout}>Выйти</span>
          </Link>
        ) : (
          <Link href="/login">
            <span className={styles.button}>Войти</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


