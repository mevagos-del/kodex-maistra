import { useMemo, useState } from 'react';
import { coreSections } from '@/data/navigation';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { useCatalogList } from '@/features/catalog/hooks/useCatalogData';
import type { CoreSectionSlug, EntityType } from '@/types/content';

type SectionPageProps = { section: CoreSectionSlug };

const sectionToEntity: Record<CoreSectionSlug, EntityType> = {
  races: 'race',
  classes: 'class',
  items: 'item',
};

function materialCountLabel(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} матеріалів`;
  if (last === 1) return `${count} матеріал`;
  if (last >= 2 && last <= 4) return `${count} матеріали`;
  return `${count} матеріалів`;
}

export function SectionPage({ section }: SectionPageProps) {
  const entity = sectionToEntity[section];
  const [searchState, setSearchState] = useState({ section, value: '' });
  const search = searchState.section === section ? searchState.value : '';
  const meta = coreSections.find((item) => item.slug === section);
  const catalog = useCatalogList(entity);
  const filteredEntries = useMemo(() => globalSearch(catalog.data, search), [catalog.data, search]);
  const title = meta?.title ?? 'Розділ';

  return (
    <div className={`catalog-archive-page catalog-archive-page--${section}`}>
      <ArchiveAtmosphere />
      <header className="catalog-archive-header">
        <div className="catalog-archive-header__copy">
          <p>Довідник</p>
          <div className="catalog-archive-header__title-row">
            <h1>{title}</h1>
            {!catalog.isLoading ? <span>{materialCountLabel(filteredEntries.length)}</span> : null}
          </div>
          {meta?.description ? <p className="catalog-archive-header__summary">{meta.description}</p> : null}
        </div>

        <div className="catalog-archive-search" role="search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label={`Пошук у розділі ${title}`}
            placeholder="Пошук у розділі…"
            value={search}
            onChange={(event) => setSearchState({ section, value: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && search) {
                setSearchState({ section, value: '' });
              }
            }}
          />
        </div>
      </header>

      <section className="catalog-archive-results" aria-busy={catalog.isLoading} aria-live="polite">
        {catalog.isLoading ? (
          <div className="archive-status-panel">Завантажуємо матеріали...</div>
        ) : catalog.errorMessage ? (
          <div className="archive-status-panel">Не вдалося завантажити матеріали: {catalog.errorMessage}</div>
        ) : filteredEntries.length > 0 ? (
          <div className="catalog-archive-grid">
            {filteredEntries.map((entry, index) => <CatalogCard key={entry.id} entry={entry} priority={index === 0} />)}
          </div>
        ) : (
          <EmptyState
            description={search.trim() ? 'Спробуйте змінити або очистити пошуковий запит.' : 'У цьому розділі поки немає матеріалів.'}
          />
        )}
      </section>
    </div>
  );
}
