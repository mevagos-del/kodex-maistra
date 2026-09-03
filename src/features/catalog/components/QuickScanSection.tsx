import type { ReferenceCard } from '../api/detailReference';
import { createReferenceAnchors, referenceLevel } from '../utils/detailContent';
import { RuleText } from './RuleText';

type QuickScanSectionProps = {
  id: string;
  number: number;
  title: string;
  cards: ReferenceCard[];
  iconForCard: (title: string) => string;
  emptyMessage?: string;
  groupByLevel?: boolean;
  highlightedAnchor?: string | null;
};

export function QuickScanSection({ id, number, title, cards, iconForCard, emptyMessage, groupByLevel = false, highlightedAnchor }: QuickScanSectionProps) {
  if (cards.length === 0 && !emptyMessage) return null;

  const visibleCards = groupByLevel
    ? cards.filter((card) => Number.isFinite(Number.parseInt(referenceLevel(card), 10)))
    : cards;
  const anchoredCards = createReferenceAnchors(visibleCards);
  const groups = groupByLevel
    ? Array.from(anchoredCards.reduce((result, entry) => {
        const level = referenceLevel(entry.card);
        result.set(level, [...(result.get(level) ?? []), entry]);
        return result;
      }, new Map<string, typeof anchoredCards>()).entries()).sort(([left], [right]) => Number.parseInt(left, 10) - Number.parseInt(right, 10))
    : [['', anchoredCards] as const];

  return (
    <section id={id} className="detail-v2-panel codex-detail-section">
      <h2 className="codex-detail-title"><span>{number}.</span> {title}</h2>
      {visibleCards.length > 0 ? (
        <div className="codex-level-groups">
          {groups.map(([level, entries]) => <section className="codex-level-group" key={level || 'all'}>
            {groupByLevel ? <h3 className="codex-level-heading">{level} рівень</h3> : null}
            <div className="codex-rule-list">
          {entries.map(({ card, id: cardId }, index) => {
            const facts = card.rows.filter((row) => row.label !== 'Опис' && row.value !== card.description).slice(0, 3);
            const classNames = [
              'codex-rule-card',
              card.kind === 'subclass' ? 'codex-rule-card--subclass' : 'codex-rule-card--base',
              highlightedAnchor === cardId ? 'codex-rule-card--highlighted' : '',
            ].filter(Boolean).join(' ');
            return (
              <article id={cardId} className={classNames} key={cardId || `${card.title}-${index}`}>
                <span className="codex-rule-icon" aria-hidden="true">
                  <img className="codex-icon codex-icon--feature" src={iconForCard(card.title)} alt="" />
                </span>
                <div className="codex-rule-copy">
                  {card.kind === 'subclass' ? <small className="codex-rule-origin">Уміння підкласу · {card.subclassName}</small> : null}
                  <h3>{card.title}</h3>
                  {card.description ? <p><RuleText>{card.description}</RuleText></p> : null}
                  {facts.length > 0 ? (
                    <dl className="codex-rule-scan">
                      {facts.map((fact) => <div key={`${fact.label}-${fact.value}`}><dt>{fact.label}:</dt><dd><RuleText>{fact.value}</RuleText></dd></div>)}
                    </dl>
                  ) : null}
                  {card.options && card.options.length > 0 ? (
                    <details className="codex-rule-options">
                      <summary>Доступні варіанти</summary>
                      <div className="codex-rule-option-list">
                        {card.options.map((option) => (
                          <article className="codex-rule-option" key={option.anchorId ?? option.title}>
                            <h4>{option.title}</h4>
                            <p><RuleText>{option.description ?? 'Опис не вказано у доступному джерелі.'}</RuleText></p>
                            {option.rows.length > 0 ? (
                              <dl className="codex-rule-scan codex-rule-option-scan">
                                {option.rows.slice(0, 3).map((fact) => (
                                  <div key={`${fact.label}-${fact.value}`}>
                                    <dt>{fact.label}:</dt>
                                    <dd><RuleText>{fact.value}</RuleText></dd>
                                  </div>
                                ))}
                              </dl>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              </article>
            );
          })}
            </div>
          </section>)}
        </div>
      ) : <p className="codex-empty-note">{emptyMessage}</p>}
    </section>
  );
}
