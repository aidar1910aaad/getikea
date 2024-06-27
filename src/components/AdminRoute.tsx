// components/AdminRoute.tsx
import { useUser } from './UserContext';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const isTokenExpired = tokenExpiry && new Date(tokenExpiry).getTime() < Date.now();

    if (!token || isTokenExpired) {
      logout();
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/login');
    }
  }, [router, logout, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminRoute;
