import type { ReferenceInfo } from '../api/detailReference';

type MechanicInfoGridProps = {
  items: ReferenceInfo[];
};

export function MechanicInfoGrid({ items }: MechanicInfoGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="mechanic-info-grid">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="mechanic-info-item">
          <strong>{item.label}</strong>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
