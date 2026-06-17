import type { CatalogEntry, ClassEntry, ItemEntry, RaceEntry } from '../types';

export type CardStatTone = 'primary' | 'secondary' | 'accent';

export type CardStat = {
  label?: string;
  value: string;
  tone?: CardStatTone;
};

export type MechanicSection = {
  title: string;
  rows: CardStat[];
};

export type FeaturePreview = {
  title: string;
  description?: string;
  details: Array<{ label: string; value: string }>;
};

export type CatalogCardPreview = {
  main: MechanicSection | null;
  secondary: MechanicSection | null;
  featureTitle: string;
  features: FeaturePreview[];
  hiddenFeatureCount: number;
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

const readableKeys: Record<string, string> = {
  flexible: 'Гнучкий бонус',
  graceful: 'Тонке чуття',
  sturdy: 'Стійкість',
  versatile: 'Універсальна',
  finesse: 'Точна',
  light: 'Легка',
  heavy: 'Важка',
  thrown: 'Метальна',
  ammunition: 'Боєприпас',
  reach: 'Довга',
  loading: 'Перезаряджання',
  two_handed: 'Дворучна',
  contains: 'Комплект',
};

const readableDescriptions: Record<string, string> = {
  flexible: 'Механіка може бути налаштована під обрану роль персонажа.',
  graceful: 'Підкреслює уважність, точність або природну спритність персонажа.',
  sturdy: 'Підкреслює витривалість, стійкість або надійність персонажа.',
  versatile: 'Предмет можна використовувати по-різному залежно від хвату або ситуації.',
  finesse: 'Для атаки можна спиратися на точність і контроль.',
  light: 'Зручний для швидкого використання або перенесення.',
  heavy: 'Потребує впевненого поводження через розмір або вагу.',
  thrown: 'Може бути використаний для атаки на відстані.',
  ammunition: 'Потребує відповідних боєприпасів.',
  reach: 'Дозволяє тримати ціль на більшій відстані.',
  loading: 'Потребує часу на підготовку між пострілами.',
  two_handed: 'Потребує двох рук для ефективного використання.',
  contains: 'Набір містить кілька корисних речей для пригоди.',
};

const tooltipLabels: Record<string, string> = {
  value: 'Значення',
  type: 'Тип',
  level: 'Рівень',
  usage: 'Використання',
  requirement: 'Вимога',
  save: 'Ряткидок',
  saving_throw: 'Ряткидок',
  save_ability: 'Ряткидок',
  dc: 'СК',
  dc_formula: 'СК',
  damage: 'Шкода',
  damage_type: 'Тип шкоди',
  action_type: 'Дія',
};

const titleKeys = ['name', 'title', 'label'];
const descriptionKeys = ['description', 'text', 'note'];
const featureLimit = 3;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function limitText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

function uniqueByTitle(features: FeaturePreview[]) {
  const seen = new Set<string>();
  return features.filter((feature) => {
    const key = feature.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatList(values: string[], maxItems: number, maxLength = 52) {
  const shown = values.slice(0, maxItems);
  const suffix = values.length > shown.length ? ` +${values.length - shown.length}` : '';
  return limitText(`${shown.join(', ')}${suffix}`, maxLength);
}

function translateAbility(value: string) {
  return abilityLabels[value.toLowerCase()] ?? value;
}

function formatBonus(value: unknown) {
  const text = cleanText(value);
  if (!text) return null;
  if (/^[+-]?\d+$/.test(text)) {
    const numberValue = Number(text);
    return numberValue > 0 ? `+${numberValue}` : `${numberValue}`;
  }
  return text;
}

function arrayFromUnknown(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (isRecord(value)) {
    const preferredKeys = ['items', 'traits', 'features', 'properties', 'bonuses', 'list', 'entries'];
    for (const key of preferredKeys) {
      if (Array.isArray(value[key])) return value[key] as unknown[];
    }

    return Object.entries(value).map(([key, child]) => {
      if (isRecord(child)) return { name: readableKeys[key] ?? key, ...child };
      if (Array.isArray(child)) return { name: readableKeys[key] ?? key, value: child.join(', ') };
      if (child === true) return { name: readableKeys[key] ?? key, description: readableDescriptions[key] };
      return { name: readableKeys[key] ?? key, value: child };
    });
  }
  return typeof value === 'string' && value.trim() ? [value] : [];
}

function abilityRows(value: unknown, compact: boolean): CardStat[] {
  const rows: CardStat[] = [];

  if (isRecord(value)) {
    const directBonuses = Object.entries(value)
      .filter(([key]) => abilityLabels[key.toLowerCase()])
      .map(([key, child]) => {
        const bonus = formatBonus(child);
        return bonus ? `${bonus} ${translateAbility(key)}` : null;
      })
      .filter((item): item is string => Boolean(item));

    if (directBonuses.length > 0) {
      rows.push({ label: 'Бонуси характеристик', value: formatList(directBonuses, compact ? 2 : 3), tone: 'accent' });
      return rows;
    }

    const description = cleanText(value.description ?? value.text ?? value.note ?? value.value);
    if (description) {
      rows.push({ label: 'Бонуси характеристик', value: limitText(description, compact ? 46 : 68), tone: 'accent' });
      return rows;
    }
  }

  for (const item of arrayFromUnknown(value)) {
    if (rows.length >= 2) break;

    if (isRecord(item)) {
      const ability = cleanText(item.ability ?? item.stat ?? item.name ?? item.title);
      const bonus = formatBonus(item.bonus ?? item.value ?? item.amount);
      const description = cleanText(item.description ?? item.text ?? item.note);

      if (ability && bonus && abilityLabels[ability.toLowerCase()]) {
        rows.push({ label: 'Бонуси характеристик', value: `${bonus} ${translateAbility(ability)}`, tone: 'accent' });
      } else if (description) {
        rows.push({ label: 'Бонуси характеристик', value: limitText(description, compact ? 46 : 68), tone: 'accent' });
      } else if (ability && bonus) {
        rows.push({ label: 'Бонуси характеристик', value: `${bonus} ${ability}`, tone: 'accent' });
      }
    } else {
      const text = cleanText(item);
      if (text) rows.push({ label: 'Бонуси характеристик', value: limitText(text, compact ? 46 : 68), tone: 'accent' });
    }
  }

  return rows;
}

function tooltipDetails(record: Record<string, unknown>) {
  return Object.entries(tooltipLabels)
    .map(([key, label]) => {
      const value = cleanText(record[key]);
      return value ? { label, value } : null;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));
}

function featureFromRecord(record: Record<string, unknown>, fallbackTitle?: string): FeaturePreview | null {
  const title = titleKeys.map((key) => cleanText(record[key])).find(Boolean) ?? fallbackTitle;
  if (!title) return null;

  const description = descriptionKeys.map((key) => cleanText(record[key])).find(Boolean) ?? undefined;
  const details = tooltipDetails(record);

  return {
    title: limitText(title, 34),
    description: description ? limitText(description, 260) : undefined,
    details,
  };
}

function allFeaturePreviews(value: unknown): FeaturePreview[] {
  const features: FeaturePreview[] = [];

  if (isRecord(value)) {
    const direct = featureFromRecord(value);
    if (direct) features.push(direct);
  }

  for (const item of arrayFromUnknown(value)) {
    if (isRecord(item)) {
      const feature = featureFromRecord(item);
      if (feature) features.push(feature);
    } else {
      const title = cleanText(item);
      if (title) features.push({ title: limitText(title, 34), details: [] });
    }
  }

  return uniqueByTitle(features);
}

function makeSection(title: string, rows: CardStat[]): MechanicSection | null {
  return rows.length > 0 ? { title, rows } : null;
}

function compactRows(rows: CardStat[], compact: boolean, normalLimit: number) {
  return rows.slice(0, compact ? Math.min(2, normalLimit) : normalLimit);
}

export function getRaceMechanics(entry: RaceEntry, compact = false): CatalogCardPreview {
  const mainRows = abilityRows(entry.ability_bonuses, compact);
  const secondaryRows: CardStat[] = [];

  if (entry.size) secondaryRows.push({ label: 'Розмір', value: entry.size });
  if (entry.speed) secondaryRows.push({ label: 'Швидкість', value: entry.speed, tone: 'accent' });
  if (entry.languages.length > 0) secondaryRows.push({ label: 'Мови', value: formatList(entry.languages, compact ? 2 : 3) });

  const features = allFeaturePreviews(entry.race_traits);

  return {
    main: makeSection('Бонуси характеристик', mainRows),
    secondary: makeSection('Основне', compactRows(secondaryRows, compact, 3)),
    featureTitle: 'Риси',
    features: features.slice(0, compact ? 2 : featureLimit),
    hiddenFeatureCount: Math.max(0, features.length - (compact ? 2 : featureLimit)),
  };
}

export function getClassMechanics(entry: ClassEntry, compact = false): CatalogCardPreview {
  const mainRows: CardStat[] = [];
  const secondaryRows: CardStat[] = [];

  if (entry.hit_die) mainRows.push({ label: 'Кістка хітів', value: entry.hit_die, tone: 'accent' });
  if (entry.primary_ability) mainRows.push({ label: 'Основна', value: entry.primary_ability, tone: 'primary' });
  mainRows.push({ label: 'Заклинання', value: entry.has_spellcasting ? 'Так' : 'Ні', tone: entry.has_spellcasting ? 'accent' : 'secondary' });

  if (entry.saving_throws.length > 0) secondaryRows.push({ label: 'Ряткидки', value: formatList(entry.saving_throws, 2) });
  if (!compact && entry.armor_proficiencies.length > 0) {
    secondaryRows.push({ label: 'Броня', value: formatList(entry.armor_proficiencies, 2) });
  }
  if (!compact && entry.weapon_proficiencies.length > 0) {
    secondaryRows.push({ label: 'Зброя', value: formatList(entry.weapon_proficiencies, 2) });
  }

  const features = allFeaturePreviews(entry.class_features);

  return {
    main: makeSection('Основа класу', compactRows(mainRows, compact, 3)),
    secondary: makeSection('Підготовка', compactRows(secondaryRows, compact, 3)),
    featureTitle: 'Особливості',
    features: features.slice(0, compact ? 2 : featureLimit),
    hiddenFeatureCount: Math.max(0, features.length - (compact ? 2 : featureLimit)),
  };
}

export function getItemMechanics(entry: ItemEntry, compact = false): CatalogCardPreview {
  const mainRows: CardStat[] = [];
  const secondaryRows: CardStat[] = [];

  if (entry.item_type || entry.category) {
    mainRows.push({ label: 'Тип', value: [entry.item_type, entry.category].filter(Boolean).join(' · '), tone: 'primary' });
  }
  if (entry.damage) mainRows.push({ label: 'Шкода', value: entry.damage, tone: 'accent' });
  if (entry.armor_class) mainRows.push({ label: 'КД', value: entry.armor_class, tone: 'accent' });
  if (entry.rarity) mainRows.push({ label: 'Рідкість', value: entry.rarity, tone: entry.is_magical ? 'accent' : 'secondary' });
  if (entry.is_magical) mainRows.push({ label: 'Магічний', value: 'Так', tone: 'accent' });

  if (entry.damage_type) secondaryRows.push({ label: 'Тип шкоди', value: entry.damage_type });
  if (entry.range) secondaryRows.push({ label: 'Дальність', value: entry.range });
  if (entry.required_strength) secondaryRows.push({ label: 'Необхідна сила', value: entry.required_strength });
  if (entry.stealth_disadvantage) secondaryRows.push({ label: 'Скритність', value: 'Перешкода' });
  if (entry.requires_attunement) secondaryRows.push({ label: 'Налаштування', value: 'Так', tone: 'accent' });
  if (entry.quantity) secondaryRows.push({ label: 'Кількість', value: entry.quantity });
  if (entry.weight) secondaryRows.push({ label: 'Вага', value: entry.weight });
  if (entry.price) secondaryRows.push({ label: 'Ціна', value: entry.price });

  const features = allFeaturePreviews(entry.properties);

  return {
    main: makeSection('Параметри', compactRows(mainRows, compact, 4)),
    secondary: makeSection('Деталі', compactRows(secondaryRows, compact, 4)),
    featureTitle: 'Властивості',
    features: features.slice(0, compact ? 2 : featureLimit),
    hiddenFeatureCount: Math.max(0, features.length - (compact ? 2 : featureLimit)),
  };
}

export function getFeatureTooltipData(feature: FeaturePreview) {
  return feature;
}

export function getCatalogCardPreview(entry: CatalogEntry, compact = false): CatalogCardPreview {
  if (entry.entityType === 'race') return getRaceMechanics(entry, compact);
  if (entry.entityType === 'class') return getClassMechanics(entry, compact);
  return getItemMechanics(entry, compact);
}
