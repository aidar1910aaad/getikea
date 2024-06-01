// components/Layout.tsx
import React, { useState, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import styles from '../styles/Layout.module.css';
import { Parcel } from '../types';
import { useUser } from '../components/UserContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();
  const [parcels, setParcels] = useState<Parcel[]>([]);

  const addParcel = (parcel: Parcel) => {
    setParcels(prev => [...prev, parcel]);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        {user && <Sidebar addParcel={addParcel} />}
        <main className={styles.content}>
          {React.cloneElement(children as React.ReactElement, { parcels, setParcels })}
        </main>
        {user && <RightPanel />}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
