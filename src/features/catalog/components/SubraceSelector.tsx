import { useEffect, useMemo, useState } from 'react';
import { subraceIconForTitle } from '../utils/codexIcons';

const titleKeys = ['name', 'title', 'label'];
const summaryKeys = ['summary', 'description', 'text', 'note'];


type SubraceRecord = Record<string, unknown>;

type ParsedSubrace = {
  name: string;
  originalName?: string;
  tag?: string;
  summary?: string;
  record: SubraceRecord;
};

function isRecord(value: unknown): value is SubraceRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (Array.isArray(value)) return value.map(cleanText).filter(Boolean).join(', ');
  if (isRecord(value)) {
    const title = titleKeys.map((key) => cleanText(value[key])).find(Boolean);
    const effect = cleanText(value.mechanical_effect ?? value.effect_value ?? value.value);
    return [title, effect].filter(Boolean).join(': ') || null;
  }
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function arrayFromUnknown(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (isRecord(value)) {
    for (const key of ['items', 'entries', 'variants', 'subraces', 'list']) {
      if (Array.isArray(value[key])) return value[key] as unknown[];
    }
    return Object.entries(value).map(([key, child]) => (isRecord(child) ? { name: key, ...child } : { name: key, value: child }));
  }
  return [];
}

function parseSubraces(value: unknown): ParsedSubrace[] {
  return arrayFromUnknown(value)
    .map((item, index): ParsedSubrace | null => {
      if (!isRecord(item)) {
        const text = cleanText(item);
        return text ? { name: text, record: { name: text } } : null;
      }

      const name = titleKeys.map((key) => cleanText(item[key])).find(Boolean) ?? `Підраса ${index + 1}`;
      const summary = summaryKeys.map((key) => cleanText(item[key])).find(Boolean) ?? undefined;

      return {
        name,
        originalName: cleanText(item.original_name ?? item.originalTitle) ?? undefined,
        tag: cleanText(item.tag ?? item.type) ?? undefined,
        summary,
        record: item,
      };
    })
    .filter((item): item is ParsedSubrace => Boolean(item));
}

function formatAbilityScores(value: unknown): string[] {
  return arrayFromUnknown(value)
    .map((item) => {
      if (isRecord(item)) {
        const ability = cleanText(item.ability ?? item.name ?? item.title);
        const rawValue = cleanText(item.value ?? item.bonus ?? item.amount);
        if (ability && rawValue) {
          const numeric = /^-?\d+$/.test(rawValue) ? Number(rawValue) : null;
          const bonus = numeric !== null && numeric > 0 ? `+${numeric}` : rawValue;
          return `${ability} ${bonus}`;
        }
      }
      return cleanText(item);
    })
    .filter((item): item is string => Boolean(item));
}

function formatObjectList(value: unknown): string[] {
  return arrayFromUnknown(value)
    .map((item) => {
      if (isRecord(item)) {
        const name = titleKeys.map((key) => cleanText(item[key])).find(Boolean);
        const effect = cleanText(item.mechanical_effect ?? item.effect_value ?? item.value ?? item.changes);
        return [name, effect].filter(Boolean).join(': ');
      }
      return cleanText(item);
    })
    .filter((item): item is string => Boolean(item));
}

function detailGroups(record: SubraceRecord): Array<{ title: string; values: string[] }> {
  const groups = [
    { title: 'Збільшення характеристики', values: formatAbilityScores(record.ability_scores ?? record.ability_bonuses) },
    { title: 'Рух', values: formatObjectList(record.movement ?? record.speed) },
    { title: 'Володіння', values: formatObjectList(record.proficiencies ?? record.proficiency) },
    { title: 'Стійкості', values: formatObjectList(record.resistances ?? record.resistance) },
    { title: 'Заклинання', values: formatObjectList(record.spells ?? record.spellcasting ?? record.cantrips) },
    { title: 'Додає', values: formatObjectList(record.adds ?? record.changes ?? record.bonus) },
    { title: 'Замінює', values: formatObjectList(record.replaces) },
    { title: 'Особливості підраси', values: formatObjectList(record.traits ?? record.features) },
    { title: 'Обмеження', values: formatObjectList(record.restrictions ?? record.limitations ?? record.requirements) },
    { title: 'Примітки', values: formatObjectList(record.notes ?? record.note) },
  ];

  return groups.filter((group) => group.values.length > 0);
}

type SubraceSelectorProps = {
  value: unknown;
  id?: string;
  sectionNumber?: number;
};

export function SubraceSelector({ value, id, sectionNumber }: SubraceSelectorProps) {
  const subraces = useMemo(() => parseSubraces(value), [value]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [value]);

  if (subraces.length === 0) return null;

  const selected = subraces[Math.min(selectedIndex, subraces.length - 1)];
  const groups = detailGroups(selected.record);

  return (
    <section id={id} className={`detail-v2-panel subrace-section${sectionNumber ? ' race-detail-section' : ''}`} aria-labelledby="subrace-selector-title">
      <div className="subrace-section__header">
        <h3 id="subrace-selector-title" className={sectionNumber ? 'race-section-title' : undefined}>{sectionNumber ? <span>{sectionNumber}.</span> : null} Підраси / варіанти</h3>
        <p>Показано лише особливості вибраної підраси або варіанта.</p>
      </div>

      <div className="subrace-selector" role="tablist" aria-label="Підраси або варіанти">
        {subraces.map((subrace, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={`${subrace.name}-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? 'subrace-selector__item subrace-selector__item-active' : 'subrace-selector__item'}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="subrace-selector__icon subrace-selector__icon--codex" aria-hidden="true">
                <img className="codex-icon codex-icon--subrace" src={subraceIconForTitle(subrace.name)} alt="" />
              </span>
              <span className="subrace-selector__text">
                <strong>{subrace.name}</strong>
                {subrace.originalName ? <small>{subrace.originalName}</small> : null}
              </span>
              {subrace.tag ? <span className="subrace-selector__tag">{subrace.tag}</span> : null}
            </button>
          );
        })}
      </div>

      <article className="subrace-detail-panel" role="tabpanel">
        <div className="subrace-detail-panel__header">
          <div>
            <h4>{selected.name}</h4>
            {selected.originalName ? <p className="original-title">{selected.originalName}</p> : null}
          </div>
          {selected.tag ? <span>{selected.tag}</span> : null}
        </div>
        {selected.summary ? <p className="subrace-detail-panel__summary">{selected.summary}</p> : null}

        {groups.length > 0 ? (
          <div className="subrace-detail-groups">
            {groups.map((group) => (
              <div key={group.title} className="subrace-detail-group">
                <strong>{group.title}</strong>
                <ul>
                  {group.values.map((item) => (
                    <li key={`${group.title}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </section>
  );
}
