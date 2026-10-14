import type { ReferenceCard } from '../api/detailReference';
import { CODEX_ICONS } from '../utils/codexIcons';
import { createReferenceAnchors, formatLabelUk, formatValueSafely, referenceLevel } from '../utils/detailContent';
import { classProgressionVisibleKeys, normalizeClassProgressionRows } from '../utils/classProgression';

type ProgressionTableProps = { id: string; number: number; value: unknown; features: ReferenceCard[]; onFeatureNavigate?: (anchor: string) => void };

const labels: Record<string, string> = {
  level: 'Рівень', bonus: 'Бонус майстерності', proficiencyBonus: 'Бонус майстерності', proficiency_bonus: 'Бонус майстерності',
  features: 'Уміння', feature: 'Уміння', resources: 'Ресурси', slots: 'Комірки заклять',
  spell_slots: 'Комірки заклять', known_spells: 'Відомі закляття', spells_known: 'Відомі закляття',
  subclass: 'Підклас', extra_attack: 'Додаткова атака',
  rage: 'Лють', rages: 'Лють', uses: 'Використання', action_surge: 'Сплеск дії',
  rage_damage: 'Шкода люті', weapon_mastery: 'Майстерність зброї',
  second_wind: 'Друге дихання', cantrips: 'Замовляння', cantrips_known: 'Відомі замовляння', prepared_spells: 'Підготовлені закляття',
  bardic_die: 'Кістка натхнення', channel_divinity: 'Божественний канал', wild_shape: 'Дика подоба',
  martial_arts_die: 'Кістка бойових мистецтв', focus_points: 'Очки фокусу', unarmored_movement: 'Рух без обладунків',
  favored_enemy: 'Обраний ворог', sneak_attack: 'Прихована атака', sorcery_points: 'Очки чаклунства',
  eldritch_invocations: 'Інвокації', pact_slots: 'Комірки пакту', pact_slot_level: 'Рівень комірок пакту',
  lay_on_hands: 'Накладання рук', metamagic_options: 'Метамагія', mystic_arcanum: 'Містичний аркан',
  brutal_strike_damage: 'Шкода жорстокого удару', brutal_strike_effects: 'Ефекти жорстокого удару',
  cunning_strike_effects: 'Ефекти хитрого удару', arcane_recovery_levels: 'Відновлення магії',
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

function numericLevel(value: unknown) {
  const match = safeText(value).match(/\d+/);
  return match ? Number(match[0]) : null;
}

export function ProgressionTable({ id, number, value, features, onFeatureNavigate }: ProgressionTableProps) {
  const sourceRows = normalizeClassProgressionRows(value);
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

  const visibleKeys = classProgressionVisibleKeys(sourceRows);
  const featureAnchors = createReferenceAnchors(features);
  const featureByAnchor = new Map(featureAnchors.map((entry) => [entry.id, entry.card]));
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
                const selectedSubclassFeatures = featureNamesByLevel.get(level)?.filter((name) => {
                  const anchor = anchorForFeature(name, level);
                  return anchor ? featureByAnchor.get(anchor)?.kind === 'subclass' : false;
                }) ?? [];
                const names = key === 'features'
                  ? Array.from(new Set([
                      ...sourceFeatureNames.filter((name) => selectedSubclassFeatures.length === 0 || !/^(особливість підкласу|subclass feature|підкласова особливість)/i.test(name)),
                      ...(featureNamesByLevel.get(level) ?? []),
                    ]))
                  : [];
                return <td key={key}>{names.length > 0 ? names.map((name, nameIndex) => {
                  const anchor = anchorForFeature(name, level);
                  const isSubclass = anchor ? featureByAnchor.get(anchor)?.kind === 'subclass' : false;
                  return anchor ? <a className={isSubclass ? 'codex-progression-feature codex-progression-feature--subclass' : 'codex-progression-feature'} key={`${name}-${nameIndex}`} href={`#${anchor}`} onClick={(event) => {
                    if (!onFeatureNavigate) return;
                    event.preventDefault();
                    onFeatureNavigate(anchor);
                  }}>{name}</a> : <span key={`${name}-${nameIndex}`}>{name}</span>;
                }) : valueText || '—'}</td>;
              })}</tr>;
            })}</tbody>
          </table>
        </div>
    </section>
  );
}
