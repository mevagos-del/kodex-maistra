import { useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { HomePage } from '../HomePage';
import './animation-preview.css';

const variants = {
  cinematic: { name: 'Cinematic', hero: 540, bento: 520, stagger: 105, translate: 18, effect: 'Послідовний Hero, поява довідника рядами.' },
  editorial: { name: 'Editorial', hero: 400, bento: 380, stagger: 60, translate: 10, effect: 'Швидке проявлення з мінімальним рухом.' },
  atmospheric: { name: 'Atmospheric', hero: 580, bento: 460, stagger: 85, translate: 14, effect: 'М’яке проявлення арту й атмосферного шару.' },
} as const;
type Variant = keyof typeof variants;
const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
const reducedSnapshot = () => window.matchMedia(motionQuery).matches;

export default function AnimationPreviewPage() {
  const [variant, setVariant] = useState<Variant>('cinematic');
  const [heroRun, setHeroRun] = useState(0);
  const [referenceRun, setReferenceRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, () => true);
  const config = variants[variant];

  useLayoutEffect(() => {
    const container = root.current;
    if (!container || reduced) return;
    const hero = container.querySelector<HTMLElement>('.home-codex-hero');
    const children = Array.from(container.querySelectorAll<HTMLElement>('.home-codex-hero__content > *'));
    children.forEach((child, index) => child.style.setProperty('--preview-delay', `${index * config.stagger}ms`));
    // A synchronous style flush makes repeated clicks restart the actual CSS animation.
    // Nothing is remounted: search state, loaded images and focus are preserved.
    if (hero) {
      hero.removeAttribute('data-preview-playing');
      void hero.offsetWidth;
      hero.setAttribute('data-preview-playing', '');
    }
    return () => {
      hero?.removeAttribute('data-preview-playing');
      children.forEach((child) => child.style.removeProperty('--preview-delay'));
    };
  }, [variant, config.stagger, heroRun, reduced]);

  useLayoutEffect(() => {
    const section = root.current?.querySelector<HTMLElement>('.home-reference');
    if (!section || reduced || !('IntersectionObserver' in window)) return;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-home-reveal]'));
    let observer: IntersectionObserver | undefined;
    const clear = () => items.forEach((item) => {
      item.removeAttribute('data-preview-reveal');
      item.style.removeProperty('--preview-delay');
    });
    // offsetTop reflects real responsive rows, including the one-column mobile features.
    const rowFor = (item: HTMLElement) => item.offsetTop;
    const revealRow = (target: HTMLElement) => {
      const row = rowFor(target);
      items.filter((item) => rowFor(item) === row).forEach((item, index) => {
        if (item.dataset.previewReveal === 'visible') return;
        item.style.setProperty('--preview-delay', `${index * config.stagger}ms`);
        item.dataset.previewReveal = 'visible';
        observer?.unobserve(item);
      });
    };
    const focusReveal = (event: FocusEvent) => {
      const item = (event.target as HTMLElement).closest<HTMLElement>('[data-home-reveal]');
      if (item) revealRow(item);
    };
    try {
      clear();
      void section.offsetWidth;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealRow(entry.target as HTMLElement);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
      items.forEach((item) => {
        item.dataset.previewReveal = 'pending';
        observer?.observe(item);
      });
      section.addEventListener('focusin', focusReveal);
    } catch {
      observer?.disconnect();
      clear(); // Progressive enhancement: content stays visible without an observer.
    }
    return () => {
      observer?.disconnect();
      section.removeEventListener('focusin', focusReveal);
      clear();
    };
  }, [variant, config.stagger, referenceRun, reduced]);

  const replayAll = () => {
    setHeroRun((run) => run + 1);
    setReferenceRun((run) => run + 1);
    root.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };
  const replayReference = () => {
    setReferenceRun((run) => run + 1);
    root.current?.querySelector('.home-reference')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  return (
    <div ref={root} className="animation-preview" data-variant={variant} style={{
      '--preview-hero-duration': `${config.hero}ms`,
      '--preview-bento-duration': `${config.bento}ms`,
      '--preview-translate': `${config.translate}px`,
    } as CSSProperties}>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <section className="animation-preview__controls" aria-label="Порівняння анімацій">
        <div className="animation-preview__actions">
          <strong>Animation Preview <small>Лише локально</small></strong>
          <div className="animation-preview__variants" role="group" aria-label="Варіант анімації">
            {(Object.keys(variants) as Variant[]).map((key) => (
              <button key={key} type="button" aria-pressed={variant === key} onClick={() => { setVariant(key); replayAll(); }}>{variants[key].name}</button>
            ))}
          </div>
          <button type="button" onClick={replayAll}>Повторити анімацію</button>
          <button type="button" onClick={replayReference}>Повторити появу довідника</button>
        </div>
        <p aria-live="polite">Duration: {config.hero} ms Hero / {config.bento} ms Bento · Stagger: {config.stagger} ms · Translate: {config.translate} px</p>
        <p>{config.effect} {reduced ? 'Зменшення руху ввімкнено: усі елементи видимі, анімації вимкнено.' : 'Прокрутіть до довідника, щоб порівняти появу карток.'}</p>
      </section>
      <HomePage externalMotion />
    </div>
  );
}
