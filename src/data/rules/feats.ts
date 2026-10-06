import type { ConditionSlug } from './conditions';
import type { SpellEntry, SpellClass } from './spells';
import type { OfficialItemEntry } from './types';

export const featCategories = { origin: 'Походження', general: 'Загальна', fightingStyle: 'Бойовий стиль', epicBoon: 'Епічне благословення' } as const;
export type FeatCategory = keyof typeof featCategories;
export const featAbilities = { strength: 'Сила', dexterity: 'Спритність', constitution: 'Статура', intelligence: 'Інтелект', wisdom: 'Мудрість', charisma: 'Харизма' } as const;
type Ability = keyof typeof featAbilities;
export type FeatPrerequisite = { kind: 'level'; minimum: number } | { kind: 'ability'; anyOf: Ability[]; minimum: number } | { kind: 'feature'; feature: 'fighting-style' | 'spellcasting'; label: string };
type Increase = { choices: Ability[]; amount: number; maximum: number; alternative?: { count: number; amount: number } };
export type FeatEntry = {
  slug: string; nameUk: string; nameEn: string; category: FeatCategory; page?: number; summary: string;
  source: FeatSource;
  prerequisites: FeatPrerequisite[]; repeatable: boolean; repeatRestriction?: string;
  effects: { title: string; text: string }[]; increase?: Increase;
  classSlugs: string[]; classContext?: string; weaponRule?: 'any' | 'ranged' | 'two-handed-melee' | 'light';
  spellChoice?: { lists: SpellClass[]; cantrips: number; levelOne: number };
  spellSlotInteraction?: { minimum: number; maximum: number };
  conditions: ConditionSlug[]; rules: { slug: string; label: string }[];
};
export type FeatSource =
  | { origin: 'srd'; title: string; edition: 'D&D 2024'; license: 'CC-BY-4.0'; url: string }
  | { origin: 'official-reference' | 'ttg'; title: string; edition: 'D&D 2024'; presentation: 'summary'; url: string };
export const featSource: FeatSource = { origin: 'srd', title: 'SRD 5.2.1', edition: 'D&D 2024', license: 'CC-BY-4.0', url: 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf' };
const allAbilities = Object.keys(featAbilities) as Ability[];
const level = (minimum: number): FeatPrerequisite[] => [{ kind: 'level', minimum }];
const style: FeatPrerequisite[] = [{ kind: 'feature', feature: 'fighting-style', label: 'Уміння «Бойовий стиль»' }];
const rule = (slug: string, label: string) => ({ slug, label });
const attack = rule('attack-rolls', 'Кидки атаки');
const damage = rule('damage-rolls', 'Кидки шкоди');
const movement = rule('movement', 'Переміщення');
const combatStyles = ['fighter', 'paladin', 'ranger'];
const base = { source: featSource, prerequisites: [] as FeatPrerequisite[], repeatable: false, classSlugs: [] as string[], conditions: [] as ConditionSlug[], rules: [] as FeatEntry['rules'] };
const boon = { ...base, category: 'epicBoon' as const, page: 88, prerequisites: level(19), increase: { choices: allAbilities, amount: 1, maximum: 30 } };
const fighting = { ...base, category: 'fightingStyle' as const, prerequisites: style, classSlugs: combatStyles, classContext: 'Ці класи надають уміння «Бойовий стиль». Потрібне саме це уміння, а не лише рівень у класі.' };

// Licensed SRD entries stay intact; additions carry their own provenance. Increases render separately from effects.
export const officialFeats: FeatEntry[] = [
  { ...base, slug: 'alert', nameUk: 'Пильний', nameEn: 'Alert', category: 'origin', page: 87,
    summary: 'Додаєш бонус майстерності до Ініціативи; можеш обмінятися Ініціативою із союзником.',
    effects: [{ title: 'Майстерність Ініціативи', text: 'Коли кидаєш Ініціативу, можеш додати до кидка свій бонус майстерності.' }, { title: 'Обмін Ініціативою', text: 'Одразу після кидка Ініціативи можеш обмінятися своєю Ініціативою з Ініціативою одного згодного союзника в тому самому бою. Ти не можеш здійснити цей обмін, якщо ти або союзник маєте стан Недієздатний.' }],
    conditions: ['incapacitated'], rules: [rule('initiative', 'Ініціатива'), rule('proficiency', 'Бонус майстерності')] },
  { ...base, slug: 'magic-initiate', nameUk: 'Посвячений у магію', nameEn: 'Magic Initiate', category: 'origin', page: 87, repeatable: true,
    repeatRestriction: 'Щоразу потрібно обирати інший список заклять.',
    summary: 'Вивчаєш два замовляння та закляття 1-го рівня з одного обраного списку.',
    effects: [{ title: 'Два замовляння', text: 'Вивчаєш два замовляння на свій вибір зі списку заклять Жреця, Друїда або Чарівника. Інтелект, Мудрість або Харизма є твоєю заклинальною характеристикою для заклять цієї риси (обери, коли береш цю рису).' }, { title: 'Закляття 1-го рівня', text: 'Обери закляття 1-го рівня з того самого списку, який обрав для замовлянь цієї риси. Це закляття завжди підготовлене. Можеш накласти його один раз без комірки закляття й відновлюєш можливість накласти його в такий спосіб після завершення тривалого відпочинку. Також можеш накладати це закляття, використовуючи будь-які наявні комірки заклять.' }, { title: 'Заміна закляття', text: 'Щоразу, коли здобуваєш новий рівень, можеш замінити одне із заклять, обраних для цієї риси, іншим закляттям того самого рівня з обраного списку заклять.' }],
    classSlugs: ['cleric', 'druid', 'wizard'], classContext: 'Списки заклять для вибору. Рівень у цих класах не є передумовою.',
    spellChoice: { lists: ['cleric', 'druid', 'wizard'], cantrips: 2, levelOne: 1 }, rules: [rule('spellcasting', 'Накладання заклять'), rule('long-rest', 'Тривалий відпочинок')] },
  { ...base, slug: 'savage-attacker', nameUk: 'Лютий нападник', nameEn: 'Savage Attacker', category: 'origin', page: 87,
    summary: 'Раз за хід при влучанні зброєю двічі кидаєш її кістки шкоди й обираєш один результат.',
    effects: [{ title: 'Люті удари', text: 'Ти тренувався завдавати особливо нищівних ударів. Раз за хід, коли влучаєш у ціль зброєю, можеш двічі кинути кістки шкоди зброї й використати будь-який із цих кидків проти цілі.' }], weaponRule: 'any', rules: [damage] },
  { ...base, slug: 'skilled', nameUk: 'Умілий', nameEn: 'Skilled', category: 'origin', page: 87, repeatable: true,
    summary: 'Здобуваєш володіння трьома навичками або інструментами в будь-якому поєднанні.',
    effects: [{ title: 'Володіння', text: 'Здобуваєш володіння будь-яким поєднанням трьох навичок або інструментів на свій вибір.' }], rules: [rule('proficiency', 'Володіння'), rule('skills', 'Навички'), rule('tools', 'Інструменти')] },
  { ...base, slug: 'ability-score-improvement', nameUk: 'Підвищення характеристик', nameEn: 'Ability Score Improvement', category: 'general', page: 87, prerequisites: level(4), repeatable: true,
    summary: 'Підвищуєш одну характеристику на 2 або дві на 1, до максимуму 20.', effects: [],
    increase: { choices: allAbilities, amount: 2, maximum: 20, alternative: { count: 2, amount: 1 } } },
  { ...base, slug: 'grappler', nameUk: 'Борець', nameEn: 'Grappler', category: 'general', page: 87,
    prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: { choices: ['strength', 'dexterity'], amount: 1, maximum: 20 },
    summary: 'Поєднуєш шкоду й захоплення беззбройним ударом; маєш Перевагу проти захопленої тобою істоти.',
    effects: [{ title: 'Удар і захоплення', text: 'Коли влучаєш в істоту беззбройним ударом як частиною дії Атака у свій хід, можеш використати обидва варіанти: Шкода й Захоплення. Можеш скористатися цим ефектом лише раз за хід.' }, { title: 'Перевага на атаки', text: 'Маєш Перевагу на кидки атаки проти істоти, яка має стан Схоплений тобою.' }, { title: 'Швидкий борець', text: 'Не мусиш витрачати додаткове переміщення, щоб рухати істоту, яка має стан Схоплений тобою, якщо істота твого розміру або менша.' }],
    conditions: ['grappled'], rules: [attack, rule('unarmed-strike', 'Беззбройний удар'), rule('attack-action', 'Дія Атака'), rule('advantage', 'Перевага'), movement] },
  { ...fighting, slug: 'archery', nameUk: 'Стрільба', nameEn: 'Archery', page: 87,
    summary: '+2 до кидків атаки далекобійною зброєю.', effects: [{ title: 'Влучність', text: 'Здобуваєш бонус +2 до кидків атаки, які здійснюєш далекобійною зброєю.' }], weaponRule: 'ranged', rules: [attack] },
  { ...fighting, slug: 'defense', nameUk: 'Захист', nameEn: 'Defense', page: 88,
    summary: '+1 до Класу захисту, поки носиш легкі, середні або важкі обладунки.',
    effects: [{ title: 'Захист в обладунках', text: 'Поки носиш легкі, середні або важкі обладунки, здобуваєш бонус +1 до Класу захисту.' }], rules: [rule('armor-class', 'Клас захисту'), rule('armor', 'Обладунки')] },
  { ...fighting, slug: 'great-weapon-fighting', nameUk: 'Бій великою зброєю', nameEn: 'Great Weapon Fighting', page: 88,
    summary: 'При атаці зброєю ближнього бою двома руками трактуєш 1 і 2 на кістках шкоди як 3.',
    effects: [{ title: 'Удар двома руками', text: 'Коли кидаєш шкоду для атаки зброєю ближнього бою, яку тримаєш двома руками, можеш трактувати будь-яку 1 або 2 на кістці шкоди як 3. Щоб отримати цей ефект, зброя повинна мати властивість Дворучна або Універсальна.' }], weaponRule: 'two-handed-melee', rules: [damage, rule('weapon-properties', 'Властивості зброї')] },
  { ...fighting, slug: 'two-weapon-fighting', nameUk: 'Бій двома зброями', nameEn: 'Two-Weapon Fighting', page: 88,
    summary: 'Додаєш модифікатор характеристики до шкоди додаткової атаки від властивості Легка.',
    effects: [{ title: 'Додаткова атака', text: 'Коли здійснюєш додаткову атаку внаслідок використання зброї з властивістю Легка, можеш додати модифікатор своєї характеристики до шкоди цієї атаки, якщо ти ще не додаєш його до шкоди.' }], weaponRule: 'light', rules: [rule('weapon-properties', 'Властивості зброї'), damage] },
  { ...boon, slug: 'boon-of-combat-prowess', nameUk: 'Благословення бойової майстерності', nameEn: 'Boon of Combat Prowess',
    summary: 'Можеш перетворити промах кидком атаки на влучання; відновлення на початку наступного ходу.',
    effects: [{ title: 'Незрівнянна влучність', text: 'Коли промахуєшся кидком атаки, можеш натомість влучити. Скориставшись цим ефектом, не можеш використати його знову до початку свого наступного ходу.' }], rules: [attack] },
  { ...boon, slug: 'boon-of-dimensional-travel', nameUk: 'Благословення міжвимірних подорожей', nameEn: 'Boon of Dimensional Travel',
    summary: 'Одразу після дії Атака або Магія можеш телепортуватися на відстань до 30 футів.',
    effects: [{ title: 'Мерехтливі кроки', text: 'Одразу після того, як виконуєш дію Атака або дію Магія, можеш телепортуватися на відстань до 30 футів у незайняте місце, яке бачиш.' }], rules: [rule('attack-action', 'Дія Атака'), rule('magic-action', 'Дія Магія'), rule('teleportation', 'Телепортація')] },
  { ...boon, slug: 'boon-of-fate', nameUk: 'Благословення долі', nameEn: 'Boon of Fate',
    summary: 'Додаєш або віднімаєш 2к4 від перевірки к20 своєї чи іншої істоти в межах 60 футів.',
    effects: [{ title: 'Зміна долі', text: 'Коли ти або інша істота в межах 60 футів від тебе успішно проходить або провалює перевірку к20, можеш кинути 2к4 й застосувати суму як бонус або штраф до кидка к20. Скориставшись цим ефектом, не можеш використати його знову, доки не кинеш Ініціативу або не завершиш короткий чи тривалий відпочинок.' }], rules: [rule('d20-tests', 'Перевірки к20'), rule('initiative', 'Ініціатива'), rule('rest', 'Відпочинок')] },
  { ...boon, slug: 'boon-of-irresistible-offense', nameUk: 'Благословення нестримного наступу', nameEn: 'Boon of Irresistible Offense', increase: { choices: ['strength', 'dexterity'], amount: 1, maximum: 30 },
    summary: 'Ігноруєш Стійкість до дробильної, колючої та рубальної шкоди; додаткова шкода при 20 на к20 атаки.',
    effects: [{ title: 'Подолання захисту', text: 'Дробильна, колюча й рубальна шкода, яку ти завдаєш, завжди ігнорує Стійкість.' }, { title: 'Нищівний удар', text: 'Коли викидаєш 20 на к20 для кидка атаки, можеш завдати цілі додаткової шкоди, що дорівнює значенню характеристики, підвищеної цією рисою. Тип додаткової шкоди збігається з типом шкоди атаки.' }], rules: [attack, rule('resistance', 'Стійкість'), rule('damage-types', 'Типи шкоди')] },
  { ...boon, slug: 'boon-of-spell-recall', nameUk: 'Благословення збереження заклять', nameEn: 'Boon of Spell Recall',
    prerequisites: [...level(19), { kind: 'feature', feature: 'spellcasting', label: 'Уміння «Накладання заклять»' }], increase: { choices: ['intelligence', 'wisdom', 'charisma'], amount: 1, maximum: 30 },
    summary: 'При накладанні закляття коміркою 1–4-го рівня кидаєш 1к4; збіг із рівнем зберігає комірку.',
    effects: [{ title: 'Безкоштовне накладання', text: 'Щоразу, коли накладаєш закляття коміркою 1–4-го рівня, кинь 1к4. Якщо число, яке викинув, збігається з рівнем комірки, комірка не витрачається.' }],
    classSlugs: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard', 'fighter', 'rogue'], classContext: 'Бард, Жрець, Друїд, Паладин, Слідопит, Чаклун і Чарівник мають уміння «Накладання заклять» у базовому класі; Воїн та Пройдисвіт — у підкласах «Містичний лицар» і «Містичний хитрун» відповідно. «Магія пакту» сама по собі не є цією передумовою.', spellSlotInteraction: { minimum: 1, maximum: 4 }, rules: [rule('spellcasting', 'Накладання заклять'), rule('spell-slots', 'Комірки заклять')] },
  { ...boon, slug: 'boon-of-the-night-spirit', nameUk: 'Благословення нічного духа', nameEn: 'Boon of the Night Spirit',
    summary: 'У тьмяному світлі чи темряві можеш стати Невидимим і маєш Стійкість до шкоди, крім психічної та променистої.',
    effects: [{ title: 'Злиття з тінями', text: 'Перебуваючи в тьмяному світлі або темряві, можеш надати собі стан Невидимий бонусною дією. Стан завершується на тобі одразу після того, як виконуєш дію, бонусну дію або Реакцію.' }, { title: 'Тіньова форма', text: 'Перебуваючи в тьмяному світлі або темряві, маєш Стійкість до всієї шкоди, крім психічної та променистої.' }], conditions: ['invisible'], rules: [rule('light', 'Світло й темрява'), rule('bonus-action', 'Бонусна дія'), rule('resistance', 'Стійкість'), rule('damage-types', 'Типи шкоди')] },
  { ...boon, slug: 'boon-of-truesight', nameUk: 'Благословення істинного зору', nameEn: 'Boon of Truesight',
    summary: 'Маєш Істинний зір із дальністю 60 футів.', effects: [{ title: 'Істинний зір', text: 'Маєш Істинний зір із дальністю 60 футів.' }], rules: [rule('truesight', 'Істинний зір')] },
  { ...base, slug: 'lucky', nameUk: 'Щасливий', nameEn: 'Lucky', category: 'origin',
    source: { origin: 'official-reference', title: 'D&D Beyond · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/posts/1801-the-12-best-feats-for-warlocks-in-the-2024-players' },
    summary: 'Очки удачі надають Перевагу на твої перевірки к20 або Невдачу на атаки проти тебе.',
    effects: [{ title: 'Очки удачі', text: 'Після тривалого відпочинку маєш кількість очок удачі, що дорівнює твоєму бонусу майстерності.' },
      { title: 'Вплив на кидок', text: 'Витрать 1 очко, коли здійснюєш перевірку к20, щоб отримати Перевагу на цей кидок. Або витрать 1 очко, коли істота кидає к20 для атаки проти тебе, щоб надати Невдачу на цей кидок атаки.' }],
    rules: [rule('d20-tests', 'Перевірки к20'), attack, rule('advantage', 'Перевага й Невдача'), rule('proficiency', 'Бонус майстерності'), rule('long-rest', 'Тривалий відпочинок')] },
  { ...base, slug: 'tough', nameUk: 'Міцний', nameEn: 'Tough', category: 'origin',
    source: { origin: 'official-reference', title: 'Wizards of the Coast · Niko · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2' },
    summary: 'Максимум хітів зростає на 2 за кожен рівень персонажа.',
    effects: [{ title: 'Додаткові хіти', text: 'Коли отримуєш рису, додай до максимуму хітів подвоєний поточний рівень персонажа. За кожен наступний здобутий рівень персонажа додай ще 2 до максимуму хітів.' }],
    rules: [rule('hit-points', 'Хіти'), rule('character-level', 'Рівень персонажа')] },
  { ...base, slug: 'healer', nameUk: 'Лікар', nameEn: 'Healer', category: 'origin',
    source: { origin: 'official-reference', title: 'Wizards of the Coast · Niko · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2' },
    summary: 'Набір лікаря дозволяє лікувати кісткою хітів цілі; одиниці на кістках лікування можна перекидати.',
    effects: [{ title: 'Лікування набором', text: 'Дією Використання витрать одне використання набору лікаря на істоту в межах 5 футів. Вона може витратити одну свою кістку хітів; ти кидаєш її, а істота відновлює хіти в кількості, що дорівнює результату плюс твій бонус майстерності.' },
      { title: 'Перекидання лікування', text: 'Коли кидаєш кістку для визначення хітів, відновлених твоїм закляттям або лікуванням набором цієї риси, можеш перекинути результат 1. Новий результат обов’язковий.' }],
    rules: [rule('utilize-action', 'Дія Використання'), rule('hit-dice', 'Кістки хітів'), rule('healing', 'Лікування'), rule('proficiency', 'Бонус майстерності')] },
  { ...base, slug: 'tavern-brawler', nameUk: 'Шинковий забіяка', nameEn: 'Tavern Brawler', category: 'origin',
    source: { origin: 'official-reference', title: 'D&D Beyond · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024' },
    summary: 'Посилюєш беззбройні удари, володієш імпровізованою зброєю та можеш відштовхувати ціль.',
    effects: [{ title: 'Беззбройний удар', text: 'При влучанні беззбройним ударом із завданням шкоди можеш завдати 1к4 + модифікатор Сили. Якщо кістка шкоди твого беззбройного удару показала 1, можеш перекинути її; новий результат обов’язковий.' },
      { title: 'Імпровізована зброя', text: 'Маєш володіння імпровізованою зброєю.' },
      { title: 'Відштовхування', text: 'Раз за хід, коли влучаєш в істоту беззбройним ударом як частиною дії Атака, можеш додатково до шкоди відштовхнути її на 5 футів від себе.' }],
    rules: [rule('unarmed-strike', 'Беззбройний удар'), rule('attack-action', 'Дія Атака'), damage, movement, rule('improvised-weapons', 'Імпровізована зброя')] },
];

export function prerequisiteLabel(value: FeatPrerequisite): string {
  if (value.kind === 'level') return `Рівень ${value.minimum}+`;
  if (value.kind === 'ability') return `${value.anyOf.map(key => featAbilities[key]).join(' або ')} ${value.minimum}+`;
  return value.label;
}
export function featPrerequisites(entry: FeatEntry): string { return entry.prerequisites.map(prerequisiteLabel).join('; '); }
export function filterFeats(query = '', category = '', prerequisite = '') {
  const search = query.trim().toLocaleLowerCase('uk');
  return officialFeats.filter(entry => (!search || [entry.nameUk, entry.nameEn, entry.slug].some(value => value.toLocaleLowerCase('uk').includes(search)))
    && (!category || entry.category === category)
    && (!prerequisite || (prerequisite === 'none' ? !entry.prerequisites.length : entry.prerequisites.some(value => value.kind === prerequisite))))
    .sort((a, b) => a.nameUk.localeCompare(b.nameUk, 'uk'));
}
export function groupFeats(entries: FeatEntry[]) {
  return Array.from(new Set(entries.map(entry => entry.nameUk[0]))).map(letter => ({ letter, entries: entries.filter(entry => entry.nameUk[0] === letter) }));
}
export function eligibleFeatSpells(entry: FeatEntry, spells: SpellEntry[]) {
  const choice = entry.spellChoice;
  const slot = entry.spellSlotInteraction;
  return spells.filter(spell => choice ? spell.level <= 1 && spell.classes.some(key => choice.lists.includes(key)) : slot ? spell.level >= slot.minimum && spell.level <= slot.maximum : false).sort((a, b) => a.level - b.level || a.nameUk.localeCompare(b.nameUk, 'uk'));
}
export function eligibleFeatWeapons(entry: FeatEntry, items: OfficialItemEntry[]) {
  return items.filter(item => {
    if (!entry.weaponRule || item.itemType !== 'зброя') return false;
    if (entry.weaponRule === 'any') return true;
    const properties = item.properties.map(property => property.scanLine?.property ?? '').join(' ').toLocaleLowerCase('uk');
    if (entry.weaponRule === 'ranged') return /далекобійн/.test(item.category);
    if (entry.weaponRule === 'light') return /легка/.test(properties);
    return /ближнього бою/.test(item.category) && /дворучна|універсальна/.test(properties);
  });
}
