import { officialClasses, officialItems, officialRaces } from '@/data/rules';
import type {
  OfficialClassEntry,
  OfficialFeature,
  OfficialItemEntry,
  OfficialRaceEntry,
  OfficialRaceTrait,
  OfficialRuleSource,
} from '@/data/rules/types';
import type { EntityType } from '@/types/content';
import type { CatalogEntry, ClassEntry, ItemEntry, RaceEntry } from '../types';

const PUBLISHED_AT = '2025-04-22T00:00:00.000Z';

function sourceSummary(source: OfficialRuleSource) {
  return {
    id: source.id,
    title: source.title,
    source_type: source.sourceType,
  } as const;
}

function featureRecord(feature: OfficialFeature) {
  return {
    id: feature.id,
    name: feature.nameUk,
    original_name: feature.nameOriginal,
    level: feature.level,
    description: feature.sourceText,
    anchor_id: feature.anchorId,
    ...(feature.options?.length ? {
      options: feature.options.map((option) => ({
        id: option.id,
        name: option.nameUk,
        original_name: option.nameOriginal,
        description: option.sourceText,
        ...(option.scanLine ?? {}),
      })),
    } : {}),
    ...(feature.scanLine ?? {}),
  };
}

function raceTraitRecord(trait: OfficialRaceTrait) {
  return {
    id: trait.id,
    name: trait.nameUk,
    original_name: trait.nameOriginal,
    description: trait.sourceText,
    anchor_id: trait.anchorId,
    ...(trait.options?.length ? {
      options: trait.options.map((option) => ({
        id: option.id,
        name: option.nameUk,
        original_name: option.nameOriginal,
        description: option.sourceText,
        ...(option.scanLine ?? {}),
      })),
    } : {}),
    ...(trait.scanLine ?? {}),
  };
}

function raceToCatalogEntry(entry: OfficialRaceEntry): RaceEntry {
  return {
    id: `official-race-${entry.slug}`,
    entityType: 'race',
    title_ua: entry.nameUk,
    title_original: entry.nameOriginal,
    slug: entry.slug,
    short_description: entry.shortDescription ?? null,
    full_description_markdown: entry.fullDescription ?? null,
    image_url: entry.imageUrl ?? null,
    source_id: entry.source.id,
    source: sourceSummary(entry.source),
    tags: entry.tags ?? ['раса', 'офіційний'],
    publication_status: 'published',
    rules_version: '2024',
    content_type: 'official',
    created_at: PUBLISHED_AT,
    updated_at: PUBLISHED_AT,
    creature_type: entry.creatureType,
    size: entry.size,
    speed: entry.speed,
    languages: entry.languages,
    lifespan: entry.lifespan ?? null,
    alignment_or_behavior: null,
    race_traits: entry.traits.map(raceTraitRecord),
    ability_bonuses: {},
    proficiencies: {},
    additional_skills: [],
    subraces: entry.variants.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      name: variant.nameUk,
      original_name: variant.nameOriginal,
      description: variant.sourceText,
      traits: variant.traits.map(raceTraitRecord),
    })),
  };
}

function classToCatalogEntry(entry: OfficialClassEntry): ClassEntry {
  return {
    id: `official-class-${entry.slug}`,
    entityType: 'class',
    title_ua: entry.nameUk,
    title_original: entry.nameOriginal,
    slug: entry.slug,
    short_description: null,
    full_description_markdown: null,
    image_url: null,
    source_id: entry.source.id,
    source: sourceSummary(entry.source),
    tags: ['клас', 'офіційний'],
    publication_status: 'published',
    rules_version: '2024',
    content_type: 'official',
    created_at: PUBLISHED_AT,
    updated_at: PUBLISHED_AT,
    hit_die: entry.hitDie,
    primary_ability: entry.primaryAbility,
    saving_throws: entry.savingThrows,
    armor_proficiencies: entry.armorProficiencies,
    weapon_proficiencies: entry.weaponProficiencies,
    tool_proficiencies: entry.toolProficiencies,
    skill_choices: entry.skillChoices,
    starting_equipment: entry.startingEquipment.map((group) => ({ title: group.title, options: group.items })),
    class_features: entry.features.map(featureRecord),
    class_progression: entry.progression.map((row) => ({
      level: row.level,
      proficiency_bonus: row.proficiencyBonus,
      features: row.features,
      ...(row.resources ?? {}),
      ...(row.spellcasting ?? {}),
    })),
    subclasses: entry.subclasses.map((subclass) => ({
      id: subclass.id,
      slug: subclass.slug,
      name: subclass.nameUk,
      original_name: subclass.nameOriginal,
      choose_level: subclass.chosenAtLevel,
      source: sourceSummary(subclass.source),
      features: subclass.features.map(featureRecord),
    })),
    spellcasting: entry.hasSpellcasting ? { ability: entry.primaryAbility } : {},
    has_spellcasting: entry.hasSpellcasting,
  };
}

function itemToCatalogEntry(entry: OfficialItemEntry): ItemEntry {
  return {
    id: `official-item-${entry.slug}`,
    entityType: 'item',
    title_ua: entry.nameUk,
    title_original: entry.nameOriginal,
    slug: entry.slug,
    short_description: null,
    full_description_markdown: entry.sourceText ?? null,
    image_url: null,
    source_id: entry.source.id,
    source: sourceSummary(entry.source),
    tags: ['предмет', 'офіційний'],
    publication_status: 'published',
    rules_version: '2024',
    content_type: 'official',
    created_at: PUBLISHED_AT,
    updated_at: PUBLISHED_AT,
    item_type: entry.itemType,
    category: entry.category,
    rarity: entry.rarity,
    price: entry.cost,
    weight: entry.weight,
    requires_attunement: entry.attunement,
    is_magical: false,
    properties: entry.properties.map((property) => ({
      id: property.id,
      name: property.nameUk,
      description: property.sourceText,
      ...(property.scanLine ?? {}),
    })),
    damage: entry.damage ?? null,
    damage_type: entry.damageType ?? null,
    range: entry.usage?.range ?? null,
    armor_class: entry.armorClass ?? null,
    required_strength: entry.strengthRequirement ?? null,
    stealth_disadvantage: false,
    quantity: null,
  };
}

const officialEntries: CatalogEntry[] = [
  ...officialRaces.map(raceToCatalogEntry),
  ...officialClasses.map(classToCatalogEntry),
  ...officialItems.map(itemToCatalogEntry),
];

export function listOfficialEntries(entity: EntityType) {
  return officialEntries.filter((entry) => entry.entityType === entity);
}

export function findOfficialEntry(entity: EntityType, slug: string) {
  return officialEntries.find((entry) => entry.entityType === entity && entry.slug === slug) ?? null;
}

export async function fetchOfficialCatalogList(entity: EntityType) {
  return listOfficialEntries(entity);
}

export async function fetchOfficialCatalogEntryBySlug(entity: EntityType, slug: string) {
  return findOfficialEntry(entity, slug);
}

export function hasStaticOfficialDataset(entity: EntityType) {
  return entity === 'race' || entity === 'class' || entity === 'item';
}
