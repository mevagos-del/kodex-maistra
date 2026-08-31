import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { globalSearch } from '@/features/catalog/api/catalogFilters';
import { CatalogCard } from '@/features/catalog/components/CatalogCard';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { useCatalogList } from '@/features/catalog/hooks/useCatalogData';
import { coreSections, referenceQuickAccess } from '@/data/navigation';
import type { CoreSectionSlug, EntityType } from '@/types/content';

type SectionPageProps = {
  section: CoreSectionSlug;
};

const sectionToEntity: Record<CoreSectionSlug, EntityType> = {
  races: 'race',
  classes: 'class',
  items: 'item',
};

const bookBackgroundBySection: Record<CoreSectionSlug, string> = {
  races: '/images/catalog-book-races.png',
  classes: '/images/catalog-book-classes.png',
  items: '/images/catalog-book-items.png',
};

const PAGE_TURN_DURATION = 620;

type PageTurnDirection = 'next' | 'previous';

function pageSizeForViewport() {
  if (typeof window === 'undefined') return 6;
  if (window.matchMedia('(max-width: 640px)').matches) return 3;
  if (window.matchMedia('(max-width: 980px)').matches) return 4;
  return 6;
}

function useCatalogPageSize() {
  const [pageSize, setPageSize] = useState(pageSizeForViewport);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    const tabletQuery = window.matchMedia('(max-width: 980px)');
    const updatePageSize = () => setPageSize(mobileQuery.matches ? 3 : tabletQuery.matches ? 4 : 6);

    mobileQuery.addEventListener('change', updatePageSize);
    tabletQuery.addEventListener('change', updatePageSize);
    return () => {
      mobileQuery.removeEventListener('change', updatePageSize);
      tabletQuery.removeEventListener('change', updatePageSize);
    };
  }, []);

  return pageSize;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(motionQuery.matches);

    motionQuery.addEventListener('change', updatePreference);
    return () => motionQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

export function SectionPage({ section }: SectionPageProps) {
  const entity = sectionToEntity[section];
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [turnDirection, setTurnDirection] = useState<PageTurnDirection | null>(null);
  const midpointTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const pageSize = useCatalogPageSize();
  const prefersReducedMotion = usePrefersReducedMotion();
  const meta = coreSections.find((item) => item.slug === section);
  const catalog = useCatalogList(entity);

  const filteredEntries = useMemo(() => globalSearch(catalog.data, search), [catalog.data, search]);
  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const activePage = Math.min(currentPage, totalPages - 1);
  const visibleEntries = useMemo(
    () => filteredEntries.slice(activePage * pageSize, activePage * pageSize + pageSize),
    [activePage, filteredEntries, pageSize],
  );
  const title = meta?.title ?? 'Розділ';
  const bookBackground = bookBackgroundBySection[section] ?? bookBackgroundBySection.races;
  const isAnimating = turnDirection !== null;

  useEffect(
    () => () => {
      if (midpointTimerRef.current !== null) window.clearTimeout(midpointTimerRef.current);
      if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    },
    [],
  );

  function cancelPageTurn() {
    if (midpointTimerRef.current !== null) window.clearTimeout(midpointTimerRef.current);
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    midpointTimerRef.current = null;
    finishTimerRef.current = null;
    setTurnDirection(null);
  }

  function handleSearchChange(value: string) {
    cancelPageTurn();
    setSearch(value);
    setCurrentPage(0);
  }

  function turnPage(direction: PageTurnDirection) {
    if (isAnimating) return;

    const targetPage = direction === 'next' ? activePage + 1 : activePage - 1;
    if (targetPage < 0 || targetPage >= totalPages) return;

    if (prefersReducedMotion) {
      setCurrentPage(targetPage);
      return;
    }

    setTurnDirection(direction);
    midpointTimerRef.current = window.setTimeout(() => {
      setCurrentPage(targetPage);
      midpointTimerRef.current = null;
    }, PAGE_TURN_DURATION / 2);
    finishTimerRef.current = window.setTimeout(() => {
      setTurnDirection(null);
      finishTimerRef.current = null;
    }, PAGE_TURN_DURATION);
  }

  return (
    <div className={`page-stack catalog-section-page catalog-section-page--${section}`}>
      <section key={section} className="catalog-book-section" aria-labelledby="catalog-section-title">
        <div className={`catalog-book-shell catalog-book-shell--${section}`}>
          <img className="catalog-book-bg" src={bookBackground} alt="" aria-hidden="true" />
          <div className="catalog-book-content">
              <header className="catalog-book-heading">
                <p className="eyebrow">Розділ довідника</p>
                <h1 id="catalog-section-title">{title}</h1>
              </header>

              <nav className="catalog-section-tabs" aria-label="Розділи довідника">
                {referenceQuickAccess.map((item) =>
                  item.path && !item.isDisabled ? (
                    <Link
                      key={item.title}
                      to={item.path}
                      className={
                        item.path === `/${section}`
                          ? 'catalog-section-tab catalog-section-tab-active'
                          : 'catalog-section-tab'
                      }
                      aria-current={item.path === `/${section}` ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span key={item.title} className="catalog-section-tab catalog-section-tab-disabled" aria-disabled="true">
                      {item.title}
                      <small>Скоро</small>
                    </span>
                  ),
                )}
              </nav>

              <section className="content-section catalog-section-content">
                <div className="toolbar catalog-toolbar catalog-search-only" role="search">
                  <label>
                    Пошук
                    <input
                      type="search"
                      placeholder="Пошук у розділі…"
                      value={search}
                      onChange={(event) => handleSearchChange(event.target.value)}
                    />
                  </label>
                </div>

                <div
                  className={`catalog-book-page${turnDirection ? ` is-turning-${turnDirection}` : ''}`}
                  aria-busy={isAnimating}
                >
                  {turnDirection ? (
                    <div className={`catalog-page-turn-layer catalog-page-turn-layer--${turnDirection}`} aria-hidden="true" />
                  ) : null}

                  <div className={`catalog-book-page-content${turnDirection ? ` is-turning-${turnDirection}` : ''}`}>
                    {catalog.isLoading ? (
                      <div className="placeholder-panel">Завантажуємо матеріали...</div>
                    ) : catalog.errorMessage ? (
                      <div className="placeholder-panel">Не вдалося завантажити матеріали: {catalog.errorMessage}</div>
                    ) : filteredEntries.length > 0 ? (
                      <>
                        <div className="catalog-grid">
                          {visibleEntries.map((entry) => (
                            <CatalogCard key={entry.id} entry={entry} />
                          ))}
                        </div>

                        <nav className="catalog-book-pagination" aria-label="Сторінки каталогу">
                          <button
                            type="button"
                            onClick={() => turnPage('previous')}
                            disabled={activePage === 0 || isAnimating}
                          >
                            ‹ Назад
                          </button>
                          <span aria-live="polite">
                            Сторінка {activePage + 1} з {totalPages}
                          </span>
                          <button
                            type="button"
                            onClick={() => turnPage('next')}
                            disabled={activePage >= totalPages - 1 || isAnimating}
                          >
                            Далі ›
                          </button>
                        </nav>
                      </>
                    ) : (
                      <EmptyState description="Спробуйте змінити пошуковий запит." />
                    )}
                  </div>
                </div>
              </section>
          </div>
        </div>
      </section>
    </div>
  );
}
