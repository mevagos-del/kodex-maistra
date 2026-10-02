import type { ReactNode } from 'react';
import { ArchiveAtmosphere } from './ArchiveAtmosphere';

type DetailLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
  variant?: 'race' | 'class' | 'item';
};

export function DetailLayout({ sidebar, children, variant }: DetailLayoutProps) {
  const variantClass = variant ? ` detail-v2-shell--${variant}` : '';

  const layout = (
    <article className={`detail-v2-shell${variantClass}`}>
      <header className="detail-v2-page-header">{sidebar}</header>
      <main className="detail-v2-main">{children}</main>
    </article>
  );

  if (variant) {
    return (
      <div className={`detail-codex-stage detail-codex-stage--${variant}${variant === 'race' ? ' race-detail-stage' : ''}`}>
        <ArchiveAtmosphere />
        {layout}
      </div>
    );
  }

  return layout;
}
