import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { preloadDetailRoute } from '@/app/routePreload';
import { getDefaultImageUrl } from '@/lib/storage';
import type { RaceEntry } from '../../types';
import { localOfficialRaceAssets, resolveCatalogImageUrl } from '../../utils/catalogImages';

type RaceCatalogCardProps = {
  entry: RaceEntry;
  priority?: boolean;
};

type RaceCardStyle = CSSProperties & {
  '--race-card-position'?: string;
};

export function RaceCatalogCard({ entry, priority = false }: RaceCatalogCardProps) {
  const assets = entry.content_type === 'official' ? localOfficialRaceAssets(entry.slug) : undefined;
  const imageUrl = resolveCatalogImageUrl('race', entry.slug, entry.content_type, entry.image_url)
    || getDefaultImageUrl('races');
  const style: RaceCardStyle = { '--race-card-position': assets?.cardPosition ?? '50% center' };

  return (
    <article className="race-catalog-card" data-entry-slug={entry.slug} style={style}>
      <Link
        to={`/races/${entry.slug}`}
        className="race-catalog-card__link"
        aria-label={`Відкрити матеріал ${entry.title_ua}`}
        onMouseEnter={() => { void preloadDetailRoute(); }}
        onFocus={() => { void preloadDetailRoute(); }}
      >
        <img
          className="race-catalog-card__art"
          src={imageUrl}
          alt={entry.title_ua}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          width="1200"
          height="800"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset.fallbackApplied === 'true') {
              image.hidden = true;
              return;
            }
            image.dataset.fallbackApplied = 'true';
            image.src = getDefaultImageUrl('races');
          }}
        />
        <div className="race-catalog-card__gradient" aria-hidden="true" />
        <div className="race-catalog-card__copy">
          <h2>{entry.title_ua}</h2>
          {entry.title_original ? <p>{entry.title_original}</p> : null}
          {entry.rules_version === '2024' ? <span>D&amp;D 2024</span> : null}
        </div>
      </Link>
    </article>
  );
}
