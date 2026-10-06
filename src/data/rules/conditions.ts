export const conditionSlugs = ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'incapacitated', 'invisible', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious'] as const;
export type ConditionSlug = typeof conditionSlugs[number];
type RulePoint = { title: string; text: string };
export type ConditionEntry = {
  slug: ConditionSlug; nameUk: string; nameEn: string; summary: string;
  page: number; effects: RulePoint[]; ending?: RulePoint[];
  relatedConditions: ConditionSlug[]; relatedRules: { slug: string; label: string }[];
};
export const conditionSource = {
  title: 'SRD 5.2.1', edition: 'D&D 2024', license: 'CC-BY-4.0',
  url: 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf',
};
const rules = (slugs: string[]) => slugs.map(slug => ({ slug, label: ({
  advantage: 'Перевага', disadvantage: 'Невдача', 'saving-throws': 'Ряткидки',
  attacks: 'Атаки', movement: 'Переміщення', concentration: 'Концентрація',
  initiative: 'Ініціатива', 'ability-checks': 'Перевірки характеристик',
  'd20-tests': 'Перевірки к20', resistance: 'Стійкість до шкоди',
  'long-rest': 'Тривалий відпочинок', 'armor-class': 'Клас захисту',
} as Record<string, string>)[slug] }));

// Ukrainian translation of the complete condition entries in the SRD Rules Glossary.
export const officialConditions: ConditionEntry[] = [
  { slug: 'blinded', nameUk: 'Засліплений', nameEn: 'Blinded', page: 177,
    summary: 'Не бачиш; твої атаки мають Невдачу, а атаки проти тебе — Перевагу.',
    effects: [
      { title: 'Не бачиш', text: 'Ти не бачиш і автоматично провалюєш будь-яку перевірку характеристики, що потребує зору.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу, а твої кидки атаки мають Невдачу.' },
    ], relatedConditions: [], relatedRules: rules(['ability-checks', 'attacks', 'advantage', 'disadvantage']) },
  { slug: 'charmed', nameUk: 'Зачарований', nameEn: 'Charmed', page: 178,
    summary: 'Не можеш завдати шкоди тому, хто тебе зачарував.',
    effects: [
      { title: 'Не можеш зашкодити тому, хто зачарував', text: 'Ти не можеш атакувати того, хто тебе зачарував, або обирати його ціллю здібностей чи магічних ефектів, що завдають шкоди.' },
      { title: 'Соціальна Перевага', text: 'Той, хто тебе зачарував, має Перевагу на будь-яку перевірку характеристики для соціальної взаємодії з тобою.' },
    ], relatedConditions: [], relatedRules: rules(['ability-checks', 'advantage']) },
  { slug: 'deafened', nameUk: 'Оглухлий', nameEn: 'Deafened', page: 181,
    summary: 'Не чуєш; автоматично провалюєш перевірки, що потребують слуху.',
    effects: [{ title: 'Не чуєш', text: 'Ти не чуєш і автоматично провалюєш будь-яку перевірку характеристики, що потребує слуху.' }],
    relatedConditions: [], relatedRules: rules(['ability-checks']) },
  { slug: 'exhaustion', nameUk: 'Виснаження', nameEn: 'Exhaustion', page: 181,
    summary: 'Кожен рівень: −2 до перевірок к20 та −5 фт швидкості. Шостий рівень — смерть.',
    effects: [
      { title: 'Рівні Виснаження', text: 'Цей стан накопичується. Щоразу, коли ти отримуєш його, ти здобуваєш 1 рівень Виснаження. Ти помираєш, якщо твій рівень Виснаження дорівнює 6.' },
      { title: 'Вплив на перевірки к20', text: 'Коли ти здійснюєш перевірку к20, результат кидка зменшується на величину, що дорівнює подвоєному рівню Виснаження.' },
      { title: 'Зменшення швидкості', text: 'Твоя швидкість зменшується на 5 футів за кожен твій рівень Виснаження.' },
    ], ending: [{ title: 'Зняття рівнів Виснаження', text: 'Завершення тривалого відпочинку знімає 1 твій рівень Виснаження. Коли твій рівень Виснаження сягає 0, стан завершується.' }],
    relatedConditions: [], relatedRules: rules(['d20-tests', 'movement', 'long-rest']) },
  { slug: 'frightened', nameUk: 'Наляканий', nameEn: 'Frightened', page: 182,
    summary: 'Невдача на перевірки й атаки, поки бачиш джерело страху; не можеш добровільно наближатися.',
    effects: [
      { title: 'Вплив на перевірки характеристик і атаки', text: 'Ти маєш Невдачу на перевірки характеристик і кидки атаки, поки джерело страху перебуває в межах твоєї видимості.' },
      { title: 'Не можеш наближатися', text: 'Ти не можеш добровільно наближатися до джерела страху.' },
    ], relatedConditions: [], relatedRules: rules(['ability-checks', 'attacks', 'disadvantage', 'movement']) },
  { slug: 'grappled', nameUk: 'Схоплений', nameEn: 'Grappled', page: 182,
    summary: 'Швидкість 0; Невдача на атаки проти всіх, крім того, хто тебе схопив.',
    effects: [
      { title: 'Швидкість 0', text: 'Твоя швидкість дорівнює 0 і не може збільшуватися.' },
      { title: 'Вплив на атаки', text: 'Ти маєш Невдачу на кидки атаки проти будь-якої цілі, крім істоти, що тебе схопила.' },
      { title: 'Переміщення схопленої істоти', text: 'Істота, що тебе схопила, може тягнути або нести тебе під час свого руху, але кожен фут такого руху коштує їй 1 додатковий фут, якщо тільки ти не Крихітний або не менший за неї на дві чи більше категорій розміру.' },
    ], ending: [{ title: 'Завершення захоплення', text: 'Схоплена істота може використати свою дію для перевірки Сили (Атлетика) або Спритності (Акробатика) проти СК звільнення із захоплення; при успіху стан завершується для неї. Стан також завершується, якщо істота, що схопила, стає Недієздатною або відстань між нею та схопленою ціллю перевищує дальність захоплення. Крім того, істота, що схопила, може відпустити ціль будь-коли, не витрачаючи дії.' }],
    relatedConditions: ['incapacitated'], relatedRules: rules(['attacks', 'disadvantage', 'movement', 'ability-checks']) },
  { slug: 'incapacitated', nameUk: 'Недієздатний', nameEn: 'Incapacitated', page: 184,
    summary: 'Не можеш виконувати дії, бонусні дії чи реакції; Концентрація переривається.',
    effects: [
      { title: 'Бездіяльність', text: 'Ти не можеш виконувати жодну дію, бонусну дію чи реакцію.' },
      { title: 'Без Концентрації', text: 'Твоя Концентрація переривається.' },
      { title: 'Без мовлення', text: 'Ти не можеш говорити.' },
      { title: 'Застаний зненацька', text: 'Якщо ти Недієздатний, коли кидаєш Ініціативу, ти маєш Невдачу на цей кидок.' },
    ], relatedConditions: [], relatedRules: rules(['concentration', 'initiative', 'disadvantage']) },
  { slug: 'invisible', nameUk: 'Невидимий', nameEn: 'Invisible', page: 184,
    summary: 'Перевага на Ініціативу й атаки; переваги для атак не діють проти істоти, що тебе бачить.',
    effects: [
      { title: 'Несподіванка', text: 'Якщо ти Невидимий, коли кидаєш Ініціативу, ти маєш Перевагу на цей кидок.' },
      { title: 'Прихований', text: 'На тебе не впливає жоден ефект, що потребує бачити свою ціль, якщо тільки його творець не може якось бачити тебе. Будь-яке спорядження, яке ти носиш або несеш, також приховане.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Невдачу, а твої кидки атаки мають Перевагу. Якщо істота може якось бачити тебе, ти не отримуєш цієї переваги проти неї.' },
    ], relatedConditions: [], relatedRules: rules(['initiative', 'attacks', 'advantage', 'disadvantage']) },
  { slug: 'paralyzed', nameUk: 'Паралізований', nameEn: 'Paralyzed', page: 186,
    summary: 'Недієздатний; швидкість 0; влучання нападника в межах 5 фт — критичне.',
    effects: [
      { title: 'Недієздатність', text: 'Ти маєш стан Недієздатний.' },
      { title: 'Швидкість 0', text: 'Твоя швидкість дорівнює 0 і не може збільшуватися.' },
      { title: 'Вплив на ряткидки', text: 'Ти автоматично провалюєш ряткидки Сили та Спритності.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу.' },
      { title: 'Автоматичні критичні влучання', text: 'Будь-який кидок атаки, що влучає в тебе, є критичним влучанням, якщо нападник перебуває в межах 5 футів від тебе.' },
    ], relatedConditions: ['incapacitated'], relatedRules: rules(['movement', 'saving-throws', 'attacks', 'advantage']) },
  { slug: 'petrified', nameUk: 'Скам’янілий', nameEn: 'Petrified', page: 186,
    summary: 'Перетворений на тверду речовину; Недієздатний; стійкість до всієї шкоди.',
    effects: [
      { title: 'Перетворення на неживу речовину', text: 'Ти разом із усіма немагічними предметами, які носиш і несеш, перетворюєшся на тверду неживу речовину, зазвичай камінь. Твоя вага збільшується в десять разів, і ти перестаєш старіти.' },
      { title: 'Недієздатність', text: 'Ти маєш стан Недієздатний.' },
      { title: 'Швидкість 0', text: 'Твоя швидкість дорівнює 0 і не може збільшуватися.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу.' },
      { title: 'Вплив на ряткидки', text: 'Ти автоматично провалюєш ряткидки Сили та Спритності.' },
      { title: 'Стійкість до шкоди', text: 'Ти маєш стійкість до всієї шкоди.' },
      { title: 'Імунітет до отруєння', text: 'Ти маєш імунітет до стану Отруєний.' },
    ], relatedConditions: ['incapacitated', 'poisoned'], relatedRules: rules(['movement', 'attacks', 'advantage', 'saving-throws', 'resistance']) },
  { slug: 'poisoned', nameUk: 'Отруєний', nameEn: 'Poisoned', page: 186,
    summary: 'Невдача на кидки атаки та перевірки характеристик.',
    effects: [{ title: 'Вплив на перевірки характеристик і атаки', text: 'Ти маєш Невдачу на кидки атаки та перевірки характеристик.' }],
    relatedConditions: [], relatedRules: rules(['disadvantage', 'attacks', 'ability-checks']) },
  { slug: 'prone', nameUk: 'Збитий з ніг', nameEn: 'Prone', page: 186,
    summary: 'Можеш повзти або підвестися; Невдача на твої атаки.',
    effects: [
      { title: 'Обмежений рух', text: 'Твої єдині варіанти переміщення — повзти або витратити рух, щоб підвестися й тим самим завершити стан.' },
      { title: 'Вплив на атаки', text: 'Ти маєш Невдачу на кидки атаки. Кидок атаки проти тебе має Перевагу, якщо нападник перебуває в межах 5 футів від тебе. В іншому разі цей кидок атаки має Невдачу.' },
    ], ending: [{ title: 'Підвестися', text: 'Щоб підвестися й завершити стан, витрать кількість руху, що дорівнює половині твоєї швидкості з округленням донизу. Якщо твоя швидкість дорівнює 0, ти не можеш підвестися.' }],
    relatedConditions: [], relatedRules: rules(['movement', 'attacks', 'advantage', 'disadvantage']) },
  { slug: 'restrained', nameUk: 'Стримуваний', nameEn: 'Restrained', page: 187,
    summary: 'Швидкість 0; Невдача на твої атаки та ряткидки Спритності.',
    effects: [
      { title: 'Швидкість 0', text: 'Твоя швидкість дорівнює 0 і не може збільшуватися.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу, а твої кидки атаки мають Невдачу.' },
      { title: 'Вплив на ряткидки', text: 'Ти маєш Невдачу на ряткидки Спритності.' },
    ], relatedConditions: [], relatedRules: rules(['movement', 'attacks', 'advantage', 'disadvantage', 'saving-throws']) },
  { slug: 'stunned', nameUk: 'Оглушений', nameEn: 'Stunned', page: 189,
    summary: 'Недієздатний; автоматично провалюєш ряткидки Сили та Спритності.',
    effects: [
      { title: 'Недієздатність', text: 'Ти маєш стан Недієздатний.' },
      { title: 'Вплив на ряткидки', text: 'Ти автоматично провалюєш ряткидки Сили та Спритності.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу.' },
    ], relatedConditions: ['incapacitated'], relatedRules: rules(['saving-throws', 'attacks', 'advantage']) },
  { slug: 'unconscious', nameUk: 'Непритомний', nameEn: 'Unconscious', page: 191,
    summary: 'Недієздатний і Збитий з ніг; не усвідомлюєш оточення.',
    effects: [
      { title: 'Бездіяльність', text: 'Ти маєш стани Недієздатний і Збитий з ніг та випускаєш усе, що тримаєш. Коли цей стан завершується, ти залишаєшся Збитим з ніг.' },
      { title: 'Швидкість 0', text: 'Твоя швидкість дорівнює 0 і не може збільшуватися.' },
      { title: 'Вплив на атаки', text: 'Кидки атаки проти тебе мають Перевагу.' },
      { title: 'Вплив на ряткидки', text: 'Ти автоматично провалюєш ряткидки Сили та Спритності.' },
      { title: 'Автоматичні критичні влучання', text: 'Будь-який кидок атаки, що влучає в тебе, є критичним влучанням, якщо нападник перебуває в межах 5 футів від тебе.' },
      { title: 'Без усвідомлення', text: 'Ти не усвідомлюєш свого оточення.' },
    ], relatedConditions: ['incapacitated', 'prone'], relatedRules: rules(['movement', 'attacks', 'advantage', 'saving-throws']) },
];

export function filterConditions(query: string) {
  const normalized = query.trim().toLocaleLowerCase('uk');
  return officialConditions.filter(entry => `${entry.nameUk} ${entry.nameEn} ${entry.slug}`.toLocaleLowerCase('uk').includes(normalized));
}
export function conditionIcon(slug: ConditionSlug) {
  return `/icons/conditions/condition-${slug}.webp`;
}
