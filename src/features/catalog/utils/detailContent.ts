import type { ReferenceCard } from '../api/detailReference';

const LABELS_UK: Record<string, string> = {
  action: 'Дія', action_type: 'Дія', advantage: 'Перевага', condition: 'Стан',
  damage: 'Шкода', damage_type: 'Тип шкоди', description: 'Опис', distance: 'Дистанція',
  duration: 'Тривалість', effect: 'Ефект', level: 'Рівень', range: 'Дальність',
  recharge: 'Відновлення', resistance: 'Стійкість', save: 'Ряткидок',
  saving_throw: 'Ряткидок', stat: 'Характеристика', usage: 'Використання',
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isUsefulValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false;
  if (Array.isArray(value)) return value.some(isUsefulValue);
  if (isRecord(value)) return Object.values(value).some(isUsefulValue);
  return String(value).trim() !== '';
}

export function normalizeMechanicalTerms(value: string) {
  return value.replace(/\bdisadvantage\b/gi, 'Невдача').replace(/\badvantage\b/gi, 'Перевага');
}

export function formatValueSafely(value: unknown): string | null {
  if (!isUsefulValue(value)) return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (Array.isArray(value)) {
    const parts = value.map(formatValueSafely).filter((part): part is string => Boolean(part));
    return Array.from(new Set(parts)).join(', ') || null;
  }
  if (isRecord(value)) {
    const preferred = value.name ?? value.title ?? value.label ?? value.value ?? value.text;
    if (preferred !== undefined) return formatValueSafely(preferred);
    const parts = Object.values(value).map(formatValueSafely).filter((part): part is string => Boolean(part));
    return Array.from(new Set(parts)).join(', ') || null;
  }
  const text = String(value).trim();
  if (!text || /^\[?object Object\]?$/i.test(text) || /^(undefined|null)$/i.test(text)) return null;
  return normalizeMechanicalTerms(text);
}

export function sourceRuleText(value: unknown, fallback = 'Опис не вказано у доступному джерелі.') {
  return formatValueSafely(value) ?? fallback;
}

export function formatLabelUk(key: string) {
  const normalized = key.trim().toLowerCase().replace(/\s+/g, '_');
  if (LABELS_UK[normalized]) return LABELS_UK[normalized];
  return /[а-яіїєґ]/i.test(key) ? key.replace(/_/g, ' ') : 'Показник';
}

function slugPart(value: string) {
  return value.toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, '-').replace(/^-|-$/g, '') || 'entry';
}

export function referenceLevel(card: ReferenceCard) {
  return card.rows.find((row) => row.label === 'Рівень')?.value ?? '';
}

export function createReferenceAnchors(cards: ReferenceCard[], prefix = 'feature') {
  const counts = new Map<string, number>();
  return cards.map((card) => {
    const base = `${prefix}-${slugPart(card.title)}${referenceLevel(card) ? `-level-${slugPart(referenceLevel(card))}` : ''}`;
    const occurrence = (counts.get(base) ?? 0) + 1;
    counts.set(base, occurrence);
    return { card, id: occurrence === 1 ? base : `${base}-${occurrence}` };
  });
}
