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
  const [updatedData, setUpdatedData] = useState<Partial<User>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    setUpdatedData(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        const updatedUser = await updateUser(selectedUser.id, updatedData, token);
        setUsers(users.map(user => (user.id === selectedUser.id ? updatedUser : user)));
        setSelectedUser(updatedUser);
        setSuccessMessage('User updated successfully');
        setTimeout(() => setSuccessMessage(null), 3000); // Убираем сообщение через 3 секунды
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const handleInputChange = (field: keyof User, value: string | null) => {
    setUpdatedData({ ...updatedData, [field]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUpdatedData({});
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
      <h2>Пользователи</h2>
      <div className={styles.sortMenu}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Сортировка</button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={() => handleSort('email')}>по Email</button>
            <button onClick={() => handleSort('createdAt')}>по Дате</button>
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
            <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}>Удалить пользователя</button>
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
          <h3>Данные пользователя</h3>
          <div className={styles.modalContent}>
            <label>Email</label>
            <input type="text" value={selectedUser.email} disabled />
            <label>Полное имя</label>
            <input type="text" value={updatedData.fullName ?? ''} onChange={(e) => handleInputChange('fullName', e.target.value)} />
            <label>Адрес</label>
            <input type="text" value={updatedData.address ?? ''} onChange={(e) => handleInputChange('address', e.target.value)} />
            <label>Номер карты</label>
            <input type="text" value={updatedData.IDCardNumber ?? ''} onChange={(e) => handleInputChange('IDCardNumber', e.target.value)} />
            <label>Телефон</label>
            <input type="text" value={updatedData.phoneNumber ?? ''} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
            <label>ИИН</label>
            <input type="text" value={updatedData.iin ?? ''} onChange={(e) => handleInputChange('iin', e.target.value)} />
            <label>Получатель</label>
            <input type="text" value={updatedData.recipient ?? ''} onChange={(e) => handleInputChange('recipient', e.target.value)} />
            <label>Role</label>
            <input type="text" value={updatedData.role ?? ''} onChange={(e) => handleInputChange('role', e.target.value)} />
            <label>Пароль</label>
            <input type="password" value={updatedData.password ?? ''} onChange={(e) => handleInputChange('password', e.target.value)} />
          </div>
          <button className={styles.updateButton} onClick={handleUpdateUser}>Обновить пользователя</button>
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
          <button className={styles.closeButton} onClick={closeModal}>Закрыть</button>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllUsers;
