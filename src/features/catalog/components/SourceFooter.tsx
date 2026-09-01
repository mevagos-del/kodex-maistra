type SourceFooterProps = {
  id: string;
  title?: string | null;
};

export function SourceFooter({ id, title }: SourceFooterProps) {
  if (!title?.trim()) return null;
  return <footer id={id} className="codex-source-footer">Джерело: {title}</footer>;
}
