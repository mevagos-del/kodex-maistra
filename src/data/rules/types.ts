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
  itemLinks?: Array<{
    slug: string;
    match: string;
  }>;
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
  spellcasting?: {
    ability: string;
    spellList: string;
    focus: string;
    cantripNotes: string;
    preparationNotes: string;
    progression: Array<{
      level: number;
      cantrips: number;
      preparedSpells: number;
      slots: [number | 0, number | 0, number | 0, number | 0];
    }>;
  };
  relationships?: {
    ruleSlugs?: string[];
    spellSlugs?: string[];
    featSlugs?: string[];
    itemSlugs?: string[];
    conditionSlugs?: string[];
    weaponMastery?: OfficialWeaponMastery[];
  };
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
  relatedSpellSlugs?: string[];
  relatedConditionSlugs?: string[];
  baseItemSlugs?: string[];
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

export type OfficialMonsterAbility = {
  score: number;
  modifier: string;
  save: string;
};

export type OfficialMonsterAbilityKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export type OfficialMonsterInitiative = {
  modifier: string;
  score?: number;
};

export type OfficialMonsterGear = {
  nameUk: string;
  quantity?: number;
  itemSlug?: string;
  notes?: string;
};

export type OfficialMonsterDamageInstance = {
  average?: number;
  formula?: string;
  damageType: string;
  application?: 'on-hit' | 'failed-save' | 'successful-save' | 'start-of-turn' | 'end-of-turn' | 'other';
  qualifier?: string;
};

export type OfficialMonsterSavingThrow = {
  ability: OfficialMonsterAbilityKey;
  dc: number;
  onFailure?: string;
  onSuccess?: string;
  repeat?: {
    timing: string;
    endsEffectOnSuccess?: boolean;
  };
};

export type OfficialMonsterRecharge =
  | { kind: 'roll'; die: number; minimum: number; maximum?: number }
  | { kind: 'rest'; rest: 'short' | 'long' | 'short-or-long' }
  | { kind: 'timing'; timing: string };

export type OfficialMonsterLimitedUse = {
  uses: number;
  period: 'day' | 'turn' | 'round' | 'short-rest' | 'long-rest' | 'short-or-long-rest';
  each?: boolean;
  qualifier?: string;
};

export type OfficialMonsterMechanicStep = {
  id: string;
  order: number;
  label?: string;
  text: string;
  trigger?: string;
  conditionSlugs?: string[];
  damageInstances?: OfficialMonsterDamageInstance[];
  savingThrow?: OfficialMonsterSavingThrow;
};

export type OfficialMonsterRuleBlock = {
  id: string;
  nameUk: string;
  nameOriginal?: string;
  sourceText: string;
  damageInstances?: OfficialMonsterDamageInstance[];
  savingThrow?: OfficialMonsterSavingThrow;
  recharge?: OfficialMonsterRecharge;
  limitedUse?: OfficialMonsterLimitedUse;
  mechanicSteps?: OfficialMonsterMechanicStep[];
};

export type OfficialMonsterAction = Omit<OfficialMonsterRuleBlock, 'sourceText'> & {
  sourceText?: string;
  attackType?: 'ближня' | 'далекобійна' | 'ближня або далекобійна';
  attackBonus?: string;
  reach?: string;
  range?: string;
  target?: string;
  damage?: string;
  damageType?: string;
  legendaryActionCost?: number;
};

export type OfficialMonsterSpellReference = {
  slug: string;
  nameUk: string;
  castAtLevel?: number;
  concentration?: boolean;
  qualifier?: string;
};

export type OfficialMonsterSpellcastingGroup = {
  label?: string;
  mode?: 'at-will' | 'daily' | 'slots' | 'rest' | 'other';
  uses?: number;
  each?: boolean;
  slotLevel?: number;
  slots?: number;
  recharge?: OfficialMonsterRecharge;
  qualifier?: string;
  spells: OfficialMonsterSpellReference[];
};

export type OfficialMonsterSpellcasting = {
  ability: string;
  saveDc?: string;
  attackBonus?: string;
  notes?: string;
  groups: OfficialMonsterSpellcastingGroup[];
};

export type OfficialMonsterAlternativeExperience = {
  experiencePoints: number;
  condition: string;
};

export type OfficialMonsterEntry = OfficialCatalogBase & {
  entity: 'monster';
  size: string;
  creatureType: string;
  subtype?: string;
  alignment?: string;
  armorClass: string;
  hitPoints: string;
  hitDice: string;
  initiative?: OfficialMonsterInitiative;
  gear?: OfficialMonsterGear[];
  speed: string[];
  abilities: Record<OfficialMonsterAbilityKey, OfficialMonsterAbility>;
  skills?: Record<string, string>;
  vulnerabilities?: string[];
  resistances?: string[];
  immunities?: string[];
  conditionImmunities?: string[];
  senses?: string[];
  passivePerception?: number;
  languages?: string[];
  challengeRating: string;
  experiencePoints: number;
  alternativeExperience?: OfficialMonsterAlternativeExperience[];
  proficiencyBonus: string;
  traits?: OfficialMonsterRuleBlock[];
  actions: OfficialMonsterAction[];
  bonusActions?: OfficialMonsterAction[];
  reactions?: OfficialMonsterAction[];
  legendaryActions?: OfficialMonsterAction[];
  legendaryActionUses?: string;
  lairActions?: OfficialMonsterAction[];
  spellcasting?: OfficialMonsterSpellcasting;
  environment?: string[];
  description?: string;
  relationships?: {
    spellSlugs?: string[];
    conditionSlugs?: string[];
    itemSlugs?: string[];
    ruleSlugs?: string[];
  };
  sourcePage: number;
};

export type OfficialCatalogEntry = OfficialRaceEntry | OfficialClassEntry | OfficialItemEntry;
