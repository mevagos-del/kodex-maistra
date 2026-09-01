import type { ReferenceInfo } from '../api/detailReference';
import { factIconForLabel } from '../utils/codexIcons';

type MechanicInfoGridProps = {
  items: ReferenceInfo[];
  variant?: 'race';
};

export function MechanicInfoGrid({ items, variant }: MechanicInfoGridProps) {
  if (items.length === 0) return null;

  return (
    <div className={variant === 'race' ? 'detail-v2-stat-grid race-fact-grid' : 'detail-v2-stat-grid'}>
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={[
            'detail-v2-stat-cell',
            variant === 'race' ? 'race-fact-card' : '',
            item.value.length > 48 ? 'detail-v2-stat-cell--wide race-fact-card--wide' : '',
          ].filter(Boolean).join(' ')}
        >
          {variant === 'race' ? (
            <span className="race-fact-icon" aria-hidden="true">
              <img className="codex-icon codex-icon--fact" src={factIconForLabel(item.label)} alt="" />
            </span>
          ) : null}
          <span className="race-fact-copy">
            <span className="detail-v2-stat-label race-fact-label">{item.label}</span>
            <strong className="detail-v2-stat-value race-fact-value">{item.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
