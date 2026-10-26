import { useEffect, useState } from 'react';

export type RaceNavigationItem = {
  href: string;
  label: string;
  number: number;
};

type RaceNavigationProps = {
  items: RaceNavigationItem[];
};

function sectionId(href: string) {
  return href.startsWith('#') ? href.slice(1) : href;
}

export function RaceNavigation({ items }: RaceNavigationProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver((entries) => {
      const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;
      if (isAtPageEnd) {
        setActiveHref(`#${sections[sections.length - 1].id}`);
        return;
      }

      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
      if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
    }, {
      rootMargin: '-18% 0px -68% 0px',
      threshold: 0,
    });

    const handlePageEnd = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24) {
        setActiveHref(`#${sections[sections.length - 1].id}`);
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', handlePageEnd, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handlePageEnd);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="race-archive-nav" aria-label="Розділи сторінки раси">
      <ol>
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveHref(item.href)}
              >
                <span aria-hidden="true">{String(item.number).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
