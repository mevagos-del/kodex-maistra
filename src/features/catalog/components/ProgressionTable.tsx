import type { ReferenceCard } from '../api/detailReference';
import { CODEX_ICONS } from '../utils/codexIcons';
import { createReferenceAnchors, formatLabelUk, formatValueSafely, isRecord, referenceLevel } from '../utils/detailContent';

type ProgressionTableProps = { id: string; number: number; value: unknown; features: ReferenceCard[] };

const labels: Record<string, string> = {
  level: 'Рівень', bonus: 'Бонус майстерності', proficiency_bonus: 'Бонус майстерності',
  features: 'Уміння', feature: 'Уміння', resources: 'Ресурси', slots: 'Комірки заклять',
  spell_slots: 'Комірки заклять', known_spells: 'Відомі закляття', spells_known: 'Відомі закляття',
  subclass: 'Підклас', extra_attack: 'Додаткова атака',
  rage: 'Лють', rages: 'Лють', uses: 'Використання', action_surge: 'Сплеск дії',
  rage_damage: 'Шкода люті', weapon_mastery: 'Майстерність зброї',
  second_wind: 'Друге дихання', cantrips: 'Замовляння', cantrips_known: 'Відомі замовляння', prepared_spells: 'Підготовлені закляття',
  slot_1: '1 рів.', slot_2: '2 рів.', slot_3: '3 рів.', slot_4: '4 рів.', slot_5: '5 рів.',
  slot_6: '6 рів.', slot_7: '7 рів.', slot_8: '8 рів.', slot_9: '9 рів.',
  class_resource: 'Ресурс класу', resource_die: 'Кістка ресурсу',
};

function labelForKey(key: string) {
  if (labels[key]) return labels[key];
  if (/[а-яіїєґ]/i.test(key)) return key.replace(/_/g, ' ');
  const generated = key
    .split('_')
    .map((part) => ({
      count: 'Кількість', die: 'Кістка', known: 'Відомі', attacks: 'Атаки', attack: 'Атака',
      spell: 'Закляття', spells: 'Закляття', level: 'Рівень', resource: 'Ресурс', points: 'Бали',
    }[part] ?? 'Показник'))
    .join(' ');
  return generated === 'Показник' ? formatLabelUk(key) : generated;
}

function safeText(value: unknown): string {
  return formatValueSafely(value) ?? '';
}

function rowsFrom(value: unknown) {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (isRecord(value)) {
    for (const key of ['rows', 'levels', 'progression', 'items']) {
      if (Array.isArray(value[key])) return (value[key] as unknown[]).filter(isRecord);
    }
  }
  return [];
}

function numericLevel(value: unknown) {
  const match = safeText(value).match(/\d+/);
  return match ? Number(match[0]) : null;
}

export function ProgressionTable({ id, number, value, features }: ProgressionTableProps) {
  const sourceRows = rowsFrom(value);
  const rowsByLevel = new Map<number, Record<string, unknown>>();
  for (const row of sourceRows) {
    const level = numericLevel(row.level);
    if (level && level >= 1 && level <= 20) rowsByLevel.set(level, { ...(rowsByLevel.get(level) ?? {}), ...row, level });
  }
  const rows = Array.from({ length: 20 }, (_, index) => rowsByLevel.get(index + 1) ?? { level: index + 1 });
  const featureNamesByLevel = new Map<string, string[]>();
  for (const feature of features) {
    const level = feature.rows.find((row) => row.label === 'Рівень')?.value ?? '';
    const normalizedLevel = numericLevel(level)?.toString() ?? '';
    if (normalizedLevel) featureNamesByLevel.set(normalizedLevel, [...(featureNamesByLevel.get(normalizedLevel) ?? []), feature.title]);
  }

  const excludedKeys = new Set(['name', 'title', 'description', 'text', 'note', 'mechanical_effect', 'effect', 'usage', 'action_type', 'recovery', 'limitation']);
  const keys = Array.from(new Set(sourceRows.flatMap((row) => Object.keys(row))))
    .filter((key) => !excludedKeys.has(key))
    .filter((key) => sourceRows.some((row) => safeText(row[key])))
    .sort((a, b) => {
      const order = ['level', 'bonus', 'proficiency_bonus', 'features', 'feature'];
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
  const bonusKey = keys.includes('proficiency_bonus') ? 'proficiency_bonus' : 'bonus';
  const extraKeys = keys.filter((key) => !['level', 'bonus', 'proficiency_bonus', 'features', 'feature', 'resources'].includes(key));
  const visibleKeys = ['level', bonusKey, 'features', 'resources', ...extraKeys];
  const featureAnchors = createReferenceAnchors(features);
  const anchorForFeature = (name: string, level: string) => {
    const normalizedName = name.toLowerCase();
    return featureAnchors.find(({ card }) => card.title.toLowerCase() === normalizedName && numericLevel(referenceLevel(card))?.toString() === level)?.id
      ?? featureAnchors.find(({ card }) => card.title.toLowerCase() === normalizedName)?.id;
  };

  return (
    <section id={id} className="detail-v2-panel codex-detail-section">
      <h2 className="codex-detail-title"><img className="codex-icon codex-title-icon" src={CODEX_ICONS.combatTracker} alt="" /><span>{number}.</span> Таблиця прогресії</h2>
      <div className="codex-progression-wrap">
          <table className="codex-progression-table">
            <thead><tr>{visibleKeys.map((key) => <th key={key}>{labelForKey(key)}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => {
              const level = safeText(row.level);
              return <tr key={`${level}-${index}`}>{visibleKeys.map((key) => {
                const valueText = safeText(row[key]);
                const sourceFeatureText = key === 'features' ? safeText(row.features ?? row.feature) : '';
                const sourceFeatureNames = sourceFeatureText.split(/[,;]+/).map((name) => name.trim()).filter(Boolean);
                const names = key === 'features'
                  ? Array.from(new Set([...sourceFeatureNames, ...(featureNamesByLevel.get(level) ?? [])]))
                  : [];
                return <td key={key}>{names.length > 0 ? names.map((name, nameIndex) => {
                  const anchor = anchorForFeature(name, level);
                  return anchor ? <a key={`${name}-${nameIndex}`} href={`#${anchor}`}>{name}</a> : <span key={`${name}-${nameIndex}`}>{name}</span>;
                }) : valueText || '—'}</td>;
              })}</tr>;
            })}</tbody>
          </table>
        </div>
    </section>
  );
}
