export type CoreSectionSlug = 'races' | 'classes' | 'items';

export type EntityType = 'race' | 'class' | 'item';

export type FutureModule = {
  title: string;
  description: string;
  status: 'Скоро';
};

export type SectionMeta = {
  slug: CoreSectionSlug;
  title: string;
  description: string;
  imageAlt: string;
  path: string;
  materialCountLabel: string;
};
