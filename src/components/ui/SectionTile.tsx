import { Link } from 'react-router-dom';
import { getDefaultImageUrl } from '@/lib/storage';
import type { SectionMeta } from '@/types/content';

type SectionTileProps = {
  section: SectionMeta;
  imageUrl?: string | null;
  count?: number;
};

function materialWord(count: number) {
  if (count === 1) return 'матеріал';
  if (count >= 2 && count <= 4) return 'матеріали';
  return 'матеріалів';
}

export function SectionTile({ section, imageUrl, count }: SectionTileProps) {
  const materialLabel = typeof count === 'number' ? `${count} ${materialWord(count)}` : section.materialCountLabel;

  return (
    <article className="section-tile">
      <img
        className="tile-image"
        src={imageUrl ?? getDefaultImageUrl('sections')}
        alt={section.imageAlt}
        loading="lazy"
      />
      <div>
        <p className="tile-count">{materialLabel}</p>
        <h3>{section.title}</h3>
        <p>{section.description}</p>
      </div>
      <Link to={section.path} className="tile-action">
        Відкрити розділ
      </Link>
    </article>
  );
}
