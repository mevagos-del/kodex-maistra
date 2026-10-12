import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { filterRules, ruleCategories, type RuleCategory } from '@/data/rules/rules';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { RULE_REFERENCE_ICONS } from '@/features/catalog/utils/codexIcons';
import './rules.css';

export function RulesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RuleCategory | ''>('');
  const entries = filterRules(search, category);
  const availableCategories = useMemo(() => Object.entries(ruleCategories).filter(([key]) => filterRules('', key).length > 0) as [RuleCategory, string][], []);

  return <main className="catalog-archive-page rules-page">
    <ArchiveAtmosphere />
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Механічний довідник</p>
        <div className="catalog-archive-header__title-row"><h1>Правила</h1><span aria-live="polite">Знайдено: {entries.length}</span></div>
        <p className="catalog-archive-header__summary">Базові правила D&amp;D 2024: кидки, бій, рух, відпочинок, магія та зв’язки з іншими розділами кодексу.</p>
      </div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук правил" placeholder="Назва, категорія або ключове слово…" value={search} onChange={event => setSearch(event.target.value)} /></div>
    </header>

    <nav className="rules-filters" aria-label="Категорії правил">
      <button type="button" className={category === '' ? 'is-active' : ''} aria-pressed={category === ''} onClick={() => setCategory('')}>Усі</button>
      {availableCategories.map(([key, label]) => <button type="button" key={key} className={category === key ? 'is-active' : ''} aria-pressed={category === key} onClick={() => setCategory(key)}>{label}</button>)}
    </nav>

    <div className="rules-catalog">
      {availableCategories.map(([key, label]) => {
        const group = entries.filter(entry => entry.category === key);
        if (!group.length) return null;
        return <section className="rules-group" key={key} aria-labelledby={`rules-${key}`}>
          <h2 id={`rules-${key}`}>{label}<span>{group.length}</span></h2>
          <div>{group.map(entry => <Link className="rule-record" to={`/rules/${entry.slug}`} key={entry.slug}>
            <span className="rule-record__icon" aria-hidden="true"><img src={RULE_REFERENCE_ICONS[entry.iconKey]} alt="" /></span>
            <span className="rule-record__copy"><strong>{entry.nameUk}</strong><small>{entry.nameOriginal}</small><span>{entry.shortDescription}</span></span>
            <span className="rule-record__category">{label}</span><span className="rule-record__chevron" aria-hidden="true">›</span>
          </Link>)}</div>
        </section>;
      })}
    </div>
    {entries.length === 0 && <p className="rules-empty" role="status">Нічого не знайдено. Спробуйте змінити запит або категорію.</p>}
  </main>;
}

