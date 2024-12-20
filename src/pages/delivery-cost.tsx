import React, { useState, useEffect } from "react";
import styles from "../styles/DeliveryCostPage.module.css";
import {
  FaUsb,
  FaBook,
  FaLaptop,
  FaShoppingBag,
  FaMobileAlt,
  FaTabletAlt,
  FaTv,
  FaCamera,
  FaBicycle,
} from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";

const cities = [
  "Алматы",
  "Нур-Султан",
  "Шымкент",
  "Караганда",
  "Актобе",
  "Тараз",
  "Павлодар",
  "Усть-Каменогорск",
  "Семей",
  "Актау",
];

const DeliveryCostPage: React.FC = () => {
  const [weight, setWeight] = useState(1);
  const [cost, setCost] = useState(weight * 5.5);
  const [courierWeight, setCourierWeight] = useState(0.5);
  const [courierCost, setCourierCost] = useState(0); // Примерное значение стоимости курьера
  const [totalCost, setTotalCost] = useState(0); // Общая стоимость в тенге
  const [fromCity, setFromCity] = useState(cities[0]);
  const [toCity, setToCity] = useState(cities[1]);
  const [isExpress, setIsExpress] = useState(false);

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(event.target.value);
    setWeight(newWeight);
    calculateDeliveryCost(newWeight);
  };

  const icons = [
    { name: "Флешка", weight: 0.1, icon: <FaUsb /> },
    { name: "Мобильный телефон", weight: 0.3, icon: <FaMobileAlt /> },
    { name: "Книга", weight: 0.5, icon: <FaBook /> },
    { name: "Планшет", weight: 1, icon: <FaTabletAlt /> },
    { name: "Фотоаппарат", weight: 1.5, icon: <FaCamera /> },
    { name: "Ноутбук", weight: 2, icon: <FaLaptop /> },
    { name: "Рюкзак", weight: 3, icon: <FaShoppingBag /> },
    { name: "Телевизор", weight: 5, icon: <FaTv /> },
    { name: "Велосипед", weight: 9, icon: <FaBicycle /> },
  ];

  const getTranslateX = () => {
    const iconWidths = icons.map((icon) => 110); // ширина каждого элемента
    const activeIndex = icons.findIndex((icon) => weight < icon.weight);

    if (activeIndex === 0) return 0; // Если активный элемент первый, не сдвигать

    if (activeIndex === icons.length) {
      // Если активный элемент последний
      const totalWidth = iconWidths.reduce((acc, width) => acc + width, 0);
      return `calc(100% - ${totalWidth}px)`;
    }

    // Центрирование активного элемента
    const centerOffset = iconWidths[activeIndex] / 2;
    const offset =
      iconWidths.slice(0, activeIndex).reduce((acc, width) => acc + width, 0) -
      centerOffset;
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
      (firstIcon as HTMLElement).style.marginLeft = "0px";
    }
  }, []);

  const calculateDeliveryCost = (weight: number) => {
    let costPerKg = 0;
    if (weight <= 25) {
      costPerKg = 5.5;
    } else if (weight <= 50) {
      costPerKg = 5;
    } else if (weight <= 75) {
      costPerKg = 4.5;
    } else if (weight <= 100) {
      costPerKg = 4;
    } else {
      costPerKg = 3.5;
    }
    setCost(weight * costPerKg);
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className={styles.container}>
        <h1>Рассчитайте стоимость доставки</h1>
        <p className={styles.description}>
          Тарифы Smart Shipping для перевозки товаров IKEA из Китая в Алматы
        </p>

        <table>
          <thead>
            <tr>
              <th>Вес груза (кг)</th>
              <th>Тариф (USD/кг)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0-25</td>
              <td>$5.50</td>
            </tr>
            <tr>
              <td>25-50</td>
              <td>$5.00</td>
            </tr>
            <tr>
              <td>50-75</td>
              <td>$4.50</td>
            </tr>
            <tr>
              <td>75-100</td>
              <td>$4.00</td>
            </tr>
            <tr>
              <td>Свыше 100</td>
              <td>$3.50</td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Примечания:</b>
        </p>
        <ul>
          <li>Все тарифы указаны за килограмм.</li>
          <li>
            Доставка включает стандартные условия обработки и страхования груза.
          </li>
          <li>
            Обратите внимание, что стоимость доставки может быть рассчитана по
            объемному весу, если он превышает фактический. Объемный вес
            рассчитывается по формуле: Длина (см) х Ширина (см) х Высота (см)
            /5000.
          </li>
        </ul>
        <div className={styles.calculatorContainer}>
          <div className={styles.calculatorInput}>
            <label htmlFor="weightInput">Вес посылки (кг):</label>
            <input
              type="number"
              id="weightInput"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className={styles.calculatorResult}>
            <p>Стоимость доставки:</p>
            <p className={styles.costValue}>${cost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DeliveryCostPage;
