import { useAuth } from '@/context/auth-context';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  roles?: ('admin' | 'editor' | 'reader')[];
  children: React.ReactNode;
}

export default function ProtectedRoutes({
  roles = [],
  children,
}: ProtectedRoutesProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
