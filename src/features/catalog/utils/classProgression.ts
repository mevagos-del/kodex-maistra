import { formatValueSafely, isRecord } from './detailContent';

const ROW_COLLECTION_KEYS = ['rows', 'levels', 'progression', 'items'] as const;

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
  return sourceRows(value).map((row) => {
    const resources = isRecord(row.resources) ? row.resources : {};
    const spellcasting = isRecord(row.spellcasting) ? row.spellcasting : {};
    const base = Object.fromEntries(
      Object.entries(row).filter(([key]) => key !== 'resources' && key !== 'spellcasting'),
    );
    return { ...base, ...resources, ...spellcasting };
  });
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
