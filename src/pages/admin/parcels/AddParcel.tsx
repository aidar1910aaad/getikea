import React, { useState } from 'react';
import styles from '../../../styles/Admin.module.css';

const AddParcelPage: React.FC = () => {
  const [item, setItem] = useState('');
  const [status, setStatus] = useState('');

  const handleAddParcel = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика добавления посылки
    console.log('Parcel added:', { item, status });
  };

  return (
    <div className={styles.container}>
      <h1>Add Parcel</h1>
      <form onSubmit={handleAddParcel}>
        <div className={styles.field}>
          <label>Item</label>
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit">Add Parcel</button>
      </form>
    </div>
  );
};

export default AddParcelPage;
