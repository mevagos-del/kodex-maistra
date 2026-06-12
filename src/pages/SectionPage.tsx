import { useMemo, useState } from 'react';
import { PageBanner } from '@/components/ui/PageBanner';
import {
  arrayOptionValues,
  defaultCatalogFilters,
  filterCatalogEntries,
  optionValues,
} from '@/features/catalog/api/catalogFilters';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { useCatalogList, usePublishedSections } from '@/features/catalog/hooks/useCatalogData';
import type { CatalogFilters } from '@/features/catalog/types';
import { getDefaultImageUrl } from '@/lib/storage';
import { coreSections } from '@/data/navigation';
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
  const [filters, setFilters] = useState<CatalogFilters>(defaultCatalogFilters);
  const meta = coreSections.find((item) => item.slug === section);
  const sections = usePublishedSections();
  const catalog = useCatalogList(entity);
  const dbSection = sections.data.find((item) => item.slug === section);

  const filteredEntries = useMemo(
    () => filterCatalogEntries(catalog.data, filters, entity),
    [catalog.data, entity, filters],
  );

  const allTags = arrayOptionValues(catalog.data, (entry) => entry.tags);
  const title = dbSection?.title ?? meta?.title ?? 'Розділ';
  const description = dbSection?.description ?? meta?.description ?? 'Матеріали цього розділу.';
  const imageUrl = dbSection?.image_url ?? getDefaultImageUrl('sections');

  function updateFilter(name: keyof CatalogFilters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="page-stack">
      <PageBanner eyebrow="Розділ довідника" title={title} description={description} imageUrl={imageUrl} />

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Пошук і фільтри</p>
          <h2>Матеріали</h2>
        </div>

        <div className="toolbar catalog-toolbar">
          <label>
            Пошук у розділі
            <input
              type="search"
              placeholder="Назва, опис або тег..."
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
            />
          </label>
          <label>
            Версія правил
            <select value={filters.rulesVersion} onChange={(event) => updateFilter('rulesVersion', event.target.value)}>
              <option value="">Усі</option>
              <option value="2024">D&D 2024</option>
              <option value="homebrew">homebrew</option>
            </select>
          </label>
          <label>
            Тип контенту
            <select value={filters.contentType} onChange={(event) => updateFilter('contentType', event.target.value)}>
              <option value="">Усі</option>
              <option value="official">official</option>
              <option value="homebrew">homebrew</option>
              <option value="campaign">campaign</option>
            </select>
          </label>
          <label>
            Тег
            <select value={filters.tag} onChange={(event) => updateFilter('tag', event.target.value)}>
              <option value="">Усі</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </label>

          {entity === 'race' ? (
            <>
              <label>
                Розмір
                <select value={filters.size} onChange={(event) => updateFilter('size', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'race' ? entry.size : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Швидкість
                <select value={filters.speed} onChange={(event) => updateFilter('speed', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'race' ? entry.speed : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Мова
                <select value={filters.language} onChange={(event) => updateFilter('language', event.target.value)}>
                  <option value="">Усі</option>
                  {arrayOptionValues(catalog.data, (entry) => (entry.entityType === 'race' ? entry.languages : [])).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
            </>
          ) : null}

          {entity === 'class' ? (
            <>
              <label>
                Кістка здоров’я
                <select value={filters.hitDie} onChange={(event) => updateFilter('hitDie', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'class' ? entry.hit_die : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Основна здібність
                <select value={filters.primaryAbility} onChange={(event) => updateFilter('primaryAbility', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'class' ? entry.primary_ability : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Заклинання
                <select value={filters.hasSpellcasting} onChange={(event) => updateFilter('hasSpellcasting', event.target.value)}>
                  <option value="">Усі</option>
                  <option value="true">Є</option>
                  <option value="false">Немає</option>
                </select>
              </label>
            </>
          ) : null}

          {entity === 'item' ? (
            <>
              <label>
                Тип предмета
                <select value={filters.itemType} onChange={(event) => updateFilter('itemType', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'item' ? entry.item_type : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Категорія
                <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'item' ? entry.category : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Рідкість
                <select value={filters.rarity} onChange={(event) => updateFilter('rarity', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'item' ? entry.rarity : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Магічність
                <select value={filters.isMagical} onChange={(event) => updateFilter('isMagical', event.target.value)}>
                  <option value="">Усі</option>
                  <option value="true">Магічний</option>
                  <option value="false">Не магічний</option>
                </select>
              </label>
              <label>
                Налаштування
                <select value={filters.requiresAttunement} onChange={(event) => updateFilter('requiresAttunement', event.target.value)}>
                  <option value="">Усі</option>
                  <option value="true">Потребує</option>
                  <option value="false">Не потребує</option>
                </select>
              </label>
            </>
          ) : null}
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
          <EmptyState description="Опублікованих матеріалів за цими умовами немає." />
        )}
      </section>
    </div>
  );
}
