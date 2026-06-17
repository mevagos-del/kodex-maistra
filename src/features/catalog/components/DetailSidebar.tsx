import type { ReferenceInfo } from '../api/detailReference';
import { TagList } from './TagList';

type DetailSidebarProps = {
  imageUrl: string;
  imageAlt: string;
  label: string;
  title: string;
  originalTitle?: string | null;
  description?: string | null;
  tags: string[];
  quickTitle: string;
  quickItems: ReferenceInfo[];
};

export function DetailSidebar({
  imageUrl,
  imageAlt,
  label,
  title,
  originalTitle,
  description,
  tags,
  quickTitle,
  quickItems,
}: DetailSidebarProps) {
  return (
    <aside className="detail-v2-sidebar">
      <div className="detail-v2-identity-card">
        <div className="detail-v2-type">{label}</div>
        <h1>{title}</h1>
        {originalTitle ? <div className="detail-v2-original">{originalTitle}</div> : null}
        {description ? <p className="detail-v2-short-description">{description}</p> : null}

        <div className="detail-v2-image-wrap">
          <img src={imageUrl} alt={imageAlt} />
        </div>

        <div className="detail-v2-tags">
          <TagList tags={tags} />
        </div>
      </div>

      {quickItems.length > 0 ? (
        <section className="detail-v2-quick-card">
          <h2>{quickTitle}</h2>
          <ul>
            {quickItems.map((item) => (
              <li key={`${item.label}-${item.value}`}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
