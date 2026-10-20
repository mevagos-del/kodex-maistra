import type {
  OfficialMonsterAction,
  OfficialMonsterDamageInstance,
  OfficialMonsterGear,
  OfficialMonsterLimitedUse,
  OfficialMonsterRecharge,
  OfficialMonsterSavingThrow,
  OfficialMonsterSpellReference,
  OfficialMonsterSpellcastingGroup,
} from '@/data/rules/types';

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

export function splitBestiaryDescription(value?: string) {
  return value
    ?.split(/\r?\n\s*\r?\n/u)
    .map(paragraph => paragraph.trim())
    .filter(Boolean) ?? [];
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

const abilityNames = {
  strength: 'Сила',
  dexterity: 'Спритність',
  constitution: 'Статура',
  intelligence: 'Інтелект',
  wisdom: 'Мудрість',
  charisma: 'Харизма',
} as const;

const usagePeriods: Record<OfficialMonsterLimitedUse['period'], string> = {
  day: 'день',
  turn: 'хід',
  round: 'раунд',
  'short-rest': 'короткий відпочинок',
  'long-rest': 'тривалий відпочинок',
  'short-or-long-rest': 'короткий або тривалий відпочинок',
};

const restNames = { short: 'короткого відпочинку', long: 'тривалого відпочинку', 'short-or-long': 'короткого або тривалого відпочинку' } as const;

export function formatMonsterRecharge(recharge?: OfficialMonsterRecharge) {
  if (!recharge) return null;
  if (recharge.kind === 'roll') {
    if (recharge.die < 2 || recharge.minimum < 1 || recharge.minimum > recharge.die) return null;
    const maximum = recharge.maximum ?? recharge.die;
    if (maximum < recharge.minimum || maximum > recharge.die) return null;
    return `Відновлення: ${recharge.minimum}${maximum === recharge.minimum ? '' : `–${maximum}`}`;
  }
  if (recharge.kind === 'rest') return `Відновлення: після ${restNames[recharge.rest]}`;
  return recharge.timing.trim() ? `Відновлення: ${recharge.timing.trim()}` : null;
}

export function formatMonsterLimitedUse(limitedUse?: OfficialMonsterLimitedUse) {
  if (!limitedUse || !Number.isInteger(limitedUse.uses) || limitedUse.uses < 1) return null;
  const each = limitedUse.each ? ' кожне' : '';
  const qualifier = limitedUse.qualifier?.trim() ? ` (${limitedUse.qualifier.trim()})` : '';
  return `Використання: ${limitedUse.uses}/${usagePeriods[limitedUse.period]}${each}${qualifier}`;
}

export function formatMonsterSavingThrow(savingThrow?: OfficialMonsterSavingThrow) {
  if (!savingThrow || !Number.isInteger(savingThrow.dc) || savingThrow.dc < 1) return null;
  return `Ряткидок: ${abilityNames[savingThrow.ability]}, СК ${savingThrow.dc}`;
}

export function formatMonsterSavingThrowOutcomes(savingThrow?: OfficialMonsterSavingThrow) {
  if (!savingThrow) return [];
  return [
    savingThrow.onFailure?.trim() ? `Провал: ${savingThrow.onFailure.trim()}` : null,
    savingThrow.onSuccess?.trim() ? `Успіх: ${savingThrow.onSuccess.trim()}` : null,
    savingThrow.repeat?.timing.trim() ? `Повторний ряткидок: ${savingThrow.repeat.timing.trim()}${savingThrow.repeat.endsEffectOnSuccess ? '; успіх завершує ефект' : ''}` : null,
  ].filter((value): value is string => Boolean(value));
}

export function normalizeMonsterDamageInstances(action: Pick<OfficialMonsterAction, 'damage' | 'damageType' | 'damageInstances'>) {
  const structured = action.damageInstances?.filter(instance => {
    const hasAmount = Number.isFinite(instance.average) || Boolean(instance.formula?.trim());
    return hasAmount && Boolean(instance.damageType.trim());
  }) ?? [];
  if (structured.length) return structured;
  if (!action.damage?.trim() || !action.damageType?.trim()) return [];
  const average = Number(action.damage.match(/^\s*(\d+)/u)?.[1]);
  return [{
    ...(Number.isFinite(average) ? { average } : {}),
    formula: extractDamageFormula(action.damage),
    damageType: action.damageType.trim(),
    application: 'on-hit' as const,
  }];
}

export function formatMonsterDamageInstance(instance: OfficialMonsterDamageInstance) {
  const formula = instance.formula?.trim() ? (parseDiceFormula(instance.formula)?.canonical ?? instance.formula.trim()) : '';
  const amount = formula || (Number.isFinite(instance.average) ? String(instance.average) : '');
  if (!amount || !instance.damageType.trim()) return null;
  const qualifier = instance.qualifier?.trim() ? ` (${instance.qualifier.trim()})` : '';
  return `${amount} ${instance.damageType.trim()} шкоди${qualifier}`;
}

export function formatMonsterActionScanFacts(action: Pick<OfficialMonsterAction, 'recharge' | 'limitedUse' | 'savingThrow' | 'legendaryActionCost'>) {
  return [
    formatMonsterRecharge(action.recharge),
    formatMonsterLimitedUse(action.limitedUse),
    formatMonsterSavingThrow(action.savingThrow),
    action.legendaryActionCost ? `Вартість: ${action.legendaryActionCost} ${action.legendaryActionCost === 1 ? 'легендарна дія' : 'легендарні дії'}` : null,
  ].filter((value): value is string => Boolean(value));
}

export function normalizeMonsterMechanicSteps(action: Pick<OfficialMonsterAction, 'mechanicSteps'>) {
  return [...(action.mechanicSteps ?? [])]
    .filter(step => step.id.trim() && Number.isInteger(step.order) && step.order >= 1 && step.text.trim())
    .sort((left, right) => left.order - right.order);
}

export function formatMonsterGear(gear: OfficialMonsterGear) {
  const quantity = gear.quantity && gear.quantity > 1 ? `${gear.quantity} × ` : '';
  const notes = gear.notes?.trim() ? ` — ${gear.notes.trim()}` : '';
  return `${quantity}${gear.nameUk.trim()}${notes}`;
}

export function formatMonsterSpellcastingGroupLabel(group: OfficialMonsterSpellcastingGroup) {
  if (group.label?.trim()) return group.label.trim();
  if (group.mode === 'at-will') return 'Без обмежень';
  if (group.mode === 'daily' && group.uses) return `${group.uses}/день${group.each ? ' кожне' : ''}`;
  if (group.mode === 'slots' && group.slotLevel && group.slots) return `${group.slots} комірки ${group.slotLevel}-го рівня`;
  if (group.mode === 'rest') return formatMonsterRecharge(group.recharge)?.replace(/^Відновлення:\s*/u, '') ?? 'Після відпочинку';
  return group.qualifier?.trim() || 'Особлива умова';
}

export function formatMonsterSpellReference(spell: OfficialMonsterSpellReference) {
  const qualifiers = [
    spell.castAtLevel ? `${spell.castAtLevel}-й рівень` : null,
    spell.concentration ? 'Концентрація' : null,
    spell.qualifier?.trim() || null,
  ].filter(Boolean);
  return qualifiers.length ? `${spell.nameUk} (${qualifiers.join('; ')})` : spell.nameUk;
}
