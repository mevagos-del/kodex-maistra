import { getCatalogCardPreview } from '../api/cardMechanics';
import type { CatalogEntry } from '../types';
import { FeatureChip } from './FeatureChip';
import { MechanicBadge } from './MechanicBadge';

type CatalogCardStatsProps = {
  entry: CatalogEntry;
  compact?: boolean;
};

export function CatalogCardStats({ entry, compact = false }: CatalogCardStatsProps) {
  const preview = getCatalogCardPreview(entry, compact);
  const hasStats = preview.primaryStats.length > 0 || preview.secondaryStats.length > 0;

  if (!hasStats && preview.features.length === 0) {
    return null;
  }

  return (
    <div className="catalog-card__mechanics">
      {preview.primaryStats.length > 0 ? (
        <div className="catalog-card__stats catalog-card__stats-primary">
          {preview.primaryStats.map((stat) => (
            <MechanicBadge key={`${stat.label ?? 'value'}-${stat.value}`} stat={stat} />
          ))}
        </div>
      ) : null}

      {preview.secondaryStats.length > 0 ? (
        <div className="catalog-card__stats catalog-card__stats-secondary">
          {preview.secondaryStats.map((stat) => (
            <MechanicBadge key={`${stat.label ?? 'value'}-${stat.value}`} stat={stat} />
          ))}
        </div>
      ) : null}

      {preview.features.length > 0 ? (
        <div className="catalog-card__features" aria-label="Ключові особливості">
          {preview.features.map((feature) => (
            <FeatureChip key={feature.title} feature={feature} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
