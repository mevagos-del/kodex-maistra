import { ChangeEvent, useMemo, useState } from 'react';
import { fetchExistingSlugs, importAdminMaterials, type ImportRowsResult } from '../api/adminApi';
import type { AdminMaterialType } from '../types';
import { importFieldsByType, templateByType } from '../import/importConfig';
import {
  isCsvFile,
  isExcelFile,
  parseCsv,
  validateImportRows,
  type ImportIssue,
  type ParsedImport,
} from '../import/importParser';
import { AdminStatusMessage } from './AdminStatusMessage';

const materialLabels: Record<AdminMaterialType, string> = {
  race: 'Раси',
  class: 'Класи',
  item: 'Предмети',
};

const previewLimit = 20;

export function ImportAdminTab() {
  const [type, setType] = useState<AdminMaterialType>('race');
  const [fileName, setFileName] = useState('');
  const [parsed, setParsed] = useState<ParsedImport | null>(null);
  const [existingSlugs, setExistingSlugs] = useState<Set<string>>(new Set());
  const [isChecking, setIsChecking] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<ImportRowsResult | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string | null }>({
    type: 'info',
    message: null,
  });

  const fields = importFieldsByType[type];
  const errors = useMemo(() => parsed?.issues.filter((issue) => issue.level === 'error') ?? [], [parsed]);
  const warnings = useMemo(() => {
    const validationWarnings = parsed?.issues.filter((issue) => issue.level === 'warning') ?? [];
    const existingWarnings: ImportIssue[] = Array.from(existingSlugs).map((slug) => ({
      row: 0,
      field: 'slug',
      message: `Такий slug вже існує в базі й буде пропущений: ${slug}.`,
      level: 'warning',
    }));
    return [...validationWarnings, ...existingWarnings];
  }, [existingSlugs, parsed]);

  async function parseFile(file: File) {
    setStatus({ type: 'info', message: null });
    setResult(null);
    setExistingSlugs(new Set());
    setParsed(null);
    setFileName(file.name);

    if (isExcelFile(file)) {
      setStatus({
        type: 'error',
        message: 'Excel .xlsx поки не підтримується в цьому середовищі. Збережіть файл як CSV і повторіть імпорт.',
      });
      return;
    }

    if (!isCsvFile(file)) {
      setStatus({ type: 'error', message: 'Непідтримуваний тип файлу. Завантажте CSV-файл.' });
      return;
    }

    const text = await file.text();
    const rows = parseCsv(text);

    if (rows.length === 0) {
      setStatus({ type: 'error', message: 'Файл порожній або не містить рядків даних.' });
      return;
    }

    const nextParsed = validateImportRows(type, rows);
    setParsed(nextParsed);

    const slugs = nextParsed.payloads.map((payload) => String(payload.slug ?? '')).filter(Boolean);
    setIsChecking(true);
    try {
      setExistingSlugs(await fetchExistingSlugs(type, slugs));
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не вдалося перевірити slug у базі.',
      });
    } finally {
      setIsChecking(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setStatus({ type: 'error', message: 'Файл не вибрано.' });
      return;
    }

    void parseFile(file);
  }

  async function handleConfirmImport() {
    if (!parsed) {
      setStatus({ type: 'error', message: 'Спочатку завантажте CSV-файл.' });
      return;
    }

    if (errors.length > 0) {
      setStatus({ type: 'error', message: 'Виправте помилки перед імпортом.' });
      return;
    }

    setIsImporting(true);
    setStatus({ type: 'info', message: null });

    try {
      const rows = parsed.payloads.map((payload, index) => ({ rowNumber: index + 2, payload }));
      const importResult = await importAdminMaterials(type, rows, existingSlugs);
      setResult(importResult);
      setStatus({ type: 'success', message: 'Імпорт завершено.' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Не вдалося виконати імпорт.' });
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h2>Імпорт</h2>
        <a className="accent-link" href={templateByType[type]} download>
          Завантажити шаблон
        </a>
      </div>

      <AdminStatusMessage type={status.type} message={status.message} />

      <div className="import-controls">
        <label>
          Тип матеріалу
          <select
            value={type}
            onChange={(event) => {
              setType(event.target.value as AdminMaterialType);
              setParsed(null);
              setResult(null);
              setExistingSlugs(new Set());
              setFileName('');
            }}
          >
            <option value="race">Раси</option>
            <option value="class">Класи</option>
            <option value="item">Предмети</option>
          </select>
        </label>
        <label>
          Завантажити файл
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={handleFileChange} />
        </label>
        <div className="placeholder-panel">
          CSV підтримується повністю. Excel .xlsx показує обмеження: збережіть таблицю як CSV перед імпортом.
        </div>
      </div>

      {fileName ? <p className="muted-text">Файл: {fileName}</p> : null}

      {parsed ? (
        <>
          <section className="import-summary">
            <h3>Перевірка даних</h3>
            <p>Тип матеріалу: {materialLabels[type]}</p>
            <p>Кількість рядків: {parsed.rawRows.length}</p>
            <p>До попереднього перегляду показано: {Math.min(previewLimit, parsed.rawRows.length)}</p>
            <p>Стратегія дублікатів: існуючі slug у базі пропускаються, дані не перезаписуються.</p>
            {isChecking ? <p>Перевіряємо slug у базі...</p> : null}
          </section>

          <ImportIssues title="Помилки" issues={errors} emptyText="Помилок не знайдено." />
          <ImportIssues title="Попередження" issues={warnings} emptyText="Попереджень немає." />

          <section className="import-preview">
            <h3>Попередній перегляд</h3>
            <div className="import-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Рядок</th>
                    {fields.slice(0, 8).map((field) => (
                      <th key={field.key}>{field.key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.rawRows.slice(0, previewLimit).map((row, index) => (
                    <tr key={`${row.slug ?? 'row'}-${index}`}>
                      <td>{index + 2}</td>
                      {fields.slice(0, 8).map((field) => (
                        <td key={field.key}>{row[field.key] ?? ''}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <button
            type="button"
            className="accent-button"
            disabled={isChecking || isImporting || errors.length > 0}
            onClick={() => void handleConfirmImport()}
          >
            {isImporting ? 'Імпортуємо...' : 'Підтвердити імпорт'}
          </button>
        </>
      ) : null}

      {result ? (
        <section className="import-summary">
          <h3>Результат імпорту</h3>
          <p>Імпортовано рядків: {result.importedCount}</p>
          <p>Пропущено існуючих slug: {result.skippedCount}</p>
          {result.failedRows.length > 0 ? (
            <div>
              <h4>Не вдалося імпортувати</h4>
              <ul>
                {result.failedRows.map((row) => (
                  <li key={`${row.row}-${row.message}`}>
                    Рядок {row.row}: {row.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function ImportIssues({ title, issues, emptyText }: { title: string; issues: ImportIssue[]; emptyText: string }) {
  return (
    <section className="import-issues">
      <h3>{title}</h3>
      {issues.length === 0 ? (
        <p className="muted-text">{emptyText}</p>
      ) : (
        <div className="import-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Рядок</th>
                <th>Поле</th>
                <th>Повідомлення</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={`${issue.row}-${issue.field}-${index}`}>
                  <td>{issue.row || '-'}</td>
                  <td>{issue.field}</td>
                  <td>{issue.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
