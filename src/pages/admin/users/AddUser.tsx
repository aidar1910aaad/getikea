// components/AddUser.tsx
import React, { useState } from 'react';
import { createUser } from '../../../services/apiAdmin';

const AddUser: React.FC<{ token: string, onUserCreated: (user: any) => void }> = ({ token, onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email };
    try {
      const newUser = await createUser(userData, token);
      onUserCreated(newUser);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
