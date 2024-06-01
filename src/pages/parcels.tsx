// pages/parcels.tsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Parcel } from '../types'; // Импорт типа Parcel
import { getParcels } from '../services/api'; // Импорт функции для получения посылок
import styles from '../styles/ParcelsPage.module.css';
import modalStyles from '../styles/Modal.module.css'; // Импорт стилей модального окна

Modal.setAppElement('#__next');

const ParcelsPage: React.FC<{ parcels: Parcel[], setParcels: React.Dispatch<React.SetStateAction<Parcel[]>> }> = ({ parcels, setParcels }) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchParcels = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const data = await getParcels(token);
        setParcels(data);
      } catch (error) {
        console.error('Error fetching parcels:', error);
      }
    };

    fetchParcels();
  }, [setParcels]);

  const handleEditClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedParcel: Parcel) => {
    setParcels((prev) =>
      prev.map((parcel) => (parcel.id === updatedParcel.id ? updatedParcel : parcel))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Посылки</h1>
      <p>Управляйте вашими посылками здесь.</p>
      <div className={styles.parcelsList}>
        {parcels.map((parcel) => (
          <div key={parcel.id} className={styles.parcel} onClick={() => handleEditClick(parcel)}>
            <div className={styles.parcelHeader}>
              <span className={styles.statusCircle}>{parcel.status}</span>
            </div>
            <div className={styles.parcelContent}>
              <p><strong>Трекинг номер:</strong> {parcel.trackingNumber}</p>
              <p><strong>Дата создания:</strong> {new Date(parcel.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedParcel && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          className={modalStyles.modal}
          overlayClassName={modalStyles.overlay}
        >
          <h2>Детали посылки</h2>
          <div className={modalStyles.modalContent}>
            <p><strong>ID:</strong> {selectedParcel.id}</p>
            <p><strong>Статус:</strong> {selectedParcel.status}</p>
            <p><strong>Трекинг номер:</strong> {selectedParcel.trackingNumber}</p>
            <p><strong>Дата создания:</strong> {new Date(selectedParcel.createdAt).toLocaleString()}</p>
            <p><strong>Дата обновления:</strong> {new Date(selectedParcel.updatedAt).toLocaleString()}</p>
            <div className={styles.items}>
              <h4>Товары:</h4>
              {selectedParcel.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <p><strong>ID товара:</strong> {item.id}</p>
                  <p><strong>Ссылка на продукт:</strong> <a href={item.productLink} target="_blank" rel="noopener noreferrer">{item.productLink}</a></p>
                  <p><strong>Количество:</strong> {item.quantity}</p>
                  <p><strong>Описание:</strong> {item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={modalStyles.buttons}>
            <button onClick={() => setIsEditModalOpen(false)}>Закрыть</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ParcelsPage;
