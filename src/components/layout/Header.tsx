import { NavLink } from 'react-router-dom';
import { appRoutes, publicNavigation } from '@/routes/appRoutes';

export function Header() {
  return (
    <header className="site-header">
      <NavLink to={appRoutes.home} className="brand" aria-label="Кодекс Майстра">
        <span className="brand-mark">КМ</span>
        <span>
          <strong>Кодекс Майстра</strong>
          <small>український DnD-довідник</small>
        </span>
      </NavLink>

      <nav className="main-nav" aria-label="Основна навігація">
        {publicNavigation.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <NavLink to={appRoutes.login} className="ghost-link">
          Увійти
        </NavLink>
        <NavLink to={appRoutes.admin} className="accent-link">
          Адмін
        </NavLink>
      </div>
    </header>
  );
}
