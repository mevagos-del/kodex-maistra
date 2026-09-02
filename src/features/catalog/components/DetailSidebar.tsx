import type { ReferenceInfo } from '../api/detailReference';
import { TagList } from './TagList';

type SidebarNavigationItem = {
  href: string;
  label: string;
  number: number;
};

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
  badges?: string[];
  navigation?: SidebarNavigationItem[];
  fallbackImageUrl?: string;
  variant?: 'race' | 'class' | 'item';
  hideImage?: boolean;
  subclasses?: Array<{ name: string; originalName?: string }>;
  selectedSubclassIndex?: number;
  onSelectSubclass?: (index: number) => void;
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
  badges = [],
  navigation = [],
  fallbackImageUrl,
  variant,
  hideImage = false,
  subclasses = [],
  selectedSubclassIndex = 0,
  onSelectSubclass,
}: DetailSidebarProps) {
  const isCodexSidebar = Boolean(variant);

  return (
    <aside className={`detail-v2-sidebar${isCodexSidebar ? ` codex-identity-sidebar codex-identity-sidebar--${variant}` : ''}${variant === 'race' ? ' race-identity-sidebar' : ''}`}>
      <div className={`detail-v2-identity-card${isCodexSidebar ? ' codex-identity-card' : ''}${variant === 'race' ? ' race-identity-card' : ''}`}>
        <div className="detail-v2-type">{label}</div>
        <h1>{title}</h1>
        {originalTitle ? <div className="detail-v2-original">{originalTitle}</div> : null}
        {badges.length > 0 ? (
          <div className="detail-v2-status-list" aria-label="Статус матеріалу">
            {badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
        ) : null}
        {description ? <p className="detail-v2-short-description">{description}</p> : null}

        {!hideImage ? <div className={`detail-v2-image-wrap${isCodexSidebar ? ' codex-portrait-frame' : ''}${variant === 'race' ? ' race-portrait-frame' : ''}`}>
          <img
            className={isCodexSidebar ? `codex-portrait${variant === 'race' ? ' race-portrait' : ''}` : undefined}
            src={imageUrl}
            alt={imageAlt}
            onError={fallbackImageUrl ? (event) => {
              const image = event.currentTarget;
              if (image.dataset.fallbackApplied === 'true') return;
              image.dataset.fallbackApplied = 'true';
              image.src = fallbackImageUrl;
              image.classList.add('race-portrait--fallback');
            } : undefined}
          />
        </div> : null}

        {tags.length > 0 ? (
          <div className="detail-v2-tags">
            <TagList tags={tags} />
          </div>
        ) : null}
      </div>

      {navigation.length > 0 ? (
        <nav className="detail-v2-section-nav" aria-label="Перехід по розділах">
          <h2>Перехід по розділах</h2>
          <ol>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span aria-hidden="true">{String(item.number).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {subclasses.length > 0 ? (
        <section className="class-sidebar-subclasses" aria-labelledby="class-sidebar-subclasses-title">
          <h2 id="class-sidebar-subclasses-title">Підкласи</h2>
          <div className="class-sidebar-subclass-list" role="tablist" aria-label="Підкласи класу">
            {subclasses.map((subclass, index) => (
              <button
                key={`${subclass.name}-${index}`}
                type="button"
                role="tab"
                aria-selected={selectedSubclassIndex === index}
                className={selectedSubclassIndex === index ? 'class-sidebar-subclass class-sidebar-subclass--active' : 'class-sidebar-subclass'}
                onClick={() => onSelectSubclass?.(index)}
              >
                <span>{subclass.name}</span>
                {subclass.originalName ? <small>{subclass.originalName}</small> : null}
              </button>
            ))}
          </div>
        </section>
      ) : null}

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
