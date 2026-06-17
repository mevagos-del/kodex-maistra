import type { EntityType } from '@/types/content';
import {
  countPublishedMaterials,
  fetchCatalogEntryBySlug,
  fetchCatalogList,
  fetchPublishedSections,
  fetchRecentlyAddedMaterials,
} from '../api/catalogApi';
import type { CatalogEntry, PublishedSection, SectionCounts } from '../types';
import { useAsyncData } from './useAsyncData';

export function usePublishedSections() {
  return useAsyncData<PublishedSection[]>(fetchPublishedSections, [], []);
}

export function useCatalogList(entity: EntityType) {
  return useAsyncData<CatalogEntry[]>(() => fetchCatalogList(entity), [], [entity]);
}

export function useCatalogEntry(entity: EntityType, slug?: string) {
  return useAsyncData<CatalogEntry | null>(
    () => (slug ? fetchCatalogEntryBySlug(entity, slug) : Promise.resolve(null)),
    null,
    [entity, slug],
  );
}

export function useRecentlyAddedMaterials(limit = 6) {
  return useAsyncData<CatalogEntry[]>(() => fetchRecentlyAddedMaterials(limit), [], [limit]);
}

export function useSectionCounts() {
  return useAsyncData<SectionCounts>(countPublishedMaterials, { races: 0, classes: 0, items: 0 }, []);
}
