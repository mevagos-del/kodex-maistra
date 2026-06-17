import type { ReactNode } from 'react';

type DetailLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function DetailLayout({ sidebar, children }: DetailLayoutProps) {
  return (
    <article className="detail-layout">
      {sidebar}
      <div className="detail-main">{children}</div>
    </article>
  );
}
