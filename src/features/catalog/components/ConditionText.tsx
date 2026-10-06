import { Link } from 'react-router-dom';
import type { ConditionSlug } from '@/data/rules/conditions';
import { conditionLinkLabel, conditionTextMatches } from '@/data/rules/spellConditions';
import { RuleText } from './RuleText';

export function ConditionText({ children, slugs }: { children: string; slugs: readonly ConditionSlug[] }) {
  const matches = conditionTextMatches(children, slugs);
  let end = 0;
  const parts = matches.map(match => {
    const prefix = children.slice(end, match.index);
    end = match.index + match.text.length;
    return <span key={match.index}><RuleText>{prefix}</RuleText><Link to={`/conditions/${match.slug}`}>{conditionLinkLabel(match.slug, match.text)}</Link></span>;
  });
  return <>{parts}<RuleText>{children.slice(end)}</RuleText></>;
}
