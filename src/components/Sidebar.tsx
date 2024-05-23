import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [isParcelsMenuOpen, setIsParcelsMenuOpen] = useState(false);

  const toggleParcelsMenu = () => {
    setIsParcelsMenuOpen(!isParcelsMenuOpen);
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.addButton}>+ Добавить</button>
      <div className={styles.balance}>
        <span>Баланс: $0</span>
        <button className={styles.addBalanceButton}>+</button>
      </div>
      <hr className={styles.separator} />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button onClick={toggleParcelsMenu} className={styles.menuButton}>Посылки</button>
            {isParcelsMenuOpen && (
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}>
                  <Link href="/status/waiting">
                    <span className={styles.navLink}>Ожидаем</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/received">
                    <span className={styles.navLink}>Получили</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/packing">
                    <span className={styles.navLink}>На упаковке</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/shipped">
                    <span className={styles.navLink}>Отправили</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/ready-for-pickup">
                    <span className={styles.navLink}>Готовы к выдаче</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/on-delivery">
                    <span className={styles.navLink}>На доставке</span>
                  </Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/status/delivered">
                    <span className={styles.navLink}>Доставлены</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className={styles.navItem}>
            <Link href="/delivery-cost">
              <span className={styles.navLink}>Стоимость доставки</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/my-addresses">
              <span className={styles.navLink}>Мой адрес</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/help">
              <span className={styles.navLink}>Помощь</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/settings">
              <span className={styles.navLink}>Настройки</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;



