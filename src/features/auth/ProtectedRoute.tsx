import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { appRoutes } from '@/routes/appRoutes';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'editor' | 'user'>;
};

export function ProtectedRoute({ children, allowedRoles = ['admin', 'editor'] }: ProtectedRouteProps) {
  const { user, profile, isLoading, isConfigured } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="placeholder-panel">Перевіряємо доступ...</div>;
  }

  if (!isConfigured || !user) {
    return <Navigate to={appRoutes.login} replace state={{ from: location }} />;
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    return (
      <section className="placeholder-panel" role="alert">
        У вас немає доступу до адмін-панелі.
      </section>
    );
  }

  return children;
}
