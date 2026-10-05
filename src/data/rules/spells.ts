export const spellClasses = {
  bard: 'Бард', cleric: 'Жрець', druid: 'Друїд', paladin: 'Паладин', ranger: 'Слідопит',
  sorcerer: 'Чаклун', warlock: 'Чорнокнижник', wizard: 'Чарівник',
} as const;
export type SpellClass = keyof typeof spellClasses;
export type RuleReference = { slug: string; label: string; path?: string };
export type SpellEntry = {
  slug: string; nameUk: string; nameEn: string; edition: string;
  source: { title: string; url: string; page: number; license: string };
  level: number; school: string; castingTime: string; range: string;
  components: string[]; materialComponent?: string; duration: string;
  concentration: boolean; ritual: boolean; sourceText: string; higherLevels?: string;
  classes: SpellClass[]; savingThrow?: string; spellAttack?: string; damage?: string;
  damageType?: string; area?: string; conditions?: string[];
  mechanics?: { label: string; value: string }[];
  mitigation?: { label: string; value: string }[];
  relatedRules: RuleReference[]; tags: string[];
};
const source = (page: number): SpellEntry['source'] => ({
  title: 'SRD 5.2', page, license: 'CC-BY-4.0',
  url: 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.pdf',
});
const base = { edition: 'D&D 2024', concentration: false, ritual: false, duration: 'Миттєво' };
const concentration = { slug: 'concentration', label: 'Концентрація' };
const damage = { slug: 'damage-types', label: 'Типи шкоди' };

// Ukrainian translations of the complete spell descriptions in the licensed SRD.
export const officialSpells: SpellEntry[] = [
  { ...base, slug: 'fire-bolt', nameUk: 'Вогняний снаряд', nameEn: 'Fire Bolt', source: source(132),
    level: 0, school: 'Евокація', castingTime: '1 дія', range: '120 фт', components: ['Вербальний', 'Соматичний'],
    sourceText: 'Ти кидаєш частинку вогню в істоту або предмет у межах дальності. Здійсни далекобійну атаку закляттям проти цілі. При влучанні ціль отримує 1к10 вогняної шкоди. Легкозаймистий предмет, у який влучає це закляття, загоряється, якщо його не носять і не тримають.',
    higherLevels: 'Шкода збільшується на 1к10, коли ти досягаєш 5-го (2к10), 11-го (3к10) та 17-го (4к10) рівнів персонажа.',
    classes: ['sorcerer', 'wizard'], spellAttack: 'Далекобійна атака закляттям', damage: '1к10', damageType: 'Вогняна',
    relatedRules: [{ slug: 'armor-class', label: 'Клас захисту' }, damage], tags: ['вогонь', 'атака', 'замовляння'] },
  { ...base, slug: 'fireball', nameUk: 'Куля вогню', nameEn: 'Fireball', source: source(131),
    level: 3, school: 'Евокація', castingTime: '1 дія', range: '150 фт', components: ['Вербальний', 'Соматичний', 'Матеріальний'],
    materialComponent: 'Кулька з гуано кажана та сірки', area: 'Сфера радіусом 20 фт',
    sourceText: 'Яскрава смуга спалахує від тебе до обраної точки в межах дальності, а потім із негучним ревом розквітає вогняним вибухом. Кожна істота у сфері радіусом 20 футів із центром у цій точці здійснює ряткидок Спритності, отримуючи 8к6 вогняної шкоди при провалі або половину цієї шкоди при успіху.\n\nЛегкозаймисті предмети в зоні, які не носять і не тримають, загоряються.',
    higherLevels: 'Шкода збільшується на 1к6 за кожен рівень комірки закляття вище 3-го.',
    classes: ['sorcerer', 'wizard'], savingThrow: 'Спритність', damage: '8к6', damageType: 'Вогняна',
    mitigation: [{ label: 'Ряткидок', value: 'Спритність' }, { label: 'Успіх', value: 'Половина шкоди' }, { label: 'Провал', value: 'Повна шкода' }],
    relatedRules: [{ slug: 'saving-throws', label: 'Ряткидки' }, { slug: 'areas', label: 'Зони дії' }, damage], tags: ['вогонь', 'сфера', 'ряткидок'] },
  { ...base, slug: 'magic-missile', nameUk: 'Магічна стріла', nameEn: 'Magic Missile', source: source(146),
    level: 1, school: 'Евокація', castingTime: '1 дія', range: '120 фт', components: ['Вербальний', 'Соматичний'],
    sourceText: 'Ти створюєш три сяйливі стріли магічної сили. Кожна стріла влучає в обрану тобою істоту, яку ти бачиш у межах дальності. Стріла завдає своїй цілі 1к4 + 1 силової шкоди. Усі стріли влучають одночасно, і ти можеш спрямувати їх в одну істоту або в кількох.',
    higherLevels: 'Закляття створює одну додаткову стрілу за кожен рівень комірки закляття вище 1-го.',
    classes: ['sorcerer', 'wizard'], damage: '1к4 + 1 на стрілу', damageType: 'Силова', mechanics: [{ label: 'Стріли', value: '3; одночасне влучання' }],
    relatedRules: [damage], tags: ['сила', 'стріли'] },
  { ...base, slug: 'detect-magic', nameUk: 'Виявлення магії', nameEn: 'Detect Magic', source: source(123),
    level: 1, school: 'Віщування', castingTime: '1 дія', range: 'На себе', components: ['Вербальний', 'Соматичний'],
    duration: 'До 10 хвилин', concentration: true, ritual: true, area: 'У межах 30 фт від тебе',
    sourceText: 'Протягом тривалості ти відчуваєш наявність магічних ефектів у межах 30 футів від себе. Якщо ти відчуваєш такі ефекти, можеш виконати дію Магія, щоб побачити слабку ауру навколо будь-якої видимої істоти або предмета в цій зоні, що має магію; якщо ефект створений закляттям, ти дізнаєшся школу магії цього закляття.\n\nЗакляття блокує 1 фут каменю, землі або деревини; 1 дюйм металу; або тонкий лист свинцю.',
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'],
    mechanics: [{ label: 'Спостереження аури', value: 'Дія Магія' }],
    mitigation: [{ label: 'Перешкоди', value: '1 фут каменю, землі або деревини; 1 дюйм металу; тонкий лист свинцю' }],
    relatedRules: [concentration, { slug: 'ritual', label: 'Ритуальне накладання' }], tags: ['магія', 'ритуал', 'аура'] },
  { ...base, slug: 'bless', nameUk: 'Благословення', nameEn: 'Bless', source: source(113),
    level: 1, school: 'Зачарування', castingTime: '1 дія', range: '30 фт', components: ['Вербальний', 'Соматичний', 'Матеріальний'],
    materialComponent: 'Священний символ вартістю щонайменше 5 зм', duration: 'До 1 хвилини', concentration: true,
    sourceText: 'Ти благословляєш до трьох істот у межах дальності. Щоразу, коли ціль здійснює кидок атаки або ряткидок до завершення закляття, вона додає 1к4 до цього кидка атаки або ряткидка.',
    higherLevels: 'Ти можеш обрати одну додаткову істоту за кожен рівень комірки закляття вище 1-го.',
    classes: ['cleric', 'paladin'], mechanics: [{ label: 'Цілі', value: 'До 3 істот' }, { label: 'Бонус', value: '+1к4 до атак і ряткидків' }],
    relatedRules: [concentration, { slug: 'saving-throws', label: 'Ряткидки' }], tags: ['підсилення', 'бонус'] },
  { ...base, slug: 'healing-word', nameUk: 'Цілюще слово', nameEn: 'Healing Word', source: source(139),
    level: 1, school: 'Аб’юрація', castingTime: '1 бонусна дія', range: '60 фт', components: ['Вербальний'],
    sourceText: 'Обрана тобою істота, яку ти бачиш у межах дальності, відновлює кількість хітів, що дорівнює 2к4 плюс модифікатор твоєї заклинальної характеристики.',
    higherLevels: 'Лікування збільшується на 2к4 за кожен рівень комірки закляття вище 1-го.',
    classes: ['bard', 'cleric', 'druid'], mechanics: [{ label: 'Відновлення хітів', value: '2к4 + модифікатор заклинальної характеристики' }],
    relatedRules: [{ slug: 'hit-points', label: 'Хіти' }], tags: ['лікування', 'бонусна дія'] },
];

export const spellLevelLabel = (level: number) => level === 0 ? 'Замовляння' : `${level} рівень`;
export type SpellFilters = { search: string; level: string; school: string; class: string; concentration: string; ritual: string };
export function filterSpells(entries: SpellEntry[], filters: SpellFilters) {
  const query = filters.search.trim().toLocaleLowerCase('uk');
  return entries.filter((spell) =>
    (!query || [spell.nameUk, spell.nameEn, spell.slug, ...spell.tags].join(' ').toLocaleLowerCase('uk').includes(query)) &&
    (!filters.level || spell.level === Number(filters.level)) && (!filters.school || spell.school === filters.school) &&
    (!filters.class || spell.classes.includes(filters.class as SpellClass)) &&
    (!filters.concentration || spell.concentration === (filters.concentration === 'yes')) &&
    (!filters.ritual || spell.ritual === (filters.ritual === 'yes')));
}
