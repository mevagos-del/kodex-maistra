import { useEffect, useMemo, useState } from 'react';
import { referenceCards, type ReferenceCard } from '../api/detailReference';
import { classFeatureIconForTitle, CODEX_ICONS } from '../utils/codexIcons';

type SubclassSelectorProps = { value: unknown; id: string; number: number };
type Subclass = { name: string; originalName?: string; description?: string; level?: string; features: ReferenceCard[] };

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

function parseSubclasses(value: unknown): Subclass[] {
  const values = Array.isArray(value)
    ? value
    : isRecord(value)
      ? (['items', 'entries', 'subclasses', 'list'].map((key) => value[key]).find(Array.isArray) as unknown[] | undefined) ?? Object.entries(value).map(([name, child]) => isRecord(child) ? { name, ...child } : { name, value: child })
      : [];

  return values.flatMap((entry, index): Subclass[] => {
    if (!isRecord(entry)) {
      const name = text(entry);
      return name ? [{ name, features: [] }] : [];
    }
    const name = text(entry.name ?? entry.title ?? entry.label) ?? `Підклас ${index + 1}`;
    const featureValue = entry.features ?? entry.class_features ?? entry.traits;
    const features = referenceCards(featureValue, 'Особливість підкласу').map((card) => {
      const mechanicalEffect = card.rows.find((row) => row.label === 'Механічний ефект')?.value;
      return { ...card, description: card.description ?? mechanicalEffect ?? 'Опис не вказано у доступному джерелі.', rows: card.rows.filter((row) => row.label !== 'Механічний ефект') };
    });
    return [{ name, originalName: text(entry.original_name ?? entry.originalTitle), description: text(entry.description ?? entry.summary), level: text(entry.level ?? entry.choose_level), features }];
  });
}

export function SubclassSelector({ value, id, number }: SubclassSelectorProps) {
  const subclasses = useMemo(() => parseSubclasses(value), [value]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => setSelectedIndex(0), [value]);
  if (subclasses.length === 0) return null;
  const selected = subclasses[Math.min(selectedIndex, subclasses.length - 1)];

  return (
    <section id={id} className="detail-v2-panel codex-detail-section subclass-section">
      <h2 className="codex-detail-title"><span>{number}.</span> Підкласи</h2>
      <div className="subclass-tabs" role="tablist" aria-label="Підкласи">
        {subclasses.map((subclass, index) => <button key={`${subclass.name}-${index}`} type="button" role="tab" aria-selected={selectedIndex === index} className={selectedIndex === index ? 'subclass-tab subclass-tab--active' : 'subclass-tab'} onClick={() => setSelectedIndex(index)}><img src={CODEX_ICONS.choice} alt="" />{subclass.name}</button>)}
      </div>
      <article className="subclass-panel" role="tabpanel">
        <header><div><h3>{selected.name}</h3>{selected.originalName ? <small>{selected.originalName}</small> : null}</div>{selected.level ? <span>Рівень: {selected.level}</span> : null}</header>
        {selected.description ? <p>{selected.description}</p> : null}
        {selected.features.length > 0 ? <div className="codex-rule-list">{selected.features.map((feature, index) => <article className="codex-rule-card" key={`${feature.title}-${index}`}><span className="codex-rule-icon"><img className="codex-icon codex-icon--feature" src={classFeatureIconForTitle(feature.title)} alt="" /></span><div className="codex-rule-copy"><h3>{feature.title}</h3><p>{feature.description}</p>{feature.rows.length > 0 ? <dl className="codex-rule-scan">{feature.rows.slice(0, 3).map((row) => <div key={`${row.label}-${row.value}`}><dt>{row.label}:</dt><dd>{row.value}</dd></div>)}</dl> : null}</div></article>)}</div> : <p className="codex-empty-note">Особливості підкласу не вказано у доступному джерелі.</p>}
      </article>
    </section>
  );
}
