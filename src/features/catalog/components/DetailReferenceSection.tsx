import type { ReferenceCard } from '../api/detailReference';
import { AbilityReferenceRow } from './AbilityReferenceRow';

type DetailReferenceSectionProps = {
  title: string;
  cards: ReferenceCard[];
};

export function DetailReferenceSection({ title, cards }: DetailReferenceSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section className="detail-v2-panel">
      <h3>{title}</h3>
      <div className="detail-v2-ability-list">
        {cards.map((card, index) => (
          <AbilityReferenceRow key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
