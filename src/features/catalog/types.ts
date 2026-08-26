import type { CoreSectionSlug, EntityType } from '@/types/content';

export type SourceSummary = {
  id?: string;
  title: string;
  source_type?: 'official' | 'homebrew' | 'campaign';
};

export type PublishedSection = {
  id: string;
  title: string;
  slug: CoreSectionSlug;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
};

export type CatalogBase = {
  id: string;
  entityType: EntityType;
  title_ua: string;
  title_original: string | null;
  slug: string;
  short_description: string | null;
  full_description_markdown: string | null;
  image_url: string | null;
  source_id: string | null;
  source: SourceSummary | null;
  tags: string[];
  publication_status: 'draft' | 'published' | 'hidden';
  rules_version: '2024' | 'homebrew';
  content_type: 'official' | 'homebrew' | 'campaign' | 'draft';
  created_at: string;
  updated_at: string;
};

export type RaceEntry = CatalogBase & {
  entityType: 'race';
  creature_type: string | null;
  size: string | null;
  speed: string | null;
  languages: string[];
  lifespan: string | null;
  alignment_or_behavior: string | null;
  race_traits: unknown;
  ability_bonuses: unknown;
  proficiencies: unknown;
  additional_skills: unknown;
  subraces: unknown;
};

export type ClassEntry = CatalogBase & {
  entityType: 'class';
  hit_die: string | null;
  primary_ability: string | null;
  saving_throws: string[];
  armor_proficiencies: string[];
  weapon_proficiencies: string[];
  tool_proficiencies: string[];
  skill_choices: unknown;
  starting_equipment: unknown;
  class_features: unknown;
  class_progression: unknown;
  subclasses: unknown;
  spellcasting: unknown;
  has_spellcasting: boolean;
};

export type ItemEntry = CatalogBase & {
  entityType: 'item';
  item_type: string | null;
  category: string | null;
  rarity: string | null;
  price: string | null;
  weight: string | null;
  requires_attunement: boolean;
  is_magical: boolean;
  properties: unknown;
  damage: string | null;
  damage_type: string | null;
  range: string | null;
  armor_class: string | null;
  required_strength: string | null;
  stealth_disadvantage: boolean;
  quantity: string | null;
};

export type CatalogEntry = RaceEntry | ClassEntry | ItemEntry;

export type CatalogFilters = {
  search: string;
  rulesVersion: string;
  contentType: string;
  tag: string;
  size: string;
  speed: string;
  language: string;
  hitDie: string;
  primaryAbility: string;
  hasSpellcasting: string;
  itemType: string;
  category: string;
  rarity: string;
  isMagical: string;
  requiresAttunement: string;
};

export type SectionCounts = Record<CoreSectionSlug, number>;
