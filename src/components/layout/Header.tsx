import { NavLink } from 'react-router-dom';
import { toolNavigation } from '@/data/navigation';
import { appRoutes } from '@/routes/appRoutes';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner site-header__inner">
        <NavLink to={appRoutes.home} className="brand" aria-label="Кодекс Майстра">
          <span className="brand-mark">КМ</span>
          <span>
            <strong>Кодекс Майстра</strong>
            <small>Довідник D&amp;D 5E</small>
          </span>
        </NavLink>

        <nav className="main-nav tool-nav" aria-label="Модулі інструментів">
          {toolNavigation.map((item) => (
            <button key={item.title} type="button" className="tool-nav__item" disabled aria-label={item.title + '. ' + item.status}>
              <span>{item.title}</span>
              <small>{item.status}</small>
            </button>
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
      </div>
    </header>
  );
}