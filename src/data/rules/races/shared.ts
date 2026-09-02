import type {
  OfficialRaceEntry,
  OfficialRaceTrait,
  OfficialRaceTraitOption,
  OfficialRaceVariant,
} from '../types';

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, '-').replace(/^-|-$/g, '');
}

export function raceTrait(
  raceSlug: string,
  nameUk: string,
  nameOriginal: string,
  sourceText: string,
  scanLine?: Record<string, string | number>,
  options?: OfficialRaceTraitOption[],
): OfficialRaceTrait {
  const id = `${raceSlug}-${slug(nameOriginal)}`;
  return { id, nameUk, nameOriginal, sourceText, anchorId: `race-trait-${id}`, scanLine, options };
}

export function raceOption(
  id: string,
  nameUk: string,
  nameOriginal: string,
  sourceText: string,
  scanLine?: Record<string, string | number>,
): OfficialRaceTraitOption {
  return { id, nameUk, nameOriginal, sourceText, scanLine };
}

export function raceVariant(
  raceSlug: string,
  variantSlug: string,
  nameUk: string,
  nameOriginal: string,
  sourceText: string | undefined,
  traits: OfficialRaceTrait[],
): OfficialRaceVariant {
  return {
    id: `${raceSlug}-${variantSlug}`,
    slug: variantSlug,
    nameUk,
    nameOriginal,
    sourceText,
    traits,
  };
}

export function defineRace(input: Omit<OfficialRaceEntry, 'entity' | 'status' | 'tags'>): OfficialRaceEntry {
  return { ...input, entity: 'race', status: 'official', tags: ['раса', 'офіційний'] };
}
