import type { CatalogEntry } from '../types';

export const OFFICIAL_RACE_ASSETS_BY_SLUG = {
  aasimar: {
    cardImage: '/images/catalog/races/card/aasimar_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Aasimar_Banner.webp',
    position: { desktop: '72% 48%', tablet: '74% 48%', mobile: '72% 42%' },
  },
  dragonborn: {
    cardImage: '/images/catalog/races/card/dragonborn_race_card.webp',
    bannerImage: '/images/catalog/races/banners/dragonborn_banner.webp',
    position: { desktop: '72% 45%', tablet: '74% 44%', mobile: '76% 38%' },
  },
  dwarf: {
    cardImage: '/images/catalog/races/card/dwarf_race_card.webp',
    bannerImage: '/images/catalog/races/banners/dwarf-banner.webp',
    position: { desktop: '72% 45%', tablet: '74% 44%', mobile: '74% 40%' },
  },
  elf: {
    cardImage: '/images/catalog/races/card/elf_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Elf_Banner.webp',
    position: { desktop: '73% 44%', tablet: '75% 43%', mobile: '76% 38%' },
  },
  gnome: {
    cardImage: '/images/catalog/races/card/gnome_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Gnome_Banner.webp',
    position: { desktop: '72% 50%', tablet: '74% 48%', mobile: '76% 44%' },
  },
  goliath: {
    cardImage: '/images/catalog/races/card/Goliath_race_card.webp',
    bannerImage: '/images/catalog/races/banners/goliath_banner.webp',
    position: { desktop: '73% 42%', tablet: '75% 40%', mobile: '77% 34%' },
  },
  halfling: {
    cardImage: '/images/catalog/races/card/halfling_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Halfling_Banner.webp',
    position: { desktop: '72% 51%', tablet: '74% 49%', mobile: '76% 45%' },
  },
  human: {
    cardImage: '/images/catalog/races/card/human_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Human_Banner.webp',
    position: { desktop: '73% 45%', tablet: '75% 44%', mobile: '76% 39%' },
  },
  orc: {
    cardImage: '/images/catalog/races/card/orc_race_card.webp',
    bannerImage: '/images/catalog/races/banners/Orc_Banner.webp',
    position: { desktop: '73% 44%', tablet: '75% 42%', mobile: '77% 37%' },
  },
  tiefling: {
    cardImage: '/images/catalog/races/card/tiefling_race_card.webp',
    bannerImage: '/images/catalog/races/banners/tiefling_banner.webp',
    position: { desktop: '73% 42%', tablet: '75% 40%', mobile: '77% 32%' },
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
