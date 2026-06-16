import type { CatalogEntry, ClassEntry, ItemEntry, RaceEntry } from '../types';

export type CardStatTone = 'primary' | 'secondary' | 'accent';

export type CardStat = {
  label?: string;
  value: string;
  tone?: CardStatTone;
};

export type FeaturePreview = {
  title: string;
  description?: string;
  details: Array<{ label: string; value: string }>;
};

export type CatalogCardPreview = {
  primaryStats: CardStat[];
  secondaryStats: CardStat[];
  features: FeaturePreview[];
};

const abilityLabels: Record<string, string> = {
  strength: 'Сила',
  str: 'Сила',
  dexterity: 'Спритність',
  dex: 'Спритність',
  constitution: 'Статура',
  con: 'Статура',
  intelligence: 'Інтелект',
  int: 'Інтелект',
  wisdom: 'Мудрість',
  wis: 'Мудрість',
  charisma: 'Харизма',
  cha: 'Харизма',
};

const detailLabels: Record<string, string> = {
  save: 'Ряткидок',
  saving_throw: 'Ряткидок',
  save_ability: 'Ряткидок',
  dc: 'СК',
  dc_formula: 'СК',
  damage: 'Шкода',
  damage_type: 'Тип шкоди',
  action_type: 'Дія',
  usage: 'Використання',
  level: 'Рівень',
  requirement: 'Вимога',
};

const featureTextKeys = ['name', 'title', 'label'];
const descriptionKeys = ['description', 'text', 'note'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function uniq(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function limitText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

function formatList(values: string[], maxItems: number, maxLength = 46) {
  const shown = values.slice(0, maxItems);
  const suffix = values.length > shown.length ? ` +${values.length - shown.length}` : '';
  return limitText(`${shown.join(', ')}${suffix}`, maxLength);
}

function arrayFromUnknown(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (isRecord(value)) {
    const preferred = ['items', 'traits', 'features', 'properties', 'bonuses', 'list', 'entries'];
    for (const key of preferred) {
      if (Array.isArray(value[key])) return value[key] as unknown[];
    }
    return Object.entries(value).map(([key, child]) => (isRecord(child) ? { name: key, ...child } : { name: key, value: child }));
  }
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function translateAbility(value: string) {
  return abilityLabels[value.toLowerCase()] ?? value;
}

function formatBonusValue(value: unknown) {
  const text = cleanText(value);
  if (!text) return null;
  if (/^[+-]?\d+$/.test(text)) return Number(text) > 0 ? `+${Number(text)}` : text;
  return text;
}

function bonusFromRecord(record: Record<string, unknown>) {
  const ability = cleanText(record.ability ?? record.stat ?? record.name ?? record.title);
  const bonus = formatBonusValue(record.bonus ?? record.value ?? record.amount);

  if (ability && bonus) return `${bonus} ${translateAbility(ability)}`;

  const description = cleanText(record.description ?? record.text ?? record.note);
  if (description) return description;

  const keyBonuses = Object.entries(record)
    .filter(([key, value]) => abilityLabels[key.toLowerCase()] && cleanText(value))
    .map(([key, value]) => `${formatBonusValue(value)} ${translateAbility(key)}`);

  return keyBonuses.length > 0 ? keyBonuses.join(', ') : null;
}

function abilityBonusStats(value: unknown, compact: boolean): CardStat[] {
  const stats: CardStat[] = [];

  if (isRecord(value)) {
    const fromRecord = bonusFromRecord(value);
    if (fromRecord) stats.push({ label: 'Бонуси', value: limitText(fromRecord, compact ? 34 : 52), tone: 'accent' });
  }

  for (const item of arrayFromUnknown(value)) {
    let text: string | null = null;
    if (isRecord(item)) text = bonusFromRecord(item);
    else text = cleanText(item);

    if (text) stats.push({ label: 'Бонуси', value: limitText(text, compact ? 34 : 52), tone: 'accent' });
  }

  return uniq(stats.map((stat) => `${stat.label ?? ''}|${stat.value}`))
    .slice(0, compact ? 1 : 2)
    .map((key): CardStat => {
      const [, value] = key.split('|');
      return { label: 'Бонуси', value, tone: 'accent' };
    });
}

function featureFromRecord(record: Record<string, unknown>, fallbackTitle?: string): FeaturePreview | null {
  const title = featureTextKeys.map((key) => cleanText(record[key])).find(Boolean) ?? fallbackTitle;
  if (!title) return null;

  const description = descriptionKeys.map((key) => cleanText(record[key])).find(Boolean) ?? undefined;
  const details = Object.entries(detailLabels)
    .map(([key, label]) => {
      const value = cleanText(record[key]);
      return value ? { label, value } : null;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));

  return {
    title: limitText(title, 34),
    description: description ? limitText(description, 220) : undefined,
    details,
  };
}

function featurePreviews(value: unknown, maxItems: number): FeaturePreview[] {
  const features: FeaturePreview[] = [];

  if (isRecord(value)) {
    const direct = featureFromRecord(value);
    if (direct) features.push(direct);

    for (const [key, child] of Object.entries(value)) {
      if (features.length >= maxItems) break;
      if (isRecord(child)) {
        const nested = featureFromRecord(child, key);
        if (nested) features.push(nested);
      }
    }
  }

  for (const item of arrayFromUnknown(value)) {
    if (features.length >= maxItems) break;
    if (isRecord(item)) {
      const feature = featureFromRecord(item);
      if (feature) features.push(feature);
    } else {
      const title = cleanText(item);
      if (title) features.push({ title: limitText(title, 34), details: [] });
    }
  }

  return uniq(features.map((feature) => feature.title))
    .slice(0, maxItems)
    .map((title) => features.find((feature) => feature.title === title))
    .filter((feature): feature is FeaturePreview => Boolean(feature));
}

function racePreview(entry: RaceEntry, compact: boolean): CatalogCardPreview {
  const primaryStats = abilityBonusStats(entry.ability_bonuses, compact);

  if (entry.speed) primaryStats.push({ label: 'Швидкість', value: entry.speed, tone: 'primary' });

  const secondaryStats: CardStat[] = [];
  if (entry.size) secondaryStats.push({ label: 'Розмір', value: entry.size });
  if (entry.languages.length > 0) secondaryStats.push({ label: 'Мови', value: formatList(entry.languages, compact ? 2 : 3) });

  return {
    primaryStats: primaryStats.slice(0, compact ? 2 : 3),
    secondaryStats: secondaryStats.slice(0, compact ? 1 : 2),
    features: featurePreviews(entry.race_traits, compact ? 2 : 3),
  };
}

function classPreview(entry: ClassEntry, compact: boolean): CatalogCardPreview {
  const primaryStats: CardStat[] = [];
  const secondaryStats: CardStat[] = [];

  if (entry.hit_die) primaryStats.push({ label: 'Кістка хітів', value: entry.hit_die, tone: 'accent' });
  if (entry.primary_ability) primaryStats.push({ label: 'Основна', value: entry.primary_ability, tone: 'primary' });
  primaryStats.push({ label: 'Заклинання', value: entry.has_spellcasting ? 'Так' : 'Ні', tone: entry.has_spellcasting ? 'accent' : 'secondary' });

  if (entry.saving_throws.length > 0) {
    secondaryStats.push({ label: 'Ряткидки', value: formatList(entry.saving_throws, compact ? 2 : 3) });
  }

  return {
    primaryStats: primaryStats.slice(0, compact ? 2 : 3),
    secondaryStats,
    features: featurePreviews(entry.class_features, compact ? 2 : 3),
  };
}

function itemPreview(entry: ItemEntry, compact: boolean): CatalogCardPreview {
  const primaryStats: CardStat[] = [];
  const secondaryStats: CardStat[] = [];

  if (entry.item_type || entry.category) {
    primaryStats.push({ value: [entry.item_type, entry.category].filter(Boolean).join(' · '), tone: 'primary' });
  }
  if (entry.damage) primaryStats.push({ label: 'Шкода', value: entry.damage, tone: 'accent' });
  if (entry.armor_class) primaryStats.push({ label: 'КД', value: entry.armor_class, tone: 'accent' });
  if (entry.rarity) primaryStats.push({ label: 'Рідкість', value: entry.rarity, tone: entry.is_magical ? 'accent' : 'secondary' });

  if (entry.damage_type) secondaryStats.push({ label: 'Тип шкоди', value: entry.damage_type });
  if (entry.range) secondaryStats.push({ label: 'Дальність', value: entry.range });
  if (entry.price) secondaryStats.push({ label: 'Ціна', value: entry.price });
  if (entry.weight) secondaryStats.push({ label: 'Вага', value: entry.weight });
  if (entry.required_strength) secondaryStats.push({ label: 'Сила', value: entry.required_strength });
  if (entry.quantity) secondaryStats.push({ label: 'Кількість', value: entry.quantity });
  if (entry.is_magical) secondaryStats.push({ value: 'Магічний предмет', tone: 'accent' });
  if (entry.requires_attunement) secondaryStats.push({ value: 'Потребує налаштування', tone: 'accent' });
  if (entry.stealth_disadvantage) secondaryStats.push({ value: 'Перешкода скритності' });

  return {
    primaryStats: primaryStats.slice(0, compact ? 2 : 3),
    secondaryStats: secondaryStats.slice(0, compact ? 2 : 4),
    features: featurePreviews(entry.properties, compact ? 2 : 3),
  };
}

export function getCatalogCardPreview(entry: CatalogEntry, compact = false): CatalogCardPreview {
  if (entry.entityType === 'race') return racePreview(entry, compact);
  if (entry.entityType === 'class') return classPreview(entry, compact);
  return itemPreview(entry, compact);
}
