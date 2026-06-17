import type { ReactNode } from 'react';

type DetailLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function DetailLayout({ sidebar, children }: DetailLayoutProps) {
  return (
    <article className="detail-v2-shell">
      {sidebar}
      <main className="detail-v2-main">{children}</main>
    </article>
  );
}
