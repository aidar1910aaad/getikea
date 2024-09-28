import React from "react";
import Link from "next/link";
import styles from "../styles/TopBar.module.css";

const TopBar: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <Link className={styles.nolink} href="/" passHref>
        <span className={styles.logo}>SS</span>
      </Link>
      <div className={styles.links}>
        <Link className={styles.nolink} href="/login" passHref>
          <span className={styles.link}>Вход</span>
        </Link>
        <Link className={styles.nolink} href="/signup" passHref>
          <span className={styles.link}>Регистрация</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
