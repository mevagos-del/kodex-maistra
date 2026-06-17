import ReactMarkdown from 'react-markdown';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  fetchAdminMaterialById,
  fetchAdminMaterials,
  fetchAdminSources,
  saveAdminMaterial,
} from '../api/adminApi';
import type { AdminMaterialForm, AdminMaterialListItem, AdminMaterialType, AdminSource, JsonFieldConfig } from '../types';
import { uploadImage, type ImageFolder } from '@/lib/storage';
import { AdminStatusMessage } from './AdminStatusMessage';

const materialLabels: Record<AdminMaterialType, string> = {
  race: 'Раса',
  class: 'Клас',
  item: 'Предмет',
};

const statusLabels: Record<string, string> = {
  draft: 'Чернетка',
  published: 'Опубліковано',
  hidden: 'Приховано',
};

const emptyJson = '{}';
const emptyArrayJson = '[]';

function emptyMaterial(): AdminMaterialForm {
  return {
    title_ua: '',
    title_original: '',
    slug: '',
    short_description: '',
    full_description_markdown: '',
    image_url: '',
    source_id: '',
    tagsText: '',
    publication_status: 'draft',
    rules_version: '2024',
    content_type: 'draft',
    creature_type: '',
    size: '',
    speed: '',
    languagesText: '',
    lifespan: '',
    alignment_or_behavior: '',
    race_traits: emptyArrayJson,
    ability_bonuses: emptyJson,
    proficiencies: emptyJson,
    additional_skills: emptyArrayJson,
    subraces: emptyArrayJson,
    hit_die: '',
    primary_ability: '',
    savingThrowsText: '',
    armorProficienciesText: '',
    weaponProficienciesText: '',
    toolProficienciesText: '',
    skill_choices: emptyJson,
    starting_equipment: emptyArrayJson,
    class_features: emptyArrayJson,
    class_progression: emptyArrayJson,
    subclasses: emptyArrayJson,
    spellcasting: emptyJson,
    has_spellcasting: false,
    item_type: '',
    category: '',
    rarity: '',
    price: '',
    weight: '',
    requires_attunement: false,
    is_magical: false,
    properties: emptyJson,
    damage: '',
    damage_type: '',
    range: '',
    armor_class: '',
    required_strength: '',
    stealth_disadvantage: false,
    quantity: '',
  };
}

function simpleSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseTextArray(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringifyTextArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item) => typeof item === 'string').join(', ') : '';
}

function jsonToText(value: unknown, fallback: string) {
  if (value === null || value === undefined) return fallback;
  return JSON.stringify(value, null, 2);
}

function parseJsonField(form: AdminMaterialForm, field: JsonFieldConfig) {
  try {
    return JSON.parse(String(form[field.key as keyof AdminMaterialForm] || 'null'));
  } catch {
    throw new Error(`Некоректний JSON у полі ${field.label}`);
  }
}

const raceJsonFields: JsonFieldConfig[] = [
  { key: 'race_traits', label: 'Особливості раси' },
  { key: 'ability_bonuses', label: 'Бонуси характеристик' },
  { key: 'proficiencies', label: 'Володіння' },
  { key: 'additional_skills', label: 'Додаткові вміння' },
  { key: 'subraces', label: 'Підраси / варіанти' },
];

const classJsonFields: JsonFieldConfig[] = [
  { key: 'skill_choices', label: 'Навички на вибір' },
  { key: 'starting_equipment', label: 'Початкове спорядження' },
  { key: 'class_features', label: 'Класові особливості' },
  { key: 'class_progression', label: 'Таблиця прогресії' },
  { key: 'subclasses', label: 'Підкласи' },
  { key: 'spellcasting', label: 'Заклинальні можливості' },
];

const itemJsonFields: JsonFieldConfig[] = [{ key: 'properties', label: 'Властивості' }];

function formFromRow(type: AdminMaterialType, row: any): AdminMaterialForm {
  const base = emptyMaterial();

  return {
    ...base,
    id: row.id,
    title_ua: row.title_ua ?? '',
    title_original: row.title_original ?? '',
    slug: row.slug ?? '',
    short_description: row.short_description ?? '',
    full_description_markdown: row.full_description_markdown ?? '',
    image_url: row.image_url ?? '',
    source_id: row.source_id ?? '',
    tagsText: stringifyTextArray(row.tags),
    publication_status: row.publication_status ?? 'draft',
    rules_version: row.rules_version ?? '2024',
    content_type: row.content_type ?? 'draft',
    creature_type: row.creature_type ?? '',
    size: row.size ?? '',
    speed: row.speed ?? '',
    languagesText: stringifyTextArray(row.languages),
    lifespan: row.lifespan ?? '',
    alignment_or_behavior: row.alignment_or_behavior ?? '',
    race_traits: jsonToText(row.race_traits, emptyArrayJson),
    ability_bonuses: jsonToText(row.ability_bonuses, emptyJson),
    proficiencies: jsonToText(row.proficiencies, emptyJson),
    additional_skills: jsonToText(row.additional_skills, emptyArrayJson),
    subraces: jsonToText(row.subraces, emptyArrayJson),
    hit_die: row.hit_die ?? '',
    primary_ability: row.primary_ability ?? '',
    savingThrowsText: stringifyTextArray(row.saving_throws),
    armorProficienciesText: stringifyTextArray(row.armor_proficiencies),
    weaponProficienciesText: stringifyTextArray(row.weapon_proficiencies),
    toolProficienciesText: stringifyTextArray(row.tool_proficiencies),
    skill_choices: jsonToText(row.skill_choices, emptyJson),
    starting_equipment: jsonToText(row.starting_equipment, emptyArrayJson),
    class_features: jsonToText(row.class_features, emptyArrayJson),
    class_progression: jsonToText(row.class_progression, emptyArrayJson),
    subclasses: jsonToText(row.subclasses, emptyArrayJson),
    spellcasting: jsonToText(row.spellcasting, emptyJson),
    has_spellcasting: Boolean(row.has_spellcasting),
    item_type: row.item_type ?? '',
    category: row.category ?? '',
    rarity: row.rarity ?? '',
    price: row.price ?? '',
    weight: row.weight ?? '',
    requires_attunement: Boolean(row.requires_attunement),
    is_magical: Boolean(row.is_magical),
    properties: jsonToText(row.properties, emptyJson),
    damage: row.damage ?? '',
    damage_type: row.damage_type ?? '',
    range: row.range ?? '',
    armor_class: row.armor_class ?? '',
    required_strength: row.required_strength ?? '',
    stealth_disadvantage: Boolean(row.stealth_disadvantage),
    quantity: row.quantity ?? '',
  };
}

function buildPayload(type: AdminMaterialType, form: AdminMaterialForm) {
  const payload: Record<string, unknown> = {
    title_ua: form.title_ua.trim(),
    title_original: form.title_original.trim() || null,
    slug: form.slug.trim(),
    short_description: form.short_description.trim() || null,
    full_description_markdown: form.full_description_markdown.trim() || null,
    image_url: form.image_url.trim() || null,
    source_id: form.source_id || null,
    tags: parseTextArray(form.tagsText),
    publication_status: form.publication_status,
    rules_version: form.rules_version,
    content_type: form.content_type,
  };

  if (type === 'race') {
    for (const field of raceJsonFields) payload[field.key] = parseJsonField(form, field);
    Object.assign(payload, {
      creature_type: form.creature_type.trim() || null,
      size: form.size.trim() || null,
      speed: form.speed.trim() || null,
      languages: parseTextArray(form.languagesText),
      lifespan: form.lifespan.trim() || null,
      alignment_or_behavior: form.alignment_or_behavior.trim() || null,
    });
  }

  if (type === 'class') {
    for (const field of classJsonFields) payload[field.key] = parseJsonField(form, field);
    Object.assign(payload, {
      hit_die: form.hit_die.trim() || null,
      primary_ability: form.primary_ability.trim() || null,
      saving_throws: parseTextArray(form.savingThrowsText),
      armor_proficiencies: parseTextArray(form.armorProficienciesText),
      weapon_proficiencies: parseTextArray(form.weaponProficienciesText),
      tool_proficiencies: parseTextArray(form.toolProficienciesText),
      has_spellcasting: form.has_spellcasting,
    });
  }

  if (type === 'item') {
    for (const field of itemJsonFields) payload[field.key] = parseJsonField(form, field);
    Object.assign(payload, {
      item_type: form.item_type.trim() || null,
      category: form.category.trim() || null,
      rarity: form.rarity.trim() || null,
      price: form.price.trim() || null,
      weight: form.weight.trim() || null,
      requires_attunement: form.requires_attunement,
      is_magical: form.is_magical,
      damage: form.damage.trim() || null,
      damage_type: form.damage_type.trim() || null,
      range: form.range.trim() || null,
      armor_class: form.armor_class.trim() || null,
      required_strength: form.required_strength.trim() || null,
      stealth_disadvantage: form.stealth_disadvantage,
      quantity: form.quantity.trim() || null,
    });
  }

  return payload;
}

function imageFolderForType(type: AdminMaterialType): ImageFolder {
  if (type === 'race') return 'races';
  if (type === 'class') return 'classes';
  return 'items';
}

export function MaterialsAdminTab() {
  const [type, setType] = useState<AdminMaterialType>('race');
  const [materials, setMaterials] = useState<AdminMaterialListItem[]>([]);
  const [sources, setSources] = useState<AdminSource[]>([]);
  const [form, setForm] = useState<AdminMaterialForm>(emptyMaterial());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string | null }>({
    type: 'info',
    message: null,
  });

  const jsonFields = useMemo(() => {
    if (type === 'race') return raceJsonFields;
    if (type === 'class') return classJsonFields;
    return itemJsonFields;
  }, [type]);

  async function loadMaterials(nextType = type) {
    setIsLoading(true);
    try {
      const [nextMaterials, nextSources] = await Promise.all([fetchAdminMaterials(nextType), fetchAdminSources()]);
      setMaterials(nextMaterials);
      setSources(nextSources);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не вдалося завантажити матеріали.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setForm(emptyMaterial());
    void loadMaterials(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  function updateField<K extends keyof AdminMaterialForm>(key: K, value: AdminMaterialForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateJsonField(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title_ua: value,
      slug: current.slug ? current.slug : simpleSlug(value),
    }));
  }

  async function openMaterial(id: string) {
    setStatus({ type: 'info', message: null });
    try {
      const row = await fetchAdminMaterialById(type, id);
      setForm(formFromRow(type, row));
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Не вдалося відкрити матеріал.' });
    }
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadImage(imageFolderForType(type), file);
    if (result.errorMessage || !result.publicUrl) {
      setStatus({ type: 'error', message: result.errorMessage ?? 'Не вдалося завантажити зображення.' });
      return;
    }

    updateField('image_url', result.publicUrl);
    setStatus({ type: 'success', message: 'Зображення матеріалу завантажено.' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: 'info', message: null });

    if (!form.title_ua.trim() || !form.slug.trim()) {
      setStatus({ type: 'error', message: 'Поля “Назва українською” і “Slug” є обов’язковими.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = buildPayload(type, form);
      await saveAdminMaterial(type, form.id, payload);
      await loadMaterials(type);
      setStatus({ type: 'success', message: 'Матеріал збережено.' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Не вдалося зберегти матеріал.' });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="admin-tab-grid admin-tab-grid-wide">
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Матеріали</h2>
          <button type="button" className="secondary-button" onClick={() => setForm(emptyMaterial())}>
            Новий матеріал
          </button>
        </div>

        <label>
          Тип матеріалу
          <select value={type} onChange={(event) => setType(event.target.value as AdminMaterialType)}>
            <option value="race">Раса</option>
            <option value="class">Клас</option>
            <option value="item">Предмет</option>
          </select>
        </label>

        {isLoading ? (
          <div className="placeholder-panel">Завантажуємо матеріали...</div>
        ) : (
          <div className="admin-list">
            {materials.map((material) => (
              <button key={material.id} type="button" onClick={() => void openMaterial(material.id)}>
                <strong>{material.title_ua}</strong>
                <span>{material.title_original || 'Без оригінальної назви'}</span>
                <span>{statusLabels[material.publication_status]}</span>
                <span>{material.rules_version} / {material.content_type}</span>
                <span>{new Date(material.updated_at).toLocaleDateString('uk-UA')}</span>
              </button>
            ))}
            {materials.length === 0 ? <div className="placeholder-panel">Матеріалів цього типу ще немає.</div> : null}
          </div>
        )}
      </section>

      <section className="admin-panel">
        <h2>{form.id ? `Редагувати: ${form.title_ua}` : `Створити: ${materialLabels[type]}`}</h2>
        <AdminStatusMessage type={status.type} message={status.message} />

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <label>
              Назва українською
              <input value={form.title_ua} onChange={(event) => handleTitleChange(event.target.value)} required />
            </label>
            <label>
              Оригінальна назва
              <input value={form.title_original} onChange={(event) => updateField('title_original', event.target.value)} />
            </label>
            <label>
              Slug
              <input value={form.slug} onChange={(event) => updateField('slug', event.target.value)} required />
              <small>Slug використовується в URL. Наприклад: rogue, elf, longsword.</small>
            </label>
            <label>
              Джерело
              <select value={form.source_id} onChange={(event) => updateField('source_id', event.target.value)}>
                <option value="">Без джерела</option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.title}
                  </option>
                ))}
              </select>
              {sources.length === 0 ? <small>Джерела поки не створені.</small> : null}
            </label>
            <label>
              Статус публікації
              <select value={form.publication_status} onChange={(event) => updateField('publication_status', event.target.value as any)}>
                <option value="draft">Чернетка</option>
                <option value="published">Опубліковано</option>
                <option value="hidden">Приховано</option>
              </select>
            </label>
            <label>
              Версія правил
              <select value={form.rules_version} onChange={(event) => updateField('rules_version', event.target.value as any)}>
                <option value="2024">2024</option>
                <option value="homebrew">homebrew</option>
              </select>
            </label>
            <label>
              Тип контенту
              <select value={form.content_type} onChange={(event) => updateField('content_type', event.target.value as any)}>
                <option value="official">Офіційний</option>
                <option value="homebrew">Homebrew</option>
                <option value="campaign">Матеріал кампанії</option>
                <option value="draft">Чернетка</option>
              </select>
            </label>
            <label>
              Теги
              <input value={form.tagsText} onChange={(event) => updateField('tagsText', event.target.value)} placeholder="клас, спритність" />
            </label>
          </div>

          <label>
            Короткий опис
            <textarea value={form.short_description} onChange={(event) => updateField('short_description', event.target.value)} rows={3} />
          </label>

          <label>
            Зображення
            <input value={form.image_url} onChange={(event) => updateField('image_url', event.target.value)} />
          </label>
          <label>
            Завантажити зображення
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          <label>
            Повний опис Markdown
            <textarea
              value={form.full_description_markdown}
              onChange={(event) => updateField('full_description_markdown', event.target.value)}
              rows={8}
            />
          </label>
          <details className="markdown-preview">
            <summary>Попередній перегляд Markdown</summary>
            <div className="markdown-content">
              <ReactMarkdown>{form.full_description_markdown || 'Опис ще порожній.'}</ReactMarkdown>
            </div>
          </details>

          {type === 'race' ? <RaceFields form={form} updateField={updateField} /> : null}
          {type === 'class' ? <ClassFields form={form} updateField={updateField} /> : null}
          {type === 'item' ? <ItemFields form={form} updateField={updateField} /> : null}

          <fieldset className="json-editor-group">
            <legend>JSONB поля</legend>
            {jsonFields.map((field) => (
              <label key={field.key}>
                {field.label}
                <textarea
                  value={String(form[field.key as keyof AdminMaterialForm])}
                  onChange={(event) => updateJsonField(field.key, event.target.value)}
                  rows={6}
                />
              </label>
            ))}
          </fieldset>

          <button type="submit" className="accent-button" disabled={isSaving}>
            {isSaving ? 'Зберігаємо...' : 'Зберегти матеріал'}
          </button>
        </form>
      </section>
    </div>
  );
}

type SpecificFieldsProps = {
  form: AdminMaterialForm;
  updateField: <K extends keyof AdminMaterialForm>(key: K, value: AdminMaterialForm[K]) => void;
};

function RaceFields({ form, updateField }: SpecificFieldsProps) {
  return (
    <fieldset className="admin-fieldset">
      <legend>Поля раси</legend>
      <label>Тип істоти<input value={form.creature_type} onChange={(event) => updateField('creature_type', event.target.value)} /></label>
      <label>Розмір<input value={form.size} onChange={(event) => updateField('size', event.target.value)} /></label>
      <label>Швидкість<input value={form.speed} onChange={(event) => updateField('speed', event.target.value)} /></label>
      <label>Мови<input value={form.languagesText} onChange={(event) => updateField('languagesText', event.target.value)} /></label>
      <label>Тривалість життя<input value={form.lifespan} onChange={(event) => updateField('lifespan', event.target.value)} /></label>
      <label>
        Світогляд / типова поведінка
        <input value={form.alignment_or_behavior} onChange={(event) => updateField('alignment_or_behavior', event.target.value)} />
      </label>
    </fieldset>
  );
}

function ClassFields({ form, updateField }: SpecificFieldsProps) {
  return (
    <fieldset className="admin-fieldset">
      <legend>Поля класу</legend>
      <label>Кістка хітів<input value={form.hit_die} onChange={(event) => updateField('hit_die', event.target.value)} /></label>
      <label>Основна характеристика<input value={form.primary_ability} onChange={(event) => updateField('primary_ability', event.target.value)} /></label>
      <label>Ряткидки<input value={form.savingThrowsText} onChange={(event) => updateField('savingThrowsText', event.target.value)} /></label>
      <label>Володіння бронею<input value={form.armorProficienciesText} onChange={(event) => updateField('armorProficienciesText', event.target.value)} /></label>
      <label>Володіння зброєю<input value={form.weaponProficienciesText} onChange={(event) => updateField('weaponProficienciesText', event.target.value)} /></label>
      <label>Володіння інструментами<input value={form.toolProficienciesText} onChange={(event) => updateField('toolProficienciesText', event.target.value)} /></label>
      <label className="checkbox-label">
        <input type="checkbox" checked={form.has_spellcasting} onChange={(event) => updateField('has_spellcasting', event.target.checked)} />
        Має заклинання
      </label>
    </fieldset>
  );
}

function ItemFields({ form, updateField }: SpecificFieldsProps) {
  return (
    <fieldset className="admin-fieldset">
      <legend>Поля предмета</legend>
      <label>Тип предмета<input value={form.item_type} onChange={(event) => updateField('item_type', event.target.value)} /></label>
      <label>Категорія<input value={form.category} onChange={(event) => updateField('category', event.target.value)} /></label>
      <label>Рідкість<input value={form.rarity} onChange={(event) => updateField('rarity', event.target.value)} /></label>
      <label>Ціна<input value={form.price} onChange={(event) => updateField('price', event.target.value)} /></label>
      <label>Вага<input value={form.weight} onChange={(event) => updateField('weight', event.target.value)} /></label>
      <label>Шкода<input value={form.damage} onChange={(event) => updateField('damage', event.target.value)} /></label>
      <label>Тип шкоди<input value={form.damage_type} onChange={(event) => updateField('damage_type', event.target.value)} /></label>
      <label>Дальність<input value={form.range} onChange={(event) => updateField('range', event.target.value)} /></label>
      <label>Броня / КД<input value={form.armor_class} onChange={(event) => updateField('armor_class', event.target.value)} /></label>
      <label>Необхідна сила<input value={form.required_strength} onChange={(event) => updateField('required_strength', event.target.value)} /></label>
      <label>Кількість<input value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} /></label>
      <label className="checkbox-label">
        <input type="checkbox" checked={form.requires_attunement} onChange={(event) => updateField('requires_attunement', event.target.checked)} />
        Потребує налаштування
      </label>
      <label className="checkbox-label">
        <input type="checkbox" checked={form.is_magical} onChange={(event) => updateField('is_magical', event.target.checked)} />
        Магічний предмет
      </label>
      <label className="checkbox-label">
        <input type="checkbox" checked={form.stealth_disadvantage} onChange={(event) => updateField('stealth_disadvantage', event.target.checked)} />
        Перешкода для скритності
      </label>
    </fieldset>
  );
}
