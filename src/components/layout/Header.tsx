import { useLocation } from 'react-router-dom';
import type { RefObject } from 'react';

type HeaderProps = { onToggleSidebar: () => void; sidebarExpanded: boolean; toggleButtonRef: RefObject<HTMLButtonElement | null> };

function pageContext(pathname: string) {
  if (pathname.startsWith('/races')) return 'Довідник / Раси';
  if (pathname.startsWith('/classes')) return 'Довідник / Класи';
  if (pathname.startsWith('/items')) return 'Довідник / Предмети';
  if (pathname.startsWith('/admin')) return 'Система / Адміністрування';
  if (pathname.startsWith('/login')) return 'Система / Обліковий запис';
  return 'Кодекс Майстра';
}

export function Header({ onToggleSidebar, sidebarExpanded, toggleButtonRef }: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <header className="archive-topbar">
      <button ref={toggleButtonRef} type="button" className="archive-topbar__toggle" onClick={onToggleSidebar} aria-controls="archive-sidebar" aria-expanded={sidebarExpanded} aria-label="Перемкнути головне меню">
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <div className="archive-topbar__context">
        <span>Codex Archive</span><strong>{pageContext(pathname)}</strong>
      </div>
    </header>
  );
}
