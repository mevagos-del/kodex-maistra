import { Link } from 'react-router-dom';
import { appRoutes } from '@/routes/appRoutes';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Сторінку не знайдено</h1>
      <p>Маршрут не існує або ще не реалізований.</p>
      <Link to={appRoutes.home} className="accent-link">
        На головну
      </Link>
    </section>
  );
}
