import type { AdminMaterialType } from '../types';

export type FieldKind = 'text' | 'array' | 'json-object' | 'json-array' | 'boolean';

export type ImportField = {
  key: string;
  label: string;
  required?: boolean;
  kind: FieldKind;
};

export const commonImportFields: ImportField[] = [
  { key: 'title_ua', label: 'Назва українською', required: true, kind: 'text' },
  { key: 'title_original', label: 'Оригінальна назва', kind: 'text' },
  { key: 'slug', label: 'Slug', required: true, kind: 'text' },
  { key: 'short_description', label: 'Короткий опис', kind: 'text' },
  { key: 'full_description_markdown', label: 'Повний опис Markdown', kind: 'text' },
  { key: 'image_url', label: 'Зображення', kind: 'text' },
  { key: 'source_id', label: 'Джерело', kind: 'text' },
  { key: 'tags', label: 'Теги', kind: 'array' },
  { key: 'publication_status', label: 'Статус публікації', required: true, kind: 'text' },
  { key: 'rules_version', label: 'Версія правил', required: true, kind: 'text' },
  { key: 'content_type', label: 'Тип контенту', required: true, kind: 'text' },
];

export const importFieldsByType: Record<AdminMaterialType, ImportField[]> = {
  race: [
    ...commonImportFields,
    { key: 'creature_type', label: 'Тип істоти', kind: 'text' },
    { key: 'size', label: 'Розмір', kind: 'text' },
    { key: 'speed', label: 'Швидкість', kind: 'text' },
    { key: 'languages', label: 'Мови', kind: 'array' },
    { key: 'lifespan', label: 'Тривалість життя', kind: 'text' },
    { key: 'alignment_or_behavior', label: 'Світогляд / типова поведінка', kind: 'text' },
    { key: 'race_traits', label: 'Особливості раси', kind: 'json-array' },
    { key: 'ability_bonuses', label: 'Бонуси характеристик', kind: 'json-object' },
    { key: 'proficiencies', label: 'Володіння', kind: 'json-object' },
    { key: 'additional_skills', label: 'Додаткові вміння', kind: 'json-array' },
    { key: 'subraces', label: 'Підраси / варіанти', kind: 'json-array' },
  ],
  class: [
    ...commonImportFields,
    { key: 'hit_die', label: 'Кістка хітів', kind: 'text' },
    { key: 'primary_ability', label: 'Основна характеристика', kind: 'text' },
    { key: 'saving_throws', label: 'Ряткидки', kind: 'array' },
    { key: 'armor_proficiencies', label: 'Володіння бронею', kind: 'array' },
    { key: 'weapon_proficiencies', label: 'Володіння зброєю', kind: 'array' },
    { key: 'tool_proficiencies', label: 'Володіння інструментами', kind: 'array' },
    { key: 'skill_choices', label: 'Навички на вибір', kind: 'json-object' },
    { key: 'starting_equipment', label: 'Початкове спорядження', kind: 'json-array' },
    { key: 'class_features', label: 'Класові особливості', kind: 'json-array' },
    { key: 'class_progression', label: 'Таблиця прогресії', kind: 'json-array' },
    { key: 'subclasses', label: 'Підкласи', kind: 'json-array' },
    { key: 'spellcasting', label: 'Заклинальні можливості', kind: 'json-object' },
    { key: 'has_spellcasting', label: 'Має заклинання', kind: 'boolean' },
  ],
  item: [
    ...commonImportFields,
    { key: 'item_type', label: 'Тип предмета', kind: 'text' },
    { key: 'category', label: 'Категорія', kind: 'text' },
    { key: 'rarity', label: 'Рідкість', kind: 'text' },
    { key: 'price', label: 'Ціна', kind: 'text' },
    { key: 'weight', label: 'Вага', kind: 'text' },
    { key: 'requires_attunement', label: 'Потребує налаштування', kind: 'boolean' },
    { key: 'is_magical', label: 'Магічний предмет', kind: 'boolean' },
    { key: 'properties', label: 'Властивості', kind: 'json-object' },
    { key: 'damage', label: 'Шкода', kind: 'text' },
    { key: 'damage_type', label: 'Тип шкоди', kind: 'text' },
    { key: 'range', label: 'Дальність', kind: 'text' },
    { key: 'armor_class', label: 'Броня / КД', kind: 'text' },
    { key: 'required_strength', label: 'Необхідна сила', kind: 'text' },
    { key: 'stealth_disadvantage', label: 'Перешкода для скритності', kind: 'boolean' },
    { key: 'quantity', label: 'Кількість', kind: 'text' },
  ],
};

export const templateByType: Record<AdminMaterialType, string> = {
  race: '/templates/races_import_template.csv',
  class: '/templates/classes_import_template.csv',
  item: '/templates/items_import_template.csv',
};
