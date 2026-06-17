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
    <aside className="detail-sidebar">
      <img className="detail-sidebar__image" src={imageUrl} alt={imageAlt} />
      <div className="detail-sidebar__body">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        {originalTitle ? <p className="original-title">{originalTitle}</p> : null}
        {description ? <p className="detail-sidebar__summary">{description}</p> : null}
        <TagList tags={tags} />
      </div>

      {quickItems.length > 0 ? (
        <div className="detail-sidebar__quick">
          <h2>{quickTitle}</h2>
          <dl>
            {quickItems.map((item) => (
              <div key={`${item.label}-${item.value}`}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </aside>
  );
}
