import { Link } from 'react-router-dom';
import { getDefaultImageUrl } from '@/lib/storage';
import type { CatalogEntry } from '../types';
import { sectionSlugForEntity } from '../api/catalogApi';

type CatalogCardProps = {
  entry: CatalogEntry;
  compact?: boolean;
};

const raceImageOverrides: Record<string, string> = {
  human: '/images/catalog/races/human.webp',
  elf: '/images/catalog/races/elf.webp',
  dwarf: '/images/catalog/races/dwarf.webp',
};

function catalogCardMeta(entry: CatalogEntry) {
  if (entry.entityType === 'race') return 'Раса';
  if (entry.entityType === 'class') return 'Клас';
  return [entry.item_type, entry.category].filter(Boolean).join(' · ') || 'Предмет';
}

function catalogCardImage(entry: CatalogEntry, sectionSlug: ReturnType<typeof sectionSlugForEntity>) {
  const localRaceImage = entry.entityType === 'race' ? raceImageOverrides[entry.slug] : undefined;
  if (localRaceImage) return localRaceImage;

  const configuredImage = entry.image_url?.trim();
  return configuredImage || getDefaultImageUrl(sectionSlug);
}

export function CatalogCard({ entry, compact = false }: CatalogCardProps) {
  const sectionSlug = sectionSlugForEntity(entry.entityType);
  const imageUrl = catalogCardImage(entry, sectionSlug);
  const meta = catalogCardMeta(entry);

  return (
    <article
      className={compact ? 'catalog-card catalog-card-compact' : 'catalog-card'}
      data-entry-slug={entry.slug}
    >
      <Link to={`/${sectionSlug}/${entry.slug}`} className="catalog-card__main-link" aria-label={`Відкрити матеріал ${entry.title_ua}`}>
        <img className="catalog-card__image" src={imageUrl} alt={entry.title_ua} loading="lazy" />
        <div className="catalog-card__header">
          <h3>{entry.title_ua}</h3>
          {entry.title_original ? <p className="original-title">{entry.title_original}</p> : null}
          <p className="catalog-card__meta">{meta}</p>
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
