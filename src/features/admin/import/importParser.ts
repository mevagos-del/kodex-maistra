import type { AdminMaterialType } from '../types';
import { importFieldsByType, type ImportField } from './importConfig';

export type RawImportRow = Record<string, string>;

export type ImportIssue = {
  row: number;
  field: string;
  message: string;
  level: 'error' | 'warning';
};

export type ParsedImport = {
  rawRows: RawImportRow[];
  payloads: Record<string, unknown>[];
  issues: ImportIssue[];
};

const publicationStatuses = new Set(['draft', 'published', 'hidden']);
const rulesVersions = new Set(['2024', 'homebrew']);
const contentTypes = new Set(['official', 'homebrew', 'campaign', 'draft']);

function parseCsvLine(line: string) {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((value) => value.trim());
}

export function parseCsv(text: string): RawImportRow[] {
  const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n').filter((line) => line.trim().length > 0);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<RawImportRow>((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
}

function parseArrayValue(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== 'string')) {
      throw new Error('очікується JSON-масив рядків');
    }
    return parsed.map((item) => item.trim()).filter(Boolean);
  }

  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBooleanValue(value: string): boolean {
  const normalized = value.trim().toLowerCase();

  if (['true', 'так', 'yes', '1'].includes(normalized)) return true;
  if (['false', 'ні', 'нi', 'no', '0'].includes(normalized)) return false;

  throw new Error('некоректне boolean-значення');
}

function parseJsonValue(value: string, field: ImportField) {
  const trimmed = value.trim();
  if (!trimmed) return field.kind === 'json-array' ? [] : {};

  try {
    const parsed = JSON.parse(trimmed);
    if (field.kind === 'json-array' && !Array.isArray(parsed)) {
      throw new Error('очікується JSON-масив');
    }
    if (field.kind === 'json-object' && (Array.isArray(parsed) || typeof parsed !== 'object' || parsed === null)) {
      throw new Error('очікується JSON-об’єкт');
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('очікується')) throw error;
    throw new Error(`Некоректний JSON у полі ${field.label}`);
  }
}

function parseField(row: RawImportRow, field: ImportField) {
  const value = row[field.key] ?? '';
  const trimmed = value.trim();

  if (field.required && !trimmed) {
    throw new Error('обов’язкове поле не заповнено');
  }

  if (field.kind === 'array') return parseArrayValue(value);
  if (field.kind === 'boolean') return trimmed ? parseBooleanValue(value) : false;
  if (field.kind === 'json-object' || field.kind === 'json-array') return parseJsonValue(value, field);

  return trimmed || null;
}

function validateEnums(payload: Record<string, unknown>, issues: ImportIssue[], rowNumber: number) {
  if (!publicationStatuses.has(String(payload.publication_status))) {
    issues.push({ row: rowNumber, field: 'publication_status', message: 'Некоректне значення статусу публікації.', level: 'error' });
  }
  if (!rulesVersions.has(String(payload.rules_version))) {
    issues.push({ row: rowNumber, field: 'rules_version', message: 'Некоректна версія правил.', level: 'error' });
  }
  if (!contentTypes.has(String(payload.content_type))) {
    issues.push({ row: rowNumber, field: 'content_type', message: 'Некоректний тип контенту.', level: 'error' });
  }
}

export function validateImportRows(type: AdminMaterialType, rows: RawImportRow[]): ParsedImport {
  const fields = importFieldsByType[type];
  const issues: ImportIssue[] = [];
  const payloads: Record<string, unknown>[] = [];
  const slugMap = new Map<string, number[]>();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const payload: Record<string, unknown> = {};

    for (const field of fields) {
      try {
        payload[field.key] = parseField(row, field);
      } catch (error) {
        issues.push({
          row: rowNumber,
          field: field.key,
          message: error instanceof Error ? error.message : 'Некоректне значення.',
          level: 'error',
        });
      }
    }

    validateEnums(payload, issues, rowNumber);

    const slug = String(payload.slug ?? '').trim();
    if (slug) {
      slugMap.set(slug, [...(slugMap.get(slug) ?? []), rowNumber]);
    }

    payloads.push(payload);
  });

  for (const [slug, rowsWithSlug] of slugMap.entries()) {
    if (rowsWithSlug.length > 1) {
      rowsWithSlug.forEach((rowNumber) => {
        issues.push({
          row: rowNumber,
          field: 'slug',
          message: `Дублікат slug у файлі: ${slug}.`,
          level: 'error',
        });
      });
    }
  }

  return { rawRows: rows, payloads, issues };
}

export function isCsvFile(file: File) {
  return file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
}

export function isExcelFile(file: File) {
  return file.name.toLowerCase().endsWith('.xlsx');
}
