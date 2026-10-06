import { useState } from 'react';
import { Link } from 'react-router-dom';
import { filterConditions } from '@/data/rules/conditions';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { ConditionIcon } from '@/features/catalog/components/ConditionIcon';
import { RuleText } from '@/features/catalog/components/RuleText';
import './conditions.css';

export function ConditionsPage() {
  const [search, setSearch] = useState('');
  const entries = filterConditions(search);
  return <div className="catalog-archive-page conditions-page">
    <ArchiveAtmosphere />
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Довідник</p>
        <div className="catalog-archive-header__title-row"><h1>Стани</h1><span aria-live="polite">Знайдено: {entries.length}</span></div>
        <p className="catalog-archive-header__summary">15 станів D&amp;D 2024. Ефекти, завершення та зв’язки із закляттями.</p>
      </div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук станів" placeholder="Пошук за назвою стану…" value={search} onChange={event => setSearch(event.target.value)} /></div>
    </header>
    <div className="condition-list">{entries.map(entry => <Link className="condition-record" to={`/conditions/${entry.slug}`} key={entry.slug}>
      <ConditionIcon slug={entry.slug} /><div><h2>{entry.nameUk}</h2><small>{entry.nameEn}</small><p><RuleText>{entry.summary}</RuleText></p></div>
    </Link>)}</div>
    {entries.length === 0 && <p role="status">Нічого не знайдено. Спробуй змінити пошуковий запит.</p>}
  </div>;
}
