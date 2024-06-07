import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './UserContext';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h1 className={styles.textlogo}>GetIKEA</h1>
        </Link>
      </div>

      <div className={styles.user}>
        {user ? (
         
         <Link className={styles.link} href="/login">Выйти</Link>
         
        ) : (
          <Link className={styles.button} href="/login">Войти</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

