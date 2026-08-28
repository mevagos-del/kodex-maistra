import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { useCatalogList, usePublishedSections } from '@/features/catalog/hooks/useCatalogData';
import { referenceQuickAccess } from '@/data/navigation';

type QuickAccessIconProps = {
  symbol: string;
};

function QuickAccessIcon({ symbol }: QuickAccessIconProps) {
  if (symbol === 'Р') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M16 34c0-5 3.5-8 8-8s8 3 8 8" />
        <path d="M24 26c4.4 0 8-4.2 8-9.5S28.4 7 24 7s-8 4.2-8 9.5 3.6 9.5 8 9.5Z" />
        <path d="M11 39c2.9-2.2 7.4-3.5 13-3.5s10.1 1.3 13 3.5" />
      </svg>
    );
  }

  if (symbol === 'К') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M34 6 18 25" />
        <path d="m14 29 5 5" />
        <path d="m27 14 7 7" />
        <path d="M10 38 20 28" />
        <path d="M31 9 39 5l-3 9" />
      </svg>
    );
  }

  if (symbol === 'П') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 18h24v20H12z" />
        <path d="M18 18v-4c0-3 2.5-5 6-5s6 2 6 5v4" />
        <path d="M12 24h24" />
        <path d="M24 24v14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M15 9h17c3 0 5 2 5 5v25H16c-3 0-5-2-5-5V13c0-2.2 1.8-4 4-4Z" />
      <path d="M16 14h15" />
      <path d="M18 23h12" />
      <path d="M24 29 21 34h6l-3-5Z" />
      <path d="M24 20v15" />
    </svg>
  );
}

export function HomePage() {
  const [search, setSearch] = useState('');
  const sections = usePublishedSections();
  const races = useCatalogList('race');
  const classes = useCatalogList('class');
  const items = useCatalogList('item');

  const allMaterials = useMemo(
    () => [...races.data, ...classes.data, ...items.data],
    [classes.data, items.data, races.data],
  );
  const searchResults = useMemo(() => globalSearch(allMaterials, search).slice(0, 8), [allMaterials, search]);

  return (
    <div className="page-stack home-page codex-home codex-home-v2">
      <section className="hero home-hero cinematic-hero cinematic-hero-v2" aria-labelledby="home-title">
        <div className="home-hero-vignette" aria-hidden="true" />
        <div className="home-hero-candle-glow" aria-hidden="true" />
        <div className="home-hero-particles" aria-hidden="true" />
        <div className="home-hero-sigil" aria-hidden="true" />

        <div className="cinematic-hero__content home-hero-content-v2">
          <div className="hero-arcane-mark" aria-hidden="true" />
          <p className="eyebrow">Ваш довідник у світі</p>
          <h1 id="home-title">Dungeons &amp; Dragons</h1>
          <p>Правила, описи та інструменти для ваших пригод</p>

          <div className="global-search codex-search hero-search" role="search">
            <label htmlFor="global-search">Пошук</label>
            <input
              id="global-search"
              type="search"
              placeholder="Пошук у довіднику…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {!sections.isLoading && sections.data.length === 0 ? (
              <span>Опубліковані матеріали не знайдені або Supabase ще не налаштовано.</span>
            ) : null}
          </div>
        </div>
      </section>

      {search.trim() ? (
        <section className="home-search-results-panel" aria-label="Результати пошуку">
          {searchResults.length > 0 ? (
            <div className="catalog-grid catalog-grid-compact">
              {searchResults.map((entry) => (
                <CatalogCard key={entry.entityType + '-' + entry.id} entry={entry} compact />
              ))}
            </div>
          ) : (
            <EmptyState description="Спробуйте змінити пошуковий запит або фільтри." />
          )}
        </section>
      ) : null}

      <section className="content-section quick-access-section quick-access-section-v2" aria-labelledby="quick-access-title">
        <div className="section-heading section-heading-compact quick-access-heading">
          <p className="eyebrow">Довідник</p>
          <h2 id="quick-access-title">Швидкий доступ</h2>
        </div>
        <div className="quick-access-grid quick-access-grid-v2">
          {referenceQuickAccess.map((item) => (
            item.isDisabled ? (
              <button key={item.title} type="button" className="quick-access-item quick-access-item-disabled" disabled>
                <span className="quick-access-icon" aria-hidden="true"><QuickAccessIcon symbol={item.symbol} /></span>
                <strong>{item.title}</strong>
                <small>Скоро</small>
              </button>
            ) : (
              <Link key={item.title} to={item.path} className="quick-access-item">
                <span className="quick-access-icon" aria-hidden="true"><QuickAccessIcon symbol={item.symbol} /></span>
                <strong>{item.title}</strong>
              </Link>
            )
          ))}
        </div>
      </section>

      <p className="home-source-note">
        На основі відкритих правил SRD 5.2. Текст адаптовано українською для довідника. Сайт не є офіційним продуктом Wizards of the Coast.
      </p>
    </div>
  );
}