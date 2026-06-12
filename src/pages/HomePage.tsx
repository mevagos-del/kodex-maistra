import { useMemo, useState } from 'react';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import {
  useCatalogList,
  usePublishedSections,
  useRecentlyAddedMaterials,
  useSectionCounts,
} from '@/features/catalog/hooks/useCatalogData';
import { FutureModuleTile } from '@/components/ui/FutureModuleTile';
import { SectionTile } from '@/components/ui/SectionTile';
import { coreSections, futureModules } from '@/data/navigation';

export function HomePage() {
  const [search, setSearch] = useState('');
  const sections = usePublishedSections();
  const counts = useSectionCounts();
  const recent = useRecentlyAddedMaterials(6);
  const races = useCatalogList('race');
  const classes = useCatalogList('class');
  const items = useCatalogList('item');

  const allMaterials = useMemo(
    () => [...races.data, ...classes.data, ...items.data],
    [classes.data, items.data, races.data],
  );
  const searchResults = useMemo(() => globalSearch(allMaterials, search).slice(0, 8), [allMaterials, search]);

  return (
    <div className="page-stack">
      <section className="hero">
        <p className="eyebrow">Український DnD-довідник</p>
        <h1>Кодекс Майстра</h1>
        <div className="global-search" role="search">
          <label htmlFor="global-search">Пошук</label>
          <input
            id="global-search"
            type="search"
            placeholder="Шукати раси, класи або предмети..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {!sections.isLoading && sections.data.length === 0 ? (
            <span>Якщо Supabase ще не налаштовано або немає опублікованих матеріалів, результати будуть порожні.</span>
          ) : null}
        </div>
      </section>

      {search.trim() ? (
        <section className="content-section" aria-labelledby="global-search-title">
          <div className="section-heading">
            <p className="eyebrow">Результати</p>
            <h2 id="global-search-title">Глобальний пошук</h2>
          </div>
          {searchResults.length > 0 ? (
            <div className="catalog-grid catalog-grid-compact">
              {searchResults.map((entry) => (
                <CatalogCard key={`${entry.entityType}-${entry.id}`} entry={entry} compact />
              ))}
            </div>
          ) : (
            <EmptyState description="Спробуйте іншу назву, оригінальну назву, опис або тег." />
          )}
        </section>
      ) : null}

      <section className="content-section" aria-labelledby="core-sections-title">
        <div className="section-heading">
          <p className="eyebrow">Основні розділи</p>
          <h2 id="core-sections-title">Довідник</h2>
        </div>
        <div className="section-grid">
          {coreSections.map((section) => {
            const dbSection = sections.data.find((item) => item.slug === section.slug);
            return (
              <SectionTile
                key={section.slug}
                section={{
                  ...section,
                  title: dbSection?.title ?? section.title,
                  description: dbSection?.description ?? section.description,
                }}
                imageUrl={dbSection?.image_url}
                count={counts.data[section.slug]}
              />
            );
          })}
        </div>
      </section>

      <section className="content-section" aria-labelledby="recent-title">
        <div className="section-heading">
          <p className="eyebrow">Останні матеріали</p>
          <h2 id="recent-title">Останні додані матеріали</h2>
        </div>
        {recent.isLoading ? (
          <div className="placeholder-panel">Завантажуємо матеріали...</div>
        ) : recent.errorMessage ? (
          <div className="placeholder-panel">Не вдалося завантажити матеріали: {recent.errorMessage}</div>
        ) : recent.data.length > 0 ? (
          <div className="catalog-grid catalog-grid-compact">
            {recent.data.map((entry) => (
              <CatalogCard key={`${entry.entityType}-${entry.id}`} entry={entry} compact />
            ))}
          </div>
        ) : (
          <EmptyState description="Опубліковані матеріали ще не додано або Supabase не налаштовано." />
        )}
      </section>

      <section className="content-section" aria-labelledby="future-title">
        <div className="section-heading">
          <p className="eyebrow">План розвитку</p>
          <h2 id="future-title">Майбутні модулі</h2>
        </div>
        <div className="future-grid">
          {futureModules.map((module) => (
            <FutureModuleTile key={module.title} module={module} />
          ))}
        </div>
      </section>
    </div>
  );
}
