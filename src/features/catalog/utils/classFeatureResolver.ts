import type { ReferenceCard } from '../api/detailReference';
import { formatValueSafely, isRecord, referenceLevel } from './detailContent';

export const MISSING_CLASS_FEATURE_DESCRIPTION = 'Точний опис уміння не вказано у доступному джерелі.';

function progressionFeatureOccurrences(value: unknown): Array<{ title: string; level: string }> {
  const rows = Array.isArray(value)
    ? value
    : isRecord(value)
      ? (['rows', 'levels', 'progression', 'items'].map((key) => value[key]).find(Array.isArray) as unknown[] | undefined) ?? []
      : [];

  return rows.flatMap((row) => {
    if (!isRecord(row)) return [];
    const featureText = formatValueSafely(row.features ?? row.feature);
    if (!featureText) return [];
    const level = formatValueSafely(row.level) ?? '';
    return featureText
      .split(/[,;]+/)
      .map((title) => title.trim())
      .filter((title) => title && !/^(особливість підкласу|subclass feature|підкласова особливість)/i.test(title))
      .map((title) => ({ title, level }));
  });
}

function featureKey(title: string, level: string) {
  return `${title.trim().toLocaleLowerCase('uk-UA')}|${level}`;
}

function cardAtLevel(card: ReferenceCard, level: string): ReferenceCard {
  return {
    ...card,
    anchorId: undefined,
    kind: 'base',
    rows: [
      ...(level ? [{ label: 'Рівень', value: level }] : []),
      ...card.rows.filter((row) => row.label !== 'Рівень'),
    ],
  };
}

/**
 * Keeps one canonical feature record in static data while materializing every
 * level occurrence required by the progression table and feature navigation.
 */
export function resolveClassFeatureCards(explicitCards: ReferenceCard[], progression: unknown): ReferenceCard[] {
  const exactCards = new Set(explicitCards.map((card) => featureKey(card.title, referenceLevel(card))));
  const canonicalCards = new Map<string, ReferenceCard>();

  for (const card of explicitCards) {
    const key = card.title.trim().toLocaleLowerCase('uk-UA');
    if (!canonicalCards.has(key)) canonicalCards.set(key, card);
  }

  const repeatedCards = progressionFeatureOccurrences(progression).flatMap(({ title, level }) => {
    if (exactCards.has(featureKey(title, level))) return [];
    const canonical = canonicalCards.get(title.toLocaleLowerCase('uk-UA'));
    return [canonical
      ? cardAtLevel(canonical, level)
      : {
          title,
          description: MISSING_CLASS_FEATURE_DESCRIPTION,
          rows: level ? [{ label: 'Рівень', value: level }] : [],
          kind: 'base' as const,
        }];
  });

  return [...explicitCards, ...repeatedCards];
}
