import React from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <nav>
      <ul className={styles.links}>
        <li>© 2024 SmartShipping.kz</li>
        <li>
          <Link href="/privacy-policy">Политика конфиденциальности</Link>
        </li>
        <li>
          <Link href="/user-agreement">Соглашение с пользователем</Link>
        </li>
        <li>
          <Link href="/status">Статус</Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
