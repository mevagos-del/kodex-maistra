export const spellClasses = {
  bard: 'Бард', cleric: 'Жрець', druid: 'Друїд', paladin: 'Паладин', ranger: 'Слідопит',
  sorcerer: 'Чаклун', warlock: 'Чорнокнижник', wizard: 'Чарівник',
} as const;
export type SpellClass = keyof typeof spellClasses;
export type RuleReference = { slug: string; label: string; path?: string };
export type SpellEntry = {
  slug: string; nameUk: string; nameEn: string; edition: string;
  source: { title: string; url: string; page: number; license: string };
  level: number; school: string; castingTime: string; castingTrigger?: string; range: string;
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
const savingThrows = { slug: 'saving-throws', label: 'Ряткидки' };
const armorClass = { slug: 'armor-class', label: 'Клас захисту' };
const areas = { slug: 'areas', label: 'Зони дії' };
const conditions = { slug: 'conditions', label: 'Стани' };
const verbalSomatic = ['Вербальний', 'Соматичний'];
const verbalSomaticMaterial = [...verbalSomatic, 'Матеріальний'];

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
  { ...base, slug: 'acid-splash', nameUk: 'Кислотний сплеск', nameEn: 'Acid Splash', source: source(107),
    level: 0, school: 'Евокація', castingTime: '1 дія', range: '60 фт', components: verbalSomatic,
    area: 'Сфера радіусом 5 фт',
    sourceText: 'Ти створюєш кислотну бульбашку в точці в межах дальності, де вона вибухає у сфері радіусом 5 футів. Кожна істота в цій сфері має успішно здійснити ряткидок Спритності або отримати 1к6 кислотної шкоди.',
    higherLevels: 'Шкода збільшується на 1к6, коли ти досягаєш 5-го (2к6), 11-го (3к6) та 17-го (4к6) рівнів персонажа.',
    classes: ['sorcerer', 'wizard'], savingThrow: 'Спритність', damage: '1к6', damageType: 'Кислотна',
    mitigation: [{ label: 'Ряткидок', value: 'Спритність' }, { label: 'Успіх', value: 'Без шкоди' }, { label: 'Провал', value: 'Повна шкода' }],
    relatedRules: [savingThrows, areas, damage], tags: ['кислота', 'зона', 'замовляння'] },
  { ...base, slug: 'ray-of-frost', nameUk: 'Промінь морозу', nameEn: 'Ray of Frost', source: source(157),
    level: 0, school: 'Евокація', castingTime: '1 дія', range: '60 фт', components: verbalSomatic,
    sourceText: 'Крижаний промінь синьо-білого світла прямує до істоти в межах дальності. Здійсни далекобійну атаку закляттям проти цілі. При влучанні вона отримує 1к8 холодної шкоди, а її швидкість зменшується на 10 футів до початку твого наступного ходу.',
    higherLevels: 'Шкода збільшується на 1к8, коли ти досягаєш 5-го (2к8), 11-го (3к8) та 17-го (4к8) рівнів персонажа.',
    classes: ['sorcerer', 'wizard'], spellAttack: 'Далекобійна атака закляттям', damage: '1к8', damageType: 'Холодна',
    mechanics: [{ label: 'Швидкість цілі', value: '−10 фт до початку твого наступного ходу при влучанні' }],
    relatedRules: [armorClass, damage], tags: ['холод', 'атака', 'уповільнення', 'замовляння'] },
  { ...base, slug: 'mage-hand', nameUk: 'Рука мага', nameEn: 'Mage Hand', source: source(145),
    level: 0, school: 'Виклик', castingTime: '1 дія', range: '30 фт', components: verbalSomatic, duration: '1 хвилина',
    sourceText: 'Примарна летюча рука з’являється в обраній тобою точці в межах дальності. Рука існує протягом тривалості. Вона зникає, якщо опиняється більш ніж за 30 футів від тебе або якщо ти знову накладаєш це закляття.\n\nКоли ти накладаєш закляття, можеш використати руку, щоб маніпулювати предметом, відкрити незамкнені двері або контейнер, покласти предмет у відкритий контейнер чи дістати його звідти або вилити вміст флакона.\n\nДією Магія у свої наступні ходи ти можеш знову керувати рукою в такий спосіб. Як частину цієї дії ти можеш перемістити руку на відстань до 30 футів.\n\nРука не може атакувати, активувати магічні предмети або переносити понад 10 фунтів.',
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    mechanics: [{ label: 'Керування після накладання', value: 'Дія Магія' }, { label: 'Переміщення руки', value: 'До 30 фт як частина дії' }, { label: 'Вантаж', value: 'Не більше 10 фнт' }],
    relatedRules: [{ slug: 'magic-action', label: 'Дія Магія' }], tags: ['предмети', 'утилітарне', 'замовляння'] },
  { ...base, slug: 'shield', nameUk: 'Щит', nameEn: 'Shield', source: source(161),
    level: 1, school: 'Аб’юрація', castingTime: '1 реакція',
    castingTrigger: 'Коли в тебе влучає кидок атаки або тебе обрано ціллю закляття Магічна стріла',
    range: 'На себе', components: verbalSomatic, duration: '1 раунд',
    sourceText: 'Непомітний бар’єр магічної сили захищає тебе. До початку твого наступного ходу ти маєш бонус +5 до КЗ, зокрема проти атаки, яка спричинила реакцію, і не отримуєш шкоди від Магічної стріли.',
    classes: ['sorcerer', 'wizard'],
    mechanics: [{ label: 'Клас захисту', value: '+5, зокрема проти атаки, яка спричинила реакцію' }, { label: 'Магічна стріла', value: 'Не завдає тобі шкоди' }],
    relatedRules: [armorClass], tags: ['захист', 'реакція', 'кз'] },
  { ...base, slug: 'feather-fall', nameUk: 'Падіння пера', nameEn: 'Feather Fall', source: source(130),
    level: 1, school: 'Трансмутація', castingTime: '1 реакція',
    castingTrigger: 'Коли ти або істота, яку ти бачиш у межах 60 фт від себе, падає',
    range: '60 фт', components: ['Вербальний', 'Матеріальний'], materialComponent: 'Маленька пір’їна або шматочок пуху', duration: '1 хвилина',
    sourceText: 'Обери до п’яти істот, що падають, у межах дальності. Швидкість падіння такої істоти сповільнюється до 60 футів за раунд до завершення закляття. Якщо істота приземляється до завершення закляття, вона не отримує шкоди від падіння, і закляття завершується для неї.',
    classes: ['bard', 'sorcerer', 'wizard'],
    mechanics: [{ label: 'Цілі', value: 'До 5 істот, що падають' }, { label: 'Швидкість падіння', value: '60 фт за раунд' }, { label: 'Приземлення під дією закляття', value: 'Без шкоди від падіння; ефект для істоти завершується' }],
    relatedRules: [{ slug: 'falling', label: 'Падіння' }], tags: ['падіння', 'реакція', 'захист'] },
  { ...base, slug: 'comprehend-languages', nameUk: 'Розуміння мов', nameEn: 'Comprehend Languages', source: source(117),
    level: 1, school: 'Віщування', castingTime: '1 дія', range: 'На себе', components: verbalSomaticMaterial,
    materialComponent: 'Дрібка сажі та солі', duration: '1 година', ritual: true,
    sourceText: 'Протягом тривалості ти розумієш буквальне значення будь-якої мови, яку чуєш або бачиш у жестовій формі. Ти також розумієш будь-яку писемну мову, яку бачиш, але маєш торкатися поверхні, на якій написано слова. Читання однієї сторінки тексту займає приблизно 1 хвилину. Це закляття не розшифровує символи або таємні повідомлення.',
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    mechanics: [{ label: 'Читання', value: 'Приблизно 1 хвилина на сторінку; дотик до поверхні' }, { label: 'Межі розуміння', value: 'Буквальне значення, без розшифрування символів і таємних повідомлень' }],
    relatedRules: [{ slug: 'ritual', label: 'Ритуальне накладання' }], tags: ['мови', 'ритуал', 'утилітарне'] },
  { ...base, slug: 'cure-wounds', nameUk: 'Лікування ран', nameEn: 'Cure Wounds', source: source(121),
    level: 1, school: 'Аб’юрація', castingTime: '1 дія', range: 'Дотик', components: verbalSomatic,
    sourceText: 'Істота, якої ти торкаєшся, відновлює кількість хітів, що дорівнює 2к8 плюс модифікатор твоєї заклинальної характеристики.',
    higherLevels: 'Лікування збільшується на 2к8 за кожен рівень комірки закляття вище 1-го.',
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    mechanics: [{ label: 'Відновлення хітів', value: '2к8 + модифікатор заклинальної характеристики' }],
    relatedRules: [{ slug: 'hit-points', label: 'Хіти' }], tags: ['лікування', 'дотик'] },
  { ...base, slug: 'thunderwave', nameUk: 'Громова хвиля', nameEn: 'Thunderwave', source: source(169),
    level: 1, school: 'Евокація', castingTime: '1 дія', range: 'На себе', components: verbalSomatic,
    area: 'Куб із ребром 15 фт, що походить від тебе',
    sourceText: 'Ти вивільняєш хвилю громової енергії. Кожна істота в кубі з ребром 15 футів, що походить від тебе, здійснює ряткидок Статури. При провалі істота отримує 2к8 громової шкоди й відштовхується на 10 футів від тебе. При успіху істота отримує лише половину цієї шкоди.\n\nКрім того, незакріплені предмети, які повністю перебувають у кубі, відштовхуються на 10 футів від тебе, а громовий гуркіт чути в межах 300 футів.',
    higherLevels: 'Шкода збільшується на 1к8 за кожен рівень комірки закляття вище 1-го.',
    classes: ['bard', 'druid', 'sorcerer', 'wizard'], savingThrow: 'Статура', damage: '2к8', damageType: 'Громова',
    mechanics: [{ label: 'Предмети', value: 'Незакріплені й повністю в кубі: відштовхування на 10 фт' }, { label: 'Гуркіт', value: 'Чути в межах 300 фт' }],
    mitigation: [{ label: 'Ряткидок', value: 'Статура' }, { label: 'Успіх', value: 'Половина шкоди; без відштовхування' }, { label: 'Провал', value: 'Повна шкода; відштовхування на 10 фт від тебе' }],
    relatedRules: [savingThrows, areas, damage], tags: ['громова', 'зона', 'відштовхування'] },
  { ...base, slug: 'hold-person', nameUk: 'Утримання особи', nameEn: 'Hold Person', source: source(141),
    level: 2, school: 'Зачарування', castingTime: '1 дія', range: '60 фт', components: verbalSomaticMaterial,
    materialComponent: 'Прямий шматок заліза', duration: 'До 1 хвилини', concentration: true,
    sourceText: 'Обери Гуманоїда, якого ти бачиш у межах дальності. Ціль має успішно здійснити ряткидок Мудрості або отримати стан Паралізований на час тривалості. Наприкінці кожного свого ходу ціль повторює ряткидок; при успіху закляття завершується для неї.',
    higherLevels: 'Ти можеш обрати одного додаткового Гуманоїда за кожен рівень комірки закляття вище 2-го.',
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'], savingThrow: 'Мудрість', conditions: ['Паралізований'],
    mechanics: [{ label: 'Ціль', value: 'Видимий Гуманоїд' }],
    mitigation: [{ label: 'Ряткидок', value: 'Мудрість' }, { label: 'Успіх', value: 'Без ефекту; повторний успіх завершує закляття для цілі' }, { label: 'Повторення', value: 'Наприкінці кожного ходу цілі' }],
    relatedRules: [concentration, savingThrows, conditions], tags: ['гуманоїд', 'параліч', 'контроль', 'повторний ряткидок'] },
  { ...base, slug: 'misty-step', nameUk: 'Туманний крок', nameEn: 'Misty Step', source: source(150),
    level: 2, school: 'Виклик', castingTime: '1 бонусна дія', range: 'На себе', components: ['Вербальний'],
    sourceText: 'На мить оточений сріблястим туманом, ти телепортуєшся на відстань до 30 футів у незайняте місце, яке бачиш.',
    classes: ['sorcerer', 'warlock', 'wizard'], mechanics: [{ label: 'Телепортація', value: 'До 30 фт у видиме незайняте місце' }],
    relatedRules: [{ slug: 'teleportation', label: 'Телепортація' }], tags: ['телепортація', 'переміщення', 'бонусна дія'] },
  { ...base, slug: 'invisibility', nameUk: 'Невидимість', nameEn: 'Invisibility', source: source(143),
    level: 2, school: 'Ілюзія', castingTime: '1 дія', range: 'Дотик', components: verbalSomaticMaterial,
    materialComponent: 'Вія в гуміарабіку', duration: 'До 1 години', concentration: true,
    sourceText: 'Істота, якої ти торкаєшся, має стан Невидимий до завершення закляття. Закляття завершується достроково відразу після того, як ціль здійснить кидок атаки, завдасть шкоди або накладе закляття.',
    higherLevels: 'Ти можеш обрати одну додаткову істоту за кожен рівень комірки закляття вище 2-го.',
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'], conditions: ['Невидимий'],
    mitigation: [{ label: 'Дострокове завершення', value: 'Одразу після кидка атаки, завдання шкоди або накладання закляття ціллю' }],
    relatedRules: [concentration, conditions], tags: ['невидимість', 'приховування'] },
  { ...base, slug: 'blindness-deafness', nameUk: 'Сліпота / глухота', nameEn: 'Blindness/Deafness', source: source(113),
    level: 2, school: 'Трансмутація', castingTime: '1 дія', range: '120 фт', components: ['Вербальний'], duration: '1 хвилина',
    sourceText: 'Одна істота, яку ти бачиш у межах дальності, має успішно здійснити ряткидок Статури або отримати стан Осліплений чи Оглухлий (на твій вибір) на час тривалості. Наприкінці кожного свого ходу ціль повторює ряткидок; при успіху закляття завершується для неї.',
    higherLevels: 'Ти можеш обрати одну додаткову істоту за кожен рівень комірки закляття вище 2-го.',
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'], savingThrow: 'Статура', conditions: ['Осліплений або Оглухлий (на твій вибір)'],
    mitigation: [{ label: 'Ряткидок', value: 'Статура' }, { label: 'Успіх', value: 'Без ефекту; повторний успіх завершує закляття для цілі' }, { label: 'Повторення', value: 'Наприкінці кожного ходу цілі' }],
    relatedRules: [savingThrows, conditions], tags: ['сліпота', 'глухота', 'контроль', 'повторний ряткидок'] },
  { ...base, slug: 'dispel-magic', nameUk: 'Розсіювання магії', nameEn: 'Dispel Magic', source: source(124),
    level: 3, school: 'Аб’юрація', castingTime: '1 дія', range: '120 фт', components: verbalSomatic,
    sourceText: 'Обери одну істоту, предмет або магічний ефект у межах дальності. Кожне закляття 3-го рівня або нижче, яке триває на цілі, завершується. Для кожного закляття 4-го рівня або вище, яке триває на цілі, здійсни перевірку характеристики, використовуючи свою заклинальну характеристику (СК дорівнює 10 плюс рівень цього закляття). При успішній перевірці закляття завершується.',
    higherLevels: 'Ти автоматично завершуєш закляття на цілі, якщо його рівень не перевищує рівень використаної тобою комірки закляття.',
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'],
    mechanics: [{ label: 'Автоматичне завершення', value: 'Закляття 3-го рівня або нижче' }, { label: 'Перевірка для заклять 4-го рівня або вище', value: 'Заклинальна характеристика; СК 10 + рівень закляття' }, { label: 'Успішна перевірка', value: 'Відповідне закляття завершується' }],
    relatedRules: [{ slug: 'ability-checks', label: 'Перевірки характеристик' }], tags: ['розсіювання', 'утилітарне', 'перевірка'] },
  { ...base, slug: 'counterspell', nameUk: 'Контрзакляття', nameEn: 'Counterspell', source: source(120),
    level: 3, school: 'Аб’юрація', castingTime: '1 реакція',
    castingTrigger: 'Коли ти бачиш істоту в межах 60 фт від себе, яка накладає закляття з вербальним, соматичним або матеріальним компонентом',
    range: '60 фт', components: ['Соматичний'],
    sourceText: 'Ти намагаєшся перервати істоту в процесі накладання закляття. Істота здійснює ряткидок Статури. При провалі закляття розсіюється без ефекту, а дія, бонусна дія або реакція, використана для його накладання, витрачається. Якщо це закляття накладали з використанням комірки закляття, комірка не витрачається.',
    classes: ['sorcerer', 'warlock', 'wizard'], savingThrow: 'Статура',
    mechanics: [{ label: 'Комірка перерваного закляття', value: 'Не витрачається' }],
    mitigation: [{ label: 'Ряткидок', value: 'Статура' }, { label: 'Успіх', value: 'Накладання не переривається' }, { label: 'Провал', value: 'Закляття без ефекту; дія, бонусна дія або реакція витрачається' }],
    relatedRules: [savingThrows], tags: ['реакція', 'переривання', 'захист'] },
];

export type SpellFact = { label: string; value: string };
export function spellMechanicRows(spell: SpellEntry): SpellFact[] {
  const saveInMitigation = spell.mitigation?.some((row) => row.label === 'Ряткидок');
  return [
    ...(spell.spellAttack ? [{ label: 'Атака', value: spell.spellAttack }] : []),
    ...(spell.savingThrow && !saveInMitigation ? [{ label: 'Ряткидок', value: spell.savingThrow }] : []),
    ...(spell.damage ? [{ label: 'Шкода', value: `${spell.damage}${spell.damageType ? ` · ${spell.damageType}` : ''}` }] : []),
    ...(spell.conditions?.length ? [{ label: 'Стани', value: spell.conditions.join(', ') }] : []),
    ...(spell.mechanics ?? []),
  ];
}
export function spellMitigationRows(spell: SpellEntry): SpellFact[] {
  return [
    ...(spell.mitigation ?? []),
    // Attack rolls resolve against AC (SRD 5.2, p. 7); don't repeat the attack type.
    ...(spell.spellAttack ? [{ label: 'Захист', value: 'Клас захисту цілі' }] : []),
  ];
}

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
