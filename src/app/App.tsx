import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AdminPage } from '@/pages/admin/AdminPage';
import { ContentDetailPage } from '@/pages/ContentDetailPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SectionPage } from '@/pages/SectionPage';
import { appRoutes } from '@/routes/appRoutes';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={appRoutes.races} element={<SectionPage section="races" />} />
        <Route path={appRoutes.raceDetail} element={<ContentDetailPage entity="race" />} />
        <Route path={appRoutes.classes} element={<SectionPage section="classes" />} />
        <Route path={appRoutes.classDetail} element={<ContentDetailPage entity="class" />} />
        <Route path={appRoutes.items} element={<SectionPage section="items" />} />
        <Route path={appRoutes.itemDetail} element={<ContentDetailPage entity="item" />} />
        <Route
          path={appRoutes.admin}
          element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path={appRoutes.login} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
