import type { CatalogEntry, ClassEntry, ItemEntry, RaceEntry } from '../types';

export type ReferenceInfo = {
  label: string;
  value: string;
};

export type ReferenceCard = {
  title: string;
  description?: string;
  rows: ReferenceInfo[];
};

export type GameplaySummary = {
  title: string;
  items: string[];
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

const keyLabels: Record<string, string> = {
  mechanical_effect: 'Ігровий ефект',
  effect: 'Ігровий ефект',
  usage: 'Використання',
  action_type: 'Тип дії',
  recovery: 'Відновлення',
  saving_throw: 'Ряткидок',
  save: 'Ряткидок',
  save_ability: 'Ряткидок',
  dc: 'СК',
  dc_formula: 'СК',
  damage: 'Шкода',
  damage_type: 'Тип шкоди',
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
  condition_immunities: 'Імунітет до станів',
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
  focus: 'Фокус',
  ability: 'Характеристика',
  preparation: 'Підготовка',
  spell_save_dc: 'СК ряткидка',
  spell_attack: 'Атака закляттям',
  contains: 'Вміст',
  value: 'Значення',
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
  if (Array.isArray(value)) return value.map(cleanText).filter(Boolean).join(', ');
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function formatBonus(value: unknown) {
  const text = cleanText(value);
  if (!text) return null;
  if (/^[+-]?\d+$/.test(text)) {
    const numeric = Number(text);
    return numeric > 0 ? `+${numeric}` : `${numeric}`;
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
      if (isRecord(child)) return { name: key, ...child };
      return { name: key, value: child };
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
    if (description) return [{ title: 'Гнучкий бонус', description, rows: [] }];
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
          title: ability ?? 'Бонус характеристик',
          description: description ?? cleanText(item.value) ?? undefined,
          rows: rowsForRecord(item),
        });
      }
    } else {
      const text = cleanText(item);
      if (text) cards.push({ title: 'Бонус характеристик', description: text, rows: [] });
    }
  }

  return cards;
}

export function referenceCards(value: unknown, fallbackTitle: string): ReferenceCard[] {
  return arrayFromUnknown(value)
    .map((item, index): ReferenceCard | null => {
      if (isRecord(item)) {
        return {
          title: titleForRecord(item, `${fallbackTitle} ${index + 1}`),
          description: descriptionForRecord(item),
          rows: rowsForRecord(item),
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

  if (isRecord(proficiencies)) {
    for (const [key, child] of Object.entries(proficiencies)) {
      const value = cleanText(child);
      if (value) groups.push({ title: keyLabels[key] ?? key.replace(/_/g, ' '), values: value.split(', ').filter(Boolean) });
    }
  }

  if (Array.isArray(skills)) {
    const values = skills.map(cleanText).filter((value): value is string => Boolean(value));
    if (values.length > 0) groups.push({ title: 'Навички', values });
  }

  if (entry.languages.length > 0) groups.push({ title: 'Мови', values: entry.languages });

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
      entry.size ? `Розмір: ${entry.size}.` : null,
      entry.speed ? `Базова швидкість: ${entry.speed}.` : null,
      entry.languages.length > 0 ? `Мови: ${entry.languages.join(', ')}.` : null,
      abilityBonusCards(entry.ability_bonuses).length > 0 ? 'Має бонуси характеристик або гнучкий вибір під збірку персонажа.' : null,
      referenceCards(entry.race_traits, 'Риса').length > 0 ? 'Ключові расові риси описані нижче як окремі довідкові картки.' : null,
    ].filter((item): item is string => Boolean(item));

    return { title: 'Що дає ця раса', items };
  }

  if (entry.entityType === 'class') {
    const items = [
      entry.hit_die ? `Витривалість класу задає кістка хітів ${entry.hit_die}.` : null,
      entry.primary_ability ? `Основна характеристика: ${entry.primary_ability}.` : null,
      entry.saving_throws.length > 0 ? `Ключові ряткидки: ${entry.saving_throws.join(', ')}.` : null,
      entry.has_spellcasting ? 'Клас має заклинальні можливості або магічну підготовку.' : 'Клас не спирається на заклинання як основну механіку.',
      referenceCards(entry.class_features, 'Особливість').length > 0 ? 'Особливості класу нижче пояснюють стиль гри, ресурси та рішення в сценах.' : null,
    ].filter((item): item is string => Boolean(item));

    return { title: 'Як грається цей клас', items };
  }

  const item = entry as ItemEntry;
  const items = [
    item.item_type || item.category ? `Тип: ${[item.item_type, item.category].filter(Boolean).join(' · ')}.` : null,
    item.damage ? `Шкода: ${item.damage}${item.damage_type ? `, ${item.damage_type}` : ''}.` : null,
    item.armor_class ? `Захист / КД: ${item.armor_class}.` : null,
    item.is_magical ? 'Це магічний предмет.' : null,
    item.requires_attunement ? 'Потребує налаштування перед повним використанням.' : null,
    referenceCards(item.properties, 'Властивість').length > 0 ? 'Властивості нижче пояснюють практичне використання предмета.' : null,
  ].filter((summaryItem): summaryItem is string => Boolean(summaryItem));

  return { title: 'Як використовується', items };
}

export function itemRequirementRows(entry: ItemEntry): ReferenceInfo[] {
  return [
    entry.required_strength ? { label: 'Необхідна сила', value: entry.required_strength } : null,
    entry.requires_attunement ? { label: 'Налаштування', value: 'Потрібне' } : null,
    entry.stealth_disadvantage ? { label: 'Скритність', value: 'Перешкода' } : null,
  ].filter((row): row is ReferenceInfo => Boolean(row));
}
