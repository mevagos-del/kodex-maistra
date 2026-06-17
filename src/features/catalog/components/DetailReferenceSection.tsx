import type { ReferenceCard } from '../api/detailReference';
import { AbilityReferenceCard } from './AbilityReferenceCard';

type DetailReferenceSectionProps = {
  title: string;
  cards: ReferenceCard[];
};

export function DetailReferenceSection({ title, cards }: DetailReferenceSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section className="rulebook-section reference-section">
      <h3>{title}</h3>
      <div className="reference-card-grid">
        {cards.map((card, index) => (
          <AbilityReferenceCard key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
