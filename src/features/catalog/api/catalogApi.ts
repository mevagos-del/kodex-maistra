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

const contentSelect = `
  *,
  source:sources(id,title,source_type)
`;

function ensureArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizeRace(row: any): RaceEntry {
  return {
    ...row,
    entityType: 'race',
    tags: ensureArray(row.tags),
    languages: ensureArray(row.languages),
    source: row.source ?? null,
  };
}

function normalizeClass(row: any): ClassEntry {
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
  };
}

function normalizeItem(row: any): ItemEntry {
  return {
    ...row,
    entityType: 'item',
    tags: ensureArray(row.tags),
    requires_attunement: Boolean(row.requires_attunement),
    is_magical: Boolean(row.is_magical),
    stealth_disadvantage: Boolean(row.stealth_disadvantage),
    source: row.source ?? null,
  };
}

function tableForEntity(entity: EntityType) {
  if (entity === 'race') return 'races';
  if (entity === 'class') return 'classes';
  return 'items';
}

function normalizeByEntity(entity: EntityType, row: any): CatalogEntry {
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

export async function fetchCatalogList(entity: EntityType): Promise<CatalogEntry[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(tableForEntity(entity))
    .select(contentSelect)
    .eq('publication_status', 'published')
    .order('title_ua', { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => normalizeByEntity(entity, row));
}

export async function fetchCatalogEntryBySlug(entity: EntityType, slug: string): Promise<CatalogEntry | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(tableForEntity(entity))
    .select(contentSelect)
    .eq('publication_status', 'published')
    .eq('slug', slug)
    .maybeSingle();

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
  if (!supabase) return [];

  const [races, classes, items] = await Promise.all([
    supabase.from('races').select(contentSelect).eq('publication_status', 'published').order('created_at', { ascending: false }).limit(limit),
    supabase.from('classes').select(contentSelect).eq('publication_status', 'published').order('created_at', { ascending: false }).limit(limit),
    supabase.from('items').select(contentSelect).eq('publication_status', 'published').order('created_at', { ascending: false }).limit(limit),
  ]);

  const firstError = races.error ?? classes.error ?? items.error;
  if (firstError) throw firstError;

  return [
    ...(races.data ?? []).map(normalizeRace),
    ...(classes.data ?? []).map(normalizeClass),
    ...(items.data ?? []).map(normalizeItem),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export async function countPublishedMaterials(): Promise<SectionCounts> {
  if (!supabase) return { races: 0, classes: 0, items: 0 };

  const [races, classes, items] = await Promise.all([
    supabase.from('races').select('id', { count: 'exact', head: true }).eq('publication_status', 'published'),
    supabase.from('classes').select('id', { count: 'exact', head: true }).eq('publication_status', 'published'),
    supabase.from('items').select('id', { count: 'exact', head: true }).eq('publication_status', 'published'),
  ]);

  const firstError = races.error ?? classes.error ?? items.error;
  if (firstError) throw firstError;

  return {
    races: races.count ?? 0,
    classes: classes.count ?? 0,
    items: items.count ?? 0,
  };
}

export function sectionSlugForEntity(entity: EntityType): CoreSectionSlug {
  if (entity === 'race') return 'races';
  if (entity === 'class') return 'classes';
  return 'items';
}
