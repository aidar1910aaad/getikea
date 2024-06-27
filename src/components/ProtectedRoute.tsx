// components/ProtectedRoute.tsx
import { useUser } from './UserContext';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, logout, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const isTokenExpired = tokenExpiry && new Date(parseInt(tokenExpiry)).getTime() < Date.now();

    console.log('ProtectedRoute checking...');
    console.log('token:', token);
    console.log('tokenExpiry:', tokenExpiry);
    console.log('isTokenExpired:', isTokenExpired);
    console.log('requiredRole:', requiredRole);
    console.log('user:', user);

    if (!token || isTokenExpired) {
      console.log('Token is invalid or expired, logging out...');
      logout();
    } else if (requiredRole && user?.role !== requiredRole) {
      console.log('User role mismatch, redirecting to login...');
      router.push('/login');
    }
  }, [router, logout, user, requiredRole, isLoading]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
