import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Sidebar.module.css';
import modalStyles from '../styles/Modal.module.css';
import { Parcel, Item } from '../types';

Modal.setAppElement('#__next'); // Set the app element for accessibility

const Sidebar: React.FC<{ addParcel: (parcel: Parcel) => void }> = ({ addParcel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [parcelContent, setParcelContent] = useState('');
  const [price, setPrice] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [iin, setIin] = useState('');
  const [fio, setFio] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handlePriceChange = (increment: number) => {
    setPrice(prev => Math.max(0, prev + increment));
  };

  const handleAddParcel = () => {
    const newParcel: Parcel = {
      id: Date.now(), // Use current timestamp as ID
      trackingNumber,
      userId: 1, // Replace with the actual user ID
      status: 'Ожидаем',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items,
      content: parcelContent,
      address,
      date: new Date().toLocaleDateString(),
      code: uuidv4().slice(0, 8),
      recipient,
      iin,
      fio,
    };
    addParcel(newParcel);
    closeModal();
  };

  const resetForm = () => {
    setParcelContent('');
    setPrice(0);
    setTrackingNumber('');
    setAddress('');
    setRecipient('');
    setIin('');
    setFio('');
    setItems([]);
    setStep(1);
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.addButton} onClick={openModal}>+ Добавить посылку</button>
      <hr className={styles.separator} />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/parcels" className={styles.navLink}>Посылки</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/delivery-cost" className={styles.navLink}>Стоимость доставки</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/my-addresses" className={styles.navLink}>Мой адрес</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/help" className={styles.navLink}>Помощь</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/settings" className={styles.navLink}>Настройки</Link>
          </li>
        </ul>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={modalStyles.modal}
        overlayClassName={modalStyles.overlay}
      >
        {step === 1 ? (
          <div>
            <h2>Новая посылка</h2>
            <div className={modalStyles.inputGroup}>
              <label>Содержимое посылки</label>
              <input
                type="text"
                value={parcelContent}
                onChange={(e) => setParcelContent(e.target.value)}
                aria-label="Содержимое посылки"
              />
              <label>Цена ($)</label>
              <div className={modalStyles.priceInput}>
                <input
                  type="number"
                  value={price}
                  readOnly
                  aria-label="Цена"
                />
                <div className={modalStyles.priceButtons}>
                  <button onClick={() => handlePriceChange(0.1)} aria-label="Увеличить цену">▲</button>
                  <button onClick={() => handlePriceChange(-0.1)} aria-label="Уменьшить цену">▼</button>
                </div>
              </div>
            </div>
            <div className={modalStyles.inputGroup}>
              <label>Трекинг номер</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                aria-label="Трекинг номер"
              />
            </div>
            <p>
              Укажите номер отслеживания вашей покупки. Обычно он присваивается в момент ее отправки из магазина. Это может занять до нескольких дней с момента совершения покупки.
              <br />
              Где найти трекинг номер?
            </p>
            <div className={modalStyles.buttons}>
              <button onClick={closeModal}>Отмена</button>
              <button onClick={() => setStep(2)}>Далее</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Новая посылка</h2>
            <div className={modalStyles.inputGroup}>
              <label>Адрес</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-label="Адрес"
              />
            </div>
            <div className={modalStyles.inputGroup}>
              <label>Получатель</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                aria-label="Получатель"
              />
            </div>
            <div className={modalStyles.inputGroup}>
              <label>ИИН</label>
              <input
                type="text"
                value={iin}
                onChange={(e) => setIin(e.target.value)}
                aria-label="ИИН"
              />
            </div>
            <div className={modalStyles.inputGroup}>
              <label>ФИО</label>
              <input
                type="text"
                value={fio}
                onChange={(e) => setFio(e.target.value)}
                aria-label="ФИО"
              />
            </div>
            <div className={modalStyles.buttons}>
              <button onClick={() => setStep(1)}>Назад</button>
              <button onClick={handleAddParcel}>Добавить</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
