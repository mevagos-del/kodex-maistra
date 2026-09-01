import type { ReactNode } from 'react';

type DetailLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
  variant?: 'race';
};

export function DetailLayout({ sidebar, children, variant }: DetailLayoutProps) {
  const variantClass = variant ? ` detail-v2-shell--${variant}` : '';

  return (
    <article className={`detail-v2-shell${variantClass}`}>
      {sidebar}
      <main className="detail-v2-main">{children}</main>
    </article>
  );
}
