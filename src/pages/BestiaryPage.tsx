import { Link } from 'react-router-dom';
import { officialBestiary } from '@/data/rules/bestiary';
import {
  bestiaryChallengeRatingOptions,
  bestiaryCreatureTypeOptions,
  bestiarySizeOptions,
  filterAndSortBestiary,
  normalizeBestiaryCreatureType,
  normalizeBestiarySize,
  parseChallengeRating,
  type BestiaryCatalogFilters,
  type BestiarySort,
} from '@/features/catalog/utils/bestiaryCatalog';
import { useRouteSessionState } from '@/features/navigation/useRouteSessionState';
import './bestiary.css';

type BestiaryCatalogState = BestiaryCatalogFilters & {
  filtersOpen: boolean;
};

const initialState: BestiaryCatalogState = {
  search: '', creatureType: '', size: '', crMin: '', crMax: '', sort: 'name-asc', filtersOpen: false,
};

const sortOptions: Array<[BestiarySort, string]> = [
  ['name-asc', 'Назва: А–Я'],
  ['name-desc', 'Назва: Я–А'],
  ['cr-asc', 'ПО: за зростанням'],
  ['cr-desc', 'ПО: за спаданням'],
];

export function BestiaryPage() {
  const [state, setState] = useRouteSessionState<BestiaryCatalogState>('bestiary-catalog', initialState);
  const typeOptions = bestiaryCreatureTypeOptions(officialBestiary);
  const sizeOptions = bestiarySizeOptions(officialBestiary);
  const challengeOptions = bestiaryChallengeRatingOptions(officialBestiary);
  const entries = filterAndSortBestiary(officialBestiary, state);
  const activeFilterCount = [state.creatureType, state.size, state.crMin, state.crMax].filter(Boolean).length;

  const update = (patch: Partial<BestiaryCatalogState>) => setState((current) => ({ ...current, ...patch }));
  const updateChallenge = (key: 'crMin' | 'crMax', value: string) => {
    const patch: Partial<BestiaryCatalogState> = { [key]: value };
    if (value && key === 'crMin' && state.crMax && parseChallengeRating(value) > parseChallengeRating(state.crMax)) patch.crMax = value;
    if (value && key === 'crMax' && state.crMin && parseChallengeRating(value) < parseChallengeRating(state.crMin)) patch.crMin = value;
    update(patch);
  };
  const resetFilters = () => update({ creatureType: '', size: '', crMin: '', crMax: '' });

  return <main className="catalog-archive-page bestiary-page">
    <header className="catalog-archive-header">
      <div className="catalog-archive-header__copy"><p>Довідник істот</p>
        <div className="catalog-archive-header__title-row"><h1>Бестіарій</h1></div>
        <p className="catalog-archive-header__summary">Статблоки офіційних істот: характеристики, бойові дії, закляття та стани.</p>
      </div>
      <div role="search" className="catalog-archive-search"><input type="search" aria-label="Пошук у Бестіарії" placeholder="Назва, тип або показник небезпеки…" value={state.search} onChange={event => update({ search: event.target.value })} /></div>
    </header>

    <section className="bestiary-catalog-controls" aria-label="Керування каталогом">
      <div className="bestiary-catalog-toolbar">
        <button type="button" className="bestiary-filter-toggle" aria-expanded={state.filtersOpen} aria-controls="bestiary-filter-panel" onClick={() => update({ filtersOpen: !state.filtersOpen })}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6.25 7.1v5.4l-3.5 1.75V12.1L4 5Z" /></svg>
          <span>Фільтри</span>
          {activeFilterCount > 0 ? <strong aria-label={`Активних фільтрів: ${activeFilterCount}`}>{activeFilterCount}</strong> : null}
        </button>
        <label className="bestiary-sort-control"><span>Сортування</span><select value={state.sort} onChange={(event) => update({ sort: event.target.value as BestiarySort, explicitSort: true })}>{sortOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <p className="bestiary-result-count" aria-live="polite">Знайдено: <strong>{entries.length}</strong></p>
      </div>

      <div id="bestiary-filter-panel" className="bestiary-filter-panel" hidden={!state.filtersOpen}>
        <label><span>Тип істоти</span><select value={state.creatureType} onChange={(event) => update({ creatureType: event.target.value })}><option value="">Усі типи</option>{typeOptions.map((type) => <option value={type} key={type}>{type}</option>)}</select></label>
        <label><span>Розмір</span><select value={state.size} onChange={(event) => update({ size: event.target.value })}><option value="">Усі розміри</option>{sizeOptions.map((size) => <option value={size} key={size}>{size}</option>)}</select></label>
        <label><span>Мінімальний ПО</span><select value={state.crMin} onChange={(event) => updateChallenge('crMin', event.target.value)}><option value="">Без мінімуму</option>{challengeOptions.map((cr) => <option value={cr} key={cr}>{cr}</option>)}</select></label>
        <label><span>Максимальний ПО</span><select value={state.crMax} onChange={(event) => updateChallenge('crMax', event.target.value)}><option value="">Без максимуму</option>{challengeOptions.map((cr) => <option value={cr} key={cr}>{cr}</option>)}</select></label>
        <button type="button" className="bestiary-filter-reset" onClick={resetFilters} disabled={activeFilterCount === 0}>Скинути фільтри</button>
      </div>
    </section>

    <div className="bestiary-list">
      {entries.map(entry => <Link className="bestiary-record" to={`/bestiary/${entry.slug}`} key={entry.slug}>
        <span className="bestiary-record__icon" aria-hidden="true" data-creature-type={normalizeBestiaryCreatureType(entry.creatureType)} />
        <span className="bestiary-record__identity"><strong>{entry.nameUk}</strong><small>{entry.nameOriginal}</small></span>
        <span className="bestiary-record__details"><span>{normalizeBestiaryCreatureType(entry.creatureType)}</span><span>{normalizeBestiarySize(entry.size)}</span></span>
        <span className="bestiary-record__challenge"><small>ПО</small><strong>{entry.challengeRating}</strong></span>
        <span className="bestiary-record__chevron" aria-hidden="true">›</span>
      </Link>)}
    </div>
    {entries.length === 0 ? <div className="bestiary-empty" role="status"><strong>Істот не знайдено</strong><span>Змініть пошук або скиньте фільтри.</span>{activeFilterCount > 0 ? <button type="button" onClick={resetFilters}>Скинути фільтри</button> : null}</div> : null}
  </main>;
}
