import type { ReferenceCard } from '../api/detailReference';
import { MechanicInfoGrid } from './MechanicInfoGrid';

type AbilityReferenceCardProps = {
  card: ReferenceCard;
};

export function AbilityReferenceCard({ card }: AbilityReferenceCardProps) {
  return (
    <article className="ability-reference-card">
      <h3>{card.title}</h3>
      {card.description ? (
        <div className="reference-card-description">
          <strong>Опис</strong>
          <p>{card.description}</p>
        </div>
      ) : null}
      <MechanicInfoGrid items={card.rows} />
    </article>
  );
}
