import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User, token: string, tokenExpiry: number) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const isTokenExpired = tokenExpiry && new Date(parseInt(tokenExpiry)).getTime() < Date.now();

    console.log('Restoring user from localStorage...');
    console.log('storedUser:', storedUser);
    console.log('token:', token);
    console.log('tokenExpiry:', tokenExpiry);
    console.log('isTokenExpired:', isTokenExpired);

    if (storedUser && token && !isTokenExpired) {
      console.log('Setting user from localStorage...');
      setUser(JSON.parse(storedUser));
    } else {
      console.log('Token expired or not found, logging out...');
      logout();
    }

    setIsLoading(false);
  }, []);

  const setUserAndStore = (user: User, token: string, tokenExpiry: number) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', tokenExpiry.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    router.push('/login'); // Перенаправление на страницу логина
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndStore, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
