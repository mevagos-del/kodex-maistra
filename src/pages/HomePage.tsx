import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
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

function useOneTimeReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      section.classList.add('is-revealed');
      return undefined;
    }

    section.classList.add('is-observed');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add('is-revealed');
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return sectionRef;
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase('uk').replace(/[’']/g, 'ʼ');
}

export function HomePage() {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const placeholder = useAnimatedPlaceholder(!searchFocused && !search);
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

  return (
    <div className="codex-home-v2 codex-home-redesign">
      <section className="home-codex-hero" aria-labelledby="home-title">
        <img className="home-codex-hero__art" src="/images/home/kodex_maistra_hero.webp" alt="" aria-hidden="true" decoding="async" fetchPriority="high" />
        <div className="home-codex-hero__content">
          <p className="home-codex-hero__eyebrow">Довідкова система D&amp;D 2024</p>
          <h1 id="home-title">Кодекс Майстра</h1>
          <p className="home-codex-hero__subtitle">Український довідник Dungeons &amp; Dragons</p>

          <div className="home-global-search" role="search">
            <label htmlFor="home-global-search">Пошук у всіх розділах довідника</label>
            <span className="home-global-search__icon" aria-hidden="true">⌕</span>
            <input
              id="home-global-search"
              type="search"
              value={search}
              placeholder={placeholder}
              autoComplete="off"
              aria-controls="home-global-search-results"
              aria-expanded={Boolean(search.trim())}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSearch('');
              }}
            />
            {search.trim() ? (
              <div id="home-global-search-results" className="home-global-search__results" aria-live="polite">
                {searchResults.length ? searchResults.map((entry) => (
                  <Link key={entry.path} to={entry.path} className="home-global-search__result">
                    <span>
                      <strong>{entry.nameUk}</strong>
                      {entry.nameOriginal ? <small>{entry.nameOriginal}</small> : null}
                    </span>
                    <em>{entry.sectionLabel}</em>
                  </Link>
                )) : <p>Нічого не знайдено. Уточніть запит.</p>}
              </div>
            ) : null}
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

      <section ref={referenceSectionRef} className="home-reference" aria-labelledby="home-reference-title">
        <header className="home-reference__header home-reveal home-reveal--header">
          <p>Навігація кодексом</p>
          <h2 id="home-reference-title">Довідник</h2>
          <span>Усе необхідне для створення персонажа, підготовки та проведення гри.</span>
        </header>

        <div className="home-bento">
          {(['bestiary', 'spells'] as const).map((section) => (
            <Link key={section} to={sectionMeta[section].path} className={`home-reference-card home-reference-card--feature home-reveal home-reveal--row-one home-reference-card--${section}`}>
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
            <Link key={section} to={sectionMeta[section].path} className="home-reference-card home-reference-card--compact home-reveal home-reveal--row-two">
              <img src={compactSectionIcons[section]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="home-reference-card__content">
                <strong>{sectionMeta[section].title}</strong>
                <small>{counts[section]} матеріалів</small>
              </span>
              <span className="home-reference-card__arrow" aria-hidden="true">→</span>
            </Link>
          ))}

          {(['rules', 'conditions'] as const).map((section) => (
            <Link key={section} to={sectionMeta[section].path} className={`home-reference-card home-reference-card--wide home-reveal home-reveal--row-three home-reference-card--${section}`}>
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
