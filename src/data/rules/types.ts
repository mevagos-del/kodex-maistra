export type OfficialRuleSource = {
  id: string;
  title: string;
  url: string;
  license: string;
  sourceType: 'official';
};

export type OfficialEntityType =
  | 'race'
  | 'class'
  | 'item'
  | 'spell'
  | 'feat'
  | 'skill'
  | 'condition'
  | 'monster'
  | 'combat-rule';

export type OfficialCatalogBase = {
  entity: OfficialEntityType;
  slug: string;
  nameUk: string;
  nameOriginal: string;
  status: 'official';
  source: OfficialRuleSource;
  shortDescription?: string;
  fullDescription?: string;
  imageUrl?: string;
  tags?: string[];
};

export type OfficialFeature = {
  id: string;
  nameUk: string;
  nameOriginal?: string;
  level: number;
  sourceText: string;
  anchorId: string;
  scanLine?: Record<string, string | number>;
  options?: OfficialFeatureOption[];
};

export type OfficialFeatureOption = {
  id: string;
  nameUk: string;
  nameOriginal?: string;
  sourceText: string;
  scanLine?: Record<string, string | number>;
};

export type OfficialProgressionRow = {
  level: number;
  proficiencyBonus: string;
  features: string[];
  resources?: Record<string, string | number>;
  spellcasting?: Record<string, string | number>;
};

export type OfficialEquipmentGroup = {
  title: string;
  items: string[];
};

export type OfficialSubclass = {
  id: string;
  slug: string;
  classSlug: string;
  nameUk: string;
  nameOriginal: string;
  chosenAtLevel: number;
  features: OfficialFeature[];
  source: OfficialRuleSource;
};

export type OfficialClassEntry = OfficialCatalogBase & {
  entity: 'class';
  hitDie: string;
  primaryAbility: string;
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoices: { choose: number; from: string[] };
  hasSpellcasting: boolean;
  progression: OfficialProgressionRow[];
  features: OfficialFeature[];
  startingEquipment: OfficialEquipmentGroup[];
  subclasses: OfficialSubclass[];
};

export type OfficialItemProperty = {
  id: string;
  nameUk: string;
  sourceText: string;
  scanLine?: Record<string, string | number>;
};

export type OfficialWeaponMastery = 'Cleave' | 'Graze' | 'Nick' | 'Push' | 'Sap' | 'Slow' | 'Topple' | 'Vex';

export type OfficialItemUsage = {
  activation?: string;
  charges?: string;
  recharge?: string;
  duration?: string;
  range?: string;
  saveDc?: string;
  restrictions?: string;
};

export type OfficialItemEntry = OfficialCatalogBase & {
  entity: 'item';
  itemType: string;
  category: string;
  subcategory?: string;
  rarity: string;
  magical: boolean;
  attunement: boolean;
  attunementRequirement?: string;
  weight: string;
  cost: string;
  damage?: string;
  damageType?: string;
  versatileDamage?: string;
  normalRange?: string;
  longRange?: string;
  weaponCategory?: 'проста' | 'бойова';
  weaponMode?: 'ближнього бою' | 'далекобійна';
  weaponProperties?: string[];
  mastery?: OfficialWeaponMastery;
  ammunition?: string;
  properties: OfficialItemProperty[];
  armorCategory?: 'легкі' | 'середні' | 'важкі' | 'щит';
  armorClass?: string;
  dexterityModifier?: string;
  strengthRequirement?: string;
  stealthDisadvantage?: boolean;
  shield?: boolean;
  shieldBonus?: string;
  toolType?: string;
  consumable?: boolean;
  contents?: string[];
  capacity?: string;
  baseItemType?: string;
  sourceText?: string;
  usage?: OfficialItemUsage;
  variants?: OfficialItemProperty[];
};

export type OfficialRaceTraitOption = {
  id: string;
  nameUk: string;
  nameOriginal?: string;
  sourceText: string;
  scanLine?: Record<string, string | number>;
};

export type OfficialRaceTrait = {
  id: string;
  nameUk: string;
  nameOriginal: string;
  sourceText: string;
  anchorId: string;
  scanLine?: Record<string, string | number>;
  options?: OfficialRaceTraitOption[];
};

export type OfficialRaceVariant = {
  id: string;
  slug: string;
  nameUk: string;
  nameOriginal: string;
  sourceText?: string;
  traits: OfficialRaceTrait[];
};

export type OfficialRaceEntry = OfficialCatalogBase & {
  entity: 'race';
  creatureType: string;
  size: string;
  speed: string;
  languages: string[];
  lifespan?: string;
  traits: OfficialRaceTrait[];
  variants: OfficialRaceVariant[];
};

export type OfficialCatalogEntry = OfficialRaceEntry | OfficialClassEntry | OfficialItemEntry;
