import type { ReferenceCard } from '../api/detailReference';

type RaceTraitSectionProps = {
  cards: ReferenceCard[];
};

export function RaceTraitSection({ cards }: RaceTraitSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section className="detail-v2-panel race-traits-panel">
      <h2>Риси раси</h2>
      <div className="race-trait-list">
        {cards.map((card, index) => {
          const effect = card.rows.find((row) => row.label === 'Механічний ефект');
          const details = card.rows.filter((row) => row !== effect);
          const ruleText = effect?.value ?? card.description;

          return (
            <article key={`${card.title}-${index}`} className="race-trait-card">
              <div className="race-trait-card__mark" aria-hidden="true">✦</div>
              <div className="race-trait-card__content">
                <h3>{card.title}</h3>
                {ruleText ? <p>{ruleText}</p> : null}
              </div>
              {details.length > 0 ? (
                <dl className="race-trait-card__meta">
                  {details.map((row) => (
                    <div key={`${row.label}-${row.value}`}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
