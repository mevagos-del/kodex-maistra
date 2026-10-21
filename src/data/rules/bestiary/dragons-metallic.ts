import { SRD_52_SOURCE } from '../source';
import type {
  OfficialMonsterAction,
  OfficialMonsterAbility,
  OfficialMonsterEntry,
  OfficialMonsterRuleBlock,
  OfficialMonsterSpellReference,
  OfficialMonsterSpellcasting,
} from '../types';

type AbilityTuple = [number, string, string?];
type DragonInput = Omit<OfficialMonsterEntry, 'entity' | 'status' | 'source' | 'creatureType' | 'subtype'>;

const ability = ([score, modifier, save = modifier]: AbilityTuple): OfficialMonsterAbility => ({ score, modifier, save });
const abilities = (values: [AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple]) => ({
  strength: ability(values[0]),
  dexterity: ability(values[1]),
  constitution: ability(values[2]),
  intelligence: ability(values[3]),
  wisdom: ability(values[4]),
  charisma: ability(values[5]),
});
const trait = (
  id: string,
  nameUk: string,
  nameOriginal: string,
  sourceText: string,
  extra: Partial<OfficialMonsterRuleBlock> = {},
): OfficialMonsterRuleBlock => ({ id, nameUk, nameOriginal, sourceText, ...extra });
const action = (
  id: string,
  nameUk: string,
  nameOriginal: string,
  extra: Omit<OfficialMonsterAction, 'id' | 'nameUk' | 'nameOriginal'> = {},
): OfficialMonsterAction => ({ id, nameUk, nameOriginal, ...extra });
const spell = (nameUk: string, slug?: string, qualifier?: string, castAtLevel?: number): OfficialMonsterSpellReference => ({
  nameUk,
  ...(slug ? { slug } : {}),
  ...(qualifier ? { qualifier } : {}),
  ...(castAtLevel ? { castAtLevel } : {}),
});
const dragon = (input: DragonInput): OfficialMonsterEntry => {
  const spellSlugs = input.spellcasting?.groups.flatMap(group => group.spells.flatMap(entry => entry.slug ? [entry.slug] : [])) ?? [];
  const relationships = input.relationships || spellSlugs.length
    ? {
        ...input.relationships,
        ...(spellSlugs.length
          ? { spellSlugs: [...new Set([...(input.relationships?.spellSlugs ?? []), ...spellSlugs])] }
          : {}),
      }
    : undefined;
  return {
    entity: 'monster',
    status: 'official',
    source: SRD_52_SOURCE,
    creatureType: 'Дракон',
    subtype: 'металічний',
    ...input,
    relationships,
  };
};

const recharge56 = { kind: 'roll', die: 6, minimum: 5, maximum: 6 } as const;
const commonRules = ['initiative', 'attack-rolls', 'damage-rolls', 'saving-throws', 'difficulty-class', 'conditions'];
const adultRules = [...commonRules, 'temporary-hit-points', 'concentration'];
const legendaryUses = '3 (4 у лігві); витрачені використання відновлюються на початку кожного ходу дракона';
const damageGenitive: Record<string, string> = {
  'блискавична': 'блискавичної',
  'вогняна': 'вогняної',
  'громова': 'громової',
  'кислотна': 'кислотної',
  'колюча': 'колючої',
  'психічна': 'психічної',
  'рубальна': 'рубальної',
  'силова': 'силової',
  'холодна': 'холодної',
};

const amphibious = (slug: string) => trait(
  `${slug}-amphibious`,
  'Амфібія',
  'Amphibious',
  'Дракон може дихати повітрям і водою.',
);
const legendaryResistance = (slug: string, uses: 3 | 4) => trait(
  `${slug}-legendary-resistance`,
  'Легендарний опір',
  'Legendary Resistance',
  `Якщо дракон провалює ряткидок, він може натомість досягти успіху.`,
  { limitedUse: { uses, period: 'day', qualifier: `${uses + 1} разів на день у лігві` } },
);
const multiattack = (slug: string, text: string) => action(`${slug}-multiattack`, 'Мультиатака', 'Multiattack', { sourceText: text });
const rend = (
  slug: string,
  attackBonus: string,
  reach: string,
  damage: string,
  damageType: string,
  instances: NonNullable<OfficialMonsterAction['damageInstances']>,
) => action(`${slug}-rend`, 'Роздирання', 'Rend', {
  attackType: 'ближня',
  attackBonus,
  reach,
  target: 'одна ціль',
  damage,
  damageType,
  damageInstances: instances,
  sourceText: `Кидок ближньої атаки: ${attackBonus}, досяжність ${reach}. Влучання: ${instances.map(instance => `${instance.average}${instance.formula ? ` (${instance.formula})` : ''} ${damageGenitive[instance.damageType] ?? instance.damageType} шкоди`).join(' плюс ')}.`,
});
const damageBreath = (
  slug: string,
  nameUk: string,
  nameOriginal: string,
  abilityKey: 'dexterity' | 'constitution',
  abilityUk: string,
  dc: number,
  area: string,
  average: number,
  formula: string,
  damageType: string,
) => action(`${slug}-${nameOriginal.toLowerCase().replace(/\s+/g, '-')}`, nameUk, nameOriginal, {
  recharge: recharge56,
  target: `кожна істота в ${area}`,
  damage: `${average} (${formula})`,
  damageType,
  damageInstances: [{ average, formula, damageType, application: 'failed-save' }],
  savingThrow: { ability: abilityKey, dc, onFailure: `Повна ${damageType} шкода.`, onSuccess: 'Половина шкоди.' },
  sourceText: `Ряткидок ${abilityUk} СК ${dc}, кожна істота в ${area}. Провал: ${average} (${formula}) ${damageGenitive[damageType] ?? damageType} шкоди. Успіх: половина шкоди.`,
});
const spellcastingAction = (slug: string, saveDc: string, attackBonus?: string) => action(
  `${slug}-spellcasting`,
  'Чаклування',
  'Spellcasting',
  {
    sourceText: `Дракон накладає одне із заклять, наведених у блоці Чаклування, без Матеріальних компонентів, використовуючи Харизму як заклинальну характеристику (СК ряткидка заклять ${saveDc}${attackBonus ? `, ${attackBonus} до влучання атаками заклять` : ''}).`,
  },
);
const spellcasting = (
  saveDc: string,
  atWill: OfficialMonsterSpellReference[],
  daily: OfficialMonsterSpellReference[],
  attackBonus?: string,
): OfficialMonsterSpellcasting => ({
  ability: 'Харизма',
  saveDc,
  ...(attackBonus ? { attackBonus } : {}),
  notes: 'Матеріальні компоненти не потрібні.',
  groups: [
    { label: 'Без обмежень', mode: 'at-will', spells: atWill },
    { label: '1/день кожне', mode: 'daily', uses: 1, each: true, spells: daily },
  ],
});
const pounce = (slug: string) => action(`${slug}-pounce`, 'Наскок', 'Pounce', {
  legendaryActionCost: 1,
  sourceText: 'Дракон переміщується на відстань до половини своєї Швидкості й виконує одну атаку Роздирання.',
});

const sleepBreath = (slug: string, dc: number, area: string, duration: string) => action(
  `${slug}-sleep-breath`,
  'Сонне дихання',
  'Sleep Breath',
  {
    target: `кожна істота в ${area}`,
    savingThrow: {
      ability: 'constitution',
      dc,
      onFailure: 'Ціль стає Недієздатною до кінця свого наступного ходу, після чого повторює ряткидок.',
      repeat: { timing: 'наприкінці наступного ходу цілі' },
    },
    mechanicSteps: [
      { id: `${slug}-sleep-first-failure`, order: 1, label: 'Перший провал', text: 'Ціль має стан Недієздатний до кінця свого наступного ходу.', conditionSlugs: ['incapacitated'] },
      { id: `${slug}-sleep-repeat`, order: 2, label: 'Повторний ряткидок', text: 'Наприкінці свого наступного ходу ціль повторює ряткидок.' },
      { id: `${slug}-sleep-second-failure`, order: 3, label: 'Другий провал', text: `Ціль має стан Непритомний протягом ${duration}.`, conditionSlugs: ['unconscious'] },
      { id: `${slug}-sleep-end`, order: 4, label: 'Завершення', text: 'Ефект завершується для цілі, якщо вона отримує шкоду або істота в межах 5 футів використовує дію, щоб розбудити її.' },
    ],
    sourceText: `Ряткидок Статури СК ${dc}, кожна істота в ${area}. Провал: ціль має стан Недієздатний до кінця свого наступного ходу, після чого повторює ряткидок. Другий провал: ціль має стан Непритомний протягом ${duration}. Цей ефект завершується для цілі, якщо вона отримує шкоду або істота в межах 5 футів використовує дію, щоб розбудити її.`,
  },
);
const brassSpellcasting = (ancient: boolean): OfficialMonsterSpellcasting => spellcasting(
  ancient ? '20' : '16',
  [
    spell('Виявлення магії', 'detect-magic'),
    spell('Мала ілюзія', 'minor-illusion'),
    spell('Пекучий промінь', 'scorching-ray', ancient ? 'версія 3 рівня' : undefined, ancient ? 3 : undefined),
    spell('Зміна подоби', 'shapechange', 'лише форма Звіра або Гуманоїда; закляття не надає Тимчасових хітів і не потребує Концентрації чи Тимчасових хітів для підтримання'),
    spell('Розмова з тваринами', 'speak-with-animals'),
  ],
  ancient
    ? [spell('Керування погодою', 'control-weather'), spell('Виявлення думок', 'detect-thoughts')]
    : [spell('Виявлення думок', 'detect-thoughts'), spell('Керування погодою', 'control-weather')],
);
const blazingLight = (slug: string, ancient: boolean) => action(`${slug}-blazing-light`, 'Сяюче світло', 'Blazing Light', {
  legendaryActionCost: 1,
  sourceText: `Дракон використовує Чаклування, щоб накласти «Пекучий промінь»${ancient ? ' у версії 3 рівня' : ''}.`,
});
const scorchingSands = (slug: string, dc: number, range: number, average: number, formula: string) => action(
  `${slug}-scorching-sands`,
  'Пекучі піски',
  'Scorching Sands',
  {
    legendaryActionCost: 1,
    target: `одна видима драконом істота в межах ${range} фт`,
    damageInstances: [{ average, formula, damageType: 'вогняна', application: 'failed-save' }],
    savingThrow: { ability: 'dexterity', dc, onFailure: `Ціль отримує ${average} (${formula}) вогняної шкоди, і її Швидкість зменшується вдвічі до кінця її наступного ходу.` },
    sourceText: `Ряткидок Спритності СК ${dc}, одна видима драконом істота в межах ${range} футів. Провал: ${average} (${formula}) вогняної шкоди, і Швидкість цілі зменшується вдвічі до кінця її наступного ходу. Провал або успіх: дракон не може знову виконати цю дію до початку свого наступного ходу.`,
  },
);

const repulsionBreath = (slug: string, dc: number, distance: number) => action(`${slug}-repulsion-breath`, 'Відштовхувальне дихання', 'Repulsion Breath', {
  target: 'кожна істота в конусі 30 фт',
  savingThrow: { ability: 'strength', dc, onFailure: `Ціль відштовхується на відстань до ${distance} футів по прямій від дракона і має стан Збитий з ніг.` },
  mechanicSteps: [{ id: `${slug}-repulsion-failure`, order: 1, label: 'Провал', text: `Ціль відштовхується на відстань до ${distance} футів по прямій від дракона і має стан Збитий з ніг.`, conditionSlugs: ['prone'] }],
  sourceText: `Ряткидок Сили СК ${dc}, кожна істота в конусі 30 футів. Провал: ціль відштовхується на відстань до ${distance} футів по прямій від дракона і має стан Збитий з ніг.`,
});
const bronzeSpellcasting = (ancient: boolean): OfficialMonsterSpellcasting => spellcasting(
  ancient ? '22' : '17',
  [
    spell('Виявлення магії', 'detect-magic'),
    spell('Напутній промінь', 'guiding-bolt', 'версія 2 рівня', 2),
    spell('Зміна подоби', 'shapechange', 'лише форма Звіра або Гуманоїда; без Тимчасових хітів від закляття; для підтримання не потрібні Концентрація чи Тимчасові хіти'),
    spell('Розмова з тваринами', 'speak-with-animals'),
    spell('Чудотворство', 'thaumaturgy'),
  ],
  ancient
    ? [spell('Виявлення думок', 'detect-thoughts'), spell('Керування водою', 'control-water'), spell('Спостереження', 'scrying'), spell('Дихання під водою', 'water-breathing')]
    : [spell('Виявлення думок', 'detect-thoughts'), spell('Дихання під водою', 'water-breathing')],
  ancient ? '+14' : '+10',
);
const guidingLight = (slug: string, level: number) => action(`${slug}-guiding-light`, 'Напутнє світло', 'Guiding Light', { legendaryActionCost: 1, sourceText: `Дракон використовує Чаклування, щоб накласти «Напутній промінь» у версії ${level} рівня.` });
const thunderclap = (slug: string, dc: number, range: number, average: number, formula: string) => action(`${slug}-thunderclap`, 'Громовий удар', 'Thunderclap', {
  legendaryActionCost: 1,
  target: `кожна істота в сфері радіусом 20 фт з центром у видимій драконом точці в межах ${range} фт`,
  damageInstances: [{ average, formula, damageType: 'громова', application: 'failed-save' }],
  savingThrow: { ability: 'constitution', dc, onFailure: `Ціль отримує ${average} (${formula}) громової шкоди і має стан Оглухлий до кінця свого наступного ходу.` },
  sourceText: `Ряткидок Статури СК ${dc}, кожна істота в сфері радіусом 20 футів з центром у видимій драконом точці в межах ${range} футів. Провал: ${average} (${formula}) громової шкоди, і ціль має стан Оглухлий до кінця свого наступного ходу.`,
});

const slowingBreath = (slug: string, dc: number, area: string) => action(`${slug}-slowing-breath`, 'Сповільнювальне дихання', 'Slowing Breath', {
  target: `кожна істота в ${area}`,
  savingThrow: { ability: 'constitution', dc, onFailure: 'Ціль не може виконувати Реакції; її Швидкість зменшується вдвічі; у свій хід вона може виконати або дію, або Бонусну дію, але не обидві.' },
  sourceText: `Ряткидок Статури СК ${dc}, кожна істота в ${area}. Провал: ціль не може виконувати Реакції; її Швидкість зменшується вдвічі; у свій хід вона може виконати або дію, або Бонусну дію, але не обидві. Цей ефект триває до кінця наступного ходу цілі.`,
});
const copperSpellcasting = (ancient: boolean): OfficialMonsterSpellcasting => spellcasting(
  ancient ? '21' : '17',
  [spell('Виявлення магії', 'detect-magic'), spell('Ментальний шип', 'mind-spike', `версія ${ancient ? 5 : 4} рівня`, ancient ? 5 : 4), spell('Мала ілюзія', 'minor-illusion'), spell('Зміна подоби', 'shapechange', 'лише форма Звіра або Гуманоїда; без Тимчасових хітів від закляття; для підтримання не потрібні Концентрація чи Тимчасові хіти')],
  ancient ? [spell('Велике відновлення', 'greater-restoration'), spell('Великий образ', 'major-image'), spell('Проєкція образу', 'project-image')] : [spell('Велике відновлення', 'greater-restoration'), spell('Великий образ', 'major-image')],
);
const mindJolt = (slug: string, level: number) => action(`${slug}-mind-jolt`, 'Ментальний поштовх', 'Mind Jolt', { legendaryActionCost: 1, sourceText: `Дракон використовує Чаклування, щоб накласти «Ментальний шип» у версії ${level} рівня. Дракон не може знову виконати цю дію до початку свого наступного ходу.` });
const gigglingMagic = (slug: string, dc: number, range: number, average: number, formula: string, die: string) => action(`${slug}-giggling-magic`, 'Хихотлива магія', 'Giggling Magic', {
  legendaryActionCost: 1,
  target: `одна видима драконом істота в межах ${range} фт`,
  damageInstances: [{ average, formula, damageType: 'психічна', application: 'failed-save' }],
  savingThrow: { ability: 'charisma', dc, onFailure: `Ціль отримує ${average} (${formula}) психічної шкоди і до кінця свого наступного ходу віднімає ${die} від кожного свого тесту к20.` },
  sourceText: `Ряткидок Харизми СК ${dc}, одна видима драконом істота в межах ${range} футів. Провал: ${average} (${formula}) психічної шкоди. До кінця свого наступного ходу ціль кидає ${die} щоразу, коли виконує перевірку характеристики або кидок атаки, і віднімає випале число від тесту к20. Провал або успіх: дракон не може знову виконати цю дію до початку свого наступного ходу.`,
});

const weakeningBreath = (slug: string, dc: number, area: string, penaltyAverage: number, penaltyDie: string) => action(`${slug}-weakening-breath`, 'Послаблювальне дихання', 'Weakening Breath', {
  target: `кожна істота в ${area}, яка ще не перебуває під дією цього дихання`,
  savingThrow: { ability: 'strength', dc, onFailure: `Ціль має Перешкоду на пов’язані із Силою тести к20 і віднімає ${penaltyAverage} (${penaltyDie}) від своїх кидків шкоди.`, repeat: { timing: 'наприкінці кожного ходу цілі; автоматичний успіх через 1 хвилину', endsEffectOnSuccess: true } },
  sourceText: `Ряткидок Сили СК ${dc}, кожна істота в ${area}, яка ще не перебуває під дією цього дихання. Провал: ціль має Перешкоду на пов’язані із Силою тести к20 і віднімає ${penaltyAverage} (${penaltyDie}) від своїх кидків шкоди. Ціль повторює ряткидок наприкінці кожного свого ходу, завершуючи ефект для себе в разі успіху. Через 1 хвилину вона автоматично досягає успіху.`,
});
const goldSpellcasting = (ancient: boolean): OfficialMonsterSpellcasting => spellcasting(
  ancient ? '24' : '21',
  [spell('Виявлення магії', 'detect-magic'), spell('Напутній промінь', 'guiding-bolt', `версія ${ancient ? 4 : 2} рівня`, ancient ? 4 : 2), spell('Зміна подоби', 'shapechange', 'лише форма Звіра або Гуманоїда; без Тимчасових хітів від закляття; для підтримання не потрібні Концентрація чи Тимчасові хіти')],
  ancient ? [spell('Удар полум’я', 'flame-strike', 'версія 6 рівня', 6), spell('Слово повернення', 'word-of-recall'), spell('Зона правди', 'zone-of-truth')] : [spell('Удар полум’я', 'flame-strike'), spell('Зона правди', 'zone-of-truth')],
  ancient ? '+16' : '+13',
);
const banish = (slug: string, dc: number, average: number, formula: string) => action(`${slug}-banish`, 'Вигнання', 'Banish', {
  legendaryActionCost: 1,
  target: 'одна видима драконом істота в межах 120 фт',
  damageInstances: [{ average, formula, damageType: 'силова', application: 'failed-save' }],
  savingThrow: { ability: 'charisma', dc, onFailure: `Ціль отримує ${average} (${formula}) силової шкоди, має стан Недієздатний і переноситься до безпечного деміплану до початку наступного ходу дракона.` },
  mechanicSteps: [{ id: `${slug}-banish-return`, order: 1, label: 'Повернення', text: 'На початку наступного ходу дракона ціль знову з’являється у вільному просторі на вибір дракона в межах 120 футів від нього.' }],
  sourceText: `Ряткидок Харизми СК ${dc}, одна видима драконом істота в межах 120 футів. Провал: ${average} (${formula}) силової шкоди, ціль має стан Недієздатний і переноситься до безпечного деміплану до початку наступного ходу дракона, коли вона знову з’являється у вільному просторі на вибір дракона в межах 120 футів від нього. Провал або успіх: дракон не може знову виконати цю дію до початку свого наступного ходу.`,
});

const paralyzingBreath = (slug: string, dc: number, area: string) => action(`${slug}-paralyzing-breath`, 'Паралізуюче дихання', 'Paralyzing Breath', {
  target: `кожна істота в ${area}`,
  savingThrow: { ability: 'constitution', dc, onFailure: 'Після першого провалу ціль стає Недієздатною до кінця свого наступного ходу.', repeat: { timing: 'після першого провалу — наприкінці наступного ходу; після другого — наприкінці кожного ходу; автоматичний успіх через 1 хвилину', endsEffectOnSuccess: true } },
  mechanicSteps: [
    { id: `${slug}-paralyzing-first-failure`, order: 1, label: 'Перший провал', text: 'Ціль має стан Недієздатний до кінця свого наступного ходу, коли вона повторює ряткидок.', conditionSlugs: ['incapacitated'] },
    { id: `${slug}-paralyzing-second-failure`, order: 2, label: 'Другий провал', text: 'Ціль має стан Паралізований і повторює ряткидок наприкінці кожного свого ходу, завершуючи ефект для себе в разі успіху.', conditionSlugs: ['paralyzed'] },
    { id: `${slug}-paralyzing-minute`, order: 3, label: '1 хвилина', text: 'Через 1 хвилину ціль автоматично досягає успіху.' },
  ],
  sourceText: `Ряткидок Статури СК ${dc}, кожна істота в ${area}. Перший провал: ціль має стан Недієздатний до кінця свого наступного ходу, коли вона повторює ряткидок. Другий провал: ціль має стан Паралізований і повторює ряткидок наприкінці кожного свого ходу, завершуючи ефект для себе в разі успіху. Через 1 хвилину ціль автоматично досягає успіху.`,
});
const silverSpellcasting = (ancient: boolean): OfficialMonsterSpellcasting => spellcasting(
  ancient ? '23' : '19',
  [spell('Виявлення магії', 'detect-magic'), spell('Утримання чудовиська', 'hold-monster'), spell('Крижаний ніж', 'ice-knife', ancient ? 'версія 2 рівня' : undefined, ancient ? 2 : undefined), spell('Зміна подоби', 'shapechange', 'лише форма Звіра або Гуманоїда; без Тимчасових хітів від закляття; для підтримання не потрібні Концентрація чи Тимчасові хіти')],
  ancient ? [spell('Керування погодою', 'control-weather'), spell('Крижана буря', 'ice-storm', 'версія 7 рівня', 7), spell('Телепортація', 'teleport'), spell('Зона правди', 'zone-of-truth')] : [spell('Крижана буря', 'ice-storm', 'версія 5 рівня', 5), spell('Зона правди', 'zone-of-truth')],
  ancient ? '+15' : '+11',
);
const chill = (slug: string) => action(`${slug}-chill`, 'Холод', 'Chill', { legendaryActionCost: 1, sourceText: 'Дракон використовує Чаклування, щоб накласти «Утримання чудовиська». Дракон не може знову виконати цю дію до початку свого наступного ходу.' });
const coldGale = (slug: string, dc: number) => action(`${slug}-cold-gale`, 'Холодний шквал', 'Cold Gale', {
  legendaryActionCost: 1,
  target: 'кожна істота в лінії завдовжки 60 фт і завширшки 10 фт',
  damageInstances: [{ average: 14, formula: '4к6', damageType: 'холодна', application: 'failed-save' }],
  savingThrow: { ability: 'dexterity', dc, onFailure: 'Ціль отримує 14 (4к6) холодної шкоди і відштовхується на відстань до 30 футів по прямій від дракона.', onSuccess: 'Половина шкоди без відштовхування.' },
  sourceText: `Ряткидок Спритності СК ${dc}, кожна істота в лінії завдовжки 60 футів і завширшки 10 футів. Провал: 14 (4к6) холодної шкоди, і ціль відштовхується на відстань до 30 футів по прямій від дракона. Успіх: лише половина шкоди. Провал або успіх: дракон не може знову виконати цю дію до початку свого наступного ходу.`,
});

export const officialMetallicDragons: OfficialMonsterEntry[] = [
  dragon({
    slug: 'brass-dragon-wyrmling', nameUk: 'Малюк латунного дракона', nameOriginal: 'Brass Dragon Wyrmling', size: 'Середній', alignment: 'хаотично-добрий', armorClass: '15', hitPoints: '22', hitDice: '4к8 + 4', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'копання 15 фт', 'політ 60 фт'],
    abilities: abilities([[15, '+2'], [10, '+0', '+2'], [13, '+1'], [10, '+0'], [11, '+0', '+2'], [13, '+1']]), skills: { 'Сприйняття': '+4', 'Скритність': '+2' }, immunities: ['вогняна'], senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '1', experiencePoints: 200, proficiencyBonus: '+2',
    actions: [rend('brass-dragon-wyrmling', '+4', '5 фт', '7 (1к10 + 2)', 'рубальна', [{ average: 7, formula: '1к10 + 2', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('brass-dragon-wyrmling', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 11, 'лінії завдовжки 20 фт і завширшки 5 фт', 14, '4к6', 'вогняна'), sleepBreath('brass-dragon-wyrmling', 11, 'конусі 15 фт', '1 хвилини')],
    relationships: { conditionSlugs: ['incapacitated', 'unconscious'], ruleSlugs: commonRules }, sourcePage: 268,
  }),
  dragon({
    slug: 'young-brass-dragon', nameUk: 'Молодий латунний дракон', nameOriginal: 'Young Brass Dragon', size: 'Великий', alignment: 'хаотично-добрий', armorClass: '17', hitPoints: '110', hitDice: '13к10 + 39', initiative: { modifier: '+3', score: 13 }, speed: ['40 фт', 'копання 20 фт', 'політ 80 фт'],
    abilities: abilities([[19, '+4'], [10, '+0', '+3'], [17, '+3'], [12, '+1'], [11, '+0', '+3'], [15, '+2']]), skills: { 'Сприйняття': '+6', 'Переконання': '+5', 'Скритність': '+3' }, immunities: ['вогняна'], senses: ['Сліпозір 30 фт', 'Темний зір 120 фт'], passivePerception: 16, languages: ['Спільна', 'Драконяча'], challengeRating: '6', experiencePoints: 2300, proficiencyBonus: '+3',
    actions: [multiattack('young-brass-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити дві атаки одним використанням Сонного дихання.'), rend('young-brass-dragon', '+7', '10 фт', '15 (2к10 + 4)', 'рубальна', [{ average: 15, formula: '2к10 + 4', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('young-brass-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 14, 'лінії завдовжки 40 фт і завширшки 5 фт', 38, '11к6', 'вогняна'), sleepBreath('young-brass-dragon', 14, 'конусі 30 фт', '1 хвилини')],
    relationships: { conditionSlugs: ['incapacitated', 'unconscious'], ruleSlugs: commonRules }, sourcePage: 268,
  }),
  dragon({
    slug: 'adult-brass-dragon', nameUk: 'Дорослий латунний дракон', nameOriginal: 'Adult Brass Dragon', size: 'Велетенський', alignment: 'хаотично-добрий', armorClass: '18', hitPoints: '172', hitDice: '15к12 + 75', initiative: { modifier: '+10', score: 20 }, speed: ['40 фт', 'копання 30 фт', 'політ 80 фт'],
    abilities: abilities([[23, '+6'], [10, '+0', '+5'], [21, '+5'], [14, '+2'], [13, '+1', '+6'], [17, '+3']]), skills: { 'Історія': '+7', 'Сприйняття': '+11', 'Переконання': '+8', 'Скритність': '+5' }, immunities: ['вогняна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 21, languages: ['Спільна', 'Драконяча'], challengeRating: '13', experiencePoints: 10000, alternativeExperience: [{ experiencePoints: 11500, condition: 'у лігві' }], proficiencyBonus: '+5', traits: [legendaryResistance('adult-brass-dragon', 3)],
    actions: [multiattack('adult-brass-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Сонного дихання або Чаклуванням, щоб накласти «Пекучий промінь».'), rend('adult-brass-dragon', '+11', '10 фт', '17 (2к10 + 6) рубальної + 4 (1к8) вогняної', 'рубальна', [{ average: 17, formula: '2к10 + 6', damageType: 'рубальна', application: 'on-hit' }, { average: 4, formula: '1к8', damageType: 'вогняна', application: 'on-hit' }]), damageBreath('adult-brass-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 18, 'лінії завдовжки 60 фт і завширшки 5 фт', 45, '10к8', 'вогняна'), sleepBreath('adult-brass-dragon', 18, 'конусі 60 фт', '10 хвилин'), spellcastingAction('adult-brass-dragon', '16')], spellcasting: brassSpellcasting(false),
    legendaryActionUses: legendaryUses, legendaryActions: [blazingLight('adult-brass-dragon', false), pounce('adult-brass-dragon'), scorchingSands('adult-brass-dragon', 16, 120, 27, '6к8')], relationships: { conditionSlugs: ['incapacitated', 'unconscious'], ruleSlugs: adultRules }, sourcePage: 268,
  }),
  dragon({
    slug: 'ancient-brass-dragon', nameUk: 'Стародавній латунний дракон', nameOriginal: 'Ancient Brass Dragon', size: 'Колосальний', alignment: 'хаотично-добрий', armorClass: '20', hitPoints: '332', hitDice: '19к20 + 133', initiative: { modifier: '+12', score: 22 }, speed: ['40 фт', 'копання 40 фт', 'політ 80 фт'],
    abilities: abilities([[27, '+8'], [10, '+0', '+6'], [25, '+7'], [16, '+3'], [15, '+2', '+8'], [22, '+6']]), skills: { 'Історія': '+9', 'Сприйняття': '+14', 'Переконання': '+12', 'Скритність': '+6' }, immunities: ['вогняна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 24, languages: ['Спільна', 'Драконяча'], challengeRating: '20', experiencePoints: 25000, alternativeExperience: [{ experiencePoints: 33000, condition: 'у лігві' }], proficiencyBonus: '+6', traits: [legendaryResistance('ancient-brass-dragon', 4)],
    actions: [multiattack('ancient-brass-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Сонного дихання або Чаклуванням, щоб накласти «Пекучий промінь» у версії 3 рівня.'), rend('ancient-brass-dragon', '+14', '15 фт', '19 (2к10 + 8) рубальної + 7 (2к6) вогняної', 'рубальна', [{ average: 19, formula: '2к10 + 8', damageType: 'рубальна', application: 'on-hit' }, { average: 7, formula: '2к6', damageType: 'вогняна', application: 'on-hit' }]), damageBreath('ancient-brass-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 21, 'лінії завдовжки 90 фт і завширшки 5 фт', 58, '13к8', 'вогняна'), sleepBreath('ancient-brass-dragon', 21, 'конусі 90 фт', '10 хвилин'), spellcastingAction('ancient-brass-dragon', '20')], spellcasting: brassSpellcasting(true),
    legendaryActionUses: legendaryUses, legendaryActions: [blazingLight('ancient-brass-dragon', true), pounce('ancient-brass-dragon'), scorchingSands('ancient-brass-dragon', 20, 120, 36, '8к8')], relationships: { conditionSlugs: ['incapacitated', 'unconscious'], ruleSlugs: adultRules }, sourcePage: 269,
  }),
  dragon({
    slug: 'bronze-dragon-wyrmling', nameUk: 'Малюк бронзового дракона', nameOriginal: 'Bronze Dragon Wyrmling', size: 'Середній', alignment: 'законно-добрий', armorClass: '15', hitPoints: '39', hitDice: '6к8 + 12', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'політ 60 фт', 'плавання 30 фт'],
    abilities: abilities([[17, '+3'], [10, '+0', '+2'], [15, '+2'], [12, '+1'], [11, '+0', '+2'], [15, '+2']]), skills: { 'Сприйняття': '+4', 'Скритність': '+2' }, immunities: ['блискавична'], senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '2', experiencePoints: 450, proficiencyBonus: '+2', traits: [amphibious('bronze-dragon-wyrmling')],
    actions: [multiattack('bronze-dragon-wyrmling', 'Дракон виконує дві атаки Роздирання.'), rend('bronze-dragon-wyrmling', '+5', '5 фт', '8 (1к10 + 3)', 'рубальна', [{ average: 8, formula: '1к10 + 3', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('bronze-dragon-wyrmling', 'Блискавичне дихання', 'Lightning Breath', 'dexterity', 'Спритності', 12, 'лінії завдовжки 40 фт і завширшки 5 фт', 16, '3к10', 'блискавична'), repulsionBreath('bronze-dragon-wyrmling', 12, 30)], relationships: { conditionSlugs: ['prone'], ruleSlugs: commonRules }, sourcePage: 269,
  }),
  dragon({
    slug: 'young-bronze-dragon', nameUk: 'Молодий бронзовий дракон', nameOriginal: 'Young Bronze Dragon', size: 'Великий', alignment: 'законно-добрий', armorClass: '17', hitPoints: '142', hitDice: '15к10 + 60', initiative: { modifier: '+3', score: 13 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[21, '+5'], [10, '+0', '+3'], [19, '+4'], [14, '+2'], [13, '+1', '+4'], [17, '+3']]), skills: { 'Проникливість': '+4', 'Сприйняття': '+7', 'Скритність': '+3' }, immunities: ['блискавична'], senses: ['Сліпозір 30 фт', 'Темний зір 120 фт'], passivePerception: 17, languages: ['Спільна', 'Драконяча'], challengeRating: '8', experiencePoints: 3900, proficiencyBonus: '+3', traits: [amphibious('young-bronze-dragon')],
    actions: [multiattack('young-bronze-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Відштовхувального дихання.'), rend('young-bronze-dragon', '+8', '10 фт', '16 (2к10 + 5)', 'рубальна', [{ average: 16, formula: '2к10 + 5', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('young-bronze-dragon', 'Блискавичне дихання', 'Lightning Breath', 'dexterity', 'Спритності', 15, 'лінії завдовжки 60 фт і завширшки 5 фт', 49, '9к10', 'блискавична'), repulsionBreath('young-bronze-dragon', 15, 40)], relationships: { conditionSlugs: ['prone'], ruleSlugs: commonRules }, sourcePage: 270,
  }),
  dragon({
    slug: 'adult-bronze-dragon', nameUk: 'Дорослий бронзовий дракон', nameOriginal: 'Adult Bronze Dragon', size: 'Велетенський', alignment: 'законно-добрий', armorClass: '18', hitPoints: '212', hitDice: '17к12 + 102', initiative: { modifier: '+10', score: 20 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[25, '+7'], [10, '+0', '+5'], [23, '+6'], [16, '+3'], [15, '+2', '+7'], [20, '+5']]), skills: { 'Проникливість': '+7', 'Сприйняття': '+12', 'Скритність': '+5' }, immunities: ['блискавична'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 22, languages: ['Спільна', 'Драконяча'], challengeRating: '15', experiencePoints: 13000, alternativeExperience: [{ experiencePoints: 15000, condition: 'у лігві' }], proficiencyBonus: '+5', traits: [amphibious('adult-bronze-dragon'), legendaryResistance('adult-bronze-dragon', 3)],
    actions: [multiattack('adult-bronze-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Відштовхувального дихання або Чаклуванням, щоб накласти «Напутній промінь» у версії 2 рівня.'), rend('adult-bronze-dragon', '+12', '10 фт', '16 (2к8 + 7) рубальної + 5 (1к10) блискавичної', 'рубальна', [{ average: 16, formula: '2к8 + 7', damageType: 'рубальна', application: 'on-hit' }, { average: 5, formula: '1к10', damageType: 'блискавична', application: 'on-hit' }]), damageBreath('adult-bronze-dragon', 'Блискавичне дихання', 'Lightning Breath', 'dexterity', 'Спритності', 19, 'лінії завдовжки 90 фт і завширшки 5 фт', 55, '10к10', 'блискавична'), repulsionBreath('adult-bronze-dragon', 19, 60), spellcastingAction('adult-bronze-dragon', '17', '+10')], spellcasting: bronzeSpellcasting(false),
    legendaryActionUses: legendaryUses, legendaryActions: [guidingLight('adult-bronze-dragon', 2), pounce('adult-bronze-dragon'), thunderclap('adult-bronze-dragon', 17, 90, 10, '3к6')], relationships: { conditionSlugs: ['prone', 'deafened'], ruleSlugs: adultRules }, sourcePage: 270,
  }),
  dragon({
    slug: 'ancient-bronze-dragon', nameUk: 'Стародавній бронзовий дракон', nameOriginal: 'Ancient Bronze Dragon', size: 'Колосальний', alignment: 'законно-добрий', armorClass: '22', hitPoints: '444', hitDice: '24к20 + 192', initiative: { modifier: '+14', score: 24 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[29, '+9'], [10, '+0', '+7'], [27, '+8'], [18, '+4'], [17, '+3', '+10'], [25, '+7']]), skills: { 'Проникливість': '+10', 'Сприйняття': '+17', 'Скритність': '+7' }, immunities: ['блискавична'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 27, languages: ['Спільна', 'Драконяча'], challengeRating: '22', experiencePoints: 41000, alternativeExperience: [{ experiencePoints: 50000, condition: 'у лігві' }], proficiencyBonus: '+7', traits: [amphibious('ancient-bronze-dragon'), legendaryResistance('ancient-bronze-dragon', 4)],
    actions: [multiattack('ancient-bronze-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Відштовхувального дихання або Чаклуванням, щоб накласти «Напутній промінь» у версії 2 рівня.'), rend('ancient-bronze-dragon', '+16', '15 фт', '18 (2к8 + 9) рубальної + 9 (2к8) блискавичної', 'рубальна', [{ average: 18, formula: '2к8 + 9', damageType: 'рубальна', application: 'on-hit' }, { average: 9, formula: '2к8', damageType: 'блискавична', application: 'on-hit' }]), damageBreath('ancient-bronze-dragon', 'Блискавичне дихання', 'Lightning Breath', 'dexterity', 'Спритності', 23, 'лінії завдовжки 120 фт і завширшки 10 фт', 82, '15к10', 'блискавична'), repulsionBreath('ancient-bronze-dragon', 23, 60), spellcastingAction('ancient-bronze-dragon', '22', '+14')], spellcasting: bronzeSpellcasting(true),
    legendaryActionUses: legendaryUses, legendaryActions: [guidingLight('ancient-bronze-dragon', 2), pounce('ancient-bronze-dragon'), thunderclap('ancient-bronze-dragon', 22, 120, 13, '3к8')], relationships: { conditionSlugs: ['prone', 'deafened'], ruleSlugs: adultRules }, sourcePage: 271,
  }),
  dragon({
    slug: 'copper-dragon-wyrmling', nameUk: 'Малюк мідного дракона', nameOriginal: 'Copper Dragon Wyrmling', size: 'Середній', alignment: 'хаотично-добрий', armorClass: '16', hitPoints: '22', hitDice: '4к8 + 4', initiative: { modifier: '+3', score: 13 }, speed: ['30 фт', 'лазіння 30 фт', 'політ 60 фт'],
    abilities: abilities([[15, '+2'], [12, '+1', '+3'], [13, '+1'], [14, '+2'], [11, '+0', '+2'], [13, '+1']]), skills: { 'Сприйняття': '+4', 'Скритність': '+3' }, immunities: ['кислотна'], senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '1', experiencePoints: 200, proficiencyBonus: '+2',
    actions: [rend('copper-dragon-wyrmling', '+4', '5 фт', '7 (1к10 + 2)', 'рубальна', [{ average: 7, formula: '1к10 + 2', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('copper-dragon-wyrmling', 'Кислотне дихання', 'Acid Breath', 'dexterity', 'Спритності', 11, 'лінії завдовжки 20 фт і завширшки 5 фт', 18, '4к8', 'кислотна'), slowingBreath('copper-dragon-wyrmling', 11, 'конусі 15 фт')], relationships: { ruleSlugs: [...commonRules, 'reaction', 'bonus-action'] }, sourcePage: 275,
  }),
  dragon({
    slug: 'young-copper-dragon', nameUk: 'Молодий мідний дракон', nameOriginal: 'Young Copper Dragon', size: 'Великий', alignment: 'хаотично-добрий', armorClass: '17', hitPoints: '119', hitDice: '14к10 + 42', initiative: { modifier: '+4', score: 14 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[19, '+4'], [12, '+1', '+4'], [17, '+3'], [16, '+3'], [13, '+1', '+4'], [15, '+2']]), skills: { 'Обман': '+5', 'Сприйняття': '+7', 'Скритність': '+4' }, immunities: ['кислотна'], senses: ['Сліпозір 30 фт', 'Темний зір 120 фт'], passivePerception: 17, languages: ['Спільна', 'Драконяча'], challengeRating: '7', experiencePoints: 2900, proficiencyBonus: '+3',
    actions: [multiattack('young-copper-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Сповільнювального дихання.'), rend('young-copper-dragon', '+7', '10 фт', '15 (2к10 + 4)', 'рубальна', [{ average: 15, formula: '2к10 + 4', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('young-copper-dragon', 'Кислотне дихання', 'Acid Breath', 'dexterity', 'Спритності', 14, 'лінії завдовжки 40 фт і завширшки 5 фт', 40, '9к8', 'кислотна'), slowingBreath('young-copper-dragon', 14, 'конусі 30 фт')], relationships: { ruleSlugs: [...commonRules, 'reaction', 'bonus-action'] }, sourcePage: 276,
  }),
  dragon({
    slug: 'adult-copper-dragon', nameUk: 'Дорослий мідний дракон', nameOriginal: 'Adult Copper Dragon', size: 'Велетенський', alignment: 'хаотично-добрий', armorClass: '18', hitPoints: '184', hitDice: '16к12 + 80', initiative: { modifier: '+11', score: 21 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[23, '+6'], [12, '+1', '+6'], [21, '+5'], [18, '+4'], [15, '+2', '+7'], [18, '+4']]), skills: { 'Обман': '+9', 'Сприйняття': '+12', 'Скритність': '+6' }, immunities: ['кислотна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 22, languages: ['Спільна', 'Драконяча'], challengeRating: '14', experiencePoints: 11500, alternativeExperience: [{ experiencePoints: 13000, condition: 'у лігві' }], proficiencyBonus: '+5', traits: [legendaryResistance('adult-copper-dragon', 3)],
    actions: [multiattack('adult-copper-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Сповільнювального дихання або Чаклуванням, щоб накласти «Ментальний шип» у версії 4 рівня.'), rend('adult-copper-dragon', '+11', '10 фт', '17 (2к10 + 6) рубальної + 4 (1к8) кислотної', 'рубальна', [{ average: 17, formula: '2к10 + 6', damageType: 'рубальна', application: 'on-hit' }, { average: 4, formula: '1к8', damageType: 'кислотна', application: 'on-hit' }]), damageBreath('adult-copper-dragon', 'Кислотне дихання', 'Acid Breath', 'dexterity', 'Спритності', 18, 'лінії завдовжки 60 фт і завширшки 5 фт', 54, '12к8', 'кислотна'), slowingBreath('adult-copper-dragon', 18, 'конусі 60 фт'), spellcastingAction('adult-copper-dragon', '17')], spellcasting: copperSpellcasting(false),
    legendaryActionUses: legendaryUses, legendaryActions: [gigglingMagic('adult-copper-dragon', 17, 90, 24, '7к6', '1к6'), mindJolt('adult-copper-dragon', 4), pounce('adult-copper-dragon')], relationships: { ruleSlugs: [...adultRules, 'reaction', 'bonus-action'] }, sourcePage: 276,
  }),
  dragon({
    slug: 'ancient-copper-dragon', nameUk: 'Стародавній мідний дракон', nameOriginal: 'Ancient Copper Dragon', size: 'Колосальний', alignment: 'хаотично-добрий', armorClass: '21', hitPoints: '367', hitDice: '21к20 + 147', initiative: { modifier: '+15', score: 25 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[27, '+8'], [12, '+1', '+8'], [25, '+7'], [20, '+5'], [17, '+3', '+10'], [22, '+6']]), skills: { 'Обман': '+13', 'Сприйняття': '+17', 'Скритність': '+8' }, immunities: ['кислотна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 27, languages: ['Спільна', 'Драконяча'], challengeRating: '21', experiencePoints: 33000, alternativeExperience: [{ experiencePoints: 41000, condition: 'у лігві' }], proficiencyBonus: '+7', traits: [legendaryResistance('ancient-copper-dragon', 4)],
    actions: [multiattack('ancient-copper-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Сповільнювального дихання або Чаклуванням, щоб накласти «Ментальний шип» у версії 5 рівня.'), rend('ancient-copper-dragon', '+15', '15 фт', '19 (2к10 + 8) рубальної + 9 (2к8) кислотної', 'рубальна', [{ average: 19, formula: '2к10 + 8', damageType: 'рубальна', application: 'on-hit' }, { average: 9, formula: '2к8', damageType: 'кислотна', application: 'on-hit' }]), damageBreath('ancient-copper-dragon', 'Кислотне дихання', 'Acid Breath', 'dexterity', 'Спритності', 22, 'лінії завдовжки 90 фт і завширшки 10 фт', 63, '14к8', 'кислотна'), slowingBreath('ancient-copper-dragon', 22, 'конусі 90 фт'), spellcastingAction('ancient-copper-dragon', '21')], spellcasting: copperSpellcasting(true),
    legendaryActionUses: legendaryUses, legendaryActions: [gigglingMagic('ancient-copper-dragon', 21, 120, 31, '9к6', '1к8'), mindJolt('ancient-copper-dragon', 5), pounce('ancient-copper-dragon')], relationships: { ruleSlugs: [...adultRules, 'reaction', 'bonus-action'] }, sourcePage: 277,
  }),
  dragon({
    slug: 'gold-dragon-wyrmling', nameUk: 'Малюк золотого дракона', nameOriginal: 'Gold Dragon Wyrmling', size: 'Середній', alignment: 'законно-добрий', armorClass: '17', hitPoints: '60', hitDice: '8к8 + 24', initiative: { modifier: '+4', score: 14 }, speed: ['30 фт', 'політ 60 фт', 'плавання 30 фт'],
    abilities: abilities([[19, '+4'], [14, '+2', '+4'], [17, '+3'], [14, '+2'], [11, '+0', '+2'], [16, '+3']]), skills: { 'Сприйняття': '+4', 'Скритність': '+4' }, immunities: ['вогняна'], senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '3', experiencePoints: 700, proficiencyBonus: '+2', traits: [amphibious('gold-dragon-wyrmling')],
    actions: [multiattack('gold-dragon-wyrmling', 'Дракон виконує дві атаки Роздирання.'), rend('gold-dragon-wyrmling', '+6', '5 фт', '9 (1к10 + 4)', 'рубальна', [{ average: 9, formula: '1к10 + 4', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('gold-dragon-wyrmling', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 13, 'конусі 15 фт', 22, '4к10', 'вогняна'), weakeningBreath('gold-dragon-wyrmling', 13, 'конусі 15 фт', 2, '1к4')], relationships: { ruleSlugs: [...commonRules, 'disadvantage'] }, sourcePage: 290,
  }),
  dragon({
    slug: 'young-gold-dragon', nameUk: 'Молодий золотий дракон', nameOriginal: 'Young Gold Dragon', size: 'Великий', alignment: 'законно-добрий', armorClass: '18', hitPoints: '178', hitDice: '17к10 + 85', initiative: { modifier: '+6', score: 16 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[23, '+6'], [14, '+2', '+6'], [21, '+5'], [16, '+3'], [13, '+1', '+5'], [20, '+5']]), skills: { 'Проникливість': '+5', 'Сприйняття': '+9', 'Переконання': '+9', 'Скритність': '+6' }, immunities: ['вогняна'], senses: ['Сліпозір 30 фт', 'Темний зір 120 фт'], passivePerception: 19, languages: ['Спільна', 'Драконяча'], challengeRating: '10', experiencePoints: 5900, proficiencyBonus: '+4', traits: [amphibious('young-gold-dragon')],
    actions: [multiattack('young-gold-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Послаблювального дихання.'), rend('young-gold-dragon', '+10', '10 фт', '17 (2к10 + 6)', 'рубальна', [{ average: 17, formula: '2к10 + 6', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('young-gold-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 17, 'конусі 30 фт', 55, '10к10', 'вогняна'), weakeningBreath('young-gold-dragon', 17, 'конусі 30 фт', 3, '1к6')], relationships: { ruleSlugs: [...commonRules, 'disadvantage'] }, sourcePage: 291,
  }),
  dragon({
    slug: 'adult-gold-dragon', nameUk: 'Дорослий золотий дракон', nameOriginal: 'Adult Gold Dragon', size: 'Велетенський', alignment: 'законно-добрий', armorClass: '19', hitPoints: '243', hitDice: '18к12 + 126', initiative: { modifier: '+14', score: 24 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[27, '+8'], [14, '+2', '+8'], [25, '+7'], [16, '+3'], [15, '+2', '+8'], [24, '+7']]), skills: { 'Проникливість': '+8', 'Сприйняття': '+14', 'Переконання': '+13', 'Скритність': '+8' }, immunities: ['вогняна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 24, languages: ['Спільна', 'Драконяча'], challengeRating: '17', experiencePoints: 18000, alternativeExperience: [{ experiencePoints: 20000, condition: 'у лігві' }], proficiencyBonus: '+6', traits: [amphibious('adult-gold-dragon'), legendaryResistance('adult-gold-dragon', 3)],
    actions: [multiattack('adult-gold-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку Чаклуванням, щоб накласти «Напутній промінь» у версії 2 рівня, або використанням Послаблювального дихання.'), rend('adult-gold-dragon', '+14', '10 фт', '17 (2к8 + 8) рубальної + 4 (1к8) вогняної', 'рубальна', [{ average: 17, formula: '2к8 + 8', damageType: 'рубальна', application: 'on-hit' }, { average: 4, formula: '1к8', damageType: 'вогняна', application: 'on-hit' }]), damageBreath('adult-gold-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 21, 'конусі 60 фт', 66, '12к10', 'вогняна'), spellcastingAction('adult-gold-dragon', '21', '+13'), weakeningBreath('adult-gold-dragon', 21, 'конусі 60 фт', 3, '1к6')], spellcasting: goldSpellcasting(false),
    legendaryActionUses: legendaryUses, legendaryActions: [banish('adult-gold-dragon', 21, 10, '3к6'), guidingLight('adult-gold-dragon', 2), pounce('adult-gold-dragon')], relationships: { conditionSlugs: ['incapacitated'], ruleSlugs: [...adultRules, 'disadvantage'] }, sourcePage: 291,
  }),
  dragon({
    slug: 'ancient-gold-dragon', nameUk: 'Стародавній золотий дракон', nameOriginal: 'Ancient Gold Dragon', size: 'Колосальний', alignment: 'законно-добрий', armorClass: '22', hitPoints: '546', hitDice: '28к20 + 252', initiative: { modifier: '+16', score: 26 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[30, '+10'], [14, '+2', '+9'], [29, '+9'], [18, '+4'], [17, '+3', '+10'], [28, '+9']]), skills: { 'Проникливість': '+10', 'Сприйняття': '+17', 'Переконання': '+16', 'Скритність': '+9' }, immunities: ['вогняна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 27, languages: ['Спільна', 'Драконяча'], challengeRating: '24', experiencePoints: 62000, alternativeExperience: [{ experiencePoints: 75000, condition: 'у лігві' }], proficiencyBonus: '+7', traits: [amphibious('ancient-gold-dragon'), legendaryResistance('ancient-gold-dragon', 4)],
    actions: [multiattack('ancient-gold-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку Чаклуванням, щоб накласти «Напутній промінь» у версії 4 рівня, або використанням Послаблювального дихання.'), rend('ancient-gold-dragon', '+17', '15 фт', '19 (2к8 + 10) рубальної + 9 (2к8) вогняної', 'рубальна', [{ average: 19, formula: '2к8 + 10', damageType: 'рубальна', application: 'on-hit' }, { average: 9, formula: '2к8', damageType: 'вогняна', application: 'on-hit' }]), damageBreath('ancient-gold-dragon', 'Вогняне дихання', 'Fire Breath', 'dexterity', 'Спритності', 24, 'конусі 90 фт', 71, '13к10', 'вогняна'), spellcastingAction('ancient-gold-dragon', '24', '+16'), weakeningBreath('ancient-gold-dragon', 24, 'конусі 90 фт', 5, '1к10')], spellcasting: goldSpellcasting(true),
    legendaryActionUses: legendaryUses, legendaryActions: [banish('ancient-gold-dragon', 24, 24, '7к6'), guidingLight('ancient-gold-dragon', 4), pounce('ancient-gold-dragon')], relationships: { conditionSlugs: ['incapacitated'], ruleSlugs: [...adultRules, 'disadvantage'] }, sourcePage: 292,
  }),
  dragon({
    slug: 'silver-dragon-wyrmling', nameUk: 'Малюк срібного дракона', nameOriginal: 'Silver Dragon Wyrmling', size: 'Середній', alignment: 'законно-добрий', armorClass: '17', hitPoints: '45', hitDice: '6к8 + 18', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'політ 60 фт'],
    abilities: abilities([[19, '+4'], [10, '+0', '+2'], [17, '+3'], [12, '+1'], [11, '+0', '+2'], [15, '+2']]), skills: { 'Сприйняття': '+4', 'Скритність': '+2' }, immunities: ['холодна'], senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '2', experiencePoints: 450, proficiencyBonus: '+2',
    actions: [multiattack('silver-dragon-wyrmling', 'Дракон виконує дві атаки Роздирання.'), rend('silver-dragon-wyrmling', '+6', '5 фт', '9 (1к10 + 4)', 'колюча', [{ average: 9, formula: '1к10 + 4', damageType: 'колюча', application: 'on-hit' }]), damageBreath('silver-dragon-wyrmling', 'Холодне дихання', 'Cold Breath', 'constitution', 'Статури', 13, 'конусі 15 фт', 18, '4к8', 'холодна'), paralyzingBreath('silver-dragon-wyrmling', 13, 'конусі 15 фт')], relationships: { conditionSlugs: ['incapacitated', 'paralyzed'], ruleSlugs: commonRules }, sourcePage: 324,
  }),
  dragon({
    slug: 'young-silver-dragon', nameUk: 'Молодий срібний дракон', nameOriginal: 'Young Silver Dragon', size: 'Великий', alignment: 'законно-добрий', armorClass: '18', hitPoints: '168', hitDice: '16к10 + 80', initiative: { modifier: '+4', score: 14 }, speed: ['40 фт', 'політ 80 фт'],
    abilities: abilities([[23, '+6'], [10, '+0', '+4'], [21, '+5'], [14, '+2'], [11, '+0', '+4'], [19, '+4']]), skills: { 'Історія': '+6', 'Сприйняття': '+8', 'Скритність': '+4' }, immunities: ['холодна'], senses: ['Сліпозір 30 фт', 'Темний зір 120 фт'], passivePerception: 18, languages: ['Спільна', 'Драконяча'], challengeRating: '9', experiencePoints: 5000, proficiencyBonus: '+4',
    actions: [multiattack('young-silver-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Паралізуючого дихання.'), rend('young-silver-dragon', '+10', '10 фт', '15 (2к8 + 6)', 'рубальна', [{ average: 15, formula: '2к8 + 6', damageType: 'рубальна', application: 'on-hit' }]), damageBreath('young-silver-dragon', 'Холодне дихання', 'Cold Breath', 'constitution', 'Статури', 17, 'конусі 30 фт', 49, '11к8', 'холодна'), paralyzingBreath('young-silver-dragon', 17, 'конусі 30 фт')], relationships: { conditionSlugs: ['incapacitated', 'paralyzed'], ruleSlugs: commonRules }, sourcePage: 324,
  }),
  dragon({
    slug: 'adult-silver-dragon', nameUk: 'Дорослий срібний дракон', nameOriginal: 'Adult Silver Dragon', size: 'Велетенський', alignment: 'законно-добрий', armorClass: '19', hitPoints: '216', hitDice: '16к12 + 112', initiative: { modifier: '+10', score: 20 }, speed: ['40 фт', 'політ 80 фт'],
    abilities: abilities([[27, '+8'], [10, '+0', '+5'], [25, '+7'], [16, '+3'], [13, '+1', '+6'], [22, '+6']]), skills: { 'Історія': '+8', 'Сприйняття': '+11', 'Скритність': '+5' }, immunities: ['холодна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 21, languages: ['Спільна', 'Драконяча'], challengeRating: '16', experiencePoints: 15000, alternativeExperience: [{ experiencePoints: 18000, condition: 'у лігві' }], proficiencyBonus: '+5', traits: [legendaryResistance('adult-silver-dragon', 3)],
    actions: [multiattack('adult-silver-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Паралізуючого дихання або Чаклуванням, щоб накласти «Крижаний ніж».'), rend('adult-silver-dragon', '+13', '10 фт', '17 (2к8 + 8) рубальної + 4 (1к8) холодної', 'рубальна', [{ average: 17, formula: '2к8 + 8', damageType: 'рубальна', application: 'on-hit' }, { average: 4, formula: '1к8', damageType: 'холодна', application: 'on-hit' }]), damageBreath('adult-silver-dragon', 'Холодне дихання', 'Cold Breath', 'constitution', 'Статури', 20, 'конусі 60 фт', 54, '12к8', 'холодна'), paralyzingBreath('adult-silver-dragon', 20, 'конусі 60 фт'), spellcastingAction('adult-silver-dragon', '19', '+11')], spellcasting: silverSpellcasting(false),
    legendaryActionUses: legendaryUses, legendaryActions: [chill('adult-silver-dragon'), coldGale('adult-silver-dragon', 19), pounce('adult-silver-dragon')], relationships: { conditionSlugs: ['incapacitated', 'paralyzed'], ruleSlugs: adultRules }, sourcePage: 324,
  }),
  dragon({
    slug: 'ancient-silver-dragon', nameUk: 'Стародавній срібний дракон', nameOriginal: 'Ancient Silver Dragon', size: 'Колосальний', alignment: 'законно-добрий', armorClass: '22', hitPoints: '468', hitDice: '24к20 + 216', initiative: { modifier: '+14', score: 24 }, speed: ['40 фт', 'політ 80 фт'],
    abilities: abilities([[30, '+10'], [10, '+0', '+7'], [29, '+9'], [18, '+4'], [15, '+2', '+9'], [26, '+8']]), skills: { 'Історія': '+11', 'Сприйняття': '+16', 'Скритність': '+7' }, immunities: ['холодна'], senses: ['Сліпозір 60 фт', 'Темний зір 120 фт'], passivePerception: 26, languages: ['Спільна', 'Драконяча'], challengeRating: '23', experiencePoints: 50000, alternativeExperience: [{ experiencePoints: 62000, condition: 'у лігві' }], proficiencyBonus: '+7', traits: [legendaryResistance('ancient-silver-dragon', 4)],
    actions: [multiattack('ancient-silver-dragon', 'Дракон виконує три атаки Роздирання. Він може замінити одну атаку використанням Паралізуючого дихання або Чаклуванням, щоб накласти «Крижаний ніж» у версії 2 рівня.'), rend('ancient-silver-dragon', '+17', '15 фт', '19 (2к8 + 10) рубальної + 9 (2к8) холодної', 'рубальна', [{ average: 19, formula: '2к8 + 10', damageType: 'рубальна', application: 'on-hit' }, { average: 9, formula: '2к8', damageType: 'холодна', application: 'on-hit' }]), damageBreath('ancient-silver-dragon', 'Холодне дихання', 'Cold Breath', 'constitution', 'Статури', 24, 'конусі 90 фт', 67, '15к8', 'холодна'), paralyzingBreath('ancient-silver-dragon', 24, 'конусі 90 фт'), spellcastingAction('ancient-silver-dragon', '23', '+15')], spellcasting: silverSpellcasting(true),
    legendaryActionUses: legendaryUses, legendaryActions: [chill('ancient-silver-dragon'), coldGale('ancient-silver-dragon', 23), pounce('ancient-silver-dragon')], relationships: { conditionSlugs: ['incapacitated', 'paralyzed'], ruleSlugs: adultRules }, sourcePage: 325,
  }),
];
