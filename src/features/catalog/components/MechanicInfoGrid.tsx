import type { ReferenceInfo } from '../api/detailReference';

type MechanicInfoGridProps = {
  items: ReferenceInfo[];
};

export function MechanicInfoGrid({ items }: MechanicInfoGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="detail-v2-stat-grid">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={item.value.length > 48 ? 'detail-v2-stat-cell detail-v2-stat-cell--wide' : 'detail-v2-stat-cell'}
        >
          <span className="detail-v2-stat-label">{item.label}</span>
          <strong className="detail-v2-stat-value">{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
