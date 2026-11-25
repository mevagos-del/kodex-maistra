import { useSectionScroll } from './useSectionScroll';

type Item = { href: string; label: string };

export function SectionScrollNav({ items, className, label }: { items: Item[]; className: string; label: string }) {
  const { ref, edges, activeHref, setActiveHref } = useSectionScroll<HTMLElement>(items);
  return <nav ref={ref} className={className} aria-label={label} data-scroll-left={edges.left} data-scroll-right={edges.right}>
    {items.map(({ href, label: text }) => <a key={href} href={href} aria-current={activeHref === href ? 'location' : undefined}
      onClick={() => setActiveHref(href)}>{text}</a>)}
  </nav>;
}
