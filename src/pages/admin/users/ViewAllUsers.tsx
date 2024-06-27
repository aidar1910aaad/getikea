import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllUsers, deleteUser, updateUser } from '../../../services/apiAdmin';
import styles from './ViewAllUsers.module.css';

Modal.setAppElement('#__next'); // Устанавливаем элемент приложения для модального окна

interface User {
  id: number;
  email: string;
  fullName: string | null;
  address: string | null;
  IDCardNumber: string | null;
  phoneNumber: string | null;
  iin: string | null;
  recipient: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  [key: string]: any; // Добавляем любые другие свойства пользователя
}

const ViewAllUsers: React.FC<{ token: string }> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const usersPerPage = 10;

  useEffect(() => {
    getAllUsers(token)
      .then(data => {
        console.log('Fetched users:', data); // Проверим, что возвращает API
        setUsers(data.users || []);
      })
      .catch(console.error);
  }, [token]);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id, token);
      setUsers(users.filter(user => user.id !== id));
      setIsModalOpen(false); // Закрываем модальное окно после удаления пользователя
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (updatedData: Partial<User>) => {
    if (selectedUser) {
      try {
        const updatedUser = await updateUser(selectedUser.id, updatedData, token);
        setUsers(users.map(user => (user.id === selectedUser.id ? updatedUser : user)));
        setSelectedUser(updatedUser);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSort = (key: string) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[key]?.toLowerCase?.() ?? a[key];
      const bValue = b[key]?.toLowerCase?.() ?? b[key];
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
    setIsDropdownOpen(false); // Закрываем выпадающий список после выбора сортировки
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
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
      <h2>All Users</h2>
      <div className={styles.sortMenu}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Sort</button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={() => handleSort('email')}>Sort by Email</button>
            <button onClick={() => handleSort('createdAt')}>Sort by Created Date</button>
          </div>
        )}
      </div>
      <div className={styles.userList}>
        {currentUsers.map(user => (
          <div key={user.id} className={styles.userBlock} onClick={() => handleUserClick(user)}>
            <div className={styles.userInfo}>
              <span className={styles.userEmail}>{user.email}</span>
              <span className={styles.userCreatedAt}>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}>Delete User</button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(users.length / usersPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>Next</button>
      </div>
      {selectedUser && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={styles.modal}>
          <h3>User Details</h3>
          <p>Email: {selectedUser.email}</p>
          <p>Full Name: {selectedUser.fullName || 'No Name'}</p>
          <p>Address: {selectedUser.address || 'No Address'}</p>
          <p>ID Card Number: {selectedUser.IDCardNumber || 'No ID Card Number'}</p>
          <p>Phone Number: {selectedUser.phoneNumber || 'No Phone Number'}</p>
          <p>IIN: {selectedUser.iin || 'No IIN'}</p>
          <p>Recipient: {selectedUser.recipient || 'No Recipient'}</p>
          <p>Role: {selectedUser.role}</p>
          <button className={styles.updateButton} onClick={() => handleUpdateUser({ fullName: 'Updated Name' })}>Update User</button>
          <button className={styles.closeButton} onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllUsers;

