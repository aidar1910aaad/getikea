// pages/admin/adminParcels.tsx
import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import ViewAllParcels from './parcels/ViewAllParcels';
import AddParcel from './parcels/AddParcel';
import UpdateParcelStatus from './parcels/UpdateParcelStatus';
import UpdateParcelItem from './parcels/UpdateParcelItem';
import UpdateParcelImage from './parcels/UpdateParcelImage';
import DeleteParcel from './parcels/DeleteParcel';
import GetParcelById from './parcels/GetParcelById';
import styles from '../../styles/Admin.module.css';

interface Parcel {
  id: string;
  status: string;
  items: any[];
  imageKey: string | null;
  [key: string]: any; // Добавляем любые другие свойства посылки
}

const ParcelsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<string>('view-all');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  const token = localStorage.getItem('token');

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className={styles.container}>
        <h1>Manage Parcels</h1>
        <nav className={styles.subnav}>
          <span className={styles.link} onClick={() => setSelectedView('view-all')}>View All Parcels</span>
          <span className={styles.link} onClick={() => setSelectedView('add')}>Add Parcel</span>
          <span className={styles.link} onClick={() => setSelectedView('update-status')}>Update Parcel Status</span>
          <span className={styles.link} onClick={() => setSelectedView('update-item')}>Update Parcel Item</span>
          <span className={styles.link} onClick={() => setSelectedView('update-image')}>Update Parcel Image</span>
          <span className={styles.link} onClick={() => setSelectedView('delete')}>Delete Parcel</span>
          <span className={styles.link} onClick={() => setSelectedView('get-by-id')}>Get Parcel by ID</span>
        </nav>
        <div className={styles.content}>
          {selectedView === 'view-all' && <ViewAllParcels token={token} />}
          {selectedView === 'add' && <AddParcel token={token} onParcelCreated={(parcel: Parcel) => setSelectedParcel(parcel)} />}
          {selectedView === 'update-status' && selectedParcel && <UpdateParcelStatus token={token} parcel={selectedParcel} onParcelUpdated={(parcel: Parcel) => setSelectedParcel(parcel)} />}
          {selectedView === 'update-item' && selectedParcel && <UpdateParcelItem token={token} parcel={selectedParcel} onParcelUpdated={(parcel: Parcel) => setSelectedParcel(parcel)} />}
          {selectedView === 'update-image' && selectedParcel && <UpdateParcelImage token={token} parcel={selectedParcel} onParcelUpdated={(parcel: Parcel) => setSelectedParcel(parcel)} />}
          {selectedView === 'delete' && selectedParcel && <DeleteParcel token={token} parcelId={selectedParcel.id} onParcelDeleted={() => setSelectedParcel(null)} />}
          {selectedView === 'get-by-id' && <GetParcelById token={token} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ParcelsPage;
