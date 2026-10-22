import { useLayoutEffect, useRef } from 'react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HomeSectionDivider() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    line.dataset.revealState = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      line.dataset.revealState = 'visible';
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-section-divider" aria-hidden="true">
      <span ref={lineRef} className="home-section-divider__line" />
    </div>
  );
}
