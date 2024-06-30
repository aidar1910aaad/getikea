// src/pages/admin/parcels/ViewAllParcels.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllParcels, deleteParcel, patchParcelStatus, patchParcelItems, patchParcelImageKey, addParcel } from '../../../services/apiAdmin';
import { Item, Parcel } from '../../../types';
import UploadParcelImage from './UploadParcelImage';
import styles from './ViewAllParcels.module.css';

Modal.setAppElement('#__next'); // Устанавливаем элемент приложения для модального окна

interface ViewAllParcelsProps {
  token: string;
}

const ViewAllParcels: React.FC<ViewAllParcelsProps> = ({ token }) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>(selectedParcel?.status || '');
  const [items, setItems] = useState<Item[]>([]);

  const parcelsPerPage = 10;

  const fetchParcels = (page: number) => {
    getAllParcels(token, page, parcelsPerPage)
      .then(data => {
        console.log('Fetched parcels:', data); // Проверим, что возвращает API
        setParcels(data.parcels || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchParcels(currentPage);
  }, [token, currentPage]);

  const handleDeleteParcel = async (id: number) => {
    try {
      await deleteParcel(id, token);
      fetchParcels(currentPage);
      setIsModalOpen(false); // Закрываем модальное окно после удаления посылки
    } catch (error) {
      console.error('Failed to delete parcel:', error);
    }
  };

  const handleParcelClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setNewStatus(parcel.status);
    setItems(parcel.items);
    setIsModalOpen(true);
  };

  const handleAddParcel = async (parcelData: any) => {
    try {
      const newParcel = await addParcel(parcelData, token);
      fetchParcels(currentPage);
    } catch (error) {
      console.error('Failed to add parcel:', error);
    }
  };

  const handleUpdateParcel = async () => {
    if (selectedParcel) {
      try {
        await patchParcelStatus(selectedParcel.id, newStatus, token);
        await patchParcelItems(selectedParcel.id, items, token);
        fetchParcels(currentPage);
        setSelectedParcel(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to update parcel:', error);
      }
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    if (selectedParcel) {
      try {
        console.log('Sending PATCH request to update imageKey with:', { imageKey: imageUrl });
        const updatedParcel = await patchParcelImageKey(selectedParcel.id, imageUrl, token);
        setParcels(parcels.map(parcel => (parcel.id === selectedParcel.id ? updatedParcel : parcel)));
        setSelectedParcel(updatedParcel);
      } catch (error) {
        console.error('Failed to update parcel image:', error);
      }
    }
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never; // Указываем, что значение соответствует ожидаемому типу
    setItems(newItems);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleSort = (key: string) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortKey(key);
    const sortedParcels = [...parcels].sort((a, b) => {
      const aValue = a[key as keyof Parcel]?.toString().toLowerCase() ?? '';
      const bValue = b[key as keyof Parcel]?.toString().toLowerCase() ?? '';
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setParcels(sortedParcels);
    setIsDropdownOpen(false); // Закрываем выпадающий список после выбора сортировки
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Посылки</h2>
      <div className={styles.sortMenu}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Сортировать</button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={() => handleSort('status')}>По статусу</button>
            <button onClick={() => handleSort('createdAt')}>По дате</button>
          </div>
        )}
      </div>
      <div className={styles.parcelList}>
        {parcels.map(parcel => (
          <div key={parcel.id} className={styles.parcelBlock} onClick={() => handleParcelClick(parcel)}>
            <div className={styles.parcelInfo}>
              <div className={styles.parcelDetails}>
                <span className={styles.parcelStatus}>{parcel.status}</span>
                <span className={styles.parcelCreatedAt}>{new Date(parcel.createdAt).toLocaleDateString()}</span>
              </div>
              {parcel.imageKey ? (
                <img src={parcel.imageKey} alt={`Image for parcel ${parcel.id}`} className={styles.parcelImage} />
              ) : (
                <div className={styles.parcelImagePlaceholder}>
                  Тут должно быть фото
                </div>
              )}
            </div>
            <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteParcel(parcel.id); }}>Удалить посылку</button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      {selectedParcel && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={styles.modal}>
          <h3>Детали посылки</h3>
          <div className={styles.field}>
          </div>
          <p>Статус: {selectedParcel.status}</p>
          <p>Email: {selectedParcel.user?.email}</p>
          <p>Создано: {new Date(selectedParcel.createdAt).toLocaleDateString()}</p>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <h4>Товар {index + 1}</h4>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Ссылка товара</label>
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
            </div>
          ))}
          {selectedParcel.imageKey && (
            <div className={styles.imageContainer}>
              <img src={selectedParcel.imageKey} alt="Parcel Image" className={styles.parcelImage} />
            </div>
          )}
          <UploadParcelImage onUpload={handleImageUpload} />
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Обновить статус</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className={styles.fieldInput}
            >
              <option value="Received">Received</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button className={styles.updateButton} onClick={handleUpdateParcel}>Обновить посылку</button>
          <button className={styles.closeButton} onClick={closeModal}>Закрыть</button>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllParcels;
