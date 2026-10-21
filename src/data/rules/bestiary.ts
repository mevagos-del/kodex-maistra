import { SRD_52_SOURCE } from './source';
import type { OfficialMonsterAbility, OfficialMonsterEntry } from './types';
import { officialBeasts } from './bestiary/beasts';
import { officialElementalsConstructsOozesPlants } from './bestiary/elementals-constructs-oozes-plants';
import { officialFeyAberrations } from './bestiary/fey-aberrations';
import { officialGiantsCelestials } from './bestiary/giants-celestials';
import { officialHumanoids } from './bestiary/humanoids';
import { officialMonstrosities } from './bestiary/monstrosities';

const ability = (score: number, modifier: string, save = modifier): OfficialMonsterAbility => ({ score, modifier, save });

const bandit: OfficialMonsterEntry = {
  entity: 'monster', slug: 'bandit', nameUk: 'Бандит', nameOriginal: 'Bandit', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній або Малий', creatureType: 'Гуманоїд', alignment: 'нейтральний', armorClass: '12', hitPoints: '11', hitDice: '2к8 + 2', initiative: { modifier: '+1', score: 11 }, speed: ['30 фт'],
  gear: [{ nameUk: 'Шкіряний обладунок', itemSlug: 'leather-armor' }, { nameUk: 'Легкий арбалет', itemSlug: 'light-crossbow' }, { nameUk: 'Ятаган', itemSlug: 'scimitar' }],
  abilities: { strength: ability(11, '+0'), dexterity: ability(12, '+1'), constitution: ability(12, '+1'), intelligence: ability(10, '+0'), wisdom: ability(10, '+0'), charisma: ability(10, '+0') },
  passivePerception: 10, languages: ['Спільна', 'Злодійський жаргон'], challengeRating: '1/8', experiencePoints: 25, proficiencyBonus: '+2',
  actions: [
    { id: 'bandit-scimitar', nameUk: 'Ятаган', attackType: 'ближня', attackBonus: '+3', reach: '5 фт', target: 'одна ціль', damage: '4 (1к6 + 1)', damageType: 'рубальна', damageInstances: [{ average: 4, formula: '1к6 + 1', damageType: 'рубальна', application: 'on-hit' }] },
    { id: 'bandit-light-crossbow', nameUk: 'Легкий арбалет', attackType: 'далекобійна', attackBonus: '+3', range: '80/320 фт', target: 'одна ціль', damage: '5 (1к8 + 1)', damageType: 'колюча', damageInstances: [{ average: 5, formula: '1к8 + 1', damageType: 'колюча', application: 'on-hit' }] },
  ],
  relationships: { itemSlugs: ['leather-armor', 'light-crossbow', 'scimitar'], ruleSlugs: ['initiative', 'attack-rolls', 'damage-rolls'] }, sourcePage: 261,
};

const goblinBoss: OfficialMonsterEntry = {
  entity: 'monster', slug: 'goblin-boss', nameUk: 'Гоблін-ватажок', nameOriginal: 'Goblin Boss', status: 'official', source: SRD_52_SOURCE,
  size: 'Малий', creatureType: 'Фея', subtype: 'гобліноїд', alignment: 'хаотично-нейтральний', armorClass: '17', hitPoints: '21', hitDice: '6к6', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт'],
  gear: [{ nameUk: 'Кольчужна сорочка', itemSlug: 'chain-shirt' }, { nameUk: 'Ятаган', itemSlug: 'scimitar' }, { nameUk: 'Щит', itemSlug: 'shield' }, { nameUk: 'Короткий лук', itemSlug: 'shortbow' }],
  abilities: { strength: ability(10, '+0'), dexterity: ability(15, '+2'), constitution: ability(10, '+0'), intelligence: ability(10, '+0'), wisdom: ability(8, '−1'), charisma: ability(10, '+0') },
  skills: { Скритність: '+6' }, senses: ['Темний зір 60 фт'], passivePerception: 9, languages: ['Спільна', 'Гоблінська'], challengeRating: '1', experiencePoints: 200, proficiencyBonus: '+2',
  actions: [
    { id: 'goblin-boss-multiattack', nameUk: 'Мультиатака', sourceText: 'Гоблін виконує дві атаки, використовуючи Ятаган або Короткий лук у будь-якому поєднанні.' },
    { id: 'goblin-boss-scimitar', nameUk: 'Ятаган', attackType: 'ближня', attackBonus: '+4', reach: '5 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'рубальна', damageInstances: [{ average: 5, formula: '1к6 + 2', damageType: 'рубальна', application: 'on-hit' }, { average: 2, formula: '1к4', damageType: 'рубальна', application: 'on-hit', qualifier: 'якщо кидок атаки мав Перевагу' }] },
    { id: 'goblin-boss-shortbow', nameUk: 'Короткий лук', attackType: 'далекобійна', attackBonus: '+4', range: '80/320 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'колюча', damageInstances: [{ average: 5, formula: '1к6 + 2', damageType: 'колюча', application: 'on-hit' }, { average: 2, formula: '1к4', damageType: 'колюча', application: 'on-hit', qualifier: 'якщо кидок атаки мав Перевагу' }] },
  ],
  bonusActions: [{ id: 'goblin-boss-nimble-escape', nameUk: 'Спритна втеча', sourceText: 'Гоблін виконує дію Відхід або Сховатися.' }],
  reactions: [{ id: 'goblin-boss-redirect-attack', nameUk: 'Перенаправлення атаки', sourceText: 'Тригер: видима гобліну істота робить проти нього кидок атаки. Відповідь: гоблін обирає союзника Малого або Середнього розміру в межах 5 футів. Гоблін і союзник міняються місцями, після чого союзник стає ціллю атаки.' }],
  relationships: { itemSlugs: ['chain-shirt', 'scimitar', 'shield', 'shortbow'], ruleSlugs: ['initiative', 'attack-rolls', 'advantage', 'disengage', 'hide', 'reaction', 'damage-rolls'] }, sourcePage: 290,
};

const wolf: OfficialMonsterEntry = {
  entity: 'monster', slug: 'wolf', nameUk: 'Вовк', nameOriginal: 'Wolf', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній', creatureType: 'Звір', alignment: 'без світогляду', armorClass: '12', hitPoints: '11', hitDice: '2к8 + 2', initiative: { modifier: '+2', score: 12 }, speed: ['40 фт'],
  abilities: { strength: ability(14, '+2'), dexterity: ability(15, '+2'), constitution: ability(12, '+1'), intelligence: ability(3, '−4'), wisdom: ability(12, '+1'), charisma: ability(6, '−2') },
  skills: { Сприйняття: '+5', Скритність: '+4' }, senses: ['Темний зір 60 фт'], passivePerception: 15, languages: [], challengeRating: '1/4', experiencePoints: 50, proficiencyBonus: '+2',
  traits: [{ id: 'wolf-pack-tactics', nameUk: 'Зграйна тактика', sourceText: 'Вовк має Перевагу на кидки атаки проти істоти, якщо принаймні один союзник вовка перебуває в межах 5 футів від цієї істоти й не має стану Недієздатний.' }],
  actions: [{ id: 'wolf-bite', nameUk: 'Укус', attackType: 'ближня', attackBonus: '+4', reach: '5 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'колюча', damageInstances: [{ average: 5, formula: '1к6 + 2', damageType: 'колюча', application: 'on-hit' }], sourceText: 'Якщо ціль має Середній або менший розмір, вона отримує стан Збитий з ніг.' }],
  relationships: { conditionSlugs: ['incapacitated', 'prone'], ruleSlugs: ['initiative', 'attack-rolls', 'advantage', 'conditions', 'damage-rolls'] }, sourcePage: 364,
};

const mageSpells = [
  ['detect-magic', 'Виявлення магії'], ['light', 'Світло'], ['mage-armor', 'Магічний обладунок'], ['mage-hand', 'Рука мага'], ['prestidigitation', 'Спритність рук'],
  ['fireball', 'Куля вогню'], ['invisibility', 'Невидимість'], ['cone-of-cold', 'Конус холоду'], ['fly', 'Політ'], ['misty-step', 'Туманний крок'], ['counterspell', 'Контрзакляття'], ['shield', 'Щит'],
] as const;

const mage: OfficialMonsterEntry = {
  entity: 'monster', slug: 'mage', nameUk: 'Маг', nameOriginal: 'Mage', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній або Малий', creatureType: 'Гуманоїд', subtype: 'чарівник', alignment: 'нейтральний', armorClass: '15', hitPoints: '81', hitDice: '18к8', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт'],
  gear: [{ nameUk: 'Паличка' }],
  abilities: { strength: ability(9, '−1'), dexterity: ability(14, '+2'), constitution: ability(11, '+0'), intelligence: ability(17, '+3', '+6'), wisdom: ability(12, '+1', '+4'), charisma: ability(11, '+0') },
  skills: { Аркана: '+6', Історія: '+6', Сприйняття: '+4' }, passivePerception: 14, languages: ['Спільна та ще три мови'], challengeRating: '6', experiencePoints: 2300, proficiencyBonus: '+3',
  actions: [
    { id: 'mage-multiattack', nameUk: 'Мультиатака', sourceText: 'Маг виконує три атаки «Арканний сплеск».' },
    { id: 'mage-arcane-burst', nameUk: 'Арканний сплеск', attackType: 'ближня або далекобійна', attackBonus: '+6', reach: '5 фт', range: '120 фт', target: 'одна ціль', damage: '16 (3к8 + 3)', damageType: 'силова', damageInstances: [{ average: 16, formula: '3к8 + 3', damageType: 'силова', application: 'on-hit' }] },
  ],
  bonusActions: [{ id: 'mage-misty-step', nameUk: 'Туманний крок', limitedUse: { uses: 3, period: 'day' }, sourceText: 'Маг накладає «Туманний крок», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять.' }],
  reactions: [{ id: 'mage-protective-magic', nameUk: 'Захисна магія', limitedUse: { uses: 3, period: 'day' }, sourceText: 'У відповідь на тригер закляття маг накладає «Контрзакляття» або «Щит», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять.' }],
  spellcasting: { ability: 'Інтелект', saveDc: '14', groups: [
    { mode: 'at-will', spells: mageSpells.slice(0, 5).map(([slug, nameUk]) => ({ slug, nameUk, ...(slug === 'mage-armor' ? { qualifier: 'враховано в КЗ' } : {}) })) },
    { mode: 'daily', uses: 2, each: true, spells: mageSpells.slice(5, 7).map(([slug, nameUk]) => ({ slug, nameUk, ...(slug === 'fireball' ? { castAtLevel: 4 } : {}) })) },
    { mode: 'daily', uses: 1, each: true, spells: mageSpells.slice(7, 9).map(([slug, nameUk]) => ({ slug, nameUk })) },
    { label: 'Бонусна дія · 3/день', mode: 'daily', uses: 3, spells: [{ slug: 'misty-step', nameUk: 'Туманний крок' }] },
    { label: 'Реакція · 3/день', mode: 'daily', uses: 3, spells: mageSpells.slice(10).map(([slug, nameUk]) => ({ slug, nameUk })) },
  ] },
  relationships: { spellSlugs: mageSpells.map(([slug]) => slug), ruleSlugs: ['initiative', 'attack-rolls', 'spellcasting', 'saving-throws', 'concentration', 'bonus-action', 'reaction', 'damage-rolls'] }, sourcePage: 305,
};

const aboleth: OfficialMonsterEntry = {
  entity: 'monster', slug: 'aboleth', nameUk: 'Аболет', nameOriginal: 'Aboleth', status: 'official', source: SRD_52_SOURCE,
  size: 'Великий', creatureType: 'Аберрація', alignment: 'законно-злий', armorClass: '17', hitPoints: '150', hitDice: '20к10 + 40', initiative: { modifier: '+7', score: 17 }, speed: ['10 фт', 'плавання 40 фт'],
  abilities: { strength: ability(21, '+5'), dexterity: ability(9, '−1', '+3'), constitution: ability(15, '+2', '+6'), intelligence: ability(18, '+4', '+8'), wisdom: ability(15, '+2', '+6'), charisma: ability(18, '+4') },
  skills: { Історія: '+12', Сприйняття: '+10' }, senses: ['Темний зір 120 фт'], passivePerception: 20, languages: ['Глибинна мова', 'телепатія 120 фт'], challengeRating: '10', experiencePoints: 5900, alternativeExperience: [{ experiencePoints: 7200, condition: 'у лігві' }], proficiencyBonus: '+4',
  traits: [
    { id: 'aboleth-amphibious', nameUk: 'Амфібія', sourceText: 'Аболет може дихати повітрям і водою.' },
    { id: 'aboleth-eldritch-restoration', nameUk: 'Потойбічне відновлення', sourceText: 'Після знищення аболет отримує нове тіло через 5к10 днів і відроджується з усіма хітами у Далекому Просторі або в іншому місці, яке визначає Майстер.' },
    { id: 'aboleth-legendary-resistance', nameUk: 'Легендарний опір', limitedUse: { uses: 3, period: 'day', qualifier: '4/день у лігві' }, sourceText: 'Якщо аболет провалює ряткидок, він може натомість успішно його пройти.' },
    { id: 'aboleth-mucus-cloud', nameUk: 'Хмара слизу', savingThrow: { ability: 'constitution', dc: 14, onFailure: 'Ціль проклята до завершення прокляття.' }, damageInstances: [{ average: 6, formula: '1к12', damageType: 'кислотна', application: 'other', qualifier: 'наприкінці кожних 10 хвилин поза водоймою без зволоження шкіри' }], mechanicSteps: [{ id: 'aboleth-mucus-save', order: 1, trigger: 'наприкінці ходу аболета під водою', text: 'Кожна істота в 5-футовій еманації від аболета виконує ряткидок Статури СК 14.' }, { id: 'aboleth-mucus-curse', order: 2, text: 'При провалі ціль проклята: її шкіра стає слизькою, вона може дихати повітрям і водою та не може відновлювати хіти, якщо не перебуває під водою.' }, { id: 'aboleth-mucus-damage', order: 3, text: 'Поза водоймою проклята істота отримує 1к12 кислотної шкоди наприкінці кожних 10 хвилин, якщо до завершення цього часу її шкіру не зволожили.' }], sourceText: 'Під водою аболета оточує слиз. Наприкінці ходу аболета кожна істота в 5-футовій еманації від нього виконує ряткидок Статури СК 14. При провалі ціль проклята. До завершення прокляття її шкіра стає слизькою, вона може дихати повітрям і водою та не може відновлювати хіти, якщо не перебуває під водою. Поза водоймою проклята істота отримує 6 (1к12) кислотної шкоди наприкінці кожних 10 хвилин, якщо до завершення цього часу її шкіру не зволожили.' },
    { id: 'aboleth-probing-telepathy', nameUk: 'Прониклива телепатія', sourceText: 'Якщо видима аболету істота телепатично спілкується з ним, аболет дізнається її найсильніші бажання.' },
  ],
  actions: [
    { id: 'aboleth-multiattack', nameUk: 'Мультиатака', sourceText: 'Аболет виконує дві атаки Щупальцем і, якщо доступно, використовує «Поглинання спогадів» або «Панування над розумом».' },
    { id: 'aboleth-tentacle', nameUk: 'Щупальце', attackType: 'ближня', attackBonus: '+9', reach: '15 фт', target: 'одна ціль', damage: '12 (2к6 + 5)', damageType: 'дробильна', damageInstances: [{ average: 12, formula: '2к6 + 5', damageType: 'дробильна', application: 'on-hit' }], sourceText: 'Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 14) одним із чотирьох щупалець.' },
    { id: 'aboleth-consume-memories', nameUk: 'Поглинання спогадів', target: 'одна Зачарована або Схоплена аболетом істота в межах 30 фт', damage: '10 (3к6)', damageType: 'психічна', damageInstances: [{ average: 10, formula: '3к6', damageType: 'психічна', application: 'failed-save' }], savingThrow: { ability: 'intelligence', dc: 16, onFailure: 'Ціль отримує повну шкоду.', onSuccess: 'Ціль отримує половину шкоди.' }, sourceText: 'Незалежно від успіху чи провалу аболет отримує спогади цілі, якщо ціль є Гуманоїдом і ця дія зменшує її хіти до 0.' },
    { id: 'aboleth-dominate-mind', nameUk: 'Панування над розумом', target: 'одна видима істота в межах 30 фт', limitedUse: { uses: 2, period: 'day' }, savingThrow: { ability: 'wisdom', dc: 16, onFailure: 'Ціль отримує стан Зачарований, доки аболет не помре або не опиниться на іншому плані.', repeat: { timing: 'щоразу, коли ціль отримує шкоду, і після кожних 24 годин, проведених щонайменше за 1 милю від аболета', endsEffectOnSuccess: true } }, sourceText: 'Під дією стану Зачарований ціль діє як союзник аболета й перебуває під його контролем, доки знаходиться в межах 60 футів від нього. Аболет і ціль можуть телепатично спілкуватися між собою на будь-якій відстані.' },
  ],
  legendaryActionUses: '3 використання (4 у лігві). Одразу після ходу іншої істоти аболет може витратити одне використання, щоб виконати одну з наведених дій. Усі витрачені використання відновлюються на початку кожного ходу аболета.',
  legendaryActions: [
    { id: 'aboleth-lash', nameUk: 'Удар щупальцем', legendaryActionCost: 1, sourceText: 'Аболет виконує одну атаку Щупальцем.' },
    { id: 'aboleth-psychic-drain', nameUk: 'Психічне виснаження', legendaryActionCost: 1, sourceText: 'Якщо аболет має принаймні одну Зачаровану або Схоплену істоту, він використовує «Поглинання спогадів» і відновлює 5 (1к10) хітів.' },
  ],
  relationships: { conditionSlugs: ['charmed', 'grappled'], ruleSlugs: ['initiative', 'saving-throws', 'difficulty-class', 'conditions', 'healing', 'damage-rolls'] }, sourcePage: 258,
};

export const officialBestiary: OfficialMonsterEntry[] = [
  bandit,
  goblinBoss,
  wolf,
  mage,
  aboleth,
  ...officialBeasts,
  ...officialHumanoids,
  ...officialElementalsConstructsOozesPlants,
  ...officialGiantsCelestials,
  ...officialFeyAberrations,
  ...officialMonstrosities,
];

export function bestiaryBySlug(slug?: string) {
  return officialBestiary.find((entry) => entry.slug === slug);
}

export function filterBestiary(query: string) {
  const needle = query.trim().toLocaleLowerCase('uk-UA');
  if (!needle) return officialBestiary;
  return officialBestiary.filter((entry) => [entry.nameUk, entry.nameOriginal, entry.slug, entry.creatureType, entry.subtype, entry.challengeRating]
    .filter(Boolean).join(' ').toLocaleLowerCase('uk-UA').includes(needle));
}
