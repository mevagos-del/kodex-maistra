import { useState } from 'react';
import { conditionIcon, type ConditionSlug } from '@/data/rules/conditions';

export function ConditionIcon({ slug }: { slug: ConditionSlug }) {
  const [failedSrc, setFailedSrc] = useState('');
  const src = conditionIcon(slug);
  return <span className="condition-icon" aria-hidden="true">{failedSrc !== src && <img src={src} alt="" width="40" height="40" onError={() => setFailedSrc(src)} />}</span>;
}
