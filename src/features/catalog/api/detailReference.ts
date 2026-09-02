import type { CatalogEntry, ClassEntry, ItemEntry, RaceEntry } from '../types';

export type ReferenceInfo = {
  label: string;
  value: string;
};

export type ReferenceCard = {
  title: string;
  description?: string;
  rows: ReferenceInfo[];
  anchorId?: string;
  kind?: 'base' | 'subclass';
  subclassName?: string;
  options?: ReferenceCard[];
};

export type GameplaySummary = {
  title: string;
  items: string[];
};

export type AbilityScoreCell = {
  label: string;
  value: string;
  isActive: boolean;
};

const abilityLabels: Record<string, string> = {
  strength: 'Сила',
  str: 'Сила',
  'сила': 'Сила',
  dexterity: 'Спритність',
  dex: 'Спритність',
  'спритність': 'Спритність',
  constitution: 'Статура',
  con: 'Статура',
  'статура': 'Статура',
  intelligence: 'Інтелект',
  int: 'Інтелект',
  'інтелект': 'Інтелект',
  wisdom: 'Мудрість',
  wis: 'Мудрість',
  'мудрість': 'Мудрість',
  charisma: 'Харизма',
  cha: 'Харизма',
  'харизма': 'Харизма',
};

const keyLabels: Record<string, string> = {
  mechanical_effect: 'Механічний ефект',
  effect: 'Механічний ефект',
  usage: 'Використання',
  action_type: 'Тип дії',
  type: 'Тип',
  range: 'Дальність',
  distance: 'Дальність',
  reach: 'Дальність',
  stat: 'Характеристика',
  recovery: 'Відновлення',
  saving_throw: 'Ряткидок',
  save: 'Ряткидок',
  save_ability: 'Ряткидок',
  dc: 'СК ряткидка',
  dc_formula: 'СК ряткидка',
  damage: 'Шкода',
  damage_type: 'Тип шкоди',
  property: 'Властивість',
  armor_class: 'Клас захисту',
  scaling: 'Масштабування',
  requirement: 'Вимога',
  limitation: 'Обмеження',
  resistance: 'Стійкість',
  resistances: 'Стійкості',
  immunity: 'Імунітет',
  immunities: 'Імунітети',
  advantage: 'Перевага',
  advantages: 'Переваги',
  condition: 'Стан',
  condition_immunities: 'Імунітети до станів',
  damage_resistances: 'Стійкість до шкоди',
  saving_throw_advantages: 'Переваги на ряткидки',
  level: 'Рівень',
  role: 'Роль',
  changes: 'Що змінює',
  bonus: 'Бонус',
  traits: 'Риси',
  restrictions: 'Обмеження',
  features: 'Особливості',
  slots: 'Комірки',
  resources: 'Ресурси',
  focus: 'Фокус заклинань',
  ability: 'Заклинальна характеристика',
  preparation: 'Підготовка',
  spell_save_dc: 'СК ряткидка заклинання',
  spell_attack: 'Модифікатор атаки заклинанням',
  contains: 'Вміст',
  value: 'Значення',
  choose: 'Обрати',
  from: 'Зі списку',
  tools: 'Інструменти',
  tool: 'Інструменти',
  tool_proficiencies: 'Інструменти',
  skills: 'Навички',
  skill: 'Навички',
  language: 'Мови',
  languages: 'Мови',
  proficiency: 'Володіння',
  proficiencies: 'Володіння',
  weapons: 'Зброя',
  armor: 'Броня',
  other: 'Інше',
  description: 'Опис',
};

const titleKeys = ['name', 'title', 'label'];
const descriptionKeys = ['description', 'text', 'note'];
const rowKeys = Object.keys(keyLabels);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (Array.isArray(value)) {
    const values = value.map(cleanText).filter((item): item is string => Boolean(item));
    return Array.from(new Set(values)).join(', ') || null;
  }
  if (isRecord(value)) {
    const title = titleKeys.map((key) => cleanText(value[key])).find(Boolean);
    const effect = cleanText(
      value.mechanical_effect ?? value.effect ?? value.value ?? value.description ?? value.text ?? value.note,
    );

    if (title || effect) {
      if (title && effect && title !== effect) return `${title}: ${effect}`;
      return title ?? effect ?? null;
    }

    const nestedValues = Object.values(value)
      .map(cleanText)
      .filter((item): item is string => Boolean(item));
    return Array.from(new Set(nestedValues)).join(', ') || null;
  }
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function formatBonus(value: unknown) {
  const text = cleanText(value);
  if (!text) return null;
  if (/^[+-]?\d+$/.test(text)) {
    const numeric = Number(text);
    return numeric >= 0 ? `+${numeric}` : `${numeric}`;
  }
  return text;
}

function translateAbility(value: string) {
  return abilityLabels[value.toLowerCase()] ?? value;
}

function arrayFromUnknown(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (isRecord(value)) {
    for (const key of ['items', 'traits', 'features', 'properties', 'bonuses', 'list', 'entries', 'variants']) {
      if (Array.isArray(value[key])) return value[key] as unknown[];
    }

    return Object.entries(value).map(([key, child]) => {
      const readableName = keyLabels[key] ?? key.replace(/_/g, ' ');
      if (isRecord(child)) return { name: readableName, ...child };
      return { name: readableName, value: child };
    });
  }
  return cleanText(value) ? [value] : [];
}

function titleForRecord(record: Record<string, unknown>, fallback: string) {
  return titleKeys.map((key) => cleanText(record[key])).find(Boolean) ?? fallback;
}

function descriptionForRecord(record: Record<string, unknown>) {
  return descriptionKeys.map((key) => cleanText(record[key])).find(Boolean) ?? undefined;
}

function rowsForRecord(record: Record<string, unknown>) {
  return rowKeys
    .map((key) => {
      const value = cleanText(record[key]);
      return value ? { label: keyLabels[key], value } : null;
    })
    .filter((row): row is ReferenceInfo => Boolean(row));
}

export function abilityBonusCards(value: unknown): ReferenceCard[] {
  const cards: ReferenceCard[] = [];

  if (isRecord(value)) {
    const direct = Object.entries(value)
      .filter(([key]) => abilityLabels[key.toLowerCase()])
      .map(([key, child]): ReferenceCard | null => {
        const bonus = formatBonus(child);
        return bonus ? { title: `${bonus} ${translateAbility(key)}`, rows: [] } : null;
      })
      .filter((card): card is ReferenceCard => Boolean(card));

    if (direct.length > 0) return direct;

    const description = cleanText(value.description ?? value.text ?? value.note ?? value.value);
    if (description) return [{ title: 'Збільшення характеристики', description, rows: [] }];
  }

  for (const item of arrayFromUnknown(value)) {
    if (isRecord(item)) {
      const ability = cleanText(item.ability ?? item.stat ?? item.name ?? item.title);
      const bonus = formatBonus(item.bonus ?? item.value ?? item.amount);
      const description = descriptionForRecord(item);

      if (ability && bonus && abilityLabels[ability.toLowerCase()]) {
        cards.push({ title: `${bonus} ${translateAbility(ability)}`, description, rows: rowsForRecord(item) });
      } else {
        cards.push({
          title: ability ?? 'Збільшення характеристики',
          description: description ?? cleanText(item.value) ?? undefined,
          rows: rowsForRecord(item),
        });
      }
    } else {
      const text = cleanText(item);
      if (text) cards.push({ title: 'Збільшення характеристики', description: text, rows: [] });
    }
  }

  return cards;
}

export function abilityScoreCells(value: unknown): { cells: AbilityScoreCell[]; note?: string } {
  const orderedLabels = ['Сила', 'Спритність', 'Статура', 'Інтелект', 'Мудрість', 'Харизма'];
  const bonusByLabel = new Map(orderedLabels.map((label) => [label, '+0']));

  function assignBonus(rawAbility: unknown, rawBonus: unknown) {
    const ability = cleanText(rawAbility);
    const bonus = formatBonus(rawBonus);
    if (!ability || !bonus) return;
    const label = abilityLabels[ability.toLowerCase()] ?? ability;
    if (bonusByLabel.has(label)) bonusByLabel.set(label, bonus);
  }

  if (isRecord(value)) {
    for (const [key, rawBonus] of Object.entries(value)) {
      if (abilityLabels[key.toLowerCase()]) assignBonus(key, rawBonus);
    }

    for (const key of ['items', 'bonuses', 'list', 'entries']) {
      if (!Array.isArray(value[key])) continue;
      for (const item of value[key]) {
        if (!isRecord(item)) continue;
        assignBonus(item.ability ?? item.stat ?? item.name ?? item.title, item.bonus ?? item.value ?? item.amount);
      }
    }
  } else if (Array.isArray(value)) {
    for (const item of value) {
      if (!isRecord(item)) continue;
      assignBonus(item.ability ?? item.stat ?? item.name ?? item.title, item.bonus ?? item.value ?? item.amount);
    }
  }

  const scores = orderedLabels.map((label) => {
    const bonus = bonusByLabel.get(label) ?? '+0';
    const numericBonus = Number(bonus);
    return { label, value: bonus, isActive: Number.isFinite(numericBonus) && numericBonus !== 0 };
  });

  if (isRecord(value)) {
    const directBonusExists = scores.some((score) => score.isActive);
    const note = cleanText(value.description ?? value.text ?? value.note ?? value.value);
    return { cells: scores, note: directBonusExists ? undefined : note ?? undefined };
  }

  return { cells: scores };
}

export function referenceCards(value: unknown, fallbackTitle: string): ReferenceCard[] {
  return arrayFromUnknown(value)
    .map((item, index): ReferenceCard | null => {
      if (isRecord(item)) {
        return {
          title: titleForRecord(item, `${fallbackTitle} ${index + 1}`),
          description: descriptionForRecord(item),
          rows: rowsForRecord(item),
          anchorId: cleanText(item.anchor_id) ?? undefined,
          options: referenceCards(item.options ?? item.choices, 'Варіант'),
        };
      }

      const text = cleanText(item);
      return text ? { title: text, rows: [] } : null;
    })
    .filter((card): card is ReferenceCard => Boolean(card));
}

export function groupedProficiencies(entry: RaceEntry | ClassEntry): Array<{ title: string; values: string[] }> {
  if (entry.entityType === 'class') {
    return [
      { title: 'Броня', values: entry.armor_proficiencies },
      { title: 'Зброя', values: entry.weapon_proficiencies },
      { title: 'Інструменти', values: entry.tool_proficiencies },
    ].filter((group) => group.values.length > 0);
  }

  const groups: Array<{ title: string; values: string[] }> = [];
  const proficiencies = entry.proficiencies;
  const skills = entry.additional_skills;

  function addGroup(key: string, value: unknown) {
    const title = keyLabels[key] ?? 'Інше';
    const rawValues = Array.isArray(value) ? value : [value];
    const values = rawValues
      .map(cleanText)
      .filter((item): item is string => Boolean(item))
      .map((item) => {
        if (title !== 'Інструменти' || !/вибір|вибором|на вибір/i.test(item) || /майстр/i.test(item)) return item;
        const toolName = item.replace(/\s+(на вибір|за вибором).*$/i, '').trim();
        return `${toolName} — за вибором або за домовленістю з Майстром`;
      });

    if (values.length > 0) groups.push({ title, values: Array.from(new Set(values)) });
  }

  if (isRecord(proficiencies)) {
    for (const [key, child] of Object.entries(proficiencies)) addGroup(key, child);
  } else if (Array.isArray(proficiencies)) {
    addGroup('other', proficiencies);
  }

  if (Array.isArray(skills)) {
    addGroup('skills', skills);
  } else if (isRecord(skills)) {
    for (const [key, child] of Object.entries(skills)) addGroup(key, child);
  }

  return groups;
}

export function resistanceRows(...values: unknown[]): ReferenceInfo[] {
  const rows: ReferenceInfo[] = [];

  function visit(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (!isRecord(value)) return;

    for (const key of ['immunities', 'resistances', 'advantages', 'condition_immunities', 'damage_resistances', 'saving_throw_advantages', 'immunity', 'resistance', 'advantage']) {
      const text = cleanText(value[key]);
      if (text) rows.push({ label: keyLabels[key], value: text });
    }

    Object.values(value).forEach((child) => {
      if (Array.isArray(child) || isRecord(child)) visit(child);
    });
  }

  values.forEach(visit);
  return rows;
}

export function gameplaySummary(entry: CatalogEntry): GameplaySummary {
  if (entry.entityType === 'race') {
    const items = [
      entry.creature_type ? `Тип істоти: ${entry.creature_type}.` : null,
      entry.size ? `Розмір: ${entry.size}.` : null,
      entry.speed ? `Швидкість: ${entry.speed}.` : null,
      entry.languages.length > 0 ? `Мови: ${entry.languages.join(', ')}.` : null,
    ].filter((item): item is string => Boolean(item));

    return { title: 'Базові правила раси', items };
  }

  if (entry.entityType === 'class') {
    const items = [
      entry.hit_die ? `Кістка хітів: ${entry.hit_die}.` : null,
      entry.primary_ability ? `Основна характеристика: ${entry.primary_ability}.` : null,
      entry.saving_throws.length > 0 ? `Ряткидки: ${entry.saving_throws.join(', ')}.` : null,
      `Заклинання: ${entry.has_spellcasting ? 'Так' : 'Ні'}.`,
    ].filter((item): item is string => Boolean(item));

    return { title: 'Базові правила класу', items };
  }

  const item = entry as ItemEntry;
  const items = [
    item.item_type || item.category ? `Тип предмета: ${[item.item_type, item.category].filter(Boolean).join(' · ')}.` : null,
    item.damage ? `Шкода: ${item.damage}${item.damage_type ? `, ${item.damage_type}` : ''}.` : null,
    item.armor_class ? `Клас захисту: ${item.armor_class}.` : null,
    item.price ? `Ціна: ${item.price}.` : null,
    item.weight ? `Вага: ${item.weight}.` : null,
    item.is_magical ? 'Магічний предмет: Так.' : null,
    item.requires_attunement ? 'Потребує налаштування: Так.' : null,
  ].filter((summaryItem): summaryItem is string => Boolean(summaryItem));

  return { title: 'Правила предмета', items };
}

export function quickSummaryItems(entry: CatalogEntry): ReferenceInfo[] {
  if (entry.entityType === 'race') {
    const bonus = abilityBonusCards(entry.ability_bonuses)[0];
    const trait = referenceCards(entry.race_traits, 'Риса')[0];
    const resistances = resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills)[0];

    return [
      bonus ? { label: 'Збільшення характеристики', value: bonus.title } : null,
      entry.speed ? { label: 'Швидкість', value: entry.speed } : null,
      entry.size ? { label: 'Розмір', value: entry.size } : null,
      entry.languages.length > 0 ? { label: 'Мови', value: entry.languages.join(', ') } : null,
      resistances ? { label: resistances.label, value: resistances.value } : null,
      trait ? { label: 'Ключова риса', value: trait.title } : null,
    ].filter((item): item is ReferenceInfo => Boolean(item));
  }

  if (entry.entityType === 'class') {
    return [
      entry.hit_die ? { label: 'Кістка хітів', value: entry.hit_die } : null,
      entry.primary_ability ? { label: 'Основна характеристика', value: entry.primary_ability } : null,
      entry.saving_throws.length > 0 ? { label: 'Ряткидки', value: entry.saving_throws.join(', ') } : null,
      { label: 'Заклинання', value: entry.has_spellcasting ? 'Так' : 'Ні' },
      referenceCards(entry.class_features, 'Особливість')[0]
        ? { label: 'Ключова особливість', value: referenceCards(entry.class_features, 'Особливість')[0].title }
        : null,
    ].filter((item): item is ReferenceInfo => Boolean(item));
  }

  return [
    entry.item_type || entry.category ? { label: 'Тип', value: [entry.item_type, entry.category].filter(Boolean).join(' · ') } : null,
    entry.rarity ? { label: 'Рідкість', value: entry.rarity } : null,
    entry.price ? { label: 'Ціна', value: entry.price } : null,
    entry.weight ? { label: 'Вага', value: entry.weight } : null,
    entry.damage ? { label: 'Шкода', value: entry.damage } : null,
    entry.armor_class ? { label: 'Клас захисту', value: entry.armor_class } : null,
    entry.is_magical ? { label: 'Магічний', value: 'Так' } : null,
    entry.requires_attunement ? { label: 'Потребує налаштування', value: 'Так' } : null,
  ].filter((item): item is ReferenceInfo => Boolean(item));
}

export function itemRequirementRows(entry: ItemEntry): ReferenceInfo[] {
  return [
    entry.required_strength ? { label: 'Необхідна сила', value: entry.required_strength } : null,
    entry.requires_attunement ? { label: 'Налаштування', value: 'Потрібне' } : null,
    entry.stealth_disadvantage ? { label: 'Скритність', value: 'Перешкода' } : null,
  ].filter((row): row is ReferenceInfo => Boolean(row));
}
