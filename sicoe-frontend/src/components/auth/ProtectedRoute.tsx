import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { RBACGroup } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: RBACGroup[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>;
  }


  const userRoles = user?.groups?.map((group) => group.nmGroup) || [];
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {

    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
