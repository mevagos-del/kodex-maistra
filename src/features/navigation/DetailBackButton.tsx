import { useNavigationContext } from './useNavigationContext';

export function DetailBackButton({ fallback, label = 'Назад' }: { fallback: string; label?: string }) {
  const { goBack } = useNavigationContext();
  return (
    <button type="button" className="detail-context-back" onClick={() => goBack(fallback)} aria-label={label}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
