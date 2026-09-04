import type { CatalogEntry } from '../types';

export const OFFICIAL_RACE_IMAGE_BY_SLUG = {
  aasimar: '/images/catalog/races/aasimar.webp',
  dragonborn: '/images/catalog/races/dragonborn.webp',
  dwarf: '/images/catalog/races/dwarf.webp',
  elf: '/images/catalog/races/elf.webp',
  gnome: '/images/catalog/races/gnome.webp',
  goliath: '/images/catalog/races/goliath.webp',
  halfling: '/images/catalog/races/halfling.webp',
  human: '/images/catalog/races/human.webp',
  orc: '/images/catalog/races/orc.webp',
  tiefling: '/images/catalog/races/tiefling.webp',
} as const;

export const OFFICIAL_CLASS_IMAGE_BY_SLUG = {
  barbarian: '/images/catalog/classes/barbarian.webp',
  bard: '/images/catalog/classes/bard.webp',
  cleric: '/images/catalog/classes/cleric.webp',
  druid: '/images/catalog/classes/druid.webp',
  fighter: '/images/catalog/classes/fighter.webp',
  monk: '/images/catalog/classes/monk.webp',
  paladin: '/images/catalog/classes/paladin.webp',
  ranger: '/images/catalog/classes/ranger.webp',
  rogue: '/images/catalog/classes/rogue.webp',
  sorcerer: '/images/catalog/classes/sorcerer.webp',
  warlock: '/images/catalog/classes/warlock.webp',
  wizard: '/images/catalog/classes/wizard.webp',
} as const;

export function localOfficialRaceImage(slug: string) {
  return OFFICIAL_RACE_IMAGE_BY_SLUG[slug as keyof typeof OFFICIAL_RACE_IMAGE_BY_SLUG];
}

export function localOfficialClassImage(slug: string) {
  return OFFICIAL_CLASS_IMAGE_BY_SLUG[slug as keyof typeof OFFICIAL_CLASS_IMAGE_BY_SLUG];
}

export function resolveCatalogImageUrl(
  entityType: CatalogEntry['entityType'],
  slug: string,
  contentType: CatalogEntry['content_type'],
  configuredImageUrl?: string | null,
) {
  if (contentType === 'official') {
    const localImageUrl = entityType === 'race'
      ? localOfficialRaceImage(slug)
      : entityType === 'class'
        ? localOfficialClassImage(slug)
        : undefined;
    if (localImageUrl) return localImageUrl;
  }

  return configuredImageUrl?.trim() || '';
}
