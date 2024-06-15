import React from 'react';
import styles from '../styles/RightPanel.module.css';

const RightPanel: React.FC = () => (
  <div className={styles.rightPanel}>
    <h2>Обратите внимание</h2>
    <div className={styles.block}>
      <h3>Экономьте на покупках</h3>
      <p>На нашем складе в штате Delaware (DE) нет налогов, вы экономите до 9% от стоимости заказа.</p>
      <p>Используйте кэшбэк сервис и получайте возврат до 15% от стоимости заказ.</p>
    </div>
    <div className={styles.block}>
      <h3>Где покупать в США?</h3>
      <p>Рекомендуем покупать только в проверенных интернет-магазинах, мы следим за отзывами и рейтингами всех магазинов.</p>
      <p>Проверенные магазины.</p>
    </div>
  </div>
);

export default RightPanel;
