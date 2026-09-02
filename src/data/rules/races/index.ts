import type { OfficialRaceEntry } from '../types';
import { aasimar } from './aasimar';
import { dragonborn } from './dragonborn';
import { dwarf } from './dwarf';
import { elf } from './elf';
import { gnome } from './gnome';
import { goliath } from './goliath';
import { halfling } from './halfling';
import { human } from './human';
import { orc } from './orc';
import { tiefling } from './tiefling';

export const OFFICIAL_2024_RACE_SLUGS = [
  'aasimar',
  'dragonborn',
  'dwarf',
  'elf',
  'gnome',
  'goliath',
  'halfling',
  'human',
  'orc',
  'tiefling',
] as const;

const officialRaceBySlug: Record<(typeof OFFICIAL_2024_RACE_SLUGS)[number], OfficialRaceEntry> = {
  aasimar,
  dragonborn,
  dwarf,
  elf,
  gnome,
  goliath,
  halfling,
  human,
  orc,
  tiefling,
};

export const officialRaces: OfficialRaceEntry[] = OFFICIAL_2024_RACE_SLUGS.map(
  (slug) => officialRaceBySlug[slug],
);
