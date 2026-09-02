import type { ReferenceCard } from '../api/detailReference';
import { traitIconForTitle } from '../utils/codexIcons';
import { RuleText } from './RuleText';

type RaceTraitSectionProps = {
  cards: ReferenceCard[];
  id: string;
  sectionNumber: number;
};

type TraitFact = {
  label: string;
  value: string;
};

const scanLabelMap: Record<string, string> = {
  'Тип дії': 'Дія',
  'Вимога': 'Умова',
  'Обмеження': 'Умова',
  'Переваги': 'Перевага',
  'Переваги на ряткидки': 'Перевага',
  'Стійкості': 'Стійкість',
  'Стійкість до шкоди': 'Стійкість',
};

const visibleScanLabels = new Set([
  'Тип',
  'Дія',
  'Використання',
  'Відновлення',
  'Тривалість',
  'Дальність',
  'Рівень',
  'Ефект',
  'Шкода',
  'Тип шкоди',
  'Умова',
  'Ряткидок',
  'Характеристика',
  'Перевага',
  'Стійкість',
  'Стан',
]);

const scanPriority: Record<string, number> = {
  'Тип': 1,
  'Рівень': 2,
  'Дія': 3,
  'Дальність': 4,
  'Тривалість': 5,
  'Використання': 6,
  'Відновлення': 7,
  'Ряткидок': 8,
  'Характеристика': 9,
  'Перевага': 10,
  'Стійкість': 11,
  'Шкода': 12,
  'Тип шкоди': 13,
  'Ефект': 14,
  'Стан': 15,
  'Умова': 16,
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

function addFact(facts: TraitFact[], seen: Set<string>, label: string, value: string) {
  const normalizedValue = normalizeText(value);
  const key = `${label}:${comparableText(normalizedValue)}`;
  if (!normalizedValue || seen.has(key)) return;
  seen.add(key);
  facts.push({ label, value: normalizedValue });
}

function traitScanLine(card: ReferenceCard, ruleText: string) {
  const facts: TraitFact[] = [];
  const seen = new Set<string>();

  for (const row of card.rows) {
    if (row.label === 'Механічний ефект' || row.label === 'Опис') continue;

    const value = normalizeText(row.value);
    const label = scanLabelMap[row.label] ?? row.label;
    if (!visibleScanLabels.has(label)) continue;
    if (comparableText(value) === comparableText(ruleText)) continue;

    addFact(facts, seen, label, value);
  }

  const distance = ruleText.match(/\b\d+\s*фт\b/i)?.[0];
  if (distance) addFact(facts, seen, 'Дальність', distance);

  return facts
    .sort((left, right) => (scanPriority[left.label] ?? 99) - (scanPriority[right.label] ?? 99))
    .slice(0, 3);
}

export function RaceTraitSection({ cards, id, sectionNumber }: RaceTraitSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section id={id} className="detail-v2-panel race-traits-panel race-detail-section">
      <h2 className="race-section-title"><span>{sectionNumber}.</span> Риси раси</h2>
      <div className="race-trait-list">
        {cards.map((card, index) => {
          const effect = card.rows.find((row) => row.label === 'Механічний ефект');
          const ruleText = normalizeText(effect?.value ?? card.description ?? '');
          const scanLine = traitScanLine(card, ruleText);

          return (
            <article id={card.anchorId} key={`${card.title}-${index}`} className="race-trait-card">
              <header className="race-trait-card__header">
                <div className="race-trait-card__mark race-trait-icon trait-icon-medallion" aria-hidden="true">
                  <img className="codex-icon codex-icon--trait" src={traitIconForTitle(card.title)} alt="" />
                </div>
                <h3>{card.title}</h3>
              </header>
              {ruleText ? <p className="race-trait-card__description"><RuleText>{ruleText}</RuleText></p> : null}
              {scanLine.length > 0 ? (
                <dl className="race-trait-card__scan-line" aria-label="Короткі параметри риси">
                  {scanLine.map((fact) => (
                    <div key={`${fact.label}-${fact.value}`} className="race-trait-scan-fact">
                      <dt>{fact.label}:</dt>
                      <dd><RuleText>{fact.value}</RuleText></dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {card.options && card.options.length > 0 ? (
                <details className="codex-rule-options">
                  <summary>Доступні варіанти <span>{card.options.length}</span></summary>
                  <div className="codex-rule-option-list">
                    {card.options.map((option) => (
                      <article className="codex-rule-option" key={option.anchorId ?? option.title}>
                        <h4>{option.title}</h4>
                        {option.description ? <p><RuleText>{option.description}</RuleText></p> : null}
                      </article>
                    ))}
                  </div>
                </details>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
