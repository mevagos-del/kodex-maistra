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

export function localOfficialRaceImage(slug: string) {
  return OFFICIAL_RACE_IMAGE_BY_SLUG[slug as keyof typeof OFFICIAL_RACE_IMAGE_BY_SLUG];
}

export function resolveRaceImageUrl(
  slug: string,
  contentType: CatalogEntry['content_type'],
  configuredImageUrl?: string | null,
) {
  if (contentType === 'official') {
    const localImageUrl = localOfficialRaceImage(slug);
    if (localImageUrl) return localImageUrl;
  }

  return configuredImageUrl?.trim() || '';
}
