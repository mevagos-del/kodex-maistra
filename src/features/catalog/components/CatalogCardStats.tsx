import { getCatalogCardPreview } from '../api/cardMechanics';
import type { MechanicSection } from '../api/cardMechanics';
import type { CatalogEntry } from '../types';
import { FeatureChip } from './FeatureChip';
import { MechanicBadge } from './MechanicBadge';

type CatalogCardStatsProps = {
  entry: CatalogEntry;
  compact?: boolean;
};

function MechanicsBlock({ section }: { section: MechanicSection }) {
  return (
    <section className="catalog-card__mechanic-block" aria-label={section.title}>
      <h4>{section.title}</h4>
      <div className="catalog-card__stat-grid">
        {section.rows.map((stat) => (
          <MechanicBadge key={`${stat.label ?? 'value'}-${stat.value}`} stat={stat} />
        ))}
      </div>
    </section>
  );
}

export function CatalogCardStats({ entry, compact = false }: CatalogCardStatsProps) {
  const preview = getCatalogCardPreview(entry, compact);
  const hasStats = Boolean(preview.main || preview.secondary);

  if (!hasStats && preview.features.length === 0) {
    return null;
  }

  return (
    <div className="catalog-card__mechanics">
      {preview.main ? <MechanicsBlock section={preview.main} /> : null}
      {preview.secondary ? <MechanicsBlock section={preview.secondary} /> : null}

      {preview.features.length > 0 ? (
        <section className="catalog-card__feature-block" aria-label={preview.featureTitle}>
          <h4>{preview.featureTitle}</h4>
          <div className="catalog-card__features">
            {preview.features.map((feature) => (
              <FeatureChip key={feature.title} feature={feature} />
            ))}
            {preview.hiddenFeatureCount > 0 ? <span className="feature-chip feature-chip-muted">ще {preview.hiddenFeatureCount}</span> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
