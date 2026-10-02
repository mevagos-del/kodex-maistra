type LoadingIndicatorProps = {
  label: string;
  className?: string;
};

export function LoadingIndicator({ label, className = '' }: LoadingIndicatorProps) {
  return (
    <div className={`archive-loading-indicator${className ? ` ${className}` : ''}`} role="status" aria-live="polite">
      <span className="archive-loading-indicator__mark" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
