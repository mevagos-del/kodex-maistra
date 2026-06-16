import type { FeaturePreview } from '../api/cardMechanics';

type FeatureChipProps = {
  feature: FeaturePreview;
};

export function FeatureChip({ feature }: FeatureChipProps) {
  const hasTooltip = Boolean(feature.description || feature.details.length > 0);

  return (
    <span
      className={`feature-chip${hasTooltip ? ' feature-chip-with-tooltip' : ''}`}
      tabIndex={hasTooltip ? 0 : undefined}
      aria-label={hasTooltip ? `${feature.title}. ${feature.description ?? ''}` : undefined}
    >
      {feature.title}
      {hasTooltip ? (
        <span className="feature-tooltip" role="tooltip">
          <strong>{feature.title}</strong>
          {feature.description ? <span>{feature.description}</span> : null}
          {feature.details.length > 0 ? (
            <span className="feature-tooltip-details">
              {feature.details.map((detail) => (
                <span key={`${detail.label}-${detail.value}`}>
                  <b>{detail.label}:</b> {detail.value}
                </span>
              ))}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
