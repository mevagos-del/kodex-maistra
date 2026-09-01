import type { ReferenceCard } from '../api/detailReference';

type ProgressionTableProps = { id: string; number: number; value: unknown; features: ReferenceCard[] };

const labels: Record<string, string> = {
  level: 'Рівень', bonus: 'Бонус майстерності', proficiency_bonus: 'Бонус майстерності',
  features: 'Уміння', feature: 'Уміння', resources: 'Ресурси', slots: 'Комірки заклять',
  spell_slots: 'Комірки заклять', known_spells: 'Відомі закляття', spells_known: 'Відомі закляття',
  subclass: 'Підклас', extra_attack: 'Додаткова атака',
  rage: 'Лють', rages: 'Лють', uses: 'Використання', action_surge: 'Сплеск дії',
  second_wind: 'Друге дихання', cantrips_known: 'Відомі замовляння', prepared_spells: 'Підготовлені закляття',
  class_resource: 'Ресурс класу', resource_die: 'Кістка ресурсу',
};

function labelForKey(key: string) {
  if (labels[key]) return labels[key];
  if (/[а-яіїєґ]/i.test(key)) return key.replace(/_/g, ' ');
  return key
    .split('_')
    .map((part) => ({
      count: 'Кількість', die: 'Кістка', known: 'Відомі', attacks: 'Атаки', attack: 'Атака',
      spell: 'Закляття', spells: 'Закляття', level: 'Рівень', resource: 'Ресурс', points: 'Бали',
    }[part] ?? 'Показник'))
    .join(' ');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function featureCardId(title: string) {
  return `feature-${title.toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, '-').replace(/^-|-$/g, '')}`;
}

function safeText(value: unknown): string {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (Array.isArray(value)) return Array.from(new Set(value.map(safeText).filter(Boolean))).join(', ');
  if (isRecord(value)) return Array.from(new Set(Object.values(value).map(safeText).filter(Boolean))).join(', ');
  return String(value).trim();
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

export function ProgressionTable({ id, number, value, features }: ProgressionTableProps) {
  const rows = rowsFrom(value);
  const featureNamesByLevel = new Map<string, string[]>();
  for (const feature of features) {
    const level = feature.rows.find((row) => row.label === 'Рівень')?.value ?? '';
    if (level) featureNamesByLevel.set(level, [...(featureNamesByLevel.get(level) ?? []), feature.title]);
  }

  const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
    .filter((key) => rows.some((row) => safeText(row[key])))
    .sort((a, b) => {
      const order = ['level', 'bonus', 'proficiency_bonus', 'features', 'feature'];
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
  const hasFeatureColumn = keys.some((key) => key === 'features' || key === 'feature');
  const visibleKeys = hasFeatureColumn ? keys : [...keys, 'features'];

  return (
    <section id={id} className="detail-v2-panel codex-detail-section">
      <h2 className="codex-detail-title"><span>{number}.</span> Таблиця прогресії</h2>
      {rows.length === 0 ? <p className="codex-empty-note">Таблицю прогресії не вказано у доступному джерелі.</p> : (
        <div className="codex-progression-wrap">
          <table className="codex-progression-table">
            <thead><tr>{visibleKeys.map((key) => <th key={key}>{labelForKey(key)}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => {
              const level = safeText(row.level);
              return <tr key={`${level}-${index}`}>{visibleKeys.map((key) => {
                const valueText = safeText(row[key]);
                const names = key === 'features' && !valueText ? featureNamesByLevel.get(level) ?? [] : [];
                return <td key={key}>{names.length > 0 ? names.map((name) => <a key={name} href={`#${featureCardId(name)}`}>{name}</a>) : valueText || '—'}</td>;
              })}</tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
