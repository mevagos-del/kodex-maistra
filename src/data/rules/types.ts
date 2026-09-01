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
  nameUk: string;
  nameOriginal: string;
  chosenAtLevel: number;
  features: OfficialFeature[];
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

export type OfficialItemEntry = OfficialCatalogBase & {
  entity: 'item';
  itemType: string;
  category: string;
  rarity: string;
  attunement: boolean;
  weight: string;
  cost: string;
  damage?: string;
  damageType?: string;
  properties: OfficialItemProperty[];
  armorClass?: string;
  strengthRequirement?: string;
  sourceText?: string;
  usage?: Record<string, string>;
  variants?: OfficialItemProperty[];
};

export type OfficialCatalogEntry = OfficialClassEntry | OfficialItemEntry;
