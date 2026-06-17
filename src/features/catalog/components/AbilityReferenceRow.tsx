import type { ReferenceCard } from '../api/detailReference';

type AbilityReferenceRowProps = {
  card: ReferenceCard;
};

export function AbilityReferenceRow({ card }: AbilityReferenceRowProps) {
  const usage = card.rows.find((row) => row.label === 'Використання')?.value;
  const chips = card.rows.filter((row) => row.label !== 'Використання');

  return (
    <div className="detail-v2-ability-row">
      <div className="detail-v2-ability-icon" aria-hidden="true">✦</div>
      <div className="detail-v2-ability-body">
        <div className="detail-v2-ability-header">
          <h3>{card.title}</h3>
          {usage ? <span>{usage}</span> : null}
        </div>
        {card.description ? <p>{card.description}</p> : null}
        {chips.length > 0 ? (
          <div className="detail-v2-ability-chips">
            {chips.map((row) => (
              <span key={`${row.label}-${row.value}`}>{row.label}: {row.value}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
