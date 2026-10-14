import { formatValueSafely, isRecord } from './detailContent';

const ROW_COLLECTION_KEYS = ['rows', 'levels', 'progression', 'items'] as const;
const EXCLUDED_VISIBLE_KEYS = new Set([
  'name',
  'title',
  'description',
  'text',
  'note',
  'mechanical_effect',
  'effect',
  'usage',
  'action_type',
  'recovery',
  'limitation',
  'resources',
]);

const STATE_PROGRESSION_KEYS = new Set([
  'bonus',
  'proficiencyBonus',
  'proficiency_bonus',
  'extra_attack',
  'rage',
  'rages',
  'rage_damage',
  'weapon_mastery',
  'second_wind',
  'action_surge',
  'cantrips',
  'cantrips_known',
  'prepared_spells',
  'known_spells',
  'spells_known',
  'bardic_die',
  'channel_divinity',
  'wild_shape',
  'martial_arts_die',
  'focus_points',
  'unarmored_movement',
  'lay_on_hands',
  'favored_enemy',
  'sneak_attack',
  'cunning_strike_effects',
  'sorcery_points',
  'metamagic_options',
  'eldritch_invocations',
  'pact_slots',
  'pact_slot_level',
  'mystic_arcanum',
  'brutal_strike_damage',
  'brutal_strike_effects',
  'arcane_recovery_levels',
  'class_resource',
  'resource_die',
]);

export function isClassProgressionStateKey(key: string) {
  return STATE_PROGRESSION_KEYS.has(key) || /^slot_[1-9]$/.test(key);
}

function hasStateValue(value: unknown) {
  const formatted = formatValueSafely(value)?.trim();
  return Boolean(formatted && !/^[—–-]$/.test(formatted));
}

function sourceRows(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  for (const key of ROW_COLLECTION_KEYS) {
    if (Array.isArray(value[key])) return (value[key] as unknown[]).filter(isRecord);
  }
  return [];
}

/**
 * Accepts both official nested progression rows and catalog-facing flattened rows.
 * Resource and spellcasting values become independent columns in either case.
 */
export function normalizeClassProgressionRows(value: unknown): Record<string, unknown>[] {
  const currentState = new Map<string, unknown>();
  return sourceRows(value).map((row) => {
    const resources = isRecord(row.resources) ? row.resources : {};
    const spellcasting = isRecord(row.spellcasting) ? row.spellcasting : {};
    const base = Object.fromEntries(
      Object.entries(row).filter(([key]) => key !== 'resources' && key !== 'spellcasting'),
    );
    const normalized = { ...base, ...resources, ...spellcasting };

    for (const key of Object.keys(normalized)) {
      if (!isClassProgressionStateKey(key)) continue;
      if (hasStateValue(normalized[key])) currentState.set(key, normalized[key]);
      else if (currentState.has(key)) normalized[key] = currentState.get(key);
    }

    for (const [key, stateValue] of currentState) {
      if (!(key in normalized)) normalized[key] = stateValue;
    }

    return normalized;
  });
}

export function classProgressionVisibleKeys(rows: Record<string, unknown>[]) {
  const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
    .filter((key) => !EXCLUDED_VISIBLE_KEYS.has(key))
    .filter((key) => rows.some((row) => Boolean(formatValueSafely(row[key]))))
    .sort((left, right) => {
      const order = ['level', 'bonus', 'proficiencyBonus', 'proficiency_bonus', 'features', 'feature'];
      const leftIndex = order.indexOf(left);
      const rightIndex = order.indexOf(right);
      return (leftIndex < 0 ? 99 : leftIndex) - (rightIndex < 0 ? 99 : rightIndex);
    });
  const bonusKey = keys.includes('proficiency_bonus')
    ? 'proficiency_bonus'
    : keys.includes('proficiencyBonus') ? 'proficiencyBonus' : 'bonus';
  const extraKeys = keys.filter((key) => !['level', 'bonus', 'proficiencyBonus', 'proficiency_bonus', 'features', 'feature'].includes(key));
  return ['level', bonusKey, 'features', ...extraKeys];
}

export function progressionValueChanged(
  current: Record<string, unknown>,
  previous: Record<string, unknown> | undefined,
) {
  if (!previous) return true;
  const ignored = new Set(['level', 'proficiencyBonus', 'proficiency_bonus', 'bonus', 'features', 'feature']);
  const keys = new Set([...Object.keys(current), ...Object.keys(previous)]);
  return [...keys]
    .filter((key) => !ignored.has(key))
    .some((key) => formatValueSafely(current[key]) !== formatValueSafely(previous[key]));
}
