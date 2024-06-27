import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllParcels, deleteParcel, patchParcelStatus, patchParcelItems, patchParcelImageKey } from '../../../services/apiAdmin';
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
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const parcelsPerPage = 10;

  useEffect(() => {
    getAllParcels(token)
      .then(data => {
        console.log('Fetched parcels:', data); // Проверим, что возвращает API
        setParcels(data.parcels || []);
      })
      .catch(console.error);
  }, [token]);

  const handleDeleteParcel = async (id: number) => {
    try {
      await deleteParcel(id, token);
      setParcels(parcels.filter(parcel => parcel.id !== id));
      setIsModalOpen(false); // Закрываем модальное окно после удаления посылки
    } catch (error) {
      console.error('Failed to delete parcel:', error);
    }
  };

  const handleParcelClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleUpdateParcelStatus = async (status: string) => {
    if (selectedParcel) {
      try {
        const updatedParcel = await patchParcelStatus(selectedParcel.id, status, token);
        setParcels(parcels.map(parcel => (parcel.id === selectedParcel.id ? updatedParcel : parcel)));
        setSelectedParcel(updatedParcel);
      } catch (error) {
        console.error('Failed to update parcel status:', error);
      }
    }
  };

  const handleUpdateParcelItems = async (items: Item[]) => {
    if (selectedParcel) {
      try {
        const updatedParcel = await patchParcelItems(selectedParcel.id, items, token);
        setParcels(parcels.map(parcel => (parcel.id === selectedParcel.id ? updatedParcel : parcel)));
        setSelectedParcel(updatedParcel);
      } catch (error) {
        console.error('Failed to update parcel items:', error);
      }
    }
  };

  const handleUpdateParcelImageKey = async (imageKey: string) => {
    if (selectedParcel) {
      try {
        const updatedParcel = await patchParcelImageKey(selectedParcel.id, imageKey, token);
        setParcels(parcels.map(parcel => (parcel.id === selectedParcel.id ? updatedParcel : parcel)));
        setSelectedParcel(updatedParcel);
      } catch (error) {
        console.error('Failed to update parcel image:', error);
      }
    }
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
      const aValue = a[key]?.toLowerCase?.() ?? a[key];
      const bValue = b[key]?.toLowerCase?.() ?? b[key];
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setParcels(sortedParcels);
    setIsDropdownOpen(false); // Закрываем выпадающий список после выбора сортировки
  };

  const indexOfLastParcel = currentPage * parcelsPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
  const currentParcels = parcels.slice(indexOfFirstParcel, indexOfLastParcel);

  const nextPage = () => {
    if (currentPage < Math.ceil(parcels.length / parcelsPerPage)) {
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
      <h2>All Parcels</h2>
      <div className={styles.sortMenu}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Sort</button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={() => handleSort('status')}>Sort by Status</button>
            <button onClick={() => handleSort('createdAt')}>Sort by Created Date</button>
          </div>
        )}
      </div>
      <div className={styles.parcelList}>
        {currentParcels.map(parcel => (
          <div key={parcel.id} className={styles.parcelBlock} onClick={() => handleParcelClick(parcel)}>
            <div className={styles.parcelInfo}>
              <span className={styles.parcelStatus}>{parcel.status}</span>
              <span className={styles.parcelCreatedAt}>{new Date(parcel.createdAt).toLocaleDateString()}</span>
            </div>
            <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteParcel(parcel.id); }}>Delete Parcel</button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(parcels.length / parcelsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(parcels.length / parcelsPerPage)}>Next</button>
      </div>
      {selectedParcel && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={styles.modal}>
          <h3>Parcel Details</h3>
          <p>Status: {selectedParcel.status}</p>
          <p>User Email: {selectedParcel.user.email}</p>
          <p>Created At: {new Date(selectedParcel.createdAt).toLocaleDateString()}</p>
          {selectedParcel.imageKey && (
            <div className={styles.imageContainer}>
              <img src={selectedParcel.imageKey} alt="Parcel Image" className={styles.parcelImage} />
            </div>
          )}
          {selectedParcel.items.map(item => (
            <div key={item.id}>
              <p>Product Link: {item.productLink}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>
            </div>
          ))}
          <UploadParcelImage token={token} onUploadComplete={handleUpdateParcelImageKey} />
          <button className={styles.updateButton} onClick={() => handleUpdateParcelStatus('Updated Status')}>Update Parcel Status</button>
          <button className={styles.closeButton} onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllParcels;
