// src/pages/admin/adminParcels.tsx
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import ViewAllParcels from './parcels/ViewAllParcels';
import AddParcel from './parcels/AddParcel';
import styles from '../../styles/Admin.module.css';

interface Parcel {
  id: string;
  status: string;
  items: any[];
  imageKey: string | null;
  [key: string]: any;
}

const ParcelsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<string>('view-all');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className={styles.container}>
        <h1>Управление посылками</h1>
        <nav className={styles.subnav}>
          <span className={styles.link} onClick={() => setSelectedView('view-all')}>Все посылки</span>
          <span className={styles.link} onClick={() => setSelectedView('add')}>Добавить посылку</span>
        </nav>
        <div className={styles.content}>
          {selectedView === 'view-all' && <ViewAllParcels token={token} />}
          {selectedView === 'add' && <AddParcel token={token} onParcelCreated={(parcel: Parcel) => setSelectedParcel(parcel)} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ParcelsPage;
