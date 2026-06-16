import { useState } from 'react';
import type { FeaturePreview } from '../api/cardMechanics';

type FeatureChipProps = {
  feature: FeaturePreview;
};

export function FeatureChip({ feature }: FeatureChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasTooltip = Boolean(feature.description || feature.details.length > 0);
  const tooltip = hasTooltip ? (
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
  ) : null;

  if (!hasTooltip) {
    return <span className="feature-chip">{feature.title}</span>;
  }

  return (
    <button
      type="button"
      className={`feature-chip feature-chip-with-tooltip${isOpen ? ' feature-chip-open' : ''}`}
      aria-label={`${feature.title}. ${feature.description ?? ''}`}
      onClick={(event) => {
        event.preventDefault();
        setIsOpen((current) => !current);
      }}
      onBlur={() => setIsOpen(false)}
    >
      {feature.title}
      {tooltip}
    </button>
  );
}
