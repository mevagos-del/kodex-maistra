import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { sectionSlugForEntity } from '@/features/catalog/api/catalogApi';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { useCatalogList } from '@/features/catalog/hooks/useCatalogData';
import type { EntityType } from '@/types/content';
import { referenceQuickAccess } from '@/data/navigation';

const quickAccessIcons: Record<string, string> = {
  Раси: '/icons/races.webp',
  Класи: '/icons/classes.webp',
  Предмети: '/icons/items.webp',
  Закляття: '/icons/spells.webp',
};

function getQuickAccessIcon(title: string) {
  return quickAccessIcons[title] ?? '/icons/spells.webp';
}

const entityLabels: Record<EntityType, string> = {
  race: 'Раса',
  class: 'Клас',
  item: 'Предмет',
};

export function HomePage() {
  const [search, setSearch] = useState('');
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
        <ArchiveAtmosphere />
        <div className="home-hero-vignette" aria-hidden="true" />
        <div className="home-candle-glow" aria-hidden="true" />
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
              aria-controls="global-search-results"
              aria-expanded={Boolean(search.trim())}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && search) {
                  setSearch('');
                }
              }}
            />
            {search.trim() ? (
              <div id="global-search-results" className="global-search-results" aria-live="polite">
                {searchResults.length > 0 ? (
                  searchResults.map((entry) => (
                    <Link
                      key={`${entry.entityType}-${entry.slug}`}
                      to={`/${sectionSlugForEntity(entry.entityType)}/${entry.slug}`}
                      className="global-search-result"
                    >
                      <span className="global-search-result__copy">
                        <strong>{entry.title_ua}</strong>
                        {entry.title_original ? <small>{entry.title_original}</small> : null}
                      </span>
                      <span className="global-search-result__type">{entityLabels[entry.entityType]}</span>
                    </Link>
                  ))
                ) : (
                  <p className="global-search-results__empty">Нічого не знайдено. Спробуйте змінити пошуковий запит.</p>
                )}
              </div>
            ) : null}
          </div>

          <section className="quick-access-section quick-access-section-v2" aria-labelledby="quick-access-title">
            <div className="section-heading section-heading-compact quick-access-heading">
              <p className="eyebrow">Довідник</p>
              <h2 id="quick-access-title">Швидкий доступ</h2>
            </div>
            <div className="quick-access-grid quick-access-grid-v2">
              {referenceQuickAccess.map((item) => (
                item.isDisabled ? (
                  <button key={item.title} type="button" className="quick-access-item quick-access-item-disabled" disabled>
                    <span className="quick-access-icon"><img src={getQuickAccessIcon(item.title)} alt={`Іконка розділу ${item.title}`} /></span>
                    <strong>{item.title}</strong>
                    <small>Скоро</small>
                  </button>
                ) : (
                  <Link key={item.title} to={item.path} className="quick-access-item">
                    <span className="quick-access-icon"><img src={getQuickAccessIcon(item.title)} alt={`Іконка розділу ${item.title}`} /></span>
                    <strong>{item.title}</strong>
                  </Link>
                )
              ))}
            </div>
          </section>

        </div>
      </section>

    </div>
  );
}
