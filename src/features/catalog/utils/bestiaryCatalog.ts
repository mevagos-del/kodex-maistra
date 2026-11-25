import type { OfficialMonsterEntry } from '@/data/rules/types';
import { searchReferences } from './referenceSearch';

export type BestiarySort = 'name-asc' | 'name-desc' | 'cr-asc' | 'cr-desc';

export type BestiaryCatalogFilters = {
  search: string;
  creatureType: string;
  size: string;
  crMin: string;
  crMax: string;
  sort: BestiarySort;
  explicitSort?: boolean;
};

const sizeOrder = ['Крихітний', 'Малий', 'Середній', 'Великий', 'Величезний', 'Колосальний'];

export function normalizeBestiaryCreatureType(value: string) {
  return value.trim() === 'Аберрація' ? 'Аберація' : value.trim();
}

export function normalizeBestiarySize(value: string) {
  const normalized = value.trim();
  if (normalized === 'Велетенський') return 'Величезний';
  if (normalized === 'Середній або Малий') return 'Малий або Середній';
  return normalized;
}

export function bestiarySizeFilterValues(value: string) {
  const normalized = normalizeBestiarySize(value);
  if (normalized === 'Малий або Середній') return ['Малий', 'Середній'];
  return [normalized];
}

export function parseChallengeRating(value: string) {
  const normalized = value.trim();
  if (/^\d+\/\d+$/.test(normalized)) {
    const [numerator, denominator] = normalized.split('/').map(Number);
    return denominator ? numerator / denominator : Number.NaN;
  }
  return Number(normalized);
}

export function filterAndSortBestiary(entries: OfficialMonsterEntry[], filters: BestiaryCatalogFilters) {
  const minimum = filters.crMin ? parseChallengeRating(filters.crMin) : Number.NEGATIVE_INFINITY;
  const maximum = filters.crMax ? parseChallengeRating(filters.crMax) : Number.POSITIVE_INFINITY;

  return searchReferences(entries, filters.search, (entry) => ({ nameUk: entry.nameUk, nameOriginal: entry.nameOriginal, slug: entry.slug }))
    .filter((entry) => !filters.creatureType || normalizeBestiaryCreatureType(entry.creatureType) === filters.creatureType)
    .filter((entry) => !filters.size || bestiarySizeFilterValues(entry.size).includes(filters.size))
    .filter((entry) => {
      const challenge = parseChallengeRating(entry.challengeRating);
      return challenge >= minimum && challenge <= maximum;
    })
    .sort((left, right) => {
      if (filters.search.trim() && !filters.explicitSort) return 0;
      const names = left.nameUk.localeCompare(right.nameUk, 'uk-UA');
      if (filters.sort === 'name-desc') return -names;
      if (filters.sort === 'cr-asc' || filters.sort === 'cr-desc') {
        const challenges = parseChallengeRating(left.challengeRating) - parseChallengeRating(right.challengeRating);
        return (challenges || names) * (filters.sort === 'cr-desc' ? -1 : 1);
      }
      return names;
    });
}

export function bestiaryCreatureTypeOptions(entries: OfficialMonsterEntry[]) {
  return Array.from(new Set(entries.map((entry) => normalizeBestiaryCreatureType(entry.creatureType))))
    .sort((left, right) => left.localeCompare(right, 'uk-UA'));
}

export function bestiarySizeOptions(entries: OfficialMonsterEntry[]) {
  const present = new Set(entries.flatMap((entry) => bestiarySizeFilterValues(entry.size)));
  return sizeOrder.filter((size) => present.has(size));
}

export function bestiaryChallengeRatingOptions(entries: OfficialMonsterEntry[]) {
  return Array.from(new Set(entries.map((entry) => entry.challengeRating)))
    .sort((left, right) => parseChallengeRating(left) - parseChallengeRating(right));
}
