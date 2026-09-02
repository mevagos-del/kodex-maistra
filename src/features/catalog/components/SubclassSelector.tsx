import { useEffect, useMemo, useState } from 'react';
import { classFeatureIconForTitle, CODEX_ICONS } from '../utils/codexIcons';
import { parseSubclasses } from '../utils/subclassData';

type SubclassSelectorProps = { value: unknown; id: string; number: number; selectedIndex?: number; onSelectedIndexChange?: (index: number) => void; showTabs?: boolean };
export function SubclassSelector({ value, id, number, selectedIndex: controlledIndex, onSelectedIndexChange, showTabs = true }: SubclassSelectorProps) {
  const subclasses = useMemo(() => parseSubclasses(value), [value]);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(0);
  useEffect(() => setLocalSelectedIndex(0), [value]);
  if (subclasses.length === 0) return null;
  const selectedIndex = controlledIndex ?? localSelectedIndex;
  const selectSubclass = (index: number) => {
    if (controlledIndex === undefined) setLocalSelectedIndex(index);
    onSelectedIndexChange?.(index);
  };
  const selected = subclasses[Math.min(selectedIndex, subclasses.length - 1)];

  return (
    <section id={id} className="detail-v2-panel codex-detail-section subclass-section">
      <h2 className="codex-detail-title"><span>{number}.</span> Підкласи</h2>
      {selected.level ? <p className="subclass-choice-level">Підклас обирається на {selected.level} рівні.</p> : null}
      {showTabs ? <div className="subclass-tabs" role="tablist" aria-label="Підкласи">
        {subclasses.map((subclass, index) => <button key={`${subclass.name}-${index}`} type="button" role="tab" aria-selected={selectedIndex === index} className={selectedIndex === index ? 'subclass-tab subclass-tab--active' : 'subclass-tab'} onClick={() => selectSubclass(index)}><img src={CODEX_ICONS.choice} alt="" />{subclass.name}</button>)}
      </div> : null}
      <article className="subclass-panel" role="tabpanel">
        <header><div><h3>{selected.name}</h3>{selected.originalName ? <small>{selected.originalName}</small> : null}</div>{selected.level ? <span>Рівень: {selected.level}</span> : null}</header>
        {selected.description ? <p>{selected.description}</p> : null}
        {selected.features.length > 0 ? <div className="codex-rule-list">{selected.features.map((feature, index) => <article id={feature.anchorId} className="codex-rule-card" key={feature.anchorId ?? `${feature.title}-${index}`}><span className="codex-rule-icon"><img className="codex-icon codex-icon--feature" src={classFeatureIconForTitle(feature.title)} alt="" /></span><div className="codex-rule-copy"><h3>{feature.title}</h3><p>{feature.description}</p>{feature.rows.length > 0 ? <dl className="codex-rule-scan">{feature.rows.slice(0, 3).map((row) => <div key={`${row.label}-${row.value}`}><dt>{row.label}:</dt><dd>{row.value}</dd></div>)}</dl> : null}</div></article>)}</div> : <p className="codex-empty-note">Особливості підкласу не вказано у доступному джерелі.</p>}
      </article>
    </section>
  );
}
