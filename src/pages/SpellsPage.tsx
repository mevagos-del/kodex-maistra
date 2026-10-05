import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { filterSpells, officialSpells, spellClasses, spellLevelLabel, type SpellFilters } from '@/data/rules/spells';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import './spells.css';

type View = 'list' | 'table';
const preferenceKey = 'archive-spells-view';
function initialView(): View {
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved === 'list' || saved === 'table') return saved;
  } catch { /* Storage can be disabled in private browsing. */ }
  return 'list';
}
export function SpellsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>(initialView);
  const [filters, setFilters] = useState<SpellFilters>({ search: '', level: '', school: '', class: '', concentration: '', ritual: '' });
  const [sort, setSort] = useState<{ key: 'name' | 'level'; descending: boolean }>({ key: 'name', descending: false });
  const entries = filterSpells(officialSpells, filters).sort((a, b) => {
    const names = a.nameUk.localeCompare(b.nameUk, 'uk');
    return (sort.key === 'level' ? a.level - b.level || names : names) * (sort.descending ? -1 : 1);
  });
  function changeView(value: View) {
    setView(value);
    try { localStorage.setItem(preferenceKey, value); } catch { /* The view still works without storage. */ }
  }
  function changeSort(key: 'name' | 'level') {
    setSort({ key, descending: sort.key === key && !sort.descending });
  }
  function select(key: Exclude<keyof SpellFilters, 'search'>, label: string, options: [string, string][]) {
    return <label>{label}<select value={filters[key]} onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}>
      <option value="">Усі</option>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
    </select></label>;
  }
  return <div className="catalog-archive-page spells-page">
    <ArchiveAtmosphere />
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Довідник</p><div className="catalog-archive-header__title-row"><h1>Закляття</h1><span aria-live="polite">Знайдено: {entries.length}</span></div>
        <p className="catalog-archive-header__summary">Параметри, компоненти та точні правила заклять D&D 2024.</p></div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук заклять" placeholder="Пошук українською або англійською…" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} /></div>
    </header>
    <div className="spells-controls">
      <div className="spells-filters">
        {select('level', 'Рівень', [...new Set(officialSpells.map((spell) => spell.level))].sort((a, b) => a - b).map((level) => [String(level), spellLevelLabel(level)]))}
        {select('school', 'Школа', [...new Set(officialSpells.map((spell) => spell.school))].sort().map((school) => [school, school]))}
        {select('class', 'Клас', Object.entries(spellClasses))}
        {select('concentration', 'Концентрація', [['yes', 'Так'], ['no', 'Ні']])}
        {select('ritual', 'Ритуал', [['yes', 'Так'], ['no', 'Ні']])}
      </div>
      <div className="spells-view" role="group" aria-label="Вигляд каталогу">
        <button aria-pressed={view === 'list'} onClick={() => changeView('list')}>Список</button>
        <button aria-pressed={view === 'table'} onClick={() => changeView('table')}>Таблиця</button>
      </div>
    </div>
    {!entries.length ? <div className="archive-status-panel">Нічого не знайдено. Спробуйте змінити пошук або фільтри.</div> : view === 'list' ?
      <div className="spell-list">{entries.map((spell) => <Link className="spell-record" to={`/spells/${spell.slug}`} key={spell.slug}>
        <div><h2>{spell.nameUk}</h2><small>{spell.nameEn}</small></div>
        <div className="spell-record__facts"><span>{spellLevelLabel(spell.level)} · {spell.school}</span><span>{spell.castingTime} · {spell.range} · {spell.duration}</span></div>
        <div className="spell-record__status"><span>{spell.edition}</span>{spell.concentration && <span>Концентрація</span>}{spell.ritual && <span>Ритуал</span>}</div>
      </Link>)}</div> : <div className="spell-table-scroll" tabIndex={0} aria-label="Таблиця заклять, прокручується горизонтально">
        <table className="spell-table"><thead><tr>
          <th aria-sort={sort.key === 'name' ? sort.descending ? 'descending' : 'ascending' : 'none'}><button onClick={() => changeSort('name')}>Назва {sort.key === 'name' ? sort.descending ? '↓' : '↑' : ''}</button></th>
          <th aria-sort={sort.key === 'level' ? sort.descending ? 'descending' : 'ascending' : 'none'}><button onClick={() => changeSort('level')}>Рівень {sort.key === 'level' ? sort.descending ? '↓' : '↑' : ''}</button></th>
          {['Школа', 'Час', 'Дальність', 'Тривалість', 'Конц.', 'Ритуал', 'Класи'].map((label) => <th key={label}>{label}</th>)}
        </tr></thead><tbody>{entries.map((spell) => <tr key={spell.slug} onClick={(event) => { if (!(event.target as HTMLElement).closest('a')) navigate(`/spells/${spell.slug}`); }}>
          <td><Link to={`/spells/${spell.slug}`}>{spell.nameUk}<small>{spell.nameEn} · {spell.edition}</small></Link></td><td>{spellLevelLabel(spell.level)}</td><td>{spell.school}</td><td>{spell.castingTime}</td><td>{spell.range}</td><td>{spell.duration}</td><td>{spell.concentration ? 'Так' : '—'}</td><td>{spell.ritual ? 'Так' : '—'}</td><td>{spell.classes.map((key) => spellClasses[key]).join(', ')}</td>
        </tr>)}</tbody></table>
      </div>}
  </div>;
}
