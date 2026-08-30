import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { useCatalogList } from '@/features/catalog/hooks/useCatalogData';
import { coreSections, referenceQuickAccess } from '@/data/navigation';
import type { CoreSectionSlug, EntityType } from '@/types/content';

type SectionPageProps = {
  section: CoreSectionSlug;
};

const sectionToEntity: Record<CoreSectionSlug, EntityType> = {
  races: 'race',
  classes: 'class',
  items: 'item',
};

export function SectionPage({ section }: SectionPageProps) {
  const entity = sectionToEntity[section];
  const [search, setSearch] = useState('');
  const meta = coreSections.find((item) => item.slug === section);
  const catalog = useCatalogList(entity);

  const filteredEntries = useMemo(() => globalSearch(catalog.data, search), [catalog.data, search]);
  const title = meta?.title ?? 'Розділ';

  return (
    <div className={`page-stack catalog-section-page catalog-section-page--${section}`}>
      <section key={section} className="catalog-grimoire-interface" aria-labelledby="catalog-section-title">
        <div className="catalog-grimoire-surface" aria-hidden="true" />
        <div className="catalog-grimoire-inner">
          <header className="catalog-grimoire-heading">
            <p className="eyebrow">Розділ довідника</p>
            <h1 id="catalog-section-title">{title}</h1>
          </header>

          <nav className="catalog-section-tabs" aria-label="Розділи довідника">
            {referenceQuickAccess.map((item) =>
              item.path && !item.isDisabled ? (
                <Link
                  key={item.title}
                  to={item.path}
                  className={item.path === `/${section}` ? 'catalog-section-tab catalog-section-tab-active' : 'catalog-section-tab'}
                  aria-current={item.path === `/${section}` ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              ) : (
                <span key={item.title} className="catalog-section-tab catalog-section-tab-disabled" aria-disabled="true">
                  {item.title}
                  <small>Скоро</small>
                </span>
              ),
            )}
          </nav>

          <section className="content-section catalog-section-content">
            <div className="toolbar catalog-toolbar catalog-search-only" role="search">
              <label>
                Пошук
                <input
                  type="search"
                  placeholder="Пошук у розділі…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            {catalog.isLoading ? (
              <div className="placeholder-panel">Завантажуємо матеріали...</div>
            ) : catalog.errorMessage ? (
              <div className="placeholder-panel">Не вдалося завантажити матеріали: {catalog.errorMessage}</div>
            ) : filteredEntries.length > 0 ? (
              <div className="catalog-grid">
                {filteredEntries.map((entry) => (
                  <CatalogCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <EmptyState description="Спробуйте змінити пошук." />
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
