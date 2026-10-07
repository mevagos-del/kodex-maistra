import type { ConditionSlug } from './conditions';
import type { SpellEntry, SpellClass } from './spells';
import type { OfficialItemEntry } from './types';

export const featCategories = { origin: 'Походження', general: 'Загальна', fightingStyle: 'Бойовий стиль', epicBoon: 'Епічне благословення' } as const;
export type FeatCategory = keyof typeof featCategories;
export const featAbilities = { strength: 'Сила', dexterity: 'Спритність', constitution: 'Статура', intelligence: 'Інтелект', wisdom: 'Мудрість', charisma: 'Харизма' } as const;
type Ability = keyof typeof featAbilities;
export type FeatPrerequisite = { kind: 'level'; minimum: number } | { kind: 'ability'; anyOf: Ability[]; minimum: number } | { kind: 'feature'; feature: string; label: string };
type Increase = { choices: Ability[]; amount: number; maximum: number; alternative?: { count: number; amount: number } };
export type FeatEntry = {
  slug: string; nameUk: string; nameEn: string; category: FeatCategory; page?: number; summary: string;
  source: FeatSource;
  prerequisites: FeatPrerequisite[]; repeatable: boolean; repeatRestriction?: string;
  effects: { title: string; text: string }[]; increase?: Increase;
  classSlugs: string[]; classContext?: string; weaponRule?: 'any' | 'melee' | 'ranged' | 'two-handed-melee' | 'light' | 'finesse' | 'heavy' | 'crossbow' | 'polearm' | 'thrown' | 'slashing';
  spellChoice?: { lists: SpellClass[]; cantrips: number; levelOne: number };
  spellRule?: { fixed?: string[]; level?: number; schools?: string[]; ritual?: boolean; context: string };
  spellSlotInteraction?: { minimum: number; maximum: number };
  conditions: ConditionSlug[]; rules: { slug: string; label: string }[];
};
export type FeatSource =
  | { origin: 'srd'; title: string; edition: 'D&D 2024'; license: 'CC-BY-4.0'; url: string }
  | { origin: 'official-reference' | 'ttg'; title: string; edition: 'D&D 2024'; presentation: 'summary'; url: string; officialTitle: string; officialUrl: string };
export const featSource: FeatSource = { origin: 'srd', title: 'SRD 5.2.1', edition: 'D&D 2024', license: 'CC-BY-4.0', url: 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf' };
const phbSource = { officialTitle: 'Player’s Handbook 2024', officialUrl: 'https://www.dndbeyond.com/sources/dnd/phb-2024' };
const phbFeatSource: FeatSource = { ...phbSource, origin: 'official-reference', title: 'Player’s Handbook 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/sources/dnd/phb-2024' };

// Working references remain auditable in data; the UI only receives official publication metadata.
export function featPublicSource(entry: FeatEntry): { title: string; url: string } {
  const source = entry.source;
  if (source.origin !== 'srd') return { title: source.officialTitle, url: source.officialUrl };
  return { title: source.title, url: entry.page ? `${source.url}#page=${entry.page}` : source.url };
}
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
const spellcastingClasses = ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard', 'fighter', 'rogue'];
const preparedBase = { ...base, source: phbFeatSource };
const asi = (choices: Ability[], maximum = 20): Increase => ({ choices, amount: 1, maximum });
const feature = (feature: string, label: string): FeatPrerequisite => ({ kind: 'feature', feature, label });
type PreparedFeat = Partial<FeatEntry> & Pick<FeatEntry, 'slug' | 'nameUk' | 'nameEn' | 'summary' | 'effects'>;
const general = (entry: PreparedFeat): FeatEntry => ({ ...preparedBase, category: 'general', ...entry } as FeatEntry);

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
    source: { ...phbSource, origin: 'official-reference', title: 'D&D Beyond · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/posts/1801-the-12-best-feats-for-warlocks-in-the-2024-players' },
    summary: 'Очки удачі надають Перевагу на твої перевірки к20 або Невдачу на атаки проти тебе.',
    effects: [{ title: 'Очки удачі', text: 'Після тривалого відпочинку маєш кількість очок удачі, що дорівнює твоєму бонусу майстерності.' },
      { title: 'Вплив на кидок', text: 'Витрать 1 очко, коли здійснюєш перевірку к20, щоб отримати Перевагу на цей кидок. Або витрать 1 очко, коли істота кидає к20 для атаки проти тебе, щоб надати Невдачу на цей кидок атаки.' }],
    rules: [rule('d20-tests', 'Перевірки к20'), attack, rule('advantage', 'Перевага й Невдача'), rule('proficiency', 'Бонус майстерності'), rule('long-rest', 'Тривалий відпочинок')] },
  { ...base, slug: 'tough', nameUk: 'Міцний', nameEn: 'Tough', category: 'origin',
    source: { ...phbSource, origin: 'official-reference', title: 'Wizards of the Coast · Niko · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2' },
    summary: 'Максимум хітів зростає на 2 за кожен рівень персонажа.',
    effects: [{ title: 'Додаткові хіти', text: 'Коли отримуєш рису, додай до максимуму хітів подвоєний поточний рівень персонажа. За кожен наступний здобутий рівень персонажа додай ще 2 до максимуму хітів.' }],
    rules: [rule('hit-points', 'Хіти'), rule('character-level', 'Рівень персонажа')] },
  { ...base, slug: 'healer', nameUk: 'Лікар', nameEn: 'Healer', category: 'origin',
    source: { ...phbSource, origin: 'official-reference', title: 'Wizards of the Coast · Niko · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2' },
    summary: 'Набір лікаря дозволяє лікувати кісткою хітів цілі; одиниці на кістках лікування можна перекидати.',
    effects: [{ title: 'Лікування набором', text: 'Дією Використання витрать одне використання набору лікаря на істоту в межах 5 футів. Вона може витратити одну свою кістку хітів; ти кидаєш її, а істота відновлює хіти в кількості, що дорівнює результату плюс твій бонус майстерності.' },
      { title: 'Перекидання лікування', text: 'Коли кидаєш кістку для визначення хітів, відновлених твоїм закляттям або лікуванням набором цієї риси, можеш перекинути результат 1. Новий результат обов’язковий.' }],
    rules: [rule('utilize-action', 'Дія Використання'), rule('hit-dice', 'Кістки хітів'), rule('healing', 'Лікування'), rule('proficiency', 'Бонус майстерності')] },
  { ...base, slug: 'tavern-brawler', nameUk: 'Шинковий забіяка', nameEn: 'Tavern Brawler', category: 'origin',
    source: { ...phbSource, origin: 'official-reference', title: 'D&D Beyond · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024' },
    summary: 'Посилюєш беззбройні удари, володієш імпровізованою зброєю та можеш відштовхувати ціль.',
    effects: [{ title: 'Беззбройний удар', text: 'При влучанні беззбройним ударом із завданням шкоди можеш завдати 1к4 + модифікатор Сили. Якщо кістка шкоди твого беззбройного удару показала 1, можеш перекинути її; новий результат обов’язковий.' },
      { title: 'Імпровізована зброя', text: 'Маєш володіння імпровізованою зброєю.' },
      { title: 'Відштовхування', text: 'Раз за хід, коли влучаєш в істоту беззбройним ударом як частиною дії Атака, можеш додатково до шкоди відштовхнути її на 5 футів від себе.' }],
    rules: [rule('unarmed-strike', 'Беззбройний удар'), rule('attack-action', 'Дія Атака'), damage, movement, rule('improvised-weapons', 'Імпровізована зброя')] },
  { ...base, slug: 'speedy', nameUk: 'Прудкий', nameEn: 'Speedy', category: 'general',
    source: { ...phbSource, origin: 'official-reference', title: 'D&D Beyond · PHB 2024', edition: 'D&D 2024', presentation: 'summary', url: 'https://www.dndbeyond.com/posts/1791-12-best-feats-for-clerics-in-the-2024-players' },
    prerequisites: [...level(4), { kind: 'ability', anyOf: ['dexterity', 'constitution'], minimum: 13 }],
    increase: { choices: ['dexterity', 'constitution'], amount: 1, maximum: 20 },
    summary: 'Швидкість зростає на 10 футів; легше пересуваєшся складною місцевістю та уникаєш провокованих атак.',
    effects: [{ title: 'Швидкість', text: 'Твоя Швидкість збільшується на 10 футів.' },
      { title: 'Спритний ривок', text: 'Коли виконуєш дію Ривок, Складна місцевість не коштує тобі додаткового переміщення протягом решти цього ходу.' },
      { title: 'Спритне переміщення', text: 'Провоковані атаки проти тебе здійснюються з Невдачею.' }],
    rules: [movement, rule('dash', 'Дія Ривок'), rule('difficult-terrain', 'Складна місцевість'), rule('opportunity-attacks', 'Провоковані атаки'), rule('advantage-disadvantage', 'Перевага та Невдача')] },
];

const preparedPhbFeats: FeatEntry[] = [
  { ...preparedBase, slug: 'crafter', nameUk: 'Майстер', nameEn: 'Crafter', category: 'origin', summary: 'Володієш трьома ремісничими інструментами, купуєш немагічні предмети зі знижкою та створюєш тимчасове спорядження.', effects: [
    { title: 'Володіння інструментами', text: 'Отримуєш володіння трьома різними ремісничими інструментами на вибір із переліку швидкого виготовлення.' },
    { title: 'Знижка', text: 'Купуючи немагічний предмет, сплачуєш на 20% менше.' },
    { title: 'Тимчасове спорядження', text: 'Наприкінці тривалого відпочинку можеш виготовити один тимчасовий предмет із переліку швидкого виготовлення, якщо маєш потрібні інструменти. Він існує до завершення наступного тривалого відпочинку, після чого руйнується.' },
  ], rules: [rule('tools', 'Ремісничі інструменти'), rule('crafting', 'Виготовлення'), rule('long-rest', 'Тривалий відпочинок')] },
  { ...preparedBase, slug: 'musician', nameUk: 'Музикант', nameEn: 'Musician', category: 'origin', summary: 'Володієш трьома музичними інструментами й надаєш союзникам Героїчне натхнення після відпочинку.', effects: [
    { title: 'Музичні інструменти', text: 'Отримуєш володіння трьома музичними інструментами на вибір.' },
    { title: 'Надихаюча пісня', text: 'Після завершення короткого або тривалого відпочинку можеш зіграти на інструменті, яким володієш, і надати Героїчне натхнення союзникам, які чують виконання. Максимальна кількість таких союзників дорівнює бонусу майстерності.' },
  ], rules: [rule('tools', 'Музичні інструменти'), rule('heroic-inspiration', 'Героїчне натхнення'), rule('rest', 'Відпочинок'), rule('proficiency', 'Бонус майстерності')] },
  general({ slug: 'actor', nameUk: 'Актор', nameEn: 'Actor', summary: 'Переконливо імітуєш особу, мовлення та інші звуки.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['charisma'], minimum: 13 }], increase: asi(['charisma']), effects: [
    { title: 'Імітація особи', text: 'Коли замаскований під реальну або вигадану особу, маєш Перевагу на перевірки Харизми (Обман і Виступ), щоб переконати інших, що ти є цією особою.' },
    { title: 'Наслідування', text: 'Можеш відтворювати звуки інших істот, зокрема мовлення. Слухач розпізнає імітацію, лише якщо його Мудрість (Проникливість) перевищить твою Харизму (Обман або Виступ).' },
  ], rules: [rule('ability-checks', 'Перевірки характеристик'), rule('advantage', 'Перевага')] }),
  general({ slug: 'athlete', nameUk: 'Атлет', nameEn: 'Athlete', summary: 'Легше лазиш, підводишся та виконуєш стрибки з розбігу.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Лазіння', text: 'Отримуєш швидкість лазіння, рівну своїй Швидкості.' },
    { title: 'Підйом', text: 'Із стану Збитий з ніг підводишся, витрачаючи 5 футів переміщення замість половини Швидкості.' },
    { title: 'Стрибок із розбігу', text: 'Для стрибка в довжину або висоту з розбігу достатньо пройти 5 футів замість 10.' },
  ], conditions: ['prone'], rules: [movement, rule('climbing', 'Лазіння'), rule('jumping', 'Стрибки')] }),
  general({ slug: 'charger', nameUk: 'Налетник', nameEn: 'Charger', summary: 'Ривок стає швидшим, а атака після прямого розгону завдає додаткової шкоди або відштовхує.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Покращений Ривок', text: 'Коли виконуєш дію Ривок, Швидкість для цієї дії збільшується на 10 футів.' },
    { title: 'Атака з розгону', text: 'Якщо безпосередньо перед влучанням атакою ближнього бою в межах дії Атака перемістився щонайменше на 10 футів по прямій до цілі, раз за хід обери: додати 1к8 до шкоди атаки або відштовхнути ціль на відстань до 10 футів.' },
  ], weaponRule: 'melee', rules: [rule('dash', 'Дія Ривок'), rule('attack-action', 'Дія Атака'), movement, damage] }),
  general({ slug: 'chef', nameUk: 'Кухар', nameEn: 'Chef', summary: 'Готуєш відновлювальні страви й тимчасові ласощі.', prerequisites: level(4), increase: asi(['constitution', 'wisdom']), effects: [
    { title: 'Кухарське приладдя', text: 'Отримуєш володіння кухарським приладдям, якщо ще не маєш.' },
    { title: 'Відновлювальна страва', text: 'Під час короткого відпочинку можеш нагодувати до 4 + бонус майстерності істот. Той, хто їсть і витрачає хоча б одну Кістку хітів, додатково відновлює 1к8 хітів.' },
    { title: 'Підбадьорливі ласощі', text: 'За 1 годину роботи або після тривалого відпочинку створюєш кількість ласощів, рівну бонусу майстерності. Вони існують 8 годин; бонусною дією істота може з’їсти одне й отримати тимчасові хіти, рівні твоєму бонусу майстерності.' },
  ], rules: [rule('tools', 'Кухарське приладдя'), rule('rest', 'Відпочинок'), rule('hit-dice', 'Кістки хітів'), rule('temporary-hit-points', 'Тимчасові хіти')] }),
  general({ slug: 'crossbow-expert', nameUk: 'Експерт з арбалета', nameEn: 'Crossbow Expert', summary: 'Ігноруєш Заряджання арбалетів, стріляєш зблизька без Невдачі й посилюєш додаткову атаку легким арбалетом.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['dexterity'], minimum: 13 }], increase: asi(['dexterity']), effects: [
    { title: 'Заряджання', text: 'Ігноруєш властивість Заряджання арбалетів.' },
    { title: 'Стрільба зблизька', text: 'Ворог у межах 5 футів не накладає Невдачу на твої атаки арбалетом.' },
    { title: 'Подвійний постріл', text: 'Коли робиш додаткову атаку від властивості Легка і вона виконується легким арбалетом, можеш додати модифікатор характеристики до шкоди цієї атаки.' },
  ], weaponRule: 'crossbow', rules: [attack, damage, rule('weapon-properties', 'Властивості зброї')] }),
  general({ slug: 'crusher', nameUk: 'Крушитель', nameEn: 'Crusher', summary: 'Дробильні удари переміщують цілі та відкривають їх для атак після критичного влучання.', prerequisites: level(4), increase: asi(['strength', 'constitution']), effects: [
    { title: 'Переміщення цілі', text: 'Раз за хід після влучання атакою з дробильною шкодою можеш перемістити ціль на 5 футів у вільне місце, якщо вона не більш ніж на один розмір більша за тебе.' },
    { title: 'Критичне влучання', text: 'Після критичного влучання з дробильною шкодою атаки проти цієї істоти мають Перевагу до початку твого наступного ходу.' },
  ], rules: [attack, damage, movement, rule('critical-hits', 'Критичні влучання'), rule('advantage', 'Перевага')] }),
  general({ slug: 'defensive-duelist', nameUk: 'Оборонний дуелянт', nameEn: 'Defensive Duelist', summary: 'Фехтувальною зброєю Реакцією підвищуєш Клас захисту проти атак ближнього бою.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['dexterity'], minimum: 13 }], increase: asi(['dexterity']), effects: [
    { title: 'Парирування', text: 'Якщо тримаєш фехтувальну зброю й по тобі влучають атакою ближнього бою, Реакцією додаєш бонус майстерності до Класу захисту. Бонус діє проти атак ближнього бою до початку твого наступного ходу та може перетворити влучання на промах.' },
  ], weaponRule: 'finesse', rules: [attack, rule('reaction', 'Реакція'), rule('armor-class', 'Клас захисту'), rule('proficiency', 'Бонус майстерності')] }),
  general({ slug: 'dual-wielder', nameUk: 'Боєць двома зброями', nameEn: 'Dual Wielder', summary: 'Виконуєш додаткову атаку другою одноручною зброєю та швидше змінюєш дві зброї.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Подвійна атака', text: 'Коли в межах дії Атака атакуєш зброєю з властивістю Легка, можеш здійснити одну додаткову атаку іншою одноручною зброєю ближнього бою без властивості Дворучна. Модифікатор характеристики до її шкоди не додається, якщо він не від’ємний.' },
    { title: 'Швидке озброєння', text: 'Коли зазвичай можеш дістати або сховати одну недворучну зброю, можеш натомість дістати або сховати дві.' },
  ], weaponRule: 'melee', rules: [rule('attack-action', 'Дія Атака'), rule('weapon-properties', 'Властивості зброї')] }),
  general({ slug: 'durable', nameUk: 'Витривалий', nameEn: 'Durable', summary: 'Маєш Перевагу на ряткидки від смерті й можеш лікуватися Кісткою хітів бонусною дією.', prerequisites: level(4), increase: asi(['constitution']), effects: [
    { title: 'Ряткидки від смерті', text: 'Маєш Перевагу на ряткидки від смерті.' },
    { title: 'Відновлення', text: 'Бонусною дією можеш витратити одну Кістку хітів, кинути її та відновити хіти в кількості, рівній результату.' },
  ], rules: [rule('death-saves', 'Ряткидки від смерті'), rule('advantage', 'Перевага'), rule('bonus-action', 'Бонусна дія'), rule('hit-dice', 'Кістки хітів')] }),
  general({ slug: 'elemental-adept', nameUk: 'Адепт стихії', nameEn: 'Elemental Adept', summary: 'Обраний тип стихійної шкоди заклять ігнорує Стійкість, а одиниці на кістках стають двійками.', prerequisites: [...level(4), feature('spellcasting-or-pact', 'Уміння «Накладання заклять» або «Магія пакту»')], increase: asi(['intelligence', 'wisdom', 'charisma']), repeatable: true, repeatRestriction: 'Щоразу потрібно обирати інший тип шкоди.', effects: [
    { title: 'Обрана стихія', text: 'Обери кислотну, холодну, вогняну, блискавичну або громову шкоду.' },
    { title: 'Подолання стійкості', text: 'Твої закляття ігнорують Стійкість до обраного типу шкоди.' },
    { title: 'Стабільна шкода', text: 'На кістках шкоди заклять обраного типу кожну 1 можеш трактувати як 2.' },
  ], classSlugs: spellcastingClasses, classContext: 'Класи з умінням «Накладання заклять» або «Магія пакту», включно з відповідними підкласами.', rules: [rule('spellcasting', 'Накладання заклять'), rule('resistance', 'Стійкість'), rule('damage-types', 'Типи шкоди')] }),
  general({ slug: 'fey-touched', nameUk: 'Торкнутий феями', nameEn: 'Fey-Touched', summary: 'Завжди маєш Туманний крок і вибране закляття Віщування або Зачарування 1-го рівня.', prerequisites: level(4), increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Фейська магія', text: 'Завжди маєш підготовленими Туманний крок та одне закляття 1-го рівня зі школи Віщування або Зачарування. Кожне з них можеш один раз накласти без комірки; обидва використання відновлюються після тривалого відпочинку. Також можеш накладати їх відповідними комірками. Заклинальна характеристика — та, яку підвищено цією рисою.' },
  ], spellRule: { fixed: ['misty-step'], level: 1, schools: ['Віщування', 'Зачарування'], context: 'Туманний крок є фіксованим закляттям; додатково обирається одне закляття 1-го рівня зі школи Віщування або Зачарування.' }, rules: [rule('spellcasting', 'Накладання заклять'), rule('spell-slots', 'Комірки заклять'), rule('long-rest', 'Тривалий відпочинок')] }),
  general({ slug: 'great-weapon-master', nameUk: 'Майстер великої зброї', nameEn: 'Great Weapon Master', summary: 'Важкі удари додають бонус майстерності до шкоди, а критичне влучання або добивання дає бонусну атаку.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength'], minimum: 13 }], increase: asi(['strength']), effects: [
    { title: 'Майстер важкої зброї', text: 'Коли у свій хід влучаєш зброєю з властивістю Важка як частиною дії Атака, додаєш до шкоди значення бонусу майстерності.' },
    { title: 'Рубання', text: 'Одразу після критичного влучання зброєю ближнього бою або зменшення хітів істоти до 0 такою зброєю можеш бонусною дією здійснити ще одну атаку тією самою зброєю.' },
  ], weaponRule: 'heavy', rules: [rule('attack-action', 'Дія Атака'), attack, damage, rule('critical-hits', 'Критичні влучання'), rule('bonus-action', 'Бонусна дія')] }),
  general({ slug: 'heavily-armored', nameUk: 'Знаток важких обладунків', nameEn: 'Heavily Armored', summary: 'Отримуєш тренування з важкими обладунками.', prerequisites: [...level(4), feature('medium-armor-training', 'Тренування із середніми обладунками')], increase: asi(['strength', 'constitution']), effects: [{ title: 'Тренування', text: 'Отримуєш тренування з важкими обладунками.' }], rules: [rule('armor', 'Обладунки')] }),
  general({ slug: 'heavy-armor-master', nameUk: 'Майстер важких обладунків', nameEn: 'Heavy Armor Master', summary: 'Важкі обладунки зменшують фізичну шкоду на бонус майстерності.', prerequisites: [...level(4), feature('heavy-armor-training', 'Тренування з важкими обладунками')], increase: asi(['strength', 'constitution']), effects: [{ title: 'Зменшення шкоди', text: 'Поки носиш важкі обладунки, дробильна, колюча та рубальна шкода, яку отримуєш, зменшується на величину бонусу майстерності.' }], rules: [rule('armor', 'Обладунки'), damage, rule('proficiency', 'Бонус майстерності')] }),
  general({ slug: 'inspiring-leader', nameUk: 'Надихаючий лідер', nameEn: 'Inspiring Leader', summary: 'Після відпочинку надаєш тимчасові хіти до шести дружнім істотам.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['wisdom', 'charisma'], minimum: 13 }], increase: asi(['wisdom', 'charisma']), effects: [{ title: 'Надихаючий виступ', text: 'Наприкінці короткого або тривалого відпочинку можеш надихнути до шести дружніх істот, включно із собою, у межах 30 футів, які сприймають виступ. Кожна отримує тимчасові хіти, рівні твоєму рівню персонажа + модифікатору характеристики, підвищеної цією рисою.' }], rules: [rule('rest', 'Відпочинок'), rule('temporary-hit-points', 'Тимчасові хіти'), rule('character-level', 'Рівень персонажа')] }),
  general({ slug: 'keen-mind', nameUk: 'Гострий розум', nameEn: 'Keen Mind', summary: 'Здобуваєш володіння або Експертизу в інтелектуальній навичці та виконуєш Вивчення бонусною дією.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['intelligence'], minimum: 13 }], increase: asi(['intelligence']), effects: [
    { title: 'Знання', text: 'Обери Аркану, Історію, Розслідування, Природу або Релігію. Якщо не володієш навичкою — отримуєш володіння; якщо вже володієш — отримуєш Експертизу.' },
    { title: 'Швидке вивчення', text: 'Можеш виконувати дію Вивчення бонусною дією.' },
  ], rules: [rule('skills', 'Навички'), rule('expertise', 'Експертиза'), rule('study-action', 'Дія Вивчення'), rule('bonus-action', 'Бонусна дія')] }),
  general({ slug: 'lightly-armored', nameUk: 'Знаток легких обладунків', nameEn: 'Lightly Armored', summary: 'Отримуєш тренування з легкими обладунками та щитами.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [{ title: 'Тренування', text: 'Отримуєш тренування з легкими обладунками та щитами.' }], rules: [rule('armor', 'Обладунки'), rule('shields', 'Щити')] }),
  general({ slug: 'mage-slayer', nameUk: 'Вбивця магів', nameEn: 'Mage Slayer', summary: 'Ускладнюєш збереження Концентрації ворога й захищаєшся від заклять Реакцією.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Порушення Концентрації', text: 'Коли завдаєш шкоди істоті, яка підтримує Концентрацію, вона має Невдачу на ряткидок для збереження Концентрації.' },
    { title: 'Захист від магії', text: 'Коли видима тобою істота в межах 60 футів накладає закляття, що вимагає ряткидка, можеш Реакцією надати собі Перевагу на цей ряткидок. Кількість використань дорівнює бонусу майстерності; усі відновлюються після тривалого відпочинку.' },
  ], rules: [damage, rule('concentration', 'Концентрація'), rule('saving-throws', 'Ряткидки'), rule('reaction', 'Реакція'), rule('long-rest', 'Тривалий відпочинок')] }),
  general({ slug: 'martial-weapon-training', nameUk: 'Тренування з бойовою зброєю', nameEn: 'Martial Weapon Training', summary: 'Отримуєш володіння бойовою зброєю.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [{ title: 'Володіння', text: 'Отримуєш володіння бойовою зброєю.' }], weaponRule: 'any', rules: [rule('weapon-proficiency', 'Володіння зброєю')] }),
  general({ slug: 'medium-armor-master', nameUk: 'Майстер середніх обладунків', nameEn: 'Medium Armor Master', summary: 'Середні обладунки дозволяють використати до +3 від Спритності для Класу захисту.', prerequisites: [...level(4), feature('medium-armor-training', 'Тренування із середніми обладунками')], increase: asi(['strength', 'dexterity']), effects: [{ title: 'Покращений захист', text: 'Поки носиш середні обладунки, можеш додати до Класу захисту до +3 від Спритності замість +2, якщо твоя Спритність 16 або більше.' }], rules: [rule('armor', 'Обладунки'), rule('armor-class', 'Клас захисту')] }),
  general({ slug: 'moderately-armored', nameUk: 'Знаток середніх обладунків', nameEn: 'Moderately Armored', summary: 'Отримуєш тренування із середніми обладунками.', prerequisites: [...level(4), feature('light-armor-training', 'Тренування з легкими обладунками')], increase: asi(['strength', 'dexterity']), effects: [{ title: 'Тренування', text: 'Отримуєш тренування із середніми обладунками.' }], rules: [rule('armor', 'Обладунки')] }),
  general({ slug: 'mounted-combatant', nameUk: 'Верховий боєць', nameEn: 'Mounted Combatant', summary: 'Захищаєш скакуна й ефективніше атакуєш менших піших ворогів.', prerequisites: level(4), increase: asi(['strength', 'dexterity', 'wisdom']), effects: [
    { title: 'Перевага верхи', text: 'Поки ти верхи, маєш Перевагу на атаки проти пішої істоти в межах 5 футів від скакуна, якщо вона щонайменше на один розмір менша за нього.' },
    { title: 'Ухилення скакуна', text: 'Якщо скакун робить ряткидок Спритності, що зазвичай дає половину шкоди, він не отримує шкоди при успіху й отримує половину при провалі. Потрібно бути верхи; ні ти, ні скакун не повинні бути Недієздатними.' },
    { title: 'Перенаправлення атаки', text: 'Поки ти верхи й не Недієздатний, можеш перенаправити на себе атаку, спрямовану на скакуна.' },
  ], conditions: ['incapacitated'], rules: [attack, rule('mounted-combat', 'Верховий бій'), rule('saving-throws', 'Ряткидки'), rule('advantage', 'Перевага')] }),
  general({ slug: 'observant', nameUk: 'Спостережливий', nameEn: 'Observant', summary: 'Здобуваєш володіння або Експертизу в навичці спостереження та виконуєш Пошук бонусною дією.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['intelligence', 'wisdom'], minimum: 13 }], increase: asi(['intelligence', 'wisdom']), effects: [
    { title: 'Спостережливість', text: 'Обери Проникливість, Розслідування або Сприйняття. Якщо не володієш навичкою — отримуєш володіння; якщо вже володієш — отримуєш Експертизу.' },
    { title: 'Швидкий пошук', text: 'Можеш виконувати дію Пошук бонусною дією.' },
  ], rules: [rule('skills', 'Навички'), rule('expertise', 'Експертиза'), rule('search-action', 'Дія Пошук'), rule('bonus-action', 'Бонусна дія')] }),
  general({ slug: 'piercer', nameUk: 'Проколювач', nameEn: 'Piercer', summary: 'Покращуєш колючу шкоду перекиданням кістки й додатковою кісткою при критичному влучанні.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Перекидання шкоди', text: 'Раз за хід після влучання атакою з колючою шкодою можеш перекинути одну кістку колючої шкоди цієї атаки й використати кращий результат.' },
    { title: 'Критичний прокол', text: 'При критичному влучанні з колючою шкодою кидаєш одну додаткову кістку колючої шкоди для визначення додаткової шкоди критичного влучання.' },
  ], rules: [attack, damage, rule('critical-hits', 'Критичні влучання')] }),
  general({ slug: 'poisoner', nameUk: 'Отруйник', nameEn: 'Poisoner', summary: 'Ігноруєш Стійкість до отруйної шкоди та виготовляєш дієву отруту для зброї.', prerequisites: level(4), increase: asi(['dexterity', 'intelligence']), effects: [
    { title: 'Отруйна шкода', text: 'Коли кидаєш отруйну шкоду, вона ігнорує Стійкість до отруйної шкоди.' },
    { title: 'Виготовлення отрути', text: 'Отримуєш володіння набором отруйника. За 1 годину роботи та 50 зм матеріалів створюєш кількість доз, рівну бонусу майстерності.' },
    { title: 'Застосування отрути', text: 'Бонусною дією наносиш дозу на зброю або боєприпас. Після отримання шкоди від отруєної зброї чи боєприпасу ціль робить ряткидок Статури проти КС 8 + модифікатор характеристики, підвищеної рисою, + бонус майстерності. При провалі отримує 2к8 отруйної шкоди й стан Отруєний до кінця твого наступного ходу.' },
  ], conditions: ['poisoned'], rules: [rule('resistance', 'Стійкість'), damage, rule('tools', 'Набір отруйника'), rule('saving-throws', 'Ряткидки'), rule('bonus-action', 'Бонусна дія')] }),
  general({ slug: 'polearm-master', nameUk: 'Майстер древкової зброї', nameEn: 'Polearm Master', summary: 'Атакуєш протилежним кінцем древкової зброї та зустрічаєш ворогів, які входять у досяжність.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Атака протилежним кінцем', text: 'Коли виконуєш дію Атака й атакуєш бойовим посохом, списом або зброєю з властивостями Важка й Досяжність, можеш бонусною дією атакувати протилежним кінцем; при влучанні завдаєш 1к4 дробильної шкоди.' },
    { title: 'Зустрічна атака', text: 'Поки тримаєш таку зброю, можеш Реакцією здійснити атаку ближнього бою по істоті, яка входить у твою досяжність цією зброєю.' },
  ], weaponRule: 'polearm', rules: [rule('attack-action', 'Дія Атака'), rule('bonus-action', 'Бонусна дія'), rule('reaction', 'Реакція'), rule('reach', 'Досяжність')] }),
  general({ slug: 'resilient', nameUk: 'Стійкий', nameEn: 'Resilient', summary: 'Підвищуєш характеристику й отримуєш володіння її ряткидками.', prerequisites: level(4), increase: asi(allAbilities), effects: [{ title: 'Стійкість', text: 'Підвищ характеристику, для ряткидків якої ще не маєш володіння, на 1 до максимуму 20. Отримуєш володіння ряткидками обраної характеристики.' }], rules: [rule('saving-throws', 'Ряткидки'), rule('proficiency', 'Володіння')] }),
  general({ slug: 'ritual-caster', nameUk: 'Ритуальний заклинач', nameEn: 'Ritual Caster', summary: 'Готуєш ритуальні закляття 1-го рівня та раз за тривалий відпочинок накладаєш ритуал зі звичайним часом.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['intelligence', 'wisdom', 'charisma'], minimum: 13 }], increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Ритуальні закляття', text: 'Маєш підготовленими кількість заклять 1-го рівня з тегом Ритуал, рівну бонусу майстерності. Після тривалого відпочинку можеш змінити ці закляття, вивчаючи записи щонайменше 1 хвилину за рівень кожного зміненого закляття.' },
    { title: 'Швидкий ритуал', text: 'Один раз можеш накласти одне зі своїх ритуальних заклять зі звичайним часом накладання, не додаючи 10 хвилин; використання відновлюється після тривалого відпочинку. Заклинальна характеристика — та, яку підвищено цією рисою.' },
  ], spellRule: { level: 1, ritual: true, context: 'Обирається кількість заклять 1-го рівня з тегом Ритуал, рівна бонусу майстерності.' }, rules: [rule('ritual', 'Ритуальне накладання'), rule('spellcasting', 'Накладання заклять'), rule('long-rest', 'Тривалий відпочинок')] }),
  general({ slug: 'sentinel', nameUk: 'Вартовий', nameEn: 'Sentinel', summary: 'Караєш ворогів за Відхід або атаку союзника й зупиняєш їх Провокованою атакою.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['strength', 'dexterity'], minimum: 13 }], increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Атака вартового', text: 'Одразу після того, як істота в межах 5 футів від тебе виконує Відхід або влучає атакою по іншій цілі, можеш здійснити по цій істоті Провоковану атаку.' },
    { title: 'Зупинка', text: 'Коли влучаєш Провокованою атакою, Швидкість цілі стає 0 до кінця поточного ходу.' },
  ], rules: [rule('disengage', 'Дія Відхід'), rule('opportunity-attacks', 'Провоковані атаки'), movement] }),
  general({ slug: 'shadow-touched', nameUk: 'Торкнутий тінню', nameEn: 'Shadow-Touched', summary: 'Завжди маєш Невидимість і вибране закляття Ілюзії або Некромантії 1-го рівня.', prerequisites: level(4), increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Тіньова магія', text: 'Завжди маєш підготовленими Невидимість та одне закляття 1-го рівня зі школи Ілюзія або Некромантія. Кожне можеш один раз накласти без витрати комірки; використання відновлюються після тривалого відпочинку. Також можеш накладати їх відповідними комірками. Заклинальна характеристика — та, яку підвищено цією рисою.' },
  ], spellRule: { fixed: ['invisibility'], level: 1, schools: ['Ілюзія', 'Некромантія'], context: 'Невидимість є фіксованим закляттям; додатково обирається одне закляття 1-го рівня зі школи Ілюзія або Некромантія.' }, conditions: ['invisible'], rules: [rule('spellcasting', 'Накладання заклять'), rule('spell-slots', 'Комірки заклять'), rule('long-rest', 'Тривалий відпочинок')] }),
  general({ slug: 'sharpshooter', nameUk: 'Влучний стрілець', nameEn: 'Sharpshooter', summary: 'Далекобійні атаки зброєю ігнорують укриття, близького ворога й далеку дистанцію.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['dexterity'], minimum: 13 }], increase: asi(['dexterity']), effects: [
    { title: 'Обхід укриття', text: 'Далекобійні атаки зброєю ігнорують половинне та три чверті укриття.' },
    { title: 'Стрільба зблизька', text: 'Ворог у межах 5 футів не накладає Невдачу на твої далекобійні атаки зброєю.' },
    { title: 'Далека дистанція', text: 'Атака на далекій дистанції не накладає Невдачу на далекобійні атаки зброєю.' },
  ], weaponRule: 'ranged', rules: [attack, rule('cover', 'Укриття'), rule('weapon-range', 'Дистанція зброї')] }),
  general({ slug: 'shield-master', nameUk: 'Майстер щита', nameEn: 'Shield Master', summary: 'Щитом відштовхуєш або збиваєш ворога й уникаєш усієї шкоди після успішного ряткидка Спритності.', prerequisites: [...level(4), feature('shield-training', 'Тренування зі щитами')], increase: asi(['strength']), effects: [
    { title: 'Удар щитом', text: 'Якщо в межах дії Атака влучаєш зброєю ближнього бою по істоті в межах 5 футів і тримаєш щит, раз за хід можеш змусити її зробити ряткидок Сили проти КС 8 + модифікатор Сили + бонус майстерності. При провалі обираєш: відштовхнути на 5 футів або надати стан Збитий з ніг.' },
    { title: 'Ухилення', text: 'Коли ефект дозволяє ряткидок Спритності для половини шкоди, можеш Реакцією не отримати шкоди при успішному ряткидку.' },
  ], conditions: ['prone'], rules: [rule('shields', 'Щити'), rule('attack-action', 'Дія Атака'), rule('saving-throws', 'Ряткидки'), rule('reaction', 'Реакція')] }),
  general({ slug: 'skill-expert', nameUk: 'Експерт навичок', nameEn: 'Skill Expert', summary: 'Здобуваєш володіння однією навичкою й Експертизу в іншій відомій навичці.', prerequisites: level(4), increase: asi(allAbilities), effects: [
    { title: 'Нова навичка', text: 'Отримуєш володіння однією навичкою на вибір.' },
    { title: 'Експертиза', text: 'Обираєш одну навичку, якою володієш, але в якій ще не маєш Експертизи, і отримуєш Експертизу.' },
  ], rules: [rule('skills', 'Навички'), rule('expertise', 'Експертиза')] }),
  general({ slug: 'skulker', nameUk: 'Скритник', nameEn: 'Skulker', summary: 'Отримуєш Сліпозір, краще ховаєшся в бою й не втрачаєш прихованість через промах.', prerequisites: [...level(4), { kind: 'ability', anyOf: ['dexterity'], minimum: 13 }], increase: asi(['dexterity']), effects: [
    { title: 'Сліпозір', text: 'Отримуєш Сліпозір у радіусі 10 футів.' },
    { title: 'Скритність у бою', text: 'Під час бою маєш Перевагу на перевірки Спритності (Скритність), які робиш як частину дії Сховатися.' },
    { title: 'Прихована атака', text: 'Якщо робиш атаку, перебуваючи Прихованим, і промахуєшся, сама ця атака не завершує на тобі стан Прихований.' },
  ], rules: [rule('blindsight', 'Сліпозір'), rule('hide-action', 'Дія Сховатися'), rule('hidden', 'Прихований'), rule('advantage', 'Перевага')] }),
  general({ slug: 'slasher', nameUk: 'Рубака', nameEn: 'Slasher', summary: 'Рубальні удари сповільнюють ціль, а критичні влучання накладають Невдачу на її атаки.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [
    { title: 'Сповільнення', text: 'Раз за хід після влучання атакою з рубальною шкодою можеш зменшити Швидкість цілі на 10 футів до початку твого наступного ходу.' },
    { title: 'Критичне послаблення', text: 'Після критичного влучання з рубальною шкодою ціль має Невдачу на кидки атаки до початку твого наступного ходу.' },
  ], weaponRule: 'slashing', rules: [attack, damage, movement, rule('critical-hits', 'Критичні влучання')] }),
  general({ slug: 'spell-sniper', nameUk: 'Снайпер заклять', nameEn: 'Spell Sniper', summary: 'Атаки закляттями ігнорують укриття й близьких ворогів, а їхня дальність збільшується.', prerequisites: [...level(4), feature('spellcasting-or-pact', 'Уміння «Накладання заклять» або «Магія пакту»')], increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Обхід укриття', text: 'Кидки атаки закляттями ігнорують половинне та три чверті укриття.' },
    { title: 'Ближній ворог', text: 'Ворог у межах 5 футів не накладає Невдачу на кидки атаки закляттями.' },
    { title: 'Збільшена дальність', text: 'Для закляття з дальністю щонайменше 10 футів, яке вимагає кидка атаки, можеш збільшити дальність на 60 футів.' },
  ], classSlugs: spellcastingClasses, classContext: 'Класи з умінням «Накладання заклять» або «Магія пакту», включно з відповідними підкласами.', rules: [rule('spell-attacks', 'Атаки закляттями'), rule('cover', 'Укриття'), rule('spell-range', 'Дальність закляття')] }),
  general({ slug: 'telekinetic', nameUk: 'Телекінетик', nameEn: 'Telekinetic', summary: 'Покращуєш Руку мага й бонусною дією пересуваєш істоту телекінезом.', prerequisites: level(4), increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Рука мага', text: 'Вивчаєш Руку мага. Накладаєш її без вербального та соматичного компонентів; рука невидима, дальність збільшується на 30 футів. Якщо вже знаєш це замовляння, просто збільшуєш його дальність на 30 футів.' },
    { title: 'Телекінетичний поштовх', text: 'Бонусною дією обираєш видиму істоту в межах 30 футів. Вона робить ряткидок Сили проти КС 8 + модифікатор характеристики, підвищеної рисою, + бонус майстерності; при провалі переміщується на 5 футів до тебе або від тебе.' },
  ], spellRule: { fixed: ['mage-hand'], context: 'Риса надає та змінює саме замовляння «Рука мага».' }, rules: [rule('spellcasting', 'Накладання заклять'), rule('bonus-action', 'Бонусна дія'), rule('saving-throws', 'Ряткидки'), movement] }),
  general({ slug: 'telepathic', nameUk: 'Телепат', nameEn: 'Telepathic', summary: 'Говориш телепатично й завжди маєш підготовленим Читання думок.', prerequisites: level(4), increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Телепатичне мовлення', text: 'Можеш телепатично говорити з видимою істотою в межах 60 футів мовою, яку знаєш. Ціль розуміє лише якщо знає цю мову; відповідати телепатично ця риса не дозволяє.' },
    { title: 'Читання думок', text: 'Завжди маєш Читання думок підготовленим. Один раз можеш накласти його без комірки й компонентів; використання відновлюється після тривалого відпочинку. Також можеш накладати його відповідними комірками.' },
  ], spellRule: { fixed: ['detect-thoughts'], context: 'Риса надає саме закляття «Читання думок».' }, rules: [rule('telepathy', 'Телепатія'), rule('spellcasting', 'Накладання заклять'), rule('long-rest', 'Тривалий відпочинок')] }),
  general({ slug: 'war-caster', nameUk: 'Бойовий заклинач', nameEn: 'War Caster', summary: 'Краще підтримуєш Концентрацію, накладаєш закляття замість Провокованої атаки й виконуєш соматичні компоненти зі зброєю чи щитом.', prerequisites: [...level(4), feature('spellcasting-or-pact', 'Уміння «Накладання заклять» або «Магія пакту»')], increase: asi(['intelligence', 'wisdom', 'charisma']), effects: [
    { title: 'Концентрація', text: 'Маєш Перевагу на ряткидки Статури для підтримання Концентрації.' },
    { title: 'Реактивне закляття', text: 'Коли істота провокує від тебе Провоковану атаку, залишаючи твою досяжність, можеш Реакцією замість атаки накласти на неї закляття з часом накладання 1 дія, яке націлюється лише на цю істоту.' },
    { title: 'Соматичні компоненти', text: 'Можеш виконувати соматичні компоненти заклять, навіть коли тримаєш зброю або щит в одній чи обох руках.' },
  ], classSlugs: spellcastingClasses, classContext: 'Класи з умінням «Накладання заклять» або «Магія пакту», включно з відповідними підкласами.', rules: [rule('concentration', 'Концентрація'), rule('saving-throws', 'Ряткидки'), rule('opportunity-attacks', 'Провоковані атаки'), rule('reaction', 'Реакція'), rule('spell-components', 'Компоненти заклять')] }),
  general({ slug: 'weapon-master', nameUk: 'Майстер зброї', nameEn: 'Weapon Master', summary: 'Обираєш відомий вид зброї й використовуєш його властивість Майстерності.', prerequisites: level(4), increase: asi(['strength', 'dexterity']), effects: [{ title: 'Властивість Майстерності', text: 'Обери один вид простої або бойової зброї, яким володієш. Отримуєш можливість використовувати його властивість Майстерності. Після тривалого відпочинку можеш змінити вибір на інший відповідний вид зброї.' }], weaponRule: 'any', rules: [rule('weapon-mastery', 'Майстерність зброї'), rule('weapon-proficiency', 'Володіння зброєю'), rule('long-rest', 'Тривалий відпочинок')] }),
  { ...fighting, source: phbFeatSource, slug: 'blind-fighting', nameUk: 'Бій наосліп', nameEn: 'Blind Fighting', summary: 'Маєш Сліпозір у радіусі 10 футів.', effects: [{ title: 'Сліпозір', text: 'Маєш Сліпозір у радіусі 10 футів.' }], rules: [rule('blindsight', 'Сліпозір')] },
  { ...fighting, source: phbFeatSource, slug: 'dueling', nameUk: 'Дуелянт', nameEn: 'Dueling', summary: '+2 до шкоди зброєю ближнього бою, яку тримаєш в одній руці без іншої зброї.', effects: [{ title: 'Одноручний бій', text: 'Коли тримаєш зброю ближнього бою в одній руці й не тримаєш іншої зброї, отримуєш +2 до кидків шкоди цією зброєю.' }], weaponRule: 'melee', rules: [damage] },
  { ...fighting, source: phbFeatSource, slug: 'interception', nameUk: 'Перехоплення', nameEn: 'Interception', summary: 'Реакцією зменшуєш шкоду по союзнику в межах 5 футів.', effects: [{ title: 'Перехоплення удару', text: 'Коли видима тобою істота влучає атакою по іншій істоті в межах 5 футів від тебе, можеш Реакцією зменшити завдану їй шкоду на 1к10 + бонус майстерності. Для цього потрібно тримати щит або просту чи бойову зброю.' }], rules: [rule('reaction', 'Реакція'), damage, rule('shields', 'Щити'), rule('proficiency', 'Бонус майстерності')] },
  { ...fighting, source: phbFeatSource, slug: 'protection', nameUk: 'Захист союзника', nameEn: 'Protection', summary: 'Щитом Реакцією накладаєш Невдачу на атаки проти сусіднього союзника.', effects: [{ title: 'Підставити щит', text: 'Коли видима тобою істота атакує іншу істоту в межах 5 футів від тебе, можеш Реакцією підставити щит. Усі кидки атаки проти цього союзника мають Невдачу до початку твого наступного ходу. Потрібно тримати щит.' }], rules: [rule('reaction', 'Реакція'), attack, rule('advantage-disadvantage', 'Перевага та Невдача'), rule('shields', 'Щити')] },
  { ...fighting, source: phbFeatSource, slug: 'thrown-weapon-fighting', nameUk: 'Бій метальною зброєю', nameEn: 'Thrown Weapon Fighting', summary: '+2 до шкоди далекобійною атакою метальною зброєю.', effects: [{ title: 'Метальний удар', text: 'Коли влучаєш далекобійною атакою зброєю з властивістю Метальна, отримуєш +2 до кидка шкоди.' }], weaponRule: 'thrown', rules: [attack, damage, rule('weapon-properties', 'Властивості зброї')] },
  { ...fighting, source: phbFeatSource, slug: 'unarmed-fighting', nameUk: 'Беззбройний бій', nameEn: 'Unarmed Fighting', summary: 'Посилюєш Беззбройні удари та завдаєш шкоди істоті, яку Схопив.', effects: [
    { title: 'Беззбройна шкода', text: 'Після влучання Беззбройним ударом можеш завдати 1к6 + модифікатор Сили дробильної шкоди замість звичайної шкоди. Якщо під час атаки не тримаєш ні зброї, ні щита, к6 стає к8.' },
    { title: 'Шкода захопленій цілі', text: 'На початку кожного свого ходу можеш завдати 1к4 дробильної шкоди одній істоті, яку ти Схопив.' },
  ], conditions: ['grappled'], rules: [rule('unarmed-strike', 'Беззбройний удар'), damage, rule('shields', 'Щити')] },
  { ...boon, source: phbFeatSource, page: undefined, slug: 'boon-of-energy-resistance', nameUk: 'Епічне благословення стійкості до енергії', nameEn: 'Boon of Energy Resistance', summary: 'Отримуєш дві змінні Стійкості до енергії й Реакцією перенаправляєш отриману шкоду.', effects: [
    { title: 'Стійкість до енергії', text: 'Обери два типи: кислотна, холодна, вогняна, блискавична, некротична, отруйна, психічна, промениста або громова шкода. Маєш Стійкість до обох; після тривалого відпочинку можеш змінити вибір.' },
    { title: 'Перенаправлення енергії', text: 'Коли отримуєш шкоду одного з обраних типів, можеш Реакцією спрямувати енергію в іншу видиму істоту в межах 60 футів без повного укриття. Вона робить ряткидок Спритності проти КС 8 + модифікатор Статури + бонус майстерності; при провалі отримує 2к12 + модифікатор Статури шкоди того самого типу.' },
  ], rules: [rule('resistance', 'Стійкість'), rule('damage-types', 'Типи шкоди'), rule('reaction', 'Реакція'), rule('saving-throws', 'Ряткидки'), rule('cover', 'Укриття')] },
  { ...boon, source: phbFeatSource, page: undefined, slug: 'boon-of-fortitude', nameUk: 'Епічне благословення витривалості', nameEn: 'Boon of Fortitude', summary: 'Максимум хітів зростає на 40, а лікування раз за хід додає модифікатор Статури.', effects: [
    { title: 'Надзвичайна витривалість', text: 'Максимум хітів збільшується на 40.' },
    { title: 'Посилене відновлення', text: 'Коли відновлюєш хіти, можеш додатково відновити кількість, рівну модифікатору Статури. Після використання цього додаткового відновлення не можеш повторити його до початку свого наступного ходу.' },
  ], rules: [rule('hit-points', 'Хіти'), rule('healing', 'Лікування')] },
  { ...boon, source: phbFeatSource, page: undefined, slug: 'boon-of-recovery', nameUk: 'Епічне благословення відновлення', nameEn: 'Boon of Recovery', summary: 'Раз за тривалий відпочинок уникаєш падіння до 0 хітів і маєш запас к10 для лікування.', effects: [
    { title: 'Останній оплот', text: 'Коли мав би впасти до 0 хітів, можеш натомість залишитися на 1 хіті й одразу відновити хіти в кількості, рівній половині максимуму хітів. Використання відновлюється після тривалого відпочинку.' },
    { title: 'Запас відновлення', text: 'Маєш запас із десяти к10. Бонусною дією можеш витратити будь-яку кількість цих кісток, кинути їх і відновити хіти, рівні сумі. Усі витрачені кістки повертаються після тривалого відпочинку.' },
  ], rules: [rule('hit-points', 'Хіти'), rule('bonus-action', 'Бонусна дія'), rule('long-rest', 'Тривалий відпочинок')] },
  { ...boon, source: phbFeatSource, page: undefined, slug: 'boon-of-skill', nameUk: 'Епічне благословення майстерності', nameEn: 'Boon of Skill', summary: 'Володієш усіма навичками й отримуєш Експертизу в одній із них.', effects: [
    { title: 'Універсальне володіння', text: 'Отримуєш володіння всіма навичками.' },
    { title: 'Експертиза', text: 'Обираєш одну навичку, в якій ще не маєш Експертизи, і отримуєш Експертизу.' },
  ], rules: [rule('skills', 'Навички'), rule('expertise', 'Експертиза')] },
  { ...boon, source: phbFeatSource, page: undefined, slug: 'boon-of-speed', nameUk: 'Епічне благословення швидкості', nameEn: 'Boon of Speed', summary: 'Швидкість зростає на 30 футів, а бонусною дією виконуєш Відхід і завершуєш Схоплення.', effects: [
    { title: 'Швидкий відхід', text: 'Бонусною дією можеш виконати дію Відхід; одночасно завершуєш на собі стан Схоплений.' },
    { title: 'Надзвичайна швидкість', text: 'Твоя Швидкість збільшується на 30 футів.' },
  ], conditions: ['grappled'], rules: [rule('bonus-action', 'Бонусна дія'), rule('disengage', 'Дія Відхід'), movement] },
];

officialFeats.push(...preparedPhbFeats);

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
  const selection = entry.spellRule;
  return spells.filter(spell => choice
    ? spell.level <= 1 && spell.classes.some(key => choice.lists.includes(key))
    : slot
      ? spell.level >= slot.minimum && spell.level <= slot.maximum
      : selection
        ? selection.fixed?.includes(spell.slug) || (selection.level === spell.level && (!selection.schools || selection.schools.includes(spell.school)) && (selection.ritual === undefined || spell.ritual === selection.ritual))
        : false).sort((a, b) => a.level - b.level || a.nameUk.localeCompare(b.nameUk, 'uk'));
}
export function eligibleFeatWeapons(entry: FeatEntry, items: OfficialItemEntry[]) {
  return items.filter(item => {
    if (!entry.weaponRule || item.itemType !== 'зброя') return false;
    if (entry.weaponRule === 'any') return true;
    const properties = (item.weaponProperties ?? []).join(' ').toLocaleLowerCase('uk');
    if (entry.weaponRule === 'melee') return item.weaponMode === 'ближнього бою';
    if (entry.weaponRule === 'ranged') return item.weaponMode === 'далекобійна';
    if (entry.weaponRule === 'light') return /легка/.test(properties);
    if (entry.weaponRule === 'finesse') return /фехтувальн/.test(properties);
    if (entry.weaponRule === 'heavy') return /важка/.test(properties);
    if (entry.weaponRule === 'crossbow') return /арбалет/.test(`${item.nameUk} ${item.nameOriginal}`.toLocaleLowerCase('uk'));
    if (entry.weaponRule === 'polearm') return /посох|спис|досяжність/.test(`${item.nameUk} ${item.nameOriginal} ${properties}`.toLocaleLowerCase('uk'));
    if (entry.weaponRule === 'thrown') return /метальна/.test(properties);
    if (entry.weaponRule === 'slashing') return /рубальн/.test(item.damageType ?? '');
    return item.weaponMode === 'ближнього бою' && /дворучна|універсальна/.test(properties);
  });
}
