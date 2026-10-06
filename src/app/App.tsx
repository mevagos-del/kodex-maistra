import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { appRoutes } from '@/routes/appRoutes';
import { preloadAdminRoute, preloadCatalogRoute, preloadDetailRoute } from './routePreload';

const AdminPage = lazy(() => preloadAdminRoute().then((module) => ({ default: module.AdminPage })));
const ContentDetailPage = lazy(() => preloadDetailRoute().then((module) => ({ default: module.ContentDetailPage })));
const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const SectionPage = lazy(() => preloadCatalogRoute().then((module) => ({ default: module.SectionPage })));
const SpellsPage = lazy(() => import('@/pages/SpellsPage').then((module) => ({ default: module.SpellsPage })));
const SpellDetailPage = lazy(() => import('@/pages/SpellDetailPage').then((module) => ({ default: module.SpellDetailPage })));
const ConditionsPage = lazy(() => import('@/pages/ConditionsPage').then((module) => ({ default: module.ConditionsPage })));
const ConditionDetailPage = lazy(() => import('@/pages/ConditionDetailPage').then((module) => ({ default: module.ConditionDetailPage })));
const FeatsPage = lazy(() => import('@/pages/FeatsPage').then((module) => ({ default: module.FeatsPage })));
const FeatDetailPage = lazy(() => import('@/pages/FeatDetailPage').then((module) => ({ default: module.FeatDetailPage })));

function RouteFallback() {
  return <div className="archive-route-fallback"><LoadingIndicator label="Відкриваємо розділ…" /></div>;
}

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Suspense fallback={<RouteFallback />}><HomePage /></Suspense>} />
        <Route path={appRoutes.races} element={<Suspense fallback={<RouteFallback />}><SectionPage section="races" /></Suspense>} />
        <Route path={appRoutes.raceDetail} element={<Suspense fallback={<RouteFallback />}><ContentDetailPage entity="race" /></Suspense>} />
        <Route path={appRoutes.classes} element={<Suspense fallback={<RouteFallback />}><SectionPage section="classes" /></Suspense>} />
        <Route path={appRoutes.classDetail} element={<Suspense fallback={<RouteFallback />}><ContentDetailPage entity="class" /></Suspense>} />
        <Route path={appRoutes.items} element={<Suspense fallback={<RouteFallback />}><SectionPage section="items" /></Suspense>} />
        <Route path={appRoutes.itemDetail} element={<Suspense fallback={<RouteFallback />}><ContentDetailPage entity="item" /></Suspense>} />
        <Route path={appRoutes.spells} element={<Suspense fallback={<RouteFallback />}><SpellsPage /></Suspense>} />
        <Route path={appRoutes.spellDetail} element={<Suspense fallback={<RouteFallback />}><SpellDetailPage /></Suspense>} />
        <Route path={appRoutes.conditions} element={<Suspense fallback={<RouteFallback />}><ConditionsPage /></Suspense>} />
        <Route path={appRoutes.conditionDetail} element={<Suspense fallback={<RouteFallback />}><ConditionDetailPage /></Suspense>} />
        <Route path={appRoutes.feats} element={<Suspense fallback={<RouteFallback />}><FeatsPage /></Suspense>} />
        <Route path={appRoutes.featDetail} element={<Suspense fallback={<RouteFallback />}><FeatDetailPage /></Suspense>} />
        <Route
          path={appRoutes.admin}
          element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <Suspense fallback={<RouteFallback />}><AdminPage /></Suspense>
            </ProtectedRoute>
          }
        />
        <Route path={appRoutes.login} element={<Suspense fallback={<RouteFallback />}><LoginPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<RouteFallback />}><NotFoundPage /></Suspense>} />
      </Route>
    </Routes>
  );
}
