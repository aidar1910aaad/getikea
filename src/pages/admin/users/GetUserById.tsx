// components/GetUserById.tsx
import React, { useState } from 'react';
import { getUserById } from '../../../services/apiAdmin';

const GetUserById: React.FC<{ token: string }> = ({ token }) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleGetUser = async () => {
    try {
      const user = await getUserById(userId, token);
      setUser(user);
    } catch (error) {
      console.error('Failed to get user by ID:', error);
    }
  };

  return (
    <div>
      <h2>Get User by ID</h2>
      <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter User ID" />
      <button onClick={handleGetUser}>Get User</button>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default GetUserById;
