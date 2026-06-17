import type { ReactNode } from 'react';

type StructuredContentBlockProps = {
  title: string;
  value: unknown;
  emptyMessage?: string;
};

const readableLabels: Record<string, string> = {
  graceful: 'Граційність',
  strength: 'Сила',
  dexterity: 'Спритність',
  constitution: 'Статура',
  intelligence: 'Інтелект',
  wisdom: 'Мудрість',
  charisma: 'Харизма',
  name: 'Назва',
  description: 'Опис',
  note: 'Нотатка',
  level: 'Рівень',
  bonus: 'Бонус',
  slots: 'Комірки',
  ability: 'Характеристика',
  focus: 'Фокус',
  tools: 'Інструменти',
  skills: 'Навички',
  contains: 'Містить',
  choose: 'Оберіть',
  from: 'Зі списку',
  versatile: 'Універсальна властивість',
  flexible: 'Гнучкість',
  sturdy: 'Стійкість',
};

function isEmptyValue(value: unknown) {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}

function labelForKey(key: string) {
  return readableLabels[key] ?? key.replace(/_/g, ' ');
}

function formatPrimitive(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (value === null || value === undefined || value === '') return 'Не вказано';
  return String(value);
}

function renderValue(value: unknown): ReactNode {
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item !== 'object' || item === null)) {
      return (
        <div className="structured-badges">
          {value.map((item, index) => (
            <span key={`${String(item)}-${index}`}>{formatPrimitive(item)}</span>
          ))}
        </div>
      );
    }

    return (
      <div className="structured-nested-list">
        {value.map((item, index) => (
          <div key={index}>{renderValue(item)}</div>
        ))}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className="structured-kv">
        {Object.entries(value).map(([key, childValue]) => (
          <div key={key}>
            <strong>{labelForKey(key)}</strong>
            <span>{renderValue(childValue)}</span>
          </div>
        ))}
      </div>
    );
  }

  return <>{formatPrimitive(value)}</>;
}

function canRenderTable(items: unknown[]) {
  return (
    items.length > 1 &&
    items.every((item) => item && typeof item === 'object' && !Array.isArray(item)) &&
    items.some((item) => Object.prototype.hasOwnProperty.call(item as object, 'level'))
  );
}

function objectKeys(items: unknown[]) {
  return Array.from(
    new Set(
      items.flatMap((item) => (item && typeof item === 'object' && !Array.isArray(item) ? Object.keys(item) : [])),
    ),
  );
}

function renderObjectCard(item: Record<string, unknown>, index: number) {
  const title = item.name ?? item.title ?? item.level ?? `Запис ${index + 1}`;
  const description = item.description ?? item.text ?? item.note;
  const rest = Object.entries(item).filter(([key]) => !['name', 'title', 'description', 'text', 'note'].includes(key));

  return (
    <article className="structured-card" key={index}>
      <h4>{formatPrimitive(title)}</h4>
      {description ? <p>{formatPrimitive(description)}</p> : null}
      {rest.length > 0 ? (
        <div className="structured-kv">
          {rest.map(([key, value]) => (
            <div key={key}>
              <strong>{labelForKey(key)}</strong>
              <span>{renderValue(value)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function StructuredContentBlock({ title, value, emptyMessage = 'Дані поки не заповнені.' }: StructuredContentBlockProps) {
  if (isEmptyValue(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <section className="rulebook-section structured-block">
          <h3>{title}</h3>
          <p className="muted-text">{emptyMessage}</p>
        </section>
      );
    }

    if (canRenderTable(value)) {
      const keys = objectKeys(value);

      return (
        <section className="rulebook-section structured-block">
          <h3>{title}</h3>
          <div className="rulebook-table-wrap">
            <table className="rulebook-table">
              <thead>
                <tr>
                  {keys.map((key) => (
                    <th key={key}>{labelForKey(key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.map((item, index) => (
                  <tr key={index}>
                    {keys.map((key) => (
                      <td key={key}>{renderValue((item as Record<string, unknown>)[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    if (value.every((item) => item && typeof item === 'object' && !Array.isArray(item))) {
      return (
        <section className="rulebook-section structured-block">
          <h3>{title}</h3>
          <div className="structured-card-grid">
            {value.map((item, index) => renderObjectCard(item as Record<string, unknown>, index))}
          </div>
        </section>
      );
    }

    return (
      <section className="rulebook-section structured-block">
        <h3>{title}</h3>
        {renderValue(value)}
      </section>
    );
  }

  return (
    <section className="rulebook-section structured-block">
      <h3>{title}</h3>
      {renderValue(value)}
    </section>
  );
}
