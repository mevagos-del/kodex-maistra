import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => typeof window !== 'undefined' && window.localStorage.getItem('codex-sidebar-collapsed') === 'true');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches);

  useEffect(() => setMobileSidebarOpen(false), [pathname]);
  useEffect(() => window.localStorage.setItem('codex-sidebar-collapsed', String(sidebarCollapsed)), [sidebarCollapsed]);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const updateViewportMode = () => setIsMobile(query.matches);
    query.addEventListener('change', updateViewportMode);
    return () => query.removeEventListener('change', updateViewportMode);
  }, []);

  function toggleSidebar() {
    if (isMobile) setMobileSidebarOpen((open) => !open);
    else setSidebarCollapsed((collapsed) => !collapsed);
  }

  return (
    <div className={`app-shell archive-shell${sidebarCollapsed ? ' archive-shell--collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      {mobileSidebarOpen ? <button type="button" className="archive-sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)} aria-label="Закрити меню" /> : null}
      <div className="archive-shell__frame">
        <Header onToggleSidebar={toggleSidebar} sidebarExpanded={isMobile ? mobileSidebarOpen : !sidebarCollapsed} />
        <main className="app-main"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}
