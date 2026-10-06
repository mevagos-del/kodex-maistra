import { useState } from 'react';
import { Link } from 'react-router-dom';
import { featCategories, featPrerequisites, filterFeats, groupFeats } from '@/data/rules/feats';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { RuleText } from '@/features/catalog/components/RuleText';
import './feats.css';

export function FeatsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [prerequisite, setPrerequisite] = useState('');
  const entries = filterFeats(search, category, prerequisite);
  const groups = groupFeats(entries);
  return <div className="catalog-archive-page feats-page">
    <ArchiveAtmosphere />
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Довідник</p>
        <div className="catalog-archive-header__title-row"><h1>Риси</h1><span aria-live="polite">Знайдено: {entries.length}</span></div>
        <p className="catalog-archive-header__summary">Усі 17 рис SRD 5.2.1: походження, загальні риси, бойові стилі та епічні благословення.</p>
      </div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук рис" placeholder="Назва українською або англійською…" value={search} onChange={event => setSearch(event.target.value)} /></div>
    </header>
    <details className="feat-filters" open><summary>Фільтри</summary><div>
      <label>Категорія<select value={category} onChange={event => setCategory(event.target.value)}><option value="">Усі категорії</option>{Object.entries(featCategories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label>Передумови<select value={prerequisite} onChange={event => setPrerequisite(event.target.value)}><option value="">Усі передумови</option><option value="none">Без передумов</option><option value="level">Мінімальний рівень</option><option value="ability">Значення характеристики</option><option value="feature">Уміння персонажа</option></select></label>
    </div></details>
    {groups.length > 0 && <nav className="feat-alphabet" aria-label="Алфавіт рис">{groups.map(group => <a key={group.letter} href={`#feat-letter-${group.letter}`}>{group.letter}</a>)}</nav>}
    {groups.map(group => <section className="feat-group" key={group.letter} aria-labelledby={`feat-letter-${group.letter}`}>
      <h2 id={`feat-letter-${group.letter}`}>{group.letter}</h2>
      {group.entries.map(entry => <Link className="feat-record" key={entry.slug} to={`/feats/${entry.slug}`}>
        <div className="feat-record__identity"><h3>{entry.nameUk}</h3><small>{entry.nameEn}</small><span>{featCategories[entry.category]}</span></div>
        <div><p><RuleText>{entry.summary}</RuleText></p>{entry.prerequisites.length > 0 && <small>Передумови: {featPrerequisites(entry)}</small>}</div>
      </Link>)}
    </section>)}
    {entries.length === 0 && <p role="status">Нічого не знайдено. Спробуй змінити запит або фільтри.</p>}
  </div>;
}
