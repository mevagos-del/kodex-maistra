import { useEffect, useRef, useState } from 'react';

export function useHorizontalScrollState<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setEdges({
      left: element.scrollLeft > 2,
      right: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });
    update();
    element.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(element);
    if (element.firstElementChild) resize.observe(element.firstElementChild);
    return () => { element.removeEventListener('scroll', update); resize.disconnect(); };
  }, []);

  return { ref, edges };
}

export function useSectionScroll<T extends HTMLElement = HTMLElement>(items: readonly { href: string }[]) {
  const { ref, edges } = useHorizontalScrollState<T>();
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');

  useEffect(() => {
    const sections = items.map(({ href }) => document.getElementById(href.slice(1))).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = 130;
        const positioned = sections.map((section) => ({ section, top: section.getBoundingClientRect().top }))
          .sort((a, b) => a.top - b.top);
        const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        const current = (atPageEnd ? positioned.at(-1) : positioned.filter(({ top }) => top <= threshold).at(-1))?.section
          ?? positioned[0].section;
        setActiveHref(`#${current.id}`);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [items]);

  useEffect(() => {
    const container = ref.current;
    const active = container?.querySelector<HTMLAnchorElement>(`a[href="${activeHref}"]`);
    if (!container || !active || container.scrollWidth <= container.clientWidth + 2) return;
    const left = active.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft;
    const right = left + active.offsetWidth;
    if (left >= container.scrollLeft + 12 && right <= container.scrollLeft + container.clientWidth - 12) return;
    container.scrollTo({ left: Math.max(0, left - (container.clientWidth - active.offsetWidth) / 2), behavior: 'instant' });
  }, [activeHref, ref]);

  return { ref, edges, activeHref, setActiveHref };
}
