// pages/admin/adminUsers.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import ViewAllUsers from './users/ViewAllUsers';
import AddUser from './users/AddUser';
import UpdateUser from './users/UpdateUser';
import DeleteUser from './users/DeleteUser';
import GetUserById from './users/GetUserById';
import styles from '../../styles/Admin.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Добавляем любые другие свойства пользователя
}

const UsersPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<string>('view-all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const token = localStorage.getItem('token');

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className={styles.container}>
        <h1>Manage Users</h1>
        <nav className={styles.subnav}>
          <span className={styles.link} onClick={() => setSelectedView('view-all')}>View All Users</span>
          <span className={styles.link} onClick={() => setSelectedView('add')}>Add User</span>
          <span className={styles.link} onClick={() => setSelectedView('update')}>Update User</span>
          <span className={styles.link} onClick={() => setSelectedView('delete')}>Delete User</span>
          <span className={styles.link} onClick={() => setSelectedView('get-by-id')}>Get User by ID</span>
        </nav>
        <div className={styles.content}>
          {selectedView === 'view-all' && <ViewAllUsers token={token} />}
          {selectedView === 'add' && <AddUser token={token} onUserCreated={(user: User) => setSelectedUser(user)} />}
          {selectedView === 'update' && selectedUser && <UpdateUser token={token} user={selectedUser} onUserUpdated={(user: User) => setSelectedUser(user)} />}
          {selectedView === 'delete' && selectedUser && <DeleteUser token={token} userId={selectedUser.id} onUserDeleted={() => setSelectedUser(null)} />}
          {selectedView === 'get-by-id' && <GetUserById token={token} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
