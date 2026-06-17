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
  const tagLimit = compact ? 3 : 4;
  const visibleTags = entry.tags.slice(0, tagLimit);
  const hiddenTagCount = Math.max(0, entry.tags.length - visibleTags.length);

  return (
    <article className={compact ? 'catalog-card catalog-card-compact' : 'catalog-card'}>
      <Link to={`/${sectionSlug}/${entry.slug}`} className="catalog-card__main-link" aria-label={`Відкрити матеріал ${entry.title_ua}`}>
        <img className="catalog-card__image" src={imageUrl} alt={entry.title_ua} loading="lazy" />
        <div className="catalog-card__header">
          <h3>{entry.title_ua}</h3>
          {entry.title_original ? <p className="original-title">{entry.title_original}</p> : null}
        </div>
      </Link>
      <div className="catalog-card__footer">
        <div className="catalog-card__tags">
          {visibleTags.length > 0 ? <TagList tags={visibleTags} /> : null}
          {hiddenTagCount > 0 ? <span className="tag-more">+ ще {hiddenTagCount}</span> : null}
        </div>
        <Link to={`/${sectionSlug}/${entry.slug}`} className="catalog-card__open-link">
          Відкрити
        </Link>
      </div>
    </article>
  );
}
