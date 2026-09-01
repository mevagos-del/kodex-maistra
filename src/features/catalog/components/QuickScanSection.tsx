import type { ReferenceCard } from '../api/detailReference';
import { createReferenceAnchors } from '../utils/detailContent';

type QuickScanSectionProps = {
  id: string;
  number: number;
  title: string;
  cards: ReferenceCard[];
  iconForCard: (title: string) => string;
  emptyMessage?: string;
};

export function QuickScanSection({ id, number, title, cards, iconForCard, emptyMessage }: QuickScanSectionProps) {
  if (cards.length === 0 && !emptyMessage) return null;

  return (
    <section id={id} className="detail-v2-panel codex-detail-section">
      <h2 className="codex-detail-title"><span>{number}.</span> {title}</h2>
      {cards.length > 0 ? (
        <div className="codex-rule-list">
          {createReferenceAnchors(cards).map(({ card, id: cardId }, index) => {
            const facts = card.rows.filter((row) => row.label !== 'Опис' && row.value !== card.description).slice(0, 3);
            return (
              <article id={cardId} className="codex-rule-card" key={cardId || `${card.title}-${index}`}>
                <span className="codex-rule-icon" aria-hidden="true">
                  <img className="codex-icon codex-icon--feature" src={iconForCard(card.title)} alt="" />
                </span>
                <div className="codex-rule-copy">
                  <h3>{card.title}</h3>
                  {card.description ? <p>{card.description}</p> : null}
                  {facts.length > 0 ? (
                    <dl className="codex-rule-scan">
                      {facts.map((fact) => <div key={`${fact.label}-${fact.value}`}><dt>{fact.label}:</dt><dd>{fact.value}</dd></div>)}
                    </dl>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : <p className="codex-empty-note">{emptyMessage}</p>}
    </section>
  );
}
