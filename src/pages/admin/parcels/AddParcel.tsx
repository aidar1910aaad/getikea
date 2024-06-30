// src/pages/admin/parcels/AddParcelPage.tsx
import React, { useState } from 'react';
import styles from './Admin.module.css';
import { addParcel } from '../../../services/apiAdmin';

interface Item {
  productLink: string;
  quantity: number;
  description: string;
}

interface AddParcelPageProps {
  token: string;
  onParcelCreated: (parcel: Parcel) => void;
}

interface Parcel {
  id: string;
  status: string;
  items: Item[];
  imageKey: string | null;
  [key: string]: any;
}

const AddParcelPage: React.FC<AddParcelPageProps> = ({ token, onParcelCreated }) => {
  const [items, setItems] = useState<Item[]>([{ productLink: '', quantity: 1, description: '' }]);
  const [userId, setUserId] = useState<number>(2); // Либо другая логика для получения userId
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { productLink: '', quantity: 1, description: '' }]);
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never; // Указываем, что значение соответствует ожидаемому типу
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleAddParcel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!token) {
        throw new Error('No token found');
      }

      const parcelData = { userId, items };
      const response = await addParcel(parcelData, token);

      console.log('Parcel added:', response);
      // Очистить форму после успешного добавления
      setItems([{ productLink: '', quantity: 1, description: '' }]);
      onParcelCreated(response); // Вызов функции обратного вызова
    } catch (error) {
      console.error('Error adding parcel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = items.every(item => item.productLink && item.quantity > 0 && item.description);

  return (
    <div className={styles.container}>
      <form onSubmit={handleAddParcel} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value, 10))}
            className={styles.fieldInput}
            required
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Ссылка</label>
              <input
                type="text"
                value={item.productLink}
                onChange={(e) => handleItemChange(index, 'productLink', e.target.value)}
                className={styles.fieldInput}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Количество</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                className={styles.fieldInput}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Описание</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className={styles.fieldInput}
                required
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className={styles.button}
              disabled={items.length === 1}
            >
              Удалить товар
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className={`${styles.button} ${styles.addButton}`}>
          Добавить еще товар
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`${styles.button} ${styles.submitButton} ${!isFormValid || isLoading ? styles.buttonDisabled : ''}`}
        >
          {isLoading ? 'Adding...' : 'Добавить посылку'}
        </button>
      </form>
    </div>
  );
};

export default AddParcelPage;
