import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { UserContext } from './UserContext';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!userContext) {
    return null;
  }

  const { user } = userContext;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
            <h1 className={styles.textlogo}>GetIKEA</h1> 
        </Link>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search your parcels" className={styles.searchInput} />
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
                <Link href="/login">Выйти</Link>
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
