import React from 'react';
import Link from 'next/link';
import styles from '../styles/TopBar.module.css';

const TopBar: React.FC = () => (
  <div className={styles.topBar}>
    <div className={styles.left}>
      <Link href="/" className={styles.companyName}>GetIkea</Link>
    </div>
    <div className={styles.right}>
      <Link href="/login" className={styles.link}>Login</Link>
      <Link href="/signup" className={styles.link}>Register</Link>
    </div>
  </div>
);

export default TopBar;
