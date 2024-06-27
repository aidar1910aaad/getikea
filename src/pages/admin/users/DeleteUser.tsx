// components/DeleteUser.tsx
import React from 'react';
import { deleteUser } from '../../../services/apiAdmin';

const DeleteUser: React.FC<{ token: string, userId: string, onUserDeleted: (id: string) => void }> = ({ token, userId, onUserDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteUser(userId, token);
      onUserDeleted(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteUser;
