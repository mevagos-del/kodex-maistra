import type { CatalogEntry } from '../types';

export const OFFICIAL_RACE_ASSETS_BY_SLUG = {
  aasimar: {
    cardImage: '/images/catalog/races/card/aasimar_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Aasimar_Banner.webp',
    cardPosition: '50% center',
  },
  dragonborn: {
    cardImage: '/images/catalog/races/card/dragonborn_race_card.webp',
    bannerImage: '/images/catalog/races/banners/dragonborn_banner.webp',
    cardPosition: '46% center',
  },
  dwarf: {
    cardImage: '/images/catalog/races/card/dwarf_race_card.webp',
    bannerImage: '/images/catalog/races/banners/dwarf-banner.webp',
    cardPosition: '50% center',
  },
  elf: {
    cardImage: '/images/catalog/races/card/elf_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Elf_Banner.webp',
    cardPosition: '48% center',
  },
  gnome: {
    cardImage: '/images/catalog/races/card/gnome_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Gnome_Banner.webp',
    cardPosition: '50% center',
  },
  goliath: {
    cardImage: '/images/catalog/races/card/Goliath_race_card.webp',
    bannerImage: '/images/catalog/races/banners/goliath_banner.webp',
    cardPosition: '49% center',
  },
  halfling: {
    cardImage: '/images/catalog/races/card/halfling_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Halfling_Banner.webp',
    cardPosition: '50% center',
  },
  human: {
    cardImage: '/images/catalog/races/card/human_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Human_Banner.webp',
    cardPosition: '46% center',
  },
  orc: {
    cardImage: '/images/catalog/races/card/orc_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Orc_Banner.webp',
    cardPosition: '50% center',
  },
  tiefling: {
    cardImage: '/images/catalog/races/card/tiefling_race_card.webp',
    bannerImage: '/images/catalog/races/banners/tiefling_banner.webp',
    cardPosition: '47% center',
  },
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
  return OFFICIAL_RACE_ASSETS_BY_SLUG[slug as keyof typeof OFFICIAL_RACE_ASSETS_BY_SLUG]?.cardImage;
}

export function localOfficialRaceAssets(slug: string) {
  return OFFICIAL_RACE_ASSETS_BY_SLUG[slug as keyof typeof OFFICIAL_RACE_ASSETS_BY_SLUG];
}

export function localOfficialRaceBanner(slug: string) {
  return localOfficialRaceAssets(slug)?.bannerImage;
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
