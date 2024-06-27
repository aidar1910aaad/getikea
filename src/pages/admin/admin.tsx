// pages/admin/admin.tsx
import React from 'react';
import Link from 'next/link';
import AdminRoute from '../../components/AdminRoute'; // убедитесь, что путь к AdminRoute правильный
import styles from '../../styles/Admin.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className={styles.container}>
        <h1>Admin Dashboard</h1>
        <nav className={styles.nav}>
          <Link href="/admin/adminUsers" passHref>
            <span className={styles.link}>Manage Users</span>
          </Link>
          <Link href="/admin/adminParcels" passHref>
            <span className={styles.link}>Manage Parcels</span>
          </Link>
        </nav>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;

