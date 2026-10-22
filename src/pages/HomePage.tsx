import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { HOME_REFERENCE_INDEX, type HomeReferenceSection } from '@/data/homeReferenceIndex.generated';
import { HOME_ICONS } from '@/features/catalog/utils/codexIcons';
import './home.css';

const STATIC_PLACEHOLDER = 'Пошук у довіднику…';
const PLACEHOLDER_EXAMPLES = ['Вогняна куля', 'Людина', 'Довгий меч', 'Переляканий', 'Дорослий червоний дракон'];
const sectionOrder: HomeReferenceSection[] = ['races', 'classes', 'feats', 'spells', 'items', 'conditions', 'rules', 'bestiary'];

const sectionMeta: Record<HomeReferenceSection, { title: string; description: string; path: string }> = {
  races: { title: 'Раси', description: 'Походження, риси та особливості героїв.', path: '/races' },
  classes: { title: 'Класи', description: 'Розвиток, уміння та підкласи персонажів.', path: '/classes' },
  feats: { title: 'Риси', description: 'Додаткові можливості та спеціалізації.', path: '/feats' },
  spells: { title: 'Закляття', description: 'Магічні ефекти, компоненти та правила застосування.', path: '/spells' },
  items: { title: 'Предмети', description: 'Зброя, обладунки, спорядження й магічні речі.', path: '/items' },
  conditions: { title: 'Стани', description: 'Точні наслідки станів і способи їх завершення.', path: '/conditions' },
  rules: { title: 'Правила', description: 'Основні механіки гри для швидкої перевірки.', path: '/rules' },
  bestiary: { title: 'Бестіарій', description: 'Істоти, повні блоки характеристик і бойові дії.', path: '/bestiary' },
};

const sectionArt: Partial<Record<HomeReferenceSection, string>> = {
  bestiary: '/images/home/sections/kodex_maistra_bestiary_background.webp',
  spells: '/images/home/sections/kodex_maistra_spells_background.webp',
  rules: '/images/home/sections/kodex_maistra_rules_background_3x1.webp',
  conditions: '/images/home/sections/kodex_maistra_stany_background_variant1_3x1.webp',
};

const compactSectionIcons: Partial<Record<HomeReferenceSection, string>> = {
  races: HOME_ICONS.races,
  classes: HOME_ICONS.classes,
  feats: HOME_ICONS.feats,
  items: HOME_ICONS.items,
};

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useAnimatedPlaceholder(isActive: boolean) {
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, () => true);
  const [placeholder, setPlaceholder] = useState(STATIC_PLACEHOLDER);

  useEffect(() => {
    if (!isActive || reducedMotion) return undefined;

    let exampleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const example = PLACEHOLDER_EXAMPLES[exampleIndex];
      characterIndex += deleting ? -1 : 1;
      setPlaceholder(example.slice(0, Math.max(0, characterIndex)));

      let delay = deleting ? 42 : 76;
      if (!deleting && characterIndex >= example.length) {
        deleting = true;
        delay = 1250;
      } else if (deleting && characterIndex <= 0) {
        deleting = false;
        exampleIndex = (exampleIndex + 1) % PLACEHOLDER_EXAMPLES.length;
        delay = 360;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 650);
    return () => clearTimeout(timer);
  }, [isActive, reducedMotion]);

  return isActive && !reducedMotion ? placeholder : STATIC_PLACEHOLDER;
}

function useHeroReveal() {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content || prefersReducedMotion()) return undefined;

    content.classList.add('is-intro-ready');
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => content.classList.add('is-intro-visible'));
    });
    const fallback = window.setTimeout(() => content.classList.add('is-intro-visible'), 1200);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, []);

  return contentRef;
}

function useOneTimeReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const revealItems = Array.from(section.querySelectorAll<HTMLElement>('[data-home-reveal]'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    section.classList.add('is-reveal-ready');
    try {
      const groups = new Map<string, HTMLElement[]>();
      revealItems.forEach((item) => {
        const group = item.dataset.homeReveal ?? 'default';
        groups.set(group, [...(groups.get(group) ?? []), item]);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const trigger = entry.target as HTMLElement;
          const group = trigger.dataset.homeReveal ?? 'default';
          groups.get(group)?.forEach((item) => item.classList.add('is-revealed'));
          observer.unobserve(trigger);
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

      groups.forEach((items) => observer.observe(items[0]));
      return () => observer.disconnect();
    } catch {
      section.classList.remove('is-reveal-ready');
      return undefined;
    }
  }, []);

  return sectionRef;
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase('uk').replace(/[’']/g, 'ʼ');
}

export function HomePage() {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [resultsPosition, setResultsPosition] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const placeholder = useAnimatedPlaceholder(!searchFocused && !search);
  const heroContentRef = useHeroReveal();
  const referenceSectionRef = useOneTimeReveal();

  const counts = useMemo(() => Object.fromEntries(sectionOrder.map((section) => [
    section,
    HOME_REFERENCE_INDEX.filter((entry) => entry.section === section).length,
  ])) as Record<HomeReferenceSection, number>, []);

  const searchResults = useMemo(() => {
    const query = normalizeSearch(search);
    if (!query) return [];
    return HOME_REFERENCE_INDEX
      .filter((entry) => normalizeSearch(`${entry.nameUk} ${entry.nameOriginal} ${entry.slug} ${'keywords' in entry ? entry.keywords : ''}`).includes(query))
      .slice(0, 10);
  }, [search]);

  const updateResultsPosition = () => {
    const input = searchInputRef.current;
    if (!input) return;
    const rect = input.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    setResultsPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(96, Math.min(432, viewportHeight - rect.bottom - 20)),
    });
  };

  const closeResults = () => setResultsOpen(false);

  const focusSearchResult = (index: number) => {
    const links = resultsRef.current?.querySelectorAll<HTMLAnchorElement>('.home-global-search__result');
    links?.[index]?.focus();
  };

  useEffect(() => {
    if (!resultsOpen) return undefined;
    const handleViewportChange = () => updateResultsPosition();
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (searchRootRef.current?.contains(target) || resultsRef.current?.contains(target)) return;
      closeResults();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setSearch('');
      closeResults();
      searchInputRef.current?.focus();
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);
    window.visualViewport?.addEventListener('resize', handleViewportChange);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resultsOpen]);

  const resultsPanel = resultsOpen && search.trim() && resultsPosition ? createPortal(
    <div
      ref={resultsRef}
      id="home-global-search-results"
      className="home-global-search__results"
      aria-live="polite"
      style={resultsPosition}
      onKeyDown={(event) => {
        const links = Array.from(resultsRef.current?.querySelectorAll<HTMLAnchorElement>('.home-global-search__result') ?? []);
        const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
        if (event.key === 'ArrowDown' && links.length) {
          event.preventDefault();
          links[(currentIndex + 1) % links.length].focus();
        } else if (event.key === 'ArrowUp' && links.length) {
          event.preventDefault();
          links[(currentIndex - 1 + links.length) % links.length].focus();
        } else if (event.key === 'Tab' && event.shiftKey && currentIndex === 0) {
          event.preventDefault();
          searchInputRef.current?.focus();
        } else if (event.key === 'Tab' && !event.shiftKey && currentIndex === links.length - 1) {
          event.preventDefault();
          closeResults();
          document.querySelector<HTMLAnchorElement>('.home-reference-card')?.focus();
        }
      }}
    >
      {searchResults.length ? searchResults.map((entry) => (
        <Link key={entry.path} to={entry.path} className="home-global-search__result" onClick={closeResults}>
          <span>
            <strong>{entry.nameUk}</strong>
            {entry.nameOriginal ? <small>{entry.nameOriginal}</small> : null}
          </span>
          <em>{entry.sectionLabel}</em>
        </Link>
      )) : <p>Нічого не знайдено. Уточніть запит.</p>}
    </div>,
    document.body,
  ) : null;

  return (
    <div className="codex-home-v2 codex-home-redesign">
      <section className="home-codex-hero" aria-labelledby="home-title">
        <img className="home-codex-hero__art" src="/images/home/kodex_maistra_hero.webp" alt="" aria-hidden="true" decoding="async" fetchPriority="high" />
        <div ref={heroContentRef} className="home-codex-hero__content">
          <p className="home-codex-hero__eyebrow">Довідкова система D&amp;D 2024</p>
          <h1 id="home-title">Кодекс Майстра</h1>
          <p className="home-codex-hero__subtitle">Український довідник Dungeons &amp; Dragons</p>

          <div ref={searchRootRef} className="home-global-search" role="search">
            <label htmlFor="home-global-search">Пошук у всіх розділах довідника</label>
            <span className="home-global-search__icon" aria-hidden="true">⌕</span>
            <input
              ref={searchInputRef}
              id="home-global-search"
              type="search"
              value={search}
              placeholder={placeholder}
              autoComplete="off"
              aria-controls="home-global-search-results"
              aria-expanded={resultsOpen && Boolean(search.trim())}
              onFocus={() => {
                setSearchFocused(true);
                if (search.trim()) {
                  updateResultsPosition();
                  setResultsOpen(true);
                }
              }}
              onBlur={() => setSearchFocused(false)}
              onChange={(event) => {
                const nextSearch = event.target.value;
                setSearch(nextSearch);
                if (nextSearch.trim()) {
                  updateResultsPosition();
                  setResultsOpen(true);
                } else {
                  closeResults();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setSearch('');
                  closeResults();
                } else if ((event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) && resultsOpen && searchResults.length) {
                  event.preventDefault();
                  focusSearchResult(0);
                }
              }}
            />
          </div>

          <dl className="home-codex-kpi" aria-label="Кількість матеріалів у довіднику">
            {([
              ['bestiary', 'Істоти'], ['spells', 'Закляття'], ['items', 'Предмети'],
              ['feats', 'Риси'], ['rules', 'Правила'], ['conditions', 'Стани'],
            ] as const).map(([section, label]) => (
              <div key={section}><dt>{label}</dt><dd>{counts[section]}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {resultsPanel}

      <section ref={referenceSectionRef} className="home-reference" aria-labelledby="home-reference-title">
        <header className="home-reference__header home-reveal home-reveal--header" data-home-reveal="header">
          <p>Навігація кодексом</p>
          <h2 id="home-reference-title">Довідник</h2>
          <span>Усе необхідне для створення персонажа, підготовки та проведення гри.</span>
        </header>

        <div className="home-bento">
          {(['bestiary', 'spells'] as const).map((section) => (
            <Link key={section} to={sectionMeta[section].path} className={`home-reference-card home-reference-card--feature home-reveal home-reveal--row-one home-reference-card--${section}`} data-home-reveal="features">
              <img src={sectionArt[section]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="home-reference-card__shade" aria-hidden="true" />
              <span className="home-reference-card__content">
                <small>{counts[section]} матеріалів</small>
                <strong>{sectionMeta[section].title}</strong>
                <span>{sectionMeta[section].description}</span>
              </span>
              <span className="home-reference-card__arrow" aria-hidden="true">→</span>
            </Link>
          ))}

          {(['races', 'classes', 'feats', 'items'] as const).map((section) => (
            <Link key={section} to={sectionMeta[section].path} className="home-reference-card home-reference-card--compact home-reveal home-reveal--row-two" data-home-reveal="compact">
              <img src={compactSectionIcons[section]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="home-reference-card__content">
                <strong>{sectionMeta[section].title}</strong>
                <small>{counts[section]} матеріалів</small>
              </span>
              <span className="home-reference-card__arrow" aria-hidden="true">→</span>
            </Link>
          ))}

          {(['rules', 'conditions'] as const).map((section) => (
            <Link key={section} to={sectionMeta[section].path} className={`home-reference-card home-reference-card--wide home-reveal home-reveal--row-three home-reference-card--${section}`} data-home-reveal="bottom">
              <img src={sectionArt[section]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="home-reference-card__shade" aria-hidden="true" />
              <span className="home-reference-card__content">
                <small>{counts[section]} матеріалів</small>
                <strong>{sectionMeta[section].title}</strong>
                <span>{sectionMeta[section].description}</span>
              </span>
              <span className="home-reference-card__arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
