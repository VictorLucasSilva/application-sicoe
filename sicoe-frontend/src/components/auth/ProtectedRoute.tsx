import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { RBACGroup } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: RBACGroup[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se não há roles permitidos, apenas verifica autenticação
  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Verifica se o usuário tem um dos roles permitidos
  const userRoles = user?.groups?.map((group) => group.nmGroup) || [];
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    // Usuário não tem permissão, redireciona para home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
