import { SRD_52_SOURCE } from '../source';
import type {
  OfficialMonsterAction,
  OfficialMonsterAbility,
  OfficialMonsterEntry,
  OfficialMonsterRuleBlock,
} from '../types';

type AbilityTuple = [number, string, string?];
type DragonInput = Omit<OfficialMonsterEntry, 'entity' | 'status' | 'source' | 'creatureType'>;

const ability = ([score, modifier, save = modifier]: AbilityTuple): OfficialMonsterAbility => ({
  score,
  modifier,
  save,
});

const abilities = (
  values: [AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple],
) => ({
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

const dragon = (input: DragonInput): OfficialMonsterEntry => ({
  entity: 'monster',
  status: 'official',
  source: SRD_52_SOURCE,
  creatureType: 'Дракон',
  ...input,
});

const recharge56 = { kind: 'roll', die: 6, minimum: 5, maximum: 6 } as const;
const commonCombatRules = ['initiative', 'attack-rolls', 'damage-rolls', 'damage-types'];

export const officialOtherDragons: OfficialMonsterEntry[] = [
  dragon({
    slug: 'dragon-turtle',
    nameUk: 'Драконяча черепаха',
    nameOriginal: 'Dragon Turtle',
    size: 'Колосальний',
    alignment: 'нейтральний',
    armorClass: '20',
    hitPoints: '356',
    hitDice: '23к20 + 115',
    initiative: { modifier: '+6', score: 16 },
    speed: ['20 фт', 'плавання 50 фт'],
    abilities: abilities([
      [25, '+7'],
      [10, '+0'],
      [20, '+5', '+11'],
      [10, '+0'],
      [12, '+1', '+7'],
      [12, '+1'],
    ]),
    resistances: ['вогняна'],
    senses: ['Темний зір 120 фт'],
    passivePerception: 11,
    languages: ['Драконяча', 'Первісна (Акван)'],
    challengeRating: '17',
    experiencePoints: 18000,
    proficiencyBonus: '+6',
    traits: [
      trait(
        'dragon-turtle-amphibious',
        'Амфібія',
        'Amphibious',
        'Драконяча черепаха може дихати повітрям і водою.',
      ),
    ],
    actions: [
      action('dragon-turtle-multiattack', 'Мультиатака', 'Multiattack', {
        sourceText:
          'Драконяча черепаха виконує три атаки Укусом. Вона може замінити одну атаку атакою Хвостом.',
      }),
      action('dragon-turtle-bite', 'Укус', 'Bite', {
        attackType: 'ближня',
        attackBonus: '+13',
        reach: '15 фт',
        target: 'одна ціль',
        damage: '23 (3к10 + 7) + 7 (2к6)',
        damageType: 'колюча',
        damageInstances: [
          { average: 23, formula: '3к10 + 7', damageType: 'колюча', application: 'on-hit' },
          {
            average: 7,
            formula: '2к6',
            damageType: 'вогняна',
            application: 'on-hit',
            qualifier: 'перебування під водою не надає Стійкості до цієї шкоди',
          },
        ],
        sourceText:
          'Кидок ближньої атаки: +13, досяжність 15 фт. Влучання: 23 (3к10 + 7) колючої шкоди плюс 7 (2к6) вогняної шкоди. Перебування під водою не надає Стійкості до цієї вогняної шкоди.',
      }),
      action('dragon-turtle-tail', 'Хвіст', 'Tail', {
        attackType: 'ближня',
        attackBonus: '+13',
        reach: '15 фт',
        target: 'одна ціль',
        damage: '18 (2к10 + 7)',
        damageType: 'дробильна',
        damageInstances: [
          { average: 18, formula: '2к10 + 7', damageType: 'дробильна', application: 'on-hit' },
        ],
        sourceText:
          'Кидок ближньої атаки: +13, досяжність 15 фт. Влучання: 18 (2к10 + 7) дробильної шкоди. Якщо ціль має Величезний або менший розмір, вона отримує стан Збитий з ніг.',
      }),
      action('dragon-turtle-steam-breath', 'Паровий подих', 'Steam Breath', {
        target: 'кожна істота в 60-футовому конусі',
        recharge: recharge56,
        damage: '56 (16к6)',
        damageType: 'вогняна',
        damageInstances: [
          {
            average: 56,
            formula: '16к6',
            damageType: 'вогняна',
            application: 'failed-save',
            qualifier: 'перебування під водою не надає Стійкості до цієї шкоди',
          },
        ],
        savingThrow: {
          ability: 'constitution',
          dc: 19,
          onFailure: '56 (16к6) вогняної шкоди.',
          onSuccess: 'Половина шкоди.',
        },
        sourceText:
          'Перезарядка 5–6. Ряткидок Статури СК 19 виконує кожна істота в 60-футовому конусі. Провал: 56 (16к6) вогняної шкоди. Успіх: половина шкоди. Незалежно від результату перебування під водою не надає Стійкості до цієї вогняної шкоди.',
      }),
    ],
    relationships: {
      conditionSlugs: ['prone'],
      ruleSlugs: [...commonCombatRules, 'saving-throws', 'difficulty-class', 'conditions'],
    },
    sourcePage: 281,
  }),
  dragon({
    slug: 'half-dragon',
    nameUk: 'Напівдракон',
    nameOriginal: 'Half-Dragon',
    size: 'Середній',
    alignment: 'нейтральний',
    armorClass: '18',
    hitPoints: '105',
    hitDice: '14к8 + 42',
    initiative: { modifier: '+5', score: 15 },
    speed: ['40 фт'],
    abilities: abilities([
      [19, '+4'],
      [14, '+2', '+5'],
      [16, '+3'],
      [10, '+0'],
      [15, '+2', '+5'],
      [14, '+2'],
    ]),
    skills: { Атлетика: '+7', Сприйняття: '+5', Скритність: '+5' },
    resistances: ['тип шкоди, обраний для риси «Драконяче походження»'],
    senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'],
    passivePerception: 15,
    languages: ['Спільна', 'Драконяча'],
    challengeRating: '5',
    experiencePoints: 1800,
    proficiencyBonus: '+3',
    traits: [
      trait(
        'half-dragon-draconic-origin',
        'Драконяче походження',
        'Draconic Origin',
        'Напівдракон споріднений із типом дракона, пов’язаним з одним із таких типів шкоди (на вибір Майстра): кислотна, холодна, вогняна, блискавична або отруйна. Цей вибір впливає на інші елементи блока параметрів.',
      ),
    ],
    actions: [
      action('half-dragon-multiattack', 'Мультиатака', 'Multiattack', {
        sourceText: 'Напівдракон виконує дві атаки Кігтем.',
      }),
      action('half-dragon-claw', 'Кіготь', 'Claw', {
        attackType: 'ближня',
        attackBonus: '+7',
        reach: '10 фт',
        target: 'одна ціль',
        damage: '6 (1к4 + 4) + 7 (2к6)',
        damageType: 'рубальна',
        damageInstances: [
          { average: 6, formula: '1к4 + 4', damageType: 'рубальна', application: 'on-hit' },
          {
            average: 7,
            formula: '2к6',
            damageType: 'тип, обраний для риси «Драконяче походження»',
            application: 'on-hit',
          },
        ],
        sourceText:
          'Кидок ближньої атаки: +7, досяжність 10 фт. Влучання: 6 (1к4 + 4) рубальної шкоди плюс 7 (2к6) шкоди типу, обраного для риси «Драконяче походження».',
      }),
      action('half-dragon-dragons-breath', 'Драконів подих', 'Dragon’s Breath', {
        target: 'кожна істота в 30-футовому конусі',
        recharge: recharge56,
        damage: '28 (8к6)',
        damageType: 'тип, обраний для риси «Драконяче походження»',
        damageInstances: [
          {
            average: 28,
            formula: '8к6',
            damageType: 'тип, обраний для риси «Драконяче походження»',
            application: 'failed-save',
          },
        ],
        savingThrow: {
          ability: 'dexterity',
          dc: 14,
          onFailure: '28 (8к6) шкоди типу, обраного для риси «Драконяче походження».',
          onSuccess: 'Половина шкоди.',
        },
        sourceText:
          'Перезарядка 5–6. Ряткидок Спритності СК 14 виконує кожна істота в 30-футовому конусі. Провал: 28 (8к6) шкоди типу, обраного для риси «Драконяче походження». Успіх: половина шкоди.',
      }),
    ],
    bonusActions: [
      action('half-dragon-leap', 'Стрибок', 'Leap', {
        sourceText: 'Напівдракон стрибає на відстань до 30 футів, витрачаючи 10 футів переміщення.',
      }),
    ],
    relationships: {
      ruleSlugs: [...commonCombatRules, 'saving-throws', 'difficulty-class', 'bonus-action'],
    },
    sourcePage: 297,
  }),
  dragon({
    slug: 'kobold-warrior',
    nameUk: 'Кобольд-воїн',
    nameOriginal: 'Kobold Warrior',
    size: 'Малий',
    alignment: 'нейтральний',
    armorClass: '14',
    hitPoints: '7',
    hitDice: '3к6 − 3',
    initiative: { modifier: '+2', score: 12 },
    gear: [{ nameUk: 'Кинджал', quantity: 3, itemSlug: 'dagger' }],
    speed: ['30 фт'],
    abilities: abilities([
      [7, '−2'],
      [15, '+2'],
      [9, '−1'],
      [8, '−1'],
      [7, '−2'],
      [8, '−1'],
    ]),
    senses: ['Темний зір 60 фт'],
    passivePerception: 8,
    languages: ['Спільна', 'Драконяча'],
    challengeRating: '1/8',
    experiencePoints: 25,
    proficiencyBonus: '+2',
    traits: [
      trait(
        'kobold-warrior-pack-tactics',
        'Зграйна тактика',
        'Pack Tactics',
        'Кобольд має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник кобольда перебуває в межах 5 футів від цієї істоти й цей союзник не має стану Недієздатний.',
      ),
      trait(
        'kobold-warrior-sunlight-sensitivity',
        'Чутливість до сонячного світла',
        'Sunlight Sensitivity',
        'Перебуваючи на сонячному світлі, кобольд має Перешкоду на перевірки характеристик і кидки атаки.',
      ),
    ],
    actions: [
      action('kobold-warrior-dagger', 'Кинджал', 'Dagger', {
        attackType: 'ближня або далекобійна',
        attackBonus: '+4',
        reach: '5 фт',
        range: '20/60 фт',
        target: 'одна ціль',
        damage: '4 (1к4 + 2)',
        damageType: 'колюча',
        damageInstances: [
          { average: 4, formula: '1к4 + 2', damageType: 'колюча', application: 'on-hit' },
        ],
        sourceText:
          'Кидок ближньої або далекобійної атаки: +4, досяжність 5 фт або дистанція 20/60 фт. Влучання: 4 (1к4 + 2) колючої шкоди.',
      }),
    ],
    relationships: {
      conditionSlugs: ['incapacitated'],
      itemSlugs: ['dagger'],
      ruleSlugs: [...commonCombatRules, 'ability-checks', 'advantage', 'disadvantage', 'conditions'],
    },
    sourcePage: 302,
  }),
  dragon({
    slug: 'pseudodragon',
    nameUk: 'Псевдодракон',
    nameOriginal: 'Pseudodragon',
    size: 'Крихітний',
    alignment: 'нейтрально-добрий',
    armorClass: '14',
    hitPoints: '10',
    hitDice: '3к4 + 3',
    initiative: { modifier: '+2', score: 12 },
    speed: ['15 фт', 'політ 60 фт'],
    abilities: abilities([
      [6, '−2'],
      [15, '+2'],
      [13, '+1'],
      [10, '+0'],
      [12, '+1'],
      [10, '+0'],
    ]),
    skills: { Сприйняття: '+5', Скритність: '+4' },
    senses: ['Сліпозір 10 фт', 'Темний зір 60 фт'],
    passivePerception: 15,
    languages: ['розуміє Спільну й Драконячу, але не може говорити'],
    challengeRating: '1/4',
    experiencePoints: 50,
    proficiencyBonus: '+2',
    traits: [
      trait(
        'pseudodragon-magic-resistance',
        'Опір магії',
        'Magic Resistance',
        'Псевдодракон має Перевагу на ряткидки проти заклять та інших магічних ефектів.',
      ),
    ],
    actions: [
      action('pseudodragon-multiattack', 'Мультиатака', 'Multiattack', {
        sourceText: 'Псевдодракон виконує дві атаки Укусом.',
      }),
      action('pseudodragon-bite', 'Укус', 'Bite', {
        attackType: 'ближня',
        attackBonus: '+4',
        reach: '5 фт',
        target: 'одна ціль',
        damage: '4 (1к4 + 2)',
        damageType: 'колюча',
        damageInstances: [
          { average: 4, formula: '1к4 + 2', damageType: 'колюча', application: 'on-hit' },
        ],
        sourceText:
          'Кидок ближньої атаки: +4, досяжність 5 фт. Влучання: 4 (1к4 + 2) колючої шкоди.',
      }),
      action('pseudodragon-sting', 'Жало', 'Sting', {
        target: 'одна видима псевдодракону істота в межах 5 фт',
        damage: '5 (2к4)',
        damageType: 'отруйна',
        damageInstances: [
          { average: 5, formula: '2к4', damageType: 'отруйна', application: 'failed-save' },
        ],
        savingThrow: {
          ability: 'constitution',
          dc: 12,
          onFailure: '5 (2к4) отруйної шкоди та стан Отруєний на 1 годину.',
          onSuccess: 'Без ефекту.',
        },
        mechanicSteps: [
          {
            id: 'pseudodragon-sting-save',
            order: 1,
            label: 'Ряткидок',
            text: 'Ціль виконує ряткидок Статури СК 12.',
            savingThrow: {
              ability: 'constitution',
              dc: 12,
              onFailure: '5 (2к4) отруйної шкоди та стан Отруєний на 1 годину.',
              onSuccess: 'Без ефекту.',
            },
          },
          {
            id: 'pseudodragon-sting-severe-failure',
            order: 2,
            label: 'Провал на 5 або більше',
            text: 'Поки ціль Отруєна, вона також має стан Непритомний. Цей стан завершується достроково, якщо ціль отримує шкоду або істота в межах 5 футів від неї виконує дію, щоб її розбудити.',
            conditionSlugs: ['poisoned', 'unconscious'],
          },
        ],
        sourceText:
          'Ряткидок Статури СК 12 виконує одна видима псевдодракону істота в межах 5 футів. Провал: 5 (2к4) отруйної шкоди, і ціль отримує стан Отруєний на 1 годину. Провал на 5 або більше: поки ціль Отруєна, вона також має стан Непритомний, який завершується достроково, якщо ціль отримує шкоду або істота в межах 5 футів від неї виконує дію, щоб її розбудити.',
      }),
    ],
    relationships: {
      conditionSlugs: ['poisoned', 'unconscious'],
      ruleSlugs: [
        ...commonCombatRules,
        'saving-throws',
        'difficulty-class',
        'conditions',
        'advantage',
        'action',
      ],
    },
    sourcePage: 316,
  }),
  dragon({
    slug: 'wyvern',
    nameUk: 'Виверна',
    nameOriginal: 'Wyvern',
    size: 'Великий',
    alignment: 'без світогляду',
    armorClass: '14',
    hitPoints: '127',
    hitDice: '15к10 + 45',
    initiative: { modifier: '+0', score: 10 },
    speed: ['30 фт', 'політ 80 фт'],
    abilities: abilities([
      [19, '+4'],
      [10, '+0'],
      [16, '+3'],
      [5, '−3'],
      [12, '+1'],
      [6, '−2'],
    ]),
    skills: { Сприйняття: '+4' },
    senses: ['Темний зір 120 фт'],
    passivePerception: 14,
    languages: [],
    challengeRating: '6',
    experiencePoints: 2300,
    proficiencyBonus: '+3',
    actions: [
      action('wyvern-multiattack', 'Мультиатака', 'Multiattack', {
        sourceText: 'Виверна виконує одну атаку Укусом і одну атаку Жалом.',
      }),
      action('wyvern-bite', 'Укус', 'Bite', {
        attackType: 'ближня',
        attackBonus: '+7',
        reach: '5 фт',
        target: 'одна ціль',
        damage: '13 (2к8 + 4)',
        damageType: 'колюча',
        damageInstances: [
          { average: 13, formula: '2к8 + 4', damageType: 'колюча', application: 'on-hit' },
        ],
        sourceText:
          'Кидок ближньої атаки: +7, досяжність 5 фт. Влучання: 13 (2к8 + 4) колючої шкоди.',
      }),
      action('wyvern-sting', 'Жало', 'Sting', {
        attackType: 'ближня',
        attackBonus: '+7',
        reach: '10 фт',
        target: 'одна ціль',
        damage: '11 (2к6 + 4) + 24 (7к6)',
        damageType: 'колюча',
        damageInstances: [
          { average: 11, formula: '2к6 + 4', damageType: 'колюча', application: 'on-hit' },
          { average: 24, formula: '7к6', damageType: 'отруйна', application: 'on-hit' },
        ],
        sourceText:
          'Кидок ближньої атаки: +7, досяжність 10 фт. Влучання: 11 (2к6 + 4) колючої шкоди плюс 24 (7к6) отруйної шкоди, і ціль отримує стан Отруєний до початку наступного ходу виверни.',
      }),
    ],
    relationships: {
      conditionSlugs: ['poisoned'],
      ruleSlugs: [...commonCombatRules, 'conditions'],
    },
    sourcePage: 343,
  }),
];
