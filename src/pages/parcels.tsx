import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Parcel } from '../types'; // Импорт типа Parcel
import { getParcels } from '../services/api'; // Импорт функции для получения посылок
import styles from '../styles/ParcelsPage.module.css';
import modalStyles from '../styles/Modal.module.css'; // Импорт стилей модального окна
import ProtectedRoute from '@/components/ProtectedRoute';
import { FaBoxOpen } from "react-icons/fa";


Modal.setAppElement('#__next');

const ITEMS_PER_PAGE = 4;

const ParcelsPage: React.FC<{ parcels: Parcel[], setParcels: React.Dispatch<React.SetStateAction<Parcel[]>> }> = ({ parcels, setParcels }) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(parcels.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentParcels = parcels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', options).format(date).replace(/\.$/, '');
  };

  return (
    <ProtectedRoute requiredRole='user'>
      <div className={styles.container}>
        <h1>Ваши посылки</h1>
        {parcels.length === 0 ? (
          <div className={styles.emptyContainer}>
            <FaBoxOpen className={styles.emptyIcon} />
            <p className={styles.grtext} >У Вас нет посылок</p>
          </div>
        ) : (
          <>
            <div className={styles.parcelsList}>
              {currentParcels.map((parcel) => (
                <div key={parcel.id} className={styles.parcel} onClick={() => handleEditClick(parcel)}>
                  <div className={styles.parcelDetails}>
                    <div className={styles.parcelHeader}>
                      <span className={styles.statusCircle}>{parcel.status}</span>
                    </div>
                    <p className={styles.parcelId}><strong>Номер посылки:</strong> {parcel.id}</p>
                  </div>
                  {parcel.imageKey ? (
                    <img src={parcel.imageKey} alt={`Image for parcel ${parcel.id}`} className={styles.parcelImage} />
                  ) : (
                    <div className={styles.parcelImagePlaceholder}>
                      Тут должно быть фото
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Назад
              </button>
              <span className={styles.pageInfo}>
                Страница {currentPage} из {totalPages}
              </span>
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
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
                  <div className={styles.flex}>
                    <div className={styles.descr}>
                      <p><strong>Номер посылки:</strong> {selectedParcel.id}</p>
                    </div>
                    <div className={styles.descr}>
                      <p><strong>Статус:</strong> {selectedParcel.status}</p>
                    </div>
                    <div className={styles.descr}>
                      <p><strong>Создано:</strong> {formatDate(selectedParcel.createdAt)}</p>
                    </div>
                  </div>
                  <div className={styles.items}>
                    <h3>Товары</h3>
                    {selectedParcel.items.map((item) => (
                      <div key={item.id} className={styles.item}>
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
          </>
        )}  
        </div>
        </ProtectedRoute>
      );
    };
    
    export default ParcelsPage;