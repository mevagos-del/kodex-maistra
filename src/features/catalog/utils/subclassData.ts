import { referenceCards, type ReferenceCard } from '../api/detailReference';

export type ParsedSubclass = {
  name: string;
  originalName?: string;
  description?: string;
  level?: string;
  features: ReferenceCard[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(', ') || undefined;
  if (isRecord(value)) return text(value.name ?? value.title ?? value.value ?? value.description);
  const result = String(value).trim();
  return result && result !== '[object Object]' ? result : undefined;
}

export function parseSubclasses(value: unknown): ParsedSubclass[] {
  const values = Array.isArray(value)
    ? value
    : isRecord(value)
      ? (['items', 'entries', 'subclasses', 'list'].map((key) => value[key]).find(Array.isArray) as unknown[] | undefined)
        ?? Object.entries(value).map(([name, child]) => isRecord(child) ? { name, ...child } : { name, value: child })
      : [];

  return values.flatMap((entry, index): ParsedSubclass[] => {
    if (!isRecord(entry)) {
      const name = text(entry);
      return name ? [{ name, features: [] }] : [];
    }
    const name = text(entry.name ?? entry.title ?? entry.label) ?? `Підклас ${index + 1}`;
    const featureValue = entry.features ?? entry.class_features ?? entry.traits;
    const features = referenceCards(featureValue, 'Особливість підкласу').map((card) => {
      const mechanicalEffect = card.rows.find((row) => row.label === 'Механічний ефект')?.value;
      return {
        ...card,
        kind: 'subclass' as const,
        subclassName: name,
        description: card.description ?? mechanicalEffect ?? 'Опис не вказано у доступному джерелі.',
        rows: card.rows.filter((row) => row.label !== 'Механічний ефект'),
      };
    });
    return [{
      name,
      originalName: text(entry.original_name ?? entry.originalTitle),
      description: text(entry.description ?? entry.summary),
      level: text(entry.level ?? entry.choose_level),
      features,
    }];
  });
}
