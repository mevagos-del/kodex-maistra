import { formatValueSafely } from './detailContent';
import { normalizeClassProgressionRows } from './classProgression';

const SPELL_COLUMN_ORDER = [
  'level',
  'cantrips',
  'prepared_spells',
  'pact_slots',
  'pact_slot_level',
  'eldritch_invocations',
  'mystic_arcanum',
  'slot_1',
  'slot_2',
  'slot_3',
  'slot_4',
  'slot_5',
  'slot_6',
  'slot_7',
  'slot_8',
  'slot_9',
] as const;

export const CLASS_SPELL_COLUMN_LABELS: Record<string, string> = {
  level: 'Рівень класу',
  cantrips: 'Замовляння',
  prepared_spells: 'Підготовлені закляття',
  pact_slots: 'Комірки пакту',
  pact_slot_level: 'Рівень комірки',
  eldritch_invocations: 'Інвокації',
  mystic_arcanum: 'Містичний аркан',
  slot_1: '1 рів.',
  slot_2: '2 рів.',
  slot_3: '3 рів.',
  slot_4: '4 рів.',
  slot_5: '5 рів.',
  slot_6: '6 рів.',
  slot_7: '7 рів.',
  slot_8: '8 рів.',
  slot_9: '9 рів.',
  milestone: 'Відкривається',
};

function hasValue(value: unknown) {
  const formatted = formatValueSafely(value)?.trim();
  return Boolean(formatted && !/^[—–-]$/.test(formatted));
}

function numericValue(value: unknown) {
  if (!hasValue(value)) return null;
  const match = String(value).match(/\d+/g);
  return match?.length ? Number(match.at(-1)) : null;
}

function milestoneForRow(row: Record<string, unknown>, previous: Record<string, unknown> | undefined, classSlug: string) {
  const milestones: string[] = [];
  if (classSlug === 'warlock') {
    const slotLevel = numericValue(row.pact_slot_level);
    const previousSlotLevel = numericValue(previous?.pact_slot_level);
    if (slotLevel && slotLevel !== previousSlotLevel) milestones.push(`Комірка пакту → ${slotLevel} рівень`);

    const arcanumLevel = numericValue(row.mystic_arcanum);
    const previousArcanumLevel = numericValue(previous?.mystic_arcanum);
    if (arcanumLevel && arcanumLevel !== previousArcanumLevel) milestones.push(`Містичний аркан ${arcanumLevel} рівня`);
  } else {
    for (let spellLevel = 1; spellLevel <= 9; spellLevel += 1) {
      const key = `slot_${spellLevel}`;
      if (hasValue(row[key]) && !hasValue(previous?.[key])) milestones.push(`Закляття ${spellLevel} рівня`);
    }
  }
  return milestones.join(' · ') || '—';
}

export function classSpellProgression(value: unknown, classSlug: string): Record<string, unknown>[] {
  const rows = normalizeClassProgressionRows(value);
  return rows.map((row, index): Record<string, unknown> => ({
    ...row,
    milestone: milestoneForRow(row, rows[index - 1], classSlug),
  }));
}

export function classSpellProgressionColumns(rows: Record<string, unknown>[]) {
  return [...SPELL_COLUMN_ORDER.filter((key) => rows.some((row) => hasValue(row[key]))), 'milestone'];
}

export function classSpellFilterHref(classSlug: string, spellLevel?: number) {
  const params = new URLSearchParams({ class: classSlug });
  if (spellLevel !== undefined) params.set('level', String(spellLevel));
  return `/spells?${params.toString()}`;
}

export function classSpellcastingType(classSlug: string) {
  return classSlug === 'warlock' ? 'Магія пакту' : 'Накладання заклять';
}
