import { Link } from 'react-router-dom';
import { getDefaultImageUrl } from '@/lib/storage';
import type { CatalogEntry } from '../types';
import { sectionSlugForEntity } from '../api/catalogApi';
import { resolveRaceImageUrl } from '../utils/raceImages';

type CatalogCardProps = {
  entry: CatalogEntry;
  compact?: boolean;
};

function catalogCardImage(entry: CatalogEntry, sectionSlug: ReturnType<typeof sectionSlugForEntity>) {
  const configuredImage = entry.entityType === 'race'
    ? resolveRaceImageUrl(entry.slug, entry.content_type, entry.image_url)
    : entry.image_url?.trim();
  return configuredImage || getDefaultImageUrl(sectionSlug);
}

export function CatalogCard({ entry, compact = false }: CatalogCardProps) {
  const sectionSlug = sectionSlugForEntity(entry.entityType);
  const imageUrl = catalogCardImage(entry, sectionSlug);

  return (
    <article
      className={compact ? 'catalog-card catalog-card-compact' : 'catalog-card'}
      data-entry-slug={entry.slug}
    >
      <Link to={`/${sectionSlug}/${entry.slug}`} className="catalog-card__main-link" aria-label={`Відкрити матеріал ${entry.title_ua}`}>
        <img
          className="catalog-card__image"
          src={imageUrl}
          alt={entry.title_ua}
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            const fallbackImageUrl = getDefaultImageUrl(sectionSlug);
            if (image.dataset.fallbackApplied === 'true') {
              image.hidden = true;
              return;
            }
            image.dataset.fallbackApplied = 'true';
            image.src = fallbackImageUrl;
          }}
        />
        <div className="catalog-card__header">
          <h3>{entry.title_ua}</h3>
          {entry.title_original ? <p className="original-title">{entry.title_original}</p> : null}
        </div>
      </Link>
      <div className="catalog-card__footer">
        <Link to={`/${sectionSlug}/${entry.slug}`} className="catalog-card__open-link">
          Відкрити
        </Link>
      </div>
    </article>
  );
}
