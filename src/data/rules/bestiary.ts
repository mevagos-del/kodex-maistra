import { SRD_52_SOURCE } from './source';
import type { OfficialMonsterAbility, OfficialMonsterEntry } from './types';

const ability = (score: number, modifier: string, save = modifier): OfficialMonsterAbility => ({ score, modifier, save });

const bandit: OfficialMonsterEntry = {
  entity: 'monster', slug: 'bandit', nameUk: 'Бандит', nameOriginal: 'Bandit', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній або Малий', creatureType: 'Гуманоїд', alignment: 'нейтральний', armorClass: '12', hitPoints: '11', hitDice: '2к8 + 2', speed: ['30 фт'],
  abilities: { strength: ability(11, '+0'), dexterity: ability(12, '+1'), constitution: ability(12, '+1'), intelligence: ability(10, '+0'), wisdom: ability(10, '+0'), charisma: ability(10, '+0') },
  passivePerception: 10, languages: ['Спільна', 'Злодійський жаргон'], challengeRating: '1/8', experiencePoints: 25, proficiencyBonus: '+2',
  actions: [
    { id: 'bandit-scimitar', nameUk: 'Ятаган', attackType: 'ближня', attackBonus: '+3', reach: '5 фт', target: 'одна ціль', damage: '4 (1к6 + 1)', damageType: 'рубальна' },
    { id: 'bandit-light-crossbow', nameUk: 'Легкий арбалет', attackType: 'далекобійна', attackBonus: '+3', range: '80/320 фт', target: 'одна ціль', damage: '5 (1к8 + 1)', damageType: 'колюча' },
  ],
  relationships: { itemSlugs: ['leather-armor', 'light-crossbow', 'scimitar'] }, sourcePage: 261,
};

const goblinBoss: OfficialMonsterEntry = {
  entity: 'monster', slug: 'goblin-boss', nameUk: 'Гоблін-ватажок', nameOriginal: 'Goblin Boss', status: 'official', source: SRD_52_SOURCE,
  size: 'Малий', creatureType: 'Фея', subtype: 'гобліноїд', alignment: 'хаотично-нейтральний', armorClass: '17', hitPoints: '21', hitDice: '6к6', speed: ['30 фт'],
  abilities: { strength: ability(10, '+0'), dexterity: ability(15, '+2'), constitution: ability(10, '+0'), intelligence: ability(10, '+0'), wisdom: ability(8, '−1'), charisma: ability(10, '+0') },
  skills: { Скритність: '+6' }, senses: ['Темний зір 60 фт'], passivePerception: 9, languages: ['Спільна', 'Гоблінська'], challengeRating: '1', experiencePoints: 200, proficiencyBonus: '+2',
  actions: [
    { id: 'goblin-boss-multiattack', nameUk: 'Мультиатака', sourceText: 'Гоблін виконує дві атаки, використовуючи Ятаган або Короткий лук у будь-якому поєднанні.' },
    { id: 'goblin-boss-scimitar', nameUk: 'Ятаган', attackType: 'ближня', attackBonus: '+4', reach: '5 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'рубальна', sourceText: 'Якщо кидок атаки мав Перевагу, атака завдає додатково 2 (1к4) рубальної шкоди.' },
    { id: 'goblin-boss-shortbow', nameUk: 'Короткий лук', attackType: 'далекобійна', attackBonus: '+4', range: '80/320 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'колюча', sourceText: 'Якщо кидок атаки мав Перевагу, атака завдає додатково 2 (1к4) колючої шкоди.' },
  ],
  bonusActions: [{ id: 'goblin-boss-nimble-escape', nameUk: 'Спритна втеча', sourceText: 'Гоблін виконує дію Відхід або Сховатися.' }],
  reactions: [{ id: 'goblin-boss-redirect-attack', nameUk: 'Перенаправлення атаки', sourceText: 'Тригер: видима гобліну істота робить проти нього кидок атаки. Відповідь: гоблін обирає союзника Малого або Середнього розміру в межах 5 футів. Гоблін і союзник міняються місцями, після чого союзник стає ціллю атаки.' }],
  relationships: { itemSlugs: ['chain-shirt', 'scimitar', 'shield', 'shortbow'] }, sourcePage: 290,
};

const wolf: OfficialMonsterEntry = {
  entity: 'monster', slug: 'wolf', nameUk: 'Вовк', nameOriginal: 'Wolf', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній', creatureType: 'Звір', alignment: 'без світогляду', armorClass: '12', hitPoints: '11', hitDice: '2к8 + 2', speed: ['40 фт'],
  abilities: { strength: ability(14, '+2'), dexterity: ability(15, '+2'), constitution: ability(12, '+1'), intelligence: ability(3, '−4'), wisdom: ability(12, '+1'), charisma: ability(6, '−2') },
  skills: { Сприйняття: '+5', Скритність: '+4' }, senses: ['Темний зір 60 фт'], passivePerception: 15, languages: [], challengeRating: '1/4', experiencePoints: 50, proficiencyBonus: '+2',
  traits: [{ id: 'wolf-pack-tactics', nameUk: 'Зграйна тактика', sourceText: 'Вовк має Перевагу на кидки атаки проти істоти, якщо принаймні один союзник вовка перебуває в межах 5 футів від цієї істоти й не має стану Недієздатний.' }],
  actions: [{ id: 'wolf-bite', nameUk: 'Укус', attackType: 'ближня', attackBonus: '+4', reach: '5 фт', target: 'одна ціль', damage: '5 (1к6 + 2)', damageType: 'колюча', sourceText: 'Якщо ціль має Середній або менший розмір, вона отримує стан Збитий з ніг.' }],
  relationships: { conditionSlugs: ['incapacitated', 'prone'] }, sourcePage: 364,
};

const mageSpells = [
  ['detect-magic', 'Виявлення магії'], ['light', 'Світло'], ['mage-armor', 'Магічний обладунок'], ['mage-hand', 'Рука мага'], ['prestidigitation', 'Спритність рук'],
  ['fireball', 'Куля вогню'], ['invisibility', 'Невидимість'], ['cone-of-cold', 'Конус холоду'], ['fly', 'Політ'], ['misty-step', 'Туманний крок'], ['counterspell', 'Контрзакляття'], ['shield', 'Щит'],
] as const;

const mage: OfficialMonsterEntry = {
  entity: 'monster', slug: 'mage', nameUk: 'Маг', nameOriginal: 'Mage', status: 'official', source: SRD_52_SOURCE,
  size: 'Середній або Малий', creatureType: 'Гуманоїд', subtype: 'чарівник', alignment: 'нейтральний', armorClass: '15', hitPoints: '81', hitDice: '18к8', speed: ['30 фт'],
  abilities: { strength: ability(9, '−1'), dexterity: ability(14, '+2'), constitution: ability(11, '+0'), intelligence: ability(17, '+3', '+6'), wisdom: ability(12, '+1', '+4'), charisma: ability(11, '+0') },
  skills: { Аркана: '+6', Історія: '+6', Сприйняття: '+4' }, passivePerception: 14, languages: ['Спільна та ще три мови'], challengeRating: '6', experiencePoints: 2300, proficiencyBonus: '+3',
  actions: [
    { id: 'mage-multiattack', nameUk: 'Мультиатака', sourceText: 'Маг виконує три атаки «Арканний сплеск».' },
    { id: 'mage-arcane-burst', nameUk: 'Арканний сплеск', attackType: 'ближня або далекобійна', attackBonus: '+6', reach: '5 фт', range: '120 фт', target: 'одна ціль', damage: '16 (3к8 + 3)', damageType: 'силова' },
  ],
  bonusActions: [{ id: 'mage-misty-step', nameUk: 'Туманний крок (3/день)', sourceText: 'Маг накладає «Туманний крок», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять.' }],
  reactions: [{ id: 'mage-protective-magic', nameUk: 'Захисна магія (3/день)', sourceText: 'У відповідь на тригер закляття маг накладає «Контрзакляття» або «Щит», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять.' }],
  spellcasting: { ability: 'Інтелект', saveDc: '14', groups: [
    { label: 'Без обмежень', spells: mageSpells.slice(0, 5).map(([slug, nameUk]) => ({ slug, nameUk })) },
    { label: '2/день кожне', spells: mageSpells.slice(5, 7).map(([slug, nameUk]) => ({ slug, nameUk })) },
    { label: '1/день кожне', spells: mageSpells.slice(7, 9).map(([slug, nameUk]) => ({ slug, nameUk })) },
    { label: 'Бонусна дія, 3/день', spells: [{ slug: 'misty-step', nameUk: 'Туманний крок' }] },
    { label: 'Реакція, 3/день', spells: mageSpells.slice(10).map(([slug, nameUk]) => ({ slug, nameUk })) },
  ] },
  relationships: { spellSlugs: mageSpells.map(([slug]) => slug) }, sourcePage: 305,
};

const aboleth: OfficialMonsterEntry = {
  entity: 'monster', slug: 'aboleth', nameUk: 'Аболет', nameOriginal: 'Aboleth', status: 'official', source: SRD_52_SOURCE,
  size: 'Великий', creatureType: 'Аберрація', alignment: 'законно-злий', armorClass: '17', hitPoints: '150', hitDice: '20к10 + 40', speed: ['10 фт', 'плавання 40 фт'],
  abilities: { strength: ability(21, '+5'), dexterity: ability(9, '−1', '+3'), constitution: ability(15, '+2', '+6'), intelligence: ability(18, '+4', '+8'), wisdom: ability(15, '+2', '+6'), charisma: ability(18, '+4') },
  skills: { Історія: '+12', Сприйняття: '+10' }, senses: ['Темний зір 120 фт'], passivePerception: 20, languages: ['Глибинна мова', 'телепатія 120 фт'], challengeRating: '10', experiencePoints: 5900, proficiencyBonus: '+4',
  traits: [
    { id: 'aboleth-amphibious', nameUk: 'Амфібія', sourceText: 'Аболет може дихати повітрям і водою.' },
    { id: 'aboleth-eldritch-restoration', nameUk: 'Потойбічне відновлення', sourceText: 'Після знищення аболет отримує нове тіло через 5к10 днів і відроджується з усіма хітами у Далекому Просторі або в іншому місці, яке визначає Майстер.' },
    { id: 'aboleth-legendary-resistance', nameUk: 'Легендарний опір (3/день, або 4/день у лігві)', sourceText: 'Якщо аболет провалює ряткидок, він може натомість успішно його пройти.' },
    { id: 'aboleth-mucus-cloud', nameUk: 'Хмара слизу', sourceText: 'Під водою наприкінці ходу аболета кожна істота в його 5-футовій еманації виконує ряткидок Статури СК 14. При провалі ціль проклята: може дихати повітрям і водою, не відновлює хіти поза водою та поза водоймою отримує 6 (1к12) кислотної шкоди наприкінці кожних 10 хвилин, якщо шкіру не зволожили.' },
    { id: 'aboleth-probing-telepathy', nameUk: 'Прониклива телепатія', sourceText: 'Якщо видима аболету істота телепатично спілкується з ним, аболет дізнається її найсильніші бажання.' },
  ],
  actions: [
    { id: 'aboleth-multiattack', nameUk: 'Мультиатака', sourceText: 'Аболет виконує дві атаки Щупальцем і, якщо доступно, використовує «Поглинання спогадів» або «Панування над розумом».' },
    { id: 'aboleth-tentacle', nameUk: 'Щупальце', attackType: 'ближня', attackBonus: '+9', reach: '15 фт', target: 'одна ціль', damage: '12 (2к6 + 5)', damageType: 'дробильна', sourceText: 'Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 14) одним із чотирьох щупалець.' },
    { id: 'aboleth-consume-memories', nameUk: 'Поглинання спогадів', target: 'одна Зачарована або Схоплена аболетом істота в межах 30 фт', damage: '10 (3к6)', damageType: 'психічна', sourceText: 'Ціль виконує ряткидок Інтелекту СК 16. Успіх: половина шкоди. Якщо ціль — Гуманоїд і ця дія зменшує її хіти до 0, аболет отримує її спогади.' },
    { id: 'aboleth-dominate-mind', nameUk: 'Панування над розумом (2/день)', target: 'одна видима істота в межах 30 фт', sourceText: 'Ціль виконує ряткидок Мудрості СК 16. При провалі вона має стан Зачарований, доки аболет не помре або не опиниться на іншому плані. Під дією стану ціль є союзником аболета й перебуває під його контролем у межах 60 футів. Ціль повторює ряткидок щоразу, коли отримує шкоду, а також після кожних 24 годин на відстані щонайменше 1 милі від аболета.' },
  ],
  legendaryActionUses: '3 використання (4 у лігві); відновлюються на початку кожного ходу аболета.',
  legendaryActions: [
    { id: 'aboleth-lash', nameUk: 'Удар щупальцем', sourceText: 'Аболет виконує одну атаку Щупальцем.' },
    { id: 'aboleth-psychic-drain', nameUk: 'Психічне виснаження', sourceText: 'Якщо аболет має принаймні одну Зачаровану або Схоплену істоту, він використовує «Поглинання спогадів» і відновлює 5 (1к10) хітів.' },
  ],
  relationships: { conditionSlugs: ['charmed', 'grappled'] }, sourcePage: 258,
};

export const officialBestiary: OfficialMonsterEntry[] = [bandit, goblinBoss, wolf, mage, aboleth];

export function bestiaryBySlug(slug?: string) {
  return officialBestiary.find((entry) => entry.slug === slug);
}

export function filterBestiary(query: string) {
  const needle = query.trim().toLocaleLowerCase('uk-UA');
  if (!needle) return officialBestiary;
  return officialBestiary.filter((entry) => [entry.nameUk, entry.nameOriginal, entry.slug, entry.creatureType, entry.subtype, entry.challengeRating]
    .filter(Boolean).join(' ').toLocaleLowerCase('uk-UA').includes(needle));
}
