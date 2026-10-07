import { supabase } from '@/lib/supabaseClient';
import type { CoreSectionSlug, EntityType } from '@/types/content';
import type {
  CatalogEntry,
  ClassEntry,
  ItemEntry,
  PublishedSection,
  RaceEntry,
  SectionCounts,
} from '../types';
import { findOfficialEntry, hasStaticOfficialDataset, listOfficialEntries } from './officialCatalogRepository';

const contentSelect = `
  *,
  source:sources(id,title,source_type)
`;

type CatalogRow = Record<string, unknown>;
type CatalogCacheEntry = { data: CatalogEntry[]; expiresAt: number };

const CATALOG_CACHE_TTL_MS = 60_000;
const catalogCache = new Map<EntityType, CatalogCacheEntry>();
const catalogRequests = new Map<EntityType, Promise<CatalogEntry[]>>();

function ensureArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizeRace(row: CatalogRow): RaceEntry {
  return {
    ...row,
    entityType: 'race',
    tags: ensureArray(row.tags),
    languages: ensureArray(row.languages),
    source: row.source ?? null,
  } as RaceEntry;
}

function normalizeClass(row: CatalogRow): ClassEntry {
  return {
    ...row,
    entityType: 'class',
    tags: ensureArray(row.tags),
    saving_throws: ensureArray(row.saving_throws),
    armor_proficiencies: ensureArray(row.armor_proficiencies),
    weapon_proficiencies: ensureArray(row.weapon_proficiencies),
    tool_proficiencies: ensureArray(row.tool_proficiencies),
    has_spellcasting: Boolean(row.has_spellcasting),
    source: row.source ?? null,
  } as ClassEntry;
}

function normalizeItem(row: CatalogRow): ItemEntry {
  return {
    ...row,
    entityType: 'item',
    tags: ensureArray(row.tags),
    requires_attunement: Boolean(row.requires_attunement),
    is_magical: Boolean(row.is_magical),
    stealth_disadvantage: Boolean(row.stealth_disadvantage),
    shield: Boolean(row.shield),
    consumable: Boolean(row.consumable),
    weapon_properties: ensureArray(row.weapon_properties),
    contents: ensureArray(row.contents),
    usage: row.usage && typeof row.usage === 'object' && !Array.isArray(row.usage) ? row.usage : {},
    variants: row.variants ?? [],
    subcategory: typeof row.subcategory === 'string' ? row.subcategory : null,
    versatile_damage: typeof row.versatile_damage === 'string' ? row.versatile_damage : null,
    normal_range: typeof row.normal_range === 'string' ? row.normal_range : null,
    long_range: typeof row.long_range === 'string' ? row.long_range : null,
    weapon_category: typeof row.weapon_category === 'string' ? row.weapon_category : null,
    weapon_mode: typeof row.weapon_mode === 'string' ? row.weapon_mode : null,
    mastery: typeof row.mastery === 'string' ? row.mastery : null,
    ammunition: typeof row.ammunition === 'string' ? row.ammunition : null,
    armor_category: typeof row.armor_category === 'string' ? row.armor_category : null,
    dexterity_modifier: typeof row.dexterity_modifier === 'string' ? row.dexterity_modifier : null,
    shield_bonus: typeof row.shield_bonus === 'string' ? row.shield_bonus : null,
    tool_type: typeof row.tool_type === 'string' ? row.tool_type : null,
    capacity: typeof row.capacity === 'string' ? row.capacity : null,
    attunement_requirement: typeof row.attunement_requirement === 'string' ? row.attunement_requirement : null,
    source: row.source ?? null,
  } as ItemEntry;
}

function tableForEntity(entity: EntityType) {
  if (entity === 'race') return 'races';
  if (entity === 'class') return 'classes';
  return 'items';
}

function normalizeByEntity(entity: EntityType, row: CatalogRow): CatalogEntry {
  if (entity === 'race') return normalizeRace(row);
  if (entity === 'class') return normalizeClass(row);
  return normalizeItem(row);
}

export async function fetchPublishedSections(): Promise<PublishedSection[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('sections')
    .select('id,title,slug,description,image_url,sort_order,is_published')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data ?? []) as PublishedSection[];
}

export function getImmediateCatalogList(entity: EntityType): CatalogEntry[] {
  const cached = catalogCache.get(entity);
  return cached && cached.expiresAt > Date.now() ? cached.data : listOfficialEntries(entity);
}

async function fetchCatalogListUncached(entity: EntityType): Promise<CatalogEntry[]> {
  const officialEntries = listOfficialEntries(entity);
  if (!supabase) return officialEntries;

  let query = supabase
    .from(tableForEntity(entity))
    .select(contentSelect)
    .eq('publication_status', 'published')
    .order('title_ua', { ascending: true });
  if (hasStaticOfficialDataset(entity)) {
    query = query.in('content_type', ['homebrew', 'campaign']);
  }
  const { data, error } = await query;

  if (error) {
    if (hasStaticOfficialDataset(entity)) return officialEntries;
    throw error;
  }
  const dynamicEntries = (data ?? []).map((row) => normalizeByEntity(entity, row));
  const officialSlugs = new Set(officialEntries.map((entry) => entry.slug));
  return [...officialEntries, ...dynamicEntries.filter((entry) => !officialSlugs.has(entry.slug))]
    .sort((a, b) => a.title_ua.localeCompare(b.title_ua, 'uk'));
}

export async function fetchCatalogList(entity: EntityType): Promise<CatalogEntry[]> {
  const cached = catalogCache.get(entity);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const pendingRequest = catalogRequests.get(entity);
  if (pendingRequest) return pendingRequest;

  const request = fetchCatalogListUncached(entity)
    .then((data) => {
      catalogCache.set(entity, { data, expiresAt: Date.now() + CATALOG_CACHE_TTL_MS });
      return data;
    })
    .finally(() => catalogRequests.delete(entity));
  catalogRequests.set(entity, request);
  return request;
}

export async function fetchCatalogEntryBySlug(entity: EntityType, slug: string): Promise<CatalogEntry | null> {
  const officialEntry = findOfficialEntry(entity, slug);
  if (officialEntry) return officialEntry;
  if (!supabase) return null;

  let query = supabase
    .from(tableForEntity(entity))
    .select(contentSelect)
    .eq('publication_status', 'published')
    .eq('slug', slug);
  if (hasStaticOfficialDataset(entity)) {
    query = query.in('content_type', ['homebrew', 'campaign']);
  }
  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return data ? normalizeByEntity(entity, data) : null;
}

export async function fetchRaces() {
  return fetchCatalogList('race') as Promise<RaceEntry[]>;
}

export async function fetchRaceBySlug(slug: string) {
  return fetchCatalogEntryBySlug('race', slug) as Promise<RaceEntry | null>;
}

export async function fetchClasses() {
  return fetchCatalogList('class') as Promise<ClassEntry[]>;
}

export async function fetchClassBySlug(slug: string) {
  return fetchCatalogEntryBySlug('class', slug) as Promise<ClassEntry | null>;
}

export async function fetchItems() {
  return fetchCatalogList('item') as Promise<ItemEntry[]>;
}

export async function fetchItemBySlug(slug: string) {
  return fetchCatalogEntryBySlug('item', slug) as Promise<ItemEntry | null>;
}

export async function fetchRecentlyAddedMaterials(limit = 6): Promise<CatalogEntry[]> {
  const [races, classes, items] = await Promise.all([
    fetchCatalogList('race'),
    fetchCatalogList('class'),
    fetchCatalogList('item'),
  ]);

  return [
    ...races,
    ...classes,
    ...items,
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export async function countPublishedMaterials(): Promise<SectionCounts> {
  const [races, classes, items] = await Promise.all([
    fetchCatalogList('race'),
    fetchCatalogList('class'),
    fetchCatalogList('item'),
  ]);

  return {
    races: races.length,
    classes: classes.length,
    items: items.length,
  };
}

export function sectionSlugForEntity(entity: EntityType): CoreSectionSlug {
  if (entity === 'race') return 'races';
  if (entity === 'class') return 'classes';
  return 'items';
}
