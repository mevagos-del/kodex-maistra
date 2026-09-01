import type { ReferenceInfo } from '../api/detailReference';
import { classFactIconForLabel, factIconForLabel, itemFactIconForLabel } from '../utils/codexIcons';

type MechanicInfoGridProps = {
  items: ReferenceInfo[];
  variant?: 'race' | 'class' | 'item';
  itemType?: string | null;
  itemCategory?: string | null;
};

export function MechanicInfoGrid({ items, variant, itemType, itemCategory }: MechanicInfoGridProps) {
  if (items.length === 0) return null;

  return (
    <div className={`detail-v2-stat-grid${variant ? ` codex-fact-grid codex-fact-grid--${variant}` : ''}`}>
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={[
            'detail-v2-stat-cell',
            variant ? 'codex-fact-card' : '',
            variant === 'race' ? 'race-fact-card' : '',
            item.value.length > 48 ? 'detail-v2-stat-cell--wide codex-fact-card--wide race-fact-card--wide' : '',
          ].filter(Boolean).join(' ')}
        >
          {variant ? (
            <span className="race-fact-icon codex-fact-icon" aria-hidden="true">
              <img
                className="codex-icon codex-icon--fact"
                src={variant === 'race'
                  ? factIconForLabel(item.label)
                  : variant === 'class'
                    ? classFactIconForLabel(item.label, item.value)
                    : itemFactIconForLabel(item.label, itemType, itemCategory)}
                alt=""
              />
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
