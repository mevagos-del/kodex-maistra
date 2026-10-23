import { Link } from 'react-router-dom';
import { filterBestiary } from '@/data/rules/bestiary';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { CODEX_ICONS } from '@/features/catalog/utils/codexIcons';
import { useRouteSessionState } from '@/features/navigation/useRouteSessionState';
import './bestiary.css';

export function BestiaryPage() {
  const [search, setSearch] = useRouteSessionState('bestiary-search', '');
  const entries = filterBestiary(search);

  return <main className="catalog-archive-page bestiary-page">
    <ArchiveAtmosphere />
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Довідник істот</p>
        <div className="catalog-archive-header__title-row"><h1>Бестіарій</h1><span aria-live="polite">Знайдено: {entries.length}</span></div>
        <p className="catalog-archive-header__summary">Статблоки офіційних істот: характеристики, бойові дії, закляття та стани.</p>
      </div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук у Бестіарії" placeholder="Назва, тип або показник небезпеки…" value={search} onChange={event => setSearch(event.target.value)} /></div>
    </header>
    <div className="bestiary-list">
      {entries.map(entry => <Link className="bestiary-record" to={`/bestiary/${entry.slug}`} key={entry.slug}>
        <span className="bestiary-record__icon" aria-hidden="true"><img src={CODEX_ICONS.creatureType} alt="" /></span>
        <span className="bestiary-record__identity"><strong>{entry.nameUk}</strong><small>{entry.nameOriginal}</small></span>
        <span className="bestiary-record__meta">{entry.size} {entry.creatureType}{entry.subtype ? ` (${entry.subtype})` : ''}</span>
        <span className="bestiary-record__challenge"><small>ПО</small><strong>{entry.challengeRating}</strong></span>
        <span className="bestiary-record__chevron" aria-hidden="true">›</span>
      </Link>)}
    </div>
    {entries.length === 0 ? <p className="bestiary-empty" role="status">Нічого не знайдено. Спробуйте змінити пошуковий запит.</p> : null}
  </main>;
}
