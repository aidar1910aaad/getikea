import React, { useState, useEffect } from 'react';
import styles from '../styles/DeliveryCostPage.module.css';
import { FaUsb, FaBook, FaLaptop, FaShoppingBag, FaMobileAlt, FaTabletAlt, FaTv, FaCamera, FaBicycle } from 'react-icons/fa';
import ProtectedRoute from '@/components/ProtectedRoute';

const cities = ["Алматы", "Нур-Султан", "Шымкент", "Караганда", "Актобе", "Тараз", "Павлодар", "Усть-Каменогорск", "Семей", "Актау"];

const DeliveryCostPage: React.FC = () => {
  const [weight, setWeight] = useState(0.5);
  const [cost, setCost] = useState(weight * 13);
  const [courierWeight, setCourierWeight] = useState(0.5);
  const [courierCost, setCourierCost] = useState(0); // Примерное значение стоимости курьера
  const [totalCost, setTotalCost] = useState(0); // Общая стоимость в тенге
  const [fromCity, setFromCity] = useState(cities[0]);
  const [toCity, setToCity] = useState(cities[1]);
  const [isExpress, setIsExpress] = useState(false);

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(event.target.value);
    setWeight(newWeight);
    setCost(newWeight * 13);
  };

  const icons = [
    { name: 'Флешка', weight: 0.1, icon: <FaUsb /> },
    { name: 'Мобильный телефон', weight: 0.3, icon: <FaMobileAlt /> },
    { name: 'Книга', weight: 0.5, icon: <FaBook /> },
    { name: 'Планшет', weight: 1, icon: <FaTabletAlt /> },
    { name: 'Фотоаппарат', weight: 1.5, icon: <FaCamera /> },
    { name: 'Ноутбук', weight: 2, icon: <FaLaptop /> },
    { name: 'Рюкзак', weight: 3, icon: <FaShoppingBag /> },
    { name: 'Телевизор', weight: 5, icon: <FaTv /> },
    { name: 'Велосипед', weight: 9, icon: <FaBicycle /> }
  ];

  const getTranslateX = () => {
    const iconWidths = icons.map(icon => 110); // ширина каждого элемента
    const activeIndex = icons.findIndex(icon => weight < icon.weight);

    if (activeIndex === 0) return 0; // Если активный элемент первый, не сдвигать

    if (activeIndex === icons.length) {
      // Если активный элемент последний
      const totalWidth = iconWidths.reduce((acc, width) => acc + width, 0);
      return `calc(100% - ${totalWidth}px)`;
    }

    // Центрирование активного элемента
    const centerOffset = (iconWidths[activeIndex] / 2);
    const offset = iconWidths.slice(0, activeIndex).reduce((acc, width) => acc + width, 0) - centerOffset;
    return `calc(50% - ${offset}px)`;
  };

  const translateX = getTranslateX();

  const calculateTotalCost = () => {
    const exchangeRate = 430;
    const baseCost = courierWeight * (isExpress ? 20 : 10); // Примерные ставки для стандарта и экспресса
    setCourierCost(baseCost);
    setTotalCost(baseCost * exchangeRate);
  };

  useEffect(() => {
    const firstIcon = document.querySelector(`.${styles.iconItem}`);
    if (firstIcon) {
      (firstIcon as HTMLElement).style.marginLeft = '0px';
    }
  }, []);

  return (
    <ProtectedRoute requiredRole='user'>
    <div className={styles.container}>
      <h1 >Стоимость доставки</h1>
      <p className={styles.description}>
        В списке можно выбрать популярные товары и узнать примерную стоимость их доставки.
      </p>

      <div className={styles.weightCostContainer}>
        <div className={styles.valueContainer}>
          <div className={styles.leftValue}>
            <p className={styles.valueLabel}>Вес посылки, кг ({(weight * 2.20462).toFixed(1)} lbs)</p>
            <p className={styles.value}>{weight.toFixed(1)} кг</p>
          </div>
          <div className={styles.rightValue}>
            <p className={styles.valueLabel}>Стоимость</p>
            <p className={styles.value}>{cost.toFixed(2)} USD</p>
          </div>
        </div>
        <input
          type="range"
          id="weightRange"
          min="0.1"
          max="10"
          step="0.1"
          value={weight}
          onChange={handleWeightChange}
          className={styles.rangeInput}
        />

        <div className={styles.iconsContainer}>
          <div className={styles.iconsWrapper} style={{ transform: `translateX(${translateX})` }}>
            {icons.map((icon, index) => {
              const isActive = weight >= icon.weight && (index === icons.length - 1 || weight < icons[index + 1].weight);
              return (
                <div
                  key={icon.name}
                  className={`${styles.iconItem} ${isActive ? styles.active : ''}`}
                >
                  <div className={styles.iconImage}>{icon.icon}</div>
                  <p className={styles.iconText}>{icon.name}</p>
                  <p className={styles.iconText}>{icon.weight} кг</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
    </div>
    </ProtectedRoute>
  );
};

export default DeliveryCostPage;
