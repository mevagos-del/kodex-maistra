export type ParsedDiceFormula = {
  count: number;
  sides: number;
  modifier: number;
  canonical: string;
  minimum: number;
  maximum: number;
};

const dicePattern = /^\s*(\d+)\s*[dкk]\s*(\d+)(?:\s*([+\-−])\s*(\d+))?\s*$/iu;

export function parseDiceFormula(value: string): ParsedDiceFormula | null {
  const match = value.match(dicePattern);
  if (!match) return null;

  const count = Number(match[1]);
  const sides = Number(match[2]);
  const modifierValue = Number(match[4] ?? 0);
  const modifier = match[3] === '-' || match[3] === '−' ? -modifierValue : modifierValue;
  if (!Number.isSafeInteger(count) || !Number.isSafeInteger(sides) || !Number.isSafeInteger(modifier)) return null;
  if (count < 1 || count > 100 || sides < 2 || sides > 1000 || Math.abs(modifier) > 10000) return null;

  const modifierText = modifier === 0 ? '' : ` ${modifier > 0 ? '+' : '−'} ${Math.abs(modifier)}`;
  return {
    count,
    sides,
    modifier,
    canonical: `${count}к${sides}${modifierText}`,
    minimum: count + modifier,
    maximum: count * sides + modifier,
  };
}

export function rollDiceFormula(value: string, random: () => number = Math.random) {
  const parsed = parseDiceFormula(value);
  if (!parsed) return null;

  let diceTotal = 0;
  for (let index = 0; index < parsed.count; index += 1) {
    const randomValue = random();
    if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) return null;
    diceTotal += Math.floor(randomValue * parsed.sides) + 1;
  }

  return { ...parsed, total: diceTotal + parsed.modifier };
}

export function extractDamageFormula(value: string) {
  const parenthetical = value.match(/\(([^)]+)\)/u)?.[1];
  const parsed = parseDiceFormula(parenthetical ?? value);
  return parsed?.canonical ?? value.trim();
}

export function formatDamageText(value: string) {
  return value.replace(/\d+\s*\((\d+\s*[dкk]\s*\d+(?:\s*[+\-−]\s*\d+)?)\)/giu, (match, formula: string) => {
    return parseDiceFormula(formula)?.canonical ?? match;
  });
}

export function splitBestiarySpeed(values: string[]) {
  const [base = '', ...additional] = values;
  const match = base.match(/^\s*(\d+)\s*фт\.?\s*$/iu);
  return {
    base,
    value: match?.[1] ?? base,
    unit: match ? 'фт.' : '',
    additional,
  };
}

const attackTypeLabels: Record<string, string> = {
  'ближня': 'Ближня атака зброєю',
  'далекобійна': 'Дальня атака зброєю',
  'ближня або далекобійна': 'Ближня або дальня атака зброєю',
};

function punctuateDistance(value: string) {
  return value.replace(/\s*фт\.?$/iu, ' фт.');
}

export function formatAttackMetadata(entry: {
  attackType?: string;
  attackBonus?: string;
  reach?: string;
  range?: string;
  target?: string;
}) {
  if (!entry.attackType) return entry.target ? `Ціль: ${entry.target}.` : null;

  const label = attackTypeLabels[entry.attackType] ?? `${entry.attackType} атака`;
  const facts = [
    entry.attackBonus ? `${entry.attackBonus} до влучання` : null,
    entry.reach ? `досяжність ${punctuateDistance(entry.reach)}` : null,
    entry.range ? `дальність ${punctuateDistance(entry.range)}` : null,
    entry.target,
  ].filter(Boolean);
  return facts.length ? `${label}: ${facts.join(', ')}.` : `${label}.`;
}
