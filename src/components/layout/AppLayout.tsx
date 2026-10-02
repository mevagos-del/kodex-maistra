import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { preloadCatalogRoute } from '@/app/routePreload';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => setSidebarOpen(false), [pathname]);

  useEffect(() => {
    const preload = () => { void preloadCatalogRoute(); };
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      const idleId = idleWindow.requestIdleCallback(preload, { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }
    const timeoutId = setTimeout(preload, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSidebarOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const sidebar = document.getElementById('archive-sidebar');
      const focusable = sidebar?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-shell archive-shell">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} closeButtonRef={closeButtonRef} />
      {sidebarOpen ? <button type="button" className="archive-sidebar-backdrop" onClick={closeSidebar} aria-label="Закрити меню" /> : null}
      <div className="archive-shell__frame">
        <Header onToggleSidebar={() => setSidebarOpen((open) => !open)} sidebarExpanded={sidebarOpen} toggleButtonRef={toggleButtonRef} />
        <main className="app-main"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}
