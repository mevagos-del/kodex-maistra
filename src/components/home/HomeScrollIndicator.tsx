import { useEffect, useState } from 'react';

const BOTTOM_THRESHOLD = 72;

function getTopbarHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--archive-topbar-height');
  return Number.parseFloat(value) || 0;
}

function scrollBehavior(): 'auto' | 'smooth' {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function HomeScrollIndicator({ searchOpen }: { searchOpen: boolean }) {
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const remaining = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setNearBottom(remaining <= BOTTOM_THRESHOLD);
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const hidden = searchOpen || nearBottom;
  const scrollToNextSection = () => {
    const topbarHeight = getTopbarHeight();
    const currentThreshold = window.scrollY + topbarHeight + 8;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-home-scroll-section]'))
      .map((section) => ({ section, top: section.getBoundingClientRect().top + window.scrollY }))
      .sort((left, right) => left.top - right.top);
    const next = sections.find(({ top }) => top > currentThreshold);

    if (next) {
      window.scrollTo({ top: Math.max(0, next.top - topbarHeight), behavior: scrollBehavior() });
      return;
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: scrollBehavior() });
  };

  return (
    <button
      type="button"
      className={`home-scroll-indicator${hidden ? ' is-hidden' : ''}`}
      aria-label="Перейти до наступного розділу"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      onClick={scrollToNextSection}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m6.5 9 5.5 5.5L17.5 9" />
      </svg>
    </button>
  );
}
