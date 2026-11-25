import { useSectionScroll } from '@/features/navigation/useSectionScroll';

export type RaceNavigationItem = {
  href: string;
  label: string;
  number: number;
};

type RaceNavigationProps = {
  items: RaceNavigationItem[];
};

export function RaceNavigation({ items }: RaceNavigationProps) {
  const { ref, edges, activeHref, setActiveHref } = useSectionScroll<HTMLOListElement>(items);

  if (items.length === 0) return null;

  return (
    <nav className="race-archive-nav" aria-label="Розділи сторінки раси" data-scroll-left={edges.left} data-scroll-right={edges.right}>
      <ol ref={ref}>
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
