type EmptyStateProps = {
  title?: string;
  description: string;
};

export function EmptyState({ title = 'Нічого не знайдено', description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
