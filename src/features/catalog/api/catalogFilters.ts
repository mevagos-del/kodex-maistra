import type { EntityType } from '@/types/content';
import type { CatalogEntry, CatalogFilters } from '../types';

export const defaultCatalogFilters: CatalogFilters = {
  search: '',
  rulesVersion: '',
  contentType: '',
  tag: '',
  size: '',
  speed: '',
  language: '',
  hitDie: '',
  primaryAbility: '',
  armorProficiency: '',
  hasSpellcasting: '',
  itemType: '',
  category: '',
  rarity: '',
  isMagical: '',
  requiresAttunement: '',
};

function normalize(value: string) {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('uk-UA');
}

const entitySearchAliases: Record<EntityType, string> = {
  race: 'раса раси вид species race',
  class: 'клас класи class',
  item: 'предмет предмети спорядження item',
};

const contentTypeSearchAliases: Record<CatalogEntry['content_type'], string> = {
  official: 'офіційний official',
  homebrew: 'авторський homebrew',
  campaign: 'кампанія campaign',
  draft: 'чернетка draft',
};

function includesSearch(entry: CatalogEntry, search: string) {
  const query = normalize(search);
  if (!query) return true;

  const haystack = [
    entry.title_ua,
    entry.title_original ?? '',
    entry.slug,
    entitySearchAliases[entry.entityType],
    contentTypeSearchAliases[entry.content_type],
    entry.short_description ?? '',
    ...(entry.tags ?? []),
    ...(entry.entityType === 'item' ? [
      entry.category ?? '', entry.subcategory ?? '', entry.item_type ?? '', entry.weapon_category ?? '', entry.weapon_mode ?? '',
      entry.armor_category ?? '', entry.mastery ?? '', ...entry.weapon_properties,
    ] : []),
  ]
    .join(' ');
  const normalizedHaystack = normalize(haystack);

  if (query.length <= 3) {
    return normalizedHaystack.split(/\s+/).some((token) => token.startsWith(query));
  }

  return normalizedHaystack.includes(query);
}

function matchesBooleanFilter(value: boolean, filterValue: string) {
  if (!filterValue) return true;
  return filterValue === 'true' ? value : !value;
}

export function filterCatalogEntries(entries: CatalogEntry[], filters: CatalogFilters, entity: EntityType) {
  return entries.filter((entry) => {
    if (!includesSearch(entry, filters.search)) return false;
    if (filters.rulesVersion && entry.rules_version !== filters.rulesVersion) return false;
    if (filters.contentType && entry.content_type !== filters.contentType) return false;
    if (filters.tag && !entry.tags.includes(filters.tag)) return false;

    if (entity === 'race' && entry.entityType === 'race') {
      if (filters.size && entry.size !== filters.size) return false;
      if (filters.speed && entry.speed !== filters.speed) return false;
      if (filters.language && !entry.languages.includes(filters.language)) return false;
    }

    if (entity === 'class' && entry.entityType === 'class') {
      if (filters.hitDie && entry.hit_die !== filters.hitDie) return false;
      if (filters.primaryAbility && entry.primary_ability !== filters.primaryAbility) return false;
      if (filters.armorProficiency && !entry.armor_proficiencies.includes(filters.armorProficiency)) return false;
      if (!matchesBooleanFilter(entry.has_spellcasting, filters.hasSpellcasting)) return false;
    }

    if (entity === 'item' && entry.entityType === 'item') {
      if (filters.itemType && entry.item_type !== filters.itemType) return false;
      if (filters.category && entry.category !== filters.category) return false;
      if (filters.rarity && entry.rarity !== filters.rarity) return false;
      if (!matchesBooleanFilter(entry.is_magical, filters.isMagical)) return false;
      if (!matchesBooleanFilter(entry.requires_attunement, filters.requiresAttunement)) return false;
    }

    return true;
  });
}

export function optionValues(entries: CatalogEntry[], reader: (entry: CatalogEntry) => string | null | undefined) {
  return Array.from(new Set(entries.map(reader).filter((value): value is string => Boolean(value)))).sort((a, b) =>
    a.localeCompare(b, 'uk'),
  );
}

export function arrayOptionValues(entries: CatalogEntry[], reader: (entry: CatalogEntry) => string[]) {
  return Array.from(new Set(entries.flatMap(reader))).sort((a, b) => a.localeCompare(b, 'uk'));
}

export function globalSearch(entries: CatalogEntry[], search: string) {
  return entries.filter((entry) => includesSearch(entry, search));
}
