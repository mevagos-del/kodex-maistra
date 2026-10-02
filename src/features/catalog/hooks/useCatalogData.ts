import { useEffect, useState } from 'react';
import type { EntityType } from '@/types/content';
import {
  countPublishedMaterials,
  fetchCatalogEntryBySlug,
  fetchCatalogList,
  fetchPublishedSections,
  fetchRecentlyAddedMaterials,
  getImmediateCatalogList,
} from '../api/catalogApi';
import { findOfficialEntry } from '../api/officialCatalogRepository';
import type { CatalogEntry, PublishedSection, SectionCounts } from '../types';
import { useAsyncData } from './useAsyncData';

export function usePublishedSections() {
  return useAsyncData<PublishedSection[]>(fetchPublishedSections, [], []);
}

export function useCatalogList(entity: EntityType) {
  const [state, setState] = useState(() => ({
    data: getImmediateCatalogList(entity),
    isLoading: false,
    errorMessage: null as string | null,
  }));

  useEffect(() => {
    let isMounted = true;
    const immediateData = getImmediateCatalogList(entity);
    setState({ data: immediateData, isLoading: false, errorMessage: null });

    fetchCatalogList(entity)
      .then((data) => {
        if (isMounted) setState({ data, isLoading: false, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : 'Не вдалося оновити додаткові матеріали.';
        setState({ data: immediateData, isLoading: false, errorMessage: immediateData.length > 0 ? null : message });
      });

    return () => { isMounted = false; };
  }, [entity]);

  return state;
}

export function useCatalogEntry(entity: EntityType, slug?: string) {
  const officialEntry = slug ? findOfficialEntry(entity, slug) : null;
  return useAsyncData<CatalogEntry | null>(
    () => (slug ? fetchCatalogEntryBySlug(entity, slug) : Promise.resolve(null)),
    officialEntry,
    [entity, slug],
    { blocking: !officialEntry },
  );
}

export function useRecentlyAddedMaterials(limit = 6) {
  return useAsyncData<CatalogEntry[]>(() => fetchRecentlyAddedMaterials(limit), [], [limit]);
}

export function useSectionCounts() {
  return useAsyncData<SectionCounts>(countPublishedMaterials, { races: 0, classes: 0, items: 0 }, []);
}
