import { MISSING_SOURCE_TEXT } from '../source';
import type { OfficialFeature, OfficialProgressionRow } from '../types';

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, '-').replace(/^-|-$/g, '');
}

export function featuresFromProgression(classSlug: string, progression: OfficialProgressionRow[]): OfficialFeature[] {
  const seen = new Set<string>();
  return progression.flatMap((row) => row.features.flatMap((name) => {
    const key = name.toLowerCase();
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      id: `${classSlug}-${slug(name)}`,
      nameUk: name,
      level: row.level,
      sourceText: MISSING_SOURCE_TEXT,
      anchorId: `feature-${slug(name)}-level-${row.level}`,
      scanLine: { level: row.level },
    }];
  }));
}
