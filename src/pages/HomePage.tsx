import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { useCatalogList, usePublishedSections } from '@/features/catalog/hooks/useCatalogData';
import { referenceQuickAccess } from '@/data/navigation';

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
    <div className="page-stack home-page codex-home">
      <section className="hero home-hero cinematic-hero" aria-labelledby="home-title">
        <div className="cinematic-hero__glow" aria-hidden="true" />
        <div className="cinematic-hero__sigil" aria-hidden="true" />
        <div className="cinematic-hero__dust" aria-hidden="true" />
        <div className="cinematic-hero__content">
          <p className="eyebrow">Ваш довідник у світі</p>
          <h1 id="home-title">Dungeons &amp; Dragons</h1>
          <p>Правила, описи та інструменти для ваших пригод</p>
        </div>
      </section>

      <section className="home-search-panel codex-search-panel" aria-labelledby="home-search-title">
        <div className="section-heading section-heading-compact">
          <p className="eyebrow">Пошук у довіднику</p>
          <h2 id="home-search-title">Знайти правило або матеріал</h2>
        </div>
        <div className="global-search codex-search" role="search">
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

        {search.trim() ? (
          <div className="home-search-results" aria-live="polite">
            {searchResults.length > 0 ? (
              <div className="catalog-grid catalog-grid-compact">
                {searchResults.map((entry) => (
                  <CatalogCard key={entry.entityType + '-' + entry.id} entry={entry} compact />
                ))}
              </div>
            ) : (
              <EmptyState description="Спробуйте змінити пошуковий запит або фільтри." />
            )}
          </div>
        ) : null}
      </section>

      <section className="content-section quick-access-section" aria-labelledby="quick-access-title">
        <div className="section-heading section-heading-compact">
          <p className="eyebrow">Довідник</p>
          <h2 id="quick-access-title">Швидкий доступ</h2>
        </div>
        <div className="quick-access-grid">
          {referenceQuickAccess.map((item) => (
            item.isDisabled ? (
              <button key={item.title} type="button" className="quick-access-item quick-access-item-disabled" disabled>
                <span className="quick-access-symbol" aria-hidden="true">{item.symbol}</span>
                <strong>{item.title}</strong>
                <small>Скоро</small>
              </button>
            ) : (
              <Link key={item.title} to={item.path} className="quick-access-item">
                <span className="quick-access-symbol" aria-hidden="true">{item.symbol}</span>
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
