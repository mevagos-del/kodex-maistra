import type { ReferenceCard } from '../api/detailReference';

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
  'Використання': 'Тип',
  'Тип дії': 'Тип',
  'Вимога': 'Умова',
  'Обмеження': 'Умова',
  'Переваги': 'Перевага',
  'Переваги на ряткидки': 'Перевага',
  'Стійкості': 'Стійкість',
  'Стійкість до шкоди': 'Стійкість',
};

const visibleScanLabels = new Set([
  'Тип',
  'Дальність',
  'Умова',
  'Ряткидок',
  'Характеристика',
  'Перевага',
  'Стійкість',
  'Стан',
]);

const scanPriority: Record<string, number> = {
  'Тип': 1,
  'Дальність': 2,
  'Ряткидок': 3,
  'Характеристика': 4,
  'Перевага': 5,
  'Стійкість': 6,
  'Стан': 7,
  'Умова': 8,
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

    let value = normalizeText(row.value);
    if (row.label === 'Використання' && !/^(постійно|пасив)/i.test(value)) continue;

    const label = scanLabelMap[row.label] ?? row.label;
    if (!visibleScanLabels.has(label)) continue;
    if (label === 'Тип' && /^(постійно|пасив)/i.test(value)) value = 'Постійна риса';
    if (comparableText(value) === comparableText(ruleText)) continue;

    addFact(facts, seen, label, value);
  }

  const distance = ruleText.match(/\b\d+\s*фт\b/i)?.[0];
  if (distance) addFact(facts, seen, 'Дальність', distance);

  return facts
    .sort((left, right) => (scanPriority[left.label] ?? 99) - (scanPriority[right.label] ?? 99))
    .slice(0, 3);
}

function traitGlyph(title: string) {
  const normalized = title.toLowerCase();
  if (/темн|зір|баченн/.test(normalized)) return '◉';
  if (/отрут|стійк/.test(normalized)) return '⚗';
  if (/витрив|здоров|хіт/.test(normalized)) return '♥';
  if (/кам|підзем|ремес/.test(normalized)) return '◆';
  if (/фей|магі|заклин/.test(normalized)) return '✧';
  if (/мов|знан/.test(normalized)) return '⌘';
  return '✦';
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
            <article key={`${card.title}-${index}`} className="race-trait-card">
              <header className="race-trait-card__header">
                <div className="race-trait-card__mark race-trait-icon" aria-hidden="true">{traitGlyph(card.title)}</div>
                <h3>{card.title}</h3>
              </header>
              {ruleText ? <p className="race-trait-card__description">{ruleText}</p> : null}
              {scanLine.length > 0 ? (
                <dl className="race-trait-card__scan-line" aria-label="Короткі параметри риси">
                  {scanLine.map((fact) => (
                    <div key={`${fact.label}-${fact.value}`} className="race-trait-scan-fact">
                      <dt>{fact.label}:</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
