import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import ViewAllUsers from './users/ViewAllUsers';
import AddUser from './users/AddUser';
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
        <h1>Управление пользователями</h1>
        <nav className={styles.subnav}>
          <span className={styles.link} onClick={() => setSelectedView('view-all')}>Все пользователи</span>
          <span className={styles.link} onClick={() => setSelectedView('add')}>Добавить пользователя</span>
        </nav>
        <div className={styles.content}>
          {selectedView === 'view-all' && <ViewAllUsers token={token} />}
          {selectedView === 'add' && <AddUser token={token} onUserCreated={(user: User) => setSelectedUser(user)} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
