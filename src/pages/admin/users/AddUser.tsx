// src/pages/admin/users/AddUser.tsx

import styles from '../parcels/Admin.module.css';
// src/pages/admin/users/AddUser.tsx
import React, { useState } from 'react';
import { createUser } from '../../../services/apiAdmin';

const AddUser: React.FC<{ token: string, onUserCreated: (user: any) => void }> = ({ token, onUserCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const newUser = await createUser(userData, token);
      onUserCreated(newUser);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.fieldInput}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.fieldInput}
            required
          />
        </div>
        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
          Добавить пользователя
        </button>
      </form>
    </div>
  );
};

export default AddUser;
