import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';
import { appRoutes } from '@/routes/appRoutes';

type SidebarProps = { collapsed: boolean; mobileOpen: boolean; onClose: () => void };
type SidebarItem = { label: string; icon: string; path?: string; disabled?: boolean };

const referenceItems: SidebarItem[] = [
  { label: 'Раси', icon: '/icons/codex/35-icon-races.png', path: appRoutes.races },
  { label: 'Класи', icon: '/icons/codex/36-icon-classes.png', path: appRoutes.classes },
  { label: 'Предмети', icon: '/icons/codex/37-icon-items.png', path: appRoutes.items },
  { label: 'Закляття', icon: '/icons/codex/38-icon-spells.png', disabled: true },
  { label: 'Правила', icon: '/icons/codex/01-icon-rule-version.png', disabled: true },
  { label: 'Стани', icon: '/icons/codex/32-icon-condition.png', disabled: true },
  { label: 'Бестіарій', icon: '/icons/codex/03-icon-creature-type.png', disabled: true },
];

const toolItems: SidebarItem[] = [
  { label: 'Персонажі', icon: '/icons/codex/39-icon-characters.png', disabled: true },
  { label: 'Сцени', icon: '/icons/codex/40-icon-scenes.png', disabled: true },
  { label: 'Кампанії', icon: '/icons/codex/41-icon-campaigns.png', disabled: true },
  { label: 'NPC', icon: '/icons/codex/42-icon-npc.png', disabled: true },
  { label: 'Бойовий трекер', icon: '/icons/codex/43-icon-combat-tracker.png', disabled: true },
  { label: 'Зона Майстра', icon: '/icons/codex/44-icon-master-zone.png', disabled: true },
];

function SidebarGroup({ title, items, onNavigate }: { title: string; items: SidebarItem[]; onNavigate: () => void }) {
  const headingId = `sidebar-${title.toLowerCase()}`;
  return (
    <section className="archive-sidebar__group" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <div className="archive-sidebar__links">
        {items.map((item) => item.path ? (
          <NavLink key={item.label} to={item.path} className={({ isActive }) => `archive-sidebar__link${isActive ? ' is-active' : ''}`} onClick={onNavigate}>
            <img src={item.icon} alt="" aria-hidden="true" /><span>{item.label}</span>
          </NavLink>
        ) : (
          <span key={item.label} className="archive-sidebar__link is-disabled" aria-disabled="true">
            <img src={item.icon} alt="" aria-hidden="true" /><span>{item.label}</span><small>Скоро</small>
          </span>
        ))}
      </div>
    </section>
  );
}

export function Sidebar({ collapsed, mobileOpen, onClose }: SidebarProps) {
  const { user, profile, canAccessAdmin } = useAuth();
  const accountLabel = user ? profile?.display_name || 'Профіль' : 'Увійти';
  return (
    <aside id="archive-sidebar" className={`archive-sidebar${collapsed ? ' is-collapsed' : ''}${mobileOpen ? ' is-mobile-open' : ''}`} aria-label="Головна навігація">
      <div className="archive-sidebar__brand">
        <NavLink to={appRoutes.home} onClick={onClose} aria-label="Кодекс Майстра, головна">
          <span className="archive-sidebar__brand-mark">КМ</span>
          <span className="archive-sidebar__brand-copy"><strong>Кодекс Майстра</strong><small>Архів правил D&amp;D</small></span>
        </NavLink>
        <button type="button" className="archive-sidebar__close" onClick={onClose} aria-label="Закрити меню">×</button>
      </div>
      <nav className="archive-sidebar__nav">
        <SidebarGroup title="Довідник" items={referenceItems} onNavigate={onClose} />
        <SidebarGroup title="Інструменти" items={toolItems} onNavigate={onClose} />
        <section className="archive-sidebar__group" aria-labelledby="sidebar-system">
          <h2 id="sidebar-system">Система</h2>
          <div className="archive-sidebar__links">
            <NavLink to={appRoutes.login} className="archive-sidebar__link" onClick={onClose}><span className="archive-sidebar__system-icon" aria-hidden="true">◎</span><span>{accountLabel}</span></NavLink>
            <NavLink to={appRoutes.admin} className={({ isActive }) => `archive-sidebar__link${isActive ? ' is-active' : ''}`} onClick={onClose}>
              <span className="archive-sidebar__system-icon" aria-hidden="true">⚙</span><span>Адмін</span>{!canAccessAdmin && user ? <small>Без доступу</small> : null}
            </NavLink>
          </div>
        </section>
      </nav>
    </aside>
  );
}
