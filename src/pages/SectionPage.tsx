import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  arrayOptionValues,
  defaultCatalogFilters,
  filterCatalogEntries,
  optionValues,
} from '@/features/catalog/api/catalogFilters';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { useCatalogList } from '@/features/catalog/hooks/useCatalogData';
import type { CatalogFilters } from '@/features/catalog/types';
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
  const [filters, setFilters] = useState<CatalogFilters>(defaultCatalogFilters);
  const meta = coreSections.find((item) => item.slug === section);
  const catalog = useCatalogList(entity);

  const filteredEntries = useMemo(
    () => filterCatalogEntries(catalog.data, filters, entity),
    [catalog.data, entity, filters],
  );

  const allTags = arrayOptionValues(catalog.data, (entry) => entry.tags);
  const title = meta?.title ?? 'Розділ';

  function updateFilter(name: keyof CatalogFilters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className={`page-stack catalog-section-page catalog-section-page--${section}`}>
      <section className="catalog-grimoire-hero" aria-labelledby="catalog-section-title">
        <div className="catalog-grimoire-hero__shade" aria-hidden="true" />
        <div className="catalog-grimoire-hero__content">
          <p className="eyebrow">Розділ довідника</p>
          <h1 id="catalog-section-title">{title}</h1>
        </div>
      </section>

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
        <div className="toolbar catalog-toolbar" aria-label="Фільтри каталогу">
          <label>
            Пошук
            <input
              type="search"
              placeholder="Назва, оригінальна назва або тег..."
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
            />
          </label>
          <label>
            Версія правил
            <select value={filters.rulesVersion} onChange={(event) => updateFilter('rulesVersion', event.target.value)}>
              <option value="">Усі</option>
              <option value="2024">D&D 2024</option>
              <option value="homebrew">Homebrew</option>
            </select>
          </label>
          <label>
            Тип контенту
            <select value={filters.contentType} onChange={(event) => updateFilter('contentType', event.target.value)}>
              <option value="">Усі</option>
              <option value="official">Офіційний</option>
              <option value="homebrew">Homebrew</option>
              <option value="campaign">Матеріал кампанії</option>
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
                Основна характеристика
                <select value={filters.primaryAbility} onChange={(event) => updateFilter('primaryAbility', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'class' ? entry.primary_ability : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Кістка хітів
                <select value={filters.hitDie} onChange={(event) => updateFilter('hitDie', event.target.value)}>
                  <option value="">Усі</option>
                  {optionValues(catalog.data, (entry) => (entry.entityType === 'class' ? entry.hit_die : null)).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Володіння бронею
                <select value={filters.armorProficiency} onChange={(event) => updateFilter('armorProficiency', event.target.value)}>
                  <option value="">Усі</option>
                  {arrayOptionValues(catalog.data, (entry) => (entry.entityType === 'class' ? entry.armor_proficiencies : [])).map((value) => (
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
                Потребує налаштування
                <select value={filters.requiresAttunement} onChange={(event) => updateFilter('requiresAttunement', event.target.value)}>
                  <option value="">Усі</option>
                  <option value="true">Так</option>
                  <option value="false">Ні</option>
                </select>
              </label>
              <label>
                Магічний предмет
                <select value={filters.isMagical} onChange={(event) => updateFilter('isMagical', event.target.value)}>
                  <option value="">Усі</option>
                  <option value="true">Магічний</option>
                  <option value="false">Немагічний</option>
                </select>
              </label>
            </>
          ) : null}

          <label>
            Тег
            <select value={filters.tag} onChange={(event) => updateFilter('tag', event.target.value)}>
              <option value="">Усі</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
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
          <EmptyState description="Спробуйте змінити пошук або фільтри." />
        )}
      </section>
    </div>
  );
}
