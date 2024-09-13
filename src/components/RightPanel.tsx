import React from 'react';
import styles from '../styles/RightPanel.module.css';

const linkStyle = {
  color: 'inherit', // Убирает фиолетовый цвет
  textDecoration: 'underline', // Оставляет подчеркивание
  textDecorationColor: '#FDC503', // Устанавливает цвет подчеркивания
};

const RightPanel: React.FC = () => (
  <div className={styles.rightPanel}>
    <h2>Обратите внимание</h2>
    <div className={styles.block}>
      <h3>Smart shipping - это сервис по доставке товаров IKEA из Китая.</h3>
      <p>Доверьте нам доставку ваших покупок IKEA. Зарегистрируйтесь на сайте, добавляйте номера отправлений покупок в личном кабинете и ожидайте их скорого прибытия в Казахстан. Поможем оплатить покупку товаров IKEA на сайте ikea.cn. Делаем доставку быстро, надежно и с заботой о посылке.</p>
    </div>
    <div className={styles.block}>
      <h3>Следи за инсайдами от <a href="https://www.instagram.com/smartshipping.kz/" target="_blank" rel="noopener noreferrer" style={linkStyle}>smartshipping.kz</a></h3>
      <p>В Instagram мы рассказываем о сезонных и незапланированных распродажах в магазине, скидываем выгодные лоты, а также делимся другим полезным контентом.</p>
    </div>
  </div>
);

export default RightPanel;
