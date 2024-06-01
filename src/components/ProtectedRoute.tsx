// components/ProtectedRoute.tsx
import { useUser } from '../components/UserContext';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && router.pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user && router.pathname !== '/auth/login') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


