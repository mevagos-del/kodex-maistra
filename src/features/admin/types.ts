import type { EntityType } from '@/types/content';

export type AdminSection = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_published: boolean;
};

export type AdminSource = {
  id: string;
  title: string;
  source_type: 'official' | 'homebrew' | 'campaign';
};

export type AdminMaterialType = EntityType;

export type JsonFieldConfig = {
  key: string;
  label: string;
};

export type AdminMaterialForm = {
  id?: string;
  title_ua: string;
  title_original: string;
  slug: string;
  short_description: string;
  full_description_markdown: string;
  image_url: string;
  source_id: string;
  tagsText: string;
  publication_status: 'draft' | 'published' | 'hidden';
  rules_version: '2024' | 'homebrew';
  content_type: 'official' | 'homebrew' | 'campaign' | 'draft';
  creature_type: string;
  size: string;
  speed: string;
  languagesText: string;
  lifespan: string;
  alignment_or_behavior: string;
  race_traits: string;
  ability_bonuses: string;
  proficiencies: string;
  additional_skills: string;
  subraces: string;
  hit_die: string;
  primary_ability: string;
  savingThrowsText: string;
  armorProficienciesText: string;
  weaponProficienciesText: string;
  toolProficienciesText: string;
  skill_choices: string;
  starting_equipment: string;
  class_features: string;
  class_progression: string;
  subclasses: string;
  spellcasting: string;
  has_spellcasting: boolean;
  item_type: string;
  category: string;
  rarity: string;
  price: string;
  weight: string;
  requires_attunement: boolean;
  is_magical: boolean;
  properties: string;
  damage: string;
  damage_type: string;
  range: string;
  armor_class: string;
  required_strength: string;
  stealth_disadvantage: boolean;
  quantity: string;
};

export type AdminMaterialListItem = {
  id: string;
  title_ua: string;
  title_original: string | null;
  slug: string;
  publication_status: 'draft' | 'published' | 'hidden';
  rules_version: '2024' | 'homebrew';
  content_type: 'official' | 'homebrew' | 'campaign' | 'draft';
  updated_at: string;
};
