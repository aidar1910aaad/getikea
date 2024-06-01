import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './UserContext';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h1 className={styles.textlogo}>GetIKEA</h1> 
        </Link>
      </div>
      
      <div className={styles.user}>
        {user ? (
          <>
            <span onClick={() => setMenuOpen(!menuOpen)} className={styles.userName}>
              Hello, {user.name}
            </span>
            {menuOpen && (
              <div className={styles.menu}>
                <Link href="/settings">Настройки</Link>
                <button onClick={logout} className={styles.button}>Выйти</button>
              </div>
            )}
          </>
        ) : (
          <Link className={styles.button} href="/login">Войти</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
