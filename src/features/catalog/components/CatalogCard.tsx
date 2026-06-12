import { Link } from 'react-router-dom';
import { getDefaultImageUrl } from '@/lib/storage';
import type { CatalogEntry } from '../types';
import { sectionSlugForEntity } from '../api/catalogApi';
import { TagList } from './TagList';

type CatalogCardProps = {
  entry: CatalogEntry;
  compact?: boolean;
};

export function CatalogCard({ entry, compact = false }: CatalogCardProps) {
  const sectionSlug = sectionSlugForEntity(entry.entityType);
  const imageUrl = entry.image_url ?? getDefaultImageUrl(sectionSlug);

  return (
    <Link to={`/${sectionSlug}/${entry.slug}`} className={compact ? 'catalog-card catalog-card-compact' : 'catalog-card'}>
      <img src={imageUrl} alt={entry.title_ua} loading="lazy" />
      <div className="catalog-card-body">
        <h3>{entry.title_ua}</h3>
        {entry.title_original ? <p className="original-title">{entry.title_original}</p> : null}
        <TagList tags={entry.tags.slice(0, compact ? 3 : 5)} />
      </div>
    </Link>
  );
}
