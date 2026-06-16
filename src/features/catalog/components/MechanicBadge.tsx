import type { CardStat } from '../api/cardMechanics';

type MechanicBadgeProps = {
  stat: CardStat;
};

export function MechanicBadge({ stat }: MechanicBadgeProps) {
  return (
    <span className={`mechanic-badge mechanic-badge-${stat.tone ?? 'secondary'}`}>
      {stat.label ? <strong>{stat.label}</strong> : null}
      <span>{stat.value}</span>
    </span>
  );
}
