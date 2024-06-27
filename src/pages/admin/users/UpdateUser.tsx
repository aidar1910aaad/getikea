// components/UpdateUser.tsx
import React, { useState } from 'react';
import { updateUser } from '../../../services/apiAdmin';

const UpdateUser: React.FC<{ token: string, user: any, onUserUpdated: (user: any) => void }> = ({ token, user, onUserUpdated }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email };
    try {
      const updatedUser = await updateUser(user.id, userData, token);
      onUserUpdated(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
