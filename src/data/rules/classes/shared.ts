import { MISSING_SOURCE_TEXT } from '../source';
import type { OfficialFeature, OfficialFeatureOption, OfficialProgressionRow, OfficialRuleSource, OfficialSubclass } from '../types';

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, '-').replace(/^-|-$/g, '');
}

export function featuresFromProgression(
  classSlug: string,
  progression: OfficialProgressionRow[],
  descriptions: Record<string, string> = {},
  originalNames: Record<string, string> = {},
  options: Record<string, OfficialFeatureOption[]> = {},
): OfficialFeature[] {
  const seen = new Set<string>();
  return progression.flatMap((row) => row.features.flatMap((name) => {
    if (/^(особливість підкласу|subclass feature|підкласова особливість)/i.test(name.trim())) return [];
    const key = name.toLowerCase();
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      id: `${classSlug}-${slug(name)}`,
      nameUk: name,
      nameOriginal: originalNames[name],
      level: row.level,
      sourceText: descriptions[name] ?? MISSING_SOURCE_TEXT,
      anchorId: `feature-${slug(name)}-level-${row.level}`,
      scanLine: { level: row.level },
      options: options[name],
    }];
  }));
}

export function createSubclass(
  classSlug: string,
  slugValue: string,
  nameUk: string,
  nameOriginal: string,
  levels: Array<[number, string, string]>,
  source: OfficialRuleSource,
  descriptions: Record<string, string> = {},
): OfficialSubclass {
  return {
    id: `${classSlug}-${slugValue}`,
    slug: slugValue,
    classSlug,
    nameUk,
    nameOriginal,
    chosenAtLevel: 3,
    source,
    features: levels.map(([level, featureNameUk, featureNameOriginal]) => ({
      id: `${classSlug}-${slugValue}-${slug(featureNameOriginal)}`,
      nameUk: featureNameUk,
      nameOriginal: featureNameOriginal,
      level,
      sourceText: descriptions[featureNameUk] ?? MISSING_SOURCE_TEXT,
      anchorId: `subclass-${classSlug}-${slugValue}-${slug(featureNameOriginal)}`,
      scanLine: { level },
    })),
  };
}
