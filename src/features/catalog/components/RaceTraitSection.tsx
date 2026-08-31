import type { ReferenceCard } from '../api/detailReference';

type RaceTraitSectionProps = {
  cards: ReferenceCard[];
};

const hiddenDetailLabels = new Set(['Механічний ефект', 'Опис']);

const detailLabelMap: Record<string, string> = {
  'Використання': 'Тип',
  'Тип дії': 'Тип',
  'Вимога': 'Умова',
  'Обмеження': 'Умова',
  'Переваги': 'Перевага',
  'Переваги на ряткидки': 'Перевага',
  'Стійкості': 'Стійкість',
};

function normalizeText(value: string) {
  return value
    .replace(/\b(feet|foot|ft\.?)\b/gi, 'фт')
    .replace(/(\d+)\s+фут(?:ів|и|а)?/gi, '$1 фт')
    .trim();
}

function comparableText(value: string) {
  return normalizeText(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function traitDetails(card: ReferenceCard, ruleText?: string) {
  const seen = new Set<string>();
  const ruleComparable = ruleText ? comparableText(ruleText) : '';

  return card.rows.flatMap((row) => {
    if (hiddenDetailLabels.has(row.label)) return [];

    let value = normalizeText(row.value);
    if (row.label === 'Використання' && !/^постійно|пасив/i.test(value)) return [];

    const label = detailLabelMap[row.label] ?? row.label;
    if (label === 'Тип' && /^постійно|пасив/i.test(value)) value = 'Постійна риса';
    if (!value || comparableText(value) === ruleComparable) return [];

    const key = `${label}:${comparableText(value)}`;
    if (seen.has(key)) return [];
    seen.add(key);

    return [{ label, value }];
  });
}

export function RaceTraitSection({ cards }: RaceTraitSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section className="detail-v2-panel race-traits-panel">
      <h2>Риси раси</h2>
      <div className="race-trait-list">
        {cards.map((card, index) => {
          const effect = card.rows.find((row) => row.label === 'Механічний ефект');
          const ruleText = normalizeText(effect?.value ?? card.description ?? '');
          const details = traitDetails(card, ruleText);

          return (
            <article key={`${card.title}-${index}`} className="race-trait-card">
              <header className="race-trait-card__header">
                <div className="race-trait-card__mark" aria-hidden="true">✦</div>
                <h3>{card.title}</h3>
              </header>
              {ruleText ? <p className="race-trait-card__description">{ruleText}</p> : null}
              {details.length > 0 ? (
                <div className="race-trait-card__details">
                  <strong className="race-trait-card__details-title">Деталі</strong>
                  <dl className="race-trait-card__details-grid">
                    {details.map((row) => (
                      <div key={`${row.label}-${row.value}`} className="race-trait-detail-row">
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
