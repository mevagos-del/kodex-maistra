import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { officialSpells, spellLevelLabel, type SpellClass } from '@/data/rules/spells';
import type { ClassEntry } from '../types';
import { CODEX_ICONS } from '../utils/codexIcons';
import { formatValueSafely } from '../utils/detailContent';
import {
  CLASS_SPELL_COLUMN_LABELS,
  classSpellFilterHref,
  classSpellProgression,
  classSpellProgressionColumns,
  classSpellcastingType,
} from '../utils/classSpellcasting';

type ClassSpellsSectionProps = {
  entry: ClassEntry;
  id: string;
  number: number;
};

function cellText(value: unknown) {
  return formatValueSafely(value) ?? '—';
}

export function ClassSpellsSection({ entry, id, number }: ClassSpellsSectionProps) {
  const classSlug = entry.slug as SpellClass;
  const progression = useMemo(() => classSpellProgression(entry.class_progression, entry.slug), [entry.class_progression, entry.slug]);
  const columns = useMemo(() => classSpellProgressionColumns(progression), [progression]);
  const classSpells = useMemo(() => officialSpells
    .filter((spell) => spell.classes.includes(classSlug))
    .sort((left, right) => left.level - right.level || left.nameUk.localeCompare(right.nameUk, 'uk')), [classSlug]);
  const levels = useMemo(() => [...new Set(classSpells.map((spell) => spell.level))].sort((left, right) => left - right), [classSpells]);
  const [selectedLevel, setSelectedLevel] = useState(levels[0] ?? 0);

  useEffect(() => setSelectedLevel(levels[0] ?? 0), [entry.slug, levels]);

  if (!entry.has_spellcasting || progression.length === 0) return null;

  const spellsAtLevel = classSpells.filter((spell) => spell.level === selectedLevel);
  const latest = progression.at(-1) ?? {};
  const cantrips = cellText(latest.cantrips);
  const prepared = cellText(latest.prepared_spells);

  return (
    <section id={id} className="detail-v2-panel codex-detail-section class-spells-section">
      <h2 className="codex-detail-title"><img className="codex-icon codex-title-icon" src={CODEX_ICONS.spells} alt="" /><span>{number}.</span> Закляття</h2>
      <dl className="class-spells-summary">
        <div><dt>Тип</dt><dd>{classSpellcastingType(entry.slug)}</dd></div>
        <div><dt>Характеристика</dt><dd>{entry.primary_ability ?? 'Не вказано'}</dd></div>
        {cantrips !== '—' ? <div><dt>Замовляння на 20 рівні</dt><dd>{cantrips}</dd></div> : null}
        {prepared !== '—' ? <div><dt>Підготовлені на 20 рівні</dt><dd>{prepared}</dd></div> : null}
      </dl>

      <div className="class-spells-table-wrap" tabIndex={0} aria-label="Таблиця прогресії заклять, прокручується горизонтально">
        <table className="class-spells-table">
          <thead><tr>{columns.map((key) => <th key={key}>{CLASS_SPELL_COLUMN_LABELS[key]}</th>)}</tr></thead>
          <tbody>{progression.map((row) => <tr key={String(row.level)}>{columns.map((key) => (
            <td key={key} className={key === 'milestone' ? 'class-spells-table__milestone' : undefined}>{cellText(row[key])}</td>
          ))}</tr>)}</tbody>
        </table>
      </div>

      {classSpells.length > 0 ? <div className="class-spell-list">
        <div className="class-spell-list__heading">
          <div><h3>Список заклять класу</h3><p>{spellsAtLevel.length} {spellsAtLevel.length === 1 ? 'закляття' : 'заклять'} на вибраному рівні</p></div>
          <label>Рівень
            <select value={selectedLevel} onChange={(event) => setSelectedLevel(Number(event.target.value))}>
              {levels.map((level) => <option value={level} key={level}>{spellLevelLabel(level)}</option>)}
            </select>
          </label>
        </div>
        <div className="class-spell-list__links">
          {spellsAtLevel.slice(0, 8).map((spell) => <Link to={`/spells/${spell.slug}`} key={spell.slug}><strong>{spell.nameUk}</strong><span>{spell.nameEn}</span></Link>)}
        </div>
        <Link className="class-spell-list__all" to={classSpellFilterHref(entry.slug, selectedLevel)}>Переглянути всі закляття класу</Link>
      </div> : <p className="codex-empty-note">Для цього класу немає пов'язаних заклять у довіднику.</p>}
    </section>
  );
}
