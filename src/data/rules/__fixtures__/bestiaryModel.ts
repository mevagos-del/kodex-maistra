import type {
  OfficialMonsterAction,
  OfficialMonsterAlternativeExperience,
  OfficialMonsterGear,
  OfficialMonsterInitiative,
  OfficialMonsterSpellcasting,
} from '../types';

export const bestiaryModelFixtures = {
  simpleBeast: {
    initiative: { modifier: '+2', score: 12 } satisfies OfficialMonsterInitiative,
  },
  equippedHumanoid: {
    gear: [
      { nameUk: 'Довгий меч', itemSlug: 'longsword' },
      { nameUk: 'Дротик', quantity: 3 },
    ] satisfies OfficialMonsterGear[],
  },
  complexAttack: {
    id: 'fixture-complex-attack',
    nameUk: 'Складна атака',
    attackType: 'ближня',
    attackBonus: '+7',
    reach: '10 фт',
    target: 'одна ціль',
    damageInstances: [
      { average: 9, formula: '1к10 + 4', damageType: 'рубальна', application: 'on-hit' },
      { average: 7, formula: '2к6', damageType: 'вогняна', application: 'on-hit', qualifier: 'лише в розпеченій формі' },
    ],
    savingThrow: {
      ability: 'dexterity', dc: 15,
      onFailure: 'Ціль отримує повну додаткову шкоду.',
      onSuccess: 'Ціль отримує половину додаткової шкоди.',
      repeat: { timing: 'наприкінці кожного свого ходу', endsEffectOnSuccess: true },
    },
    mechanicSteps: [
      { id: 'fixture-hit', order: 1, label: 'Влучання', text: 'Спочатку застосовується рубальна шкода.' },
      { id: 'fixture-save', order: 2, label: 'Ряткидок', text: 'Потім ціль виконує ряткидок проти додаткового ефекту.', savingThrow: { ability: 'dexterity', dc: 15 } },
    ],
    sourceText: 'Повний source-backed текст залишається доступним для умов, які не вміщуються у structured fields.',
  } satisfies OfficialMonsterAction,
  rechargeableAction: {
    id: 'fixture-recharge', nameUk: 'Подих', recharge: { kind: 'roll', die: 6, minimum: 5 },
  } satisfies OfficialMonsterAction,
  limitedAction: {
    id: 'fixture-limited', nameUk: 'Вроджена магія', limitedUse: { uses: 3, period: 'day', each: true },
  } satisfies OfficialMonsterAction,
  spellcaster: {
    ability: 'Харизма', saveDc: '16', attackBonus: '+8',
    groups: [
      { mode: 'at-will', spells: [{ slug: 'detect-magic', nameUk: 'Виявлення магії', concentration: true }] },
      { mode: 'daily', uses: 1, each: true, spells: [{ slug: 'fireball', nameUk: 'Куля вогню', castAtLevel: 5 }] },
      { mode: 'slots', slotLevel: 3, slots: 2, spells: [{ slug: 'counterspell', nameUk: 'Контрзакляття' }] },
    ],
  } satisfies OfficialMonsterSpellcasting,
  legendaryAction: {
    id: 'fixture-legendary', nameUk: 'Крилата атака', legendaryActionCost: 2,
  } satisfies OfficialMonsterAction,
  dragonSequence: {
    id: 'fixture-dragon-breath', nameUk: 'Подих дракона', recharge: { kind: 'roll', die: 6, minimum: 5 },
    savingThrow: { ability: 'dexterity', dc: 21, onFailure: 'Повна шкода.', onSuccess: 'Половина шкоди.' },
    damageInstances: [{ average: 63, formula: '18к6', damageType: 'вогняна', application: 'failed-save' }],
    mechanicSteps: [
      { id: 'fixture-area', order: 1, text: 'Конус визначає всіх істот, які мають виконати ряткидок.' },
      { id: 'fixture-damage', order: 2, text: 'Шкода залежить від результату ряткидка.' },
    ],
  } satisfies OfficialMonsterAction,
  alternativeExperience: [
    { experiencePoints: 7200, condition: 'у лігві' },
  ] satisfies OfficialMonsterAlternativeExperience[],
};
