import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { addParcels } from '../services/api';
import { Item, Parcel } from '../types';
import styles from '../styles/Sidebar.module.css';
import modalStyles from '../styles/Modal.module.css';

Modal.setAppElement('#__next');

interface SidebarProps {
  addParcel: (parcel: Parcel) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ addParcel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([{ productLink: '', quantity: 1, description: '' }]);
  const [error, setError] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAddParcel = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Пользователь не аутентифицирован');
      return;
    }

    try {
      console.log('Добавление посылки с данными:', { token, items });
      const newParcel = await addParcels(token, items);
      addParcel(newParcel);
      closeModal();
    } catch (error) {
      console.error('Ошибка при добавлении посылки:', error);
      setError('Не удалось добавить посылку');
    }
  };

  const resetForm = () => {
    setItems([{ productLink: '', quantity: 0, description: '' }]);
    setError('');
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productLink: '', quantity: 1, description: '' }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const isAddItemDisabled = items.some(item => !item.productLink || item.quantity <= 0 || !item.description);

  return (
    <div className={styles.sidebar}>
      <button className={styles.addButton} onClick={openModal}>Добавить посылку</button>
      <hr className={styles.separator} />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/parcels" passHref>
              Посылки
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/delivery-cost" passHref>
              Стоимость доставки
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/my-addresses" passHref>
              Мой адрес
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/help" passHref>
              Помощь
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/settings" passHref>
              Настройки
            </Link>
          </li>
        </ul>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={modalStyles.modal}
        overlayClassName={modalStyles.overlay}
      >
        <div className={modalStyles.modalHeader}>
          <h2>Новая посылка</h2>
          {error && <p className={modalStyles.error}>{error}</p>}
        </div>
        <div className={modalStyles.modalContent}>
          {items.map((item, index) => (
            <div key={index} className={modalStyles.itemGroup}>
              <h3>Товар {index + 1}</h3>
              <button className={modalStyles.removeItemButton} onClick={() => removeItem(index)}>Удалить</button>
              <div className={modalStyles.inputGroup}>
                <label>Ссылка на товар</label>
                <input
                  type="text"
                  value={item.productLink}
                  onChange={(e) => handleItemChange(index, 'productLink', e.target.value)}
                  aria-label="Ссылка на товар"
                  placeholder='Ссылка на товар'
                />
              </div>
              <div className={modalStyles.inputGroup}>
                <label>Количество</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', +e.target.value)}
                  aria-label="Количество"
                  placeholder='Количество'
                />
              </div>
              <div className={modalStyles.inputGroup}>
                <label>Описание</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  aria-label="Описание"
                  placeholder='Описание'
                />
              </div>
            </div>
          ))}
          <button onClick={addItem} className={modalStyles.addItemButton} disabled={isAddItemDisabled}>Добавить товар</button>
        </div>
        <div className={modalStyles.buttons}>
          <button onClick={closeModal}>Отмена</button>
          <button onClick={handleAddParcel}>Добавить посылку</button>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
