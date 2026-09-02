import { PHB_2024_SOURCE, SRD_52_SOURCE } from '../source';
import type { OfficialClassEntry, OfficialProgressionRow } from '../types';
import { createSubclass, featuresFromProgression } from './shared';

const baseProgression: OfficialProgressionRow[] = [
  { level: 1, proficiencyBonus: '+2', features: ['Бойовий стиль', 'Друге дихання', 'Майстерність зброї'], resources: { second_wind: 2, weapon_mastery: 3 } },
  { level: 2, proficiencyBonus: '+2', features: ['Сплеск дії (1 використання)', 'Тактичний розум'], resources: { second_wind: 2, weapon_mastery: 3 } },
  { level: 3, proficiencyBonus: '+2', features: ['Підклас воїна'], resources: { second_wind: 2, weapon_mastery: 3 } },
  { level: 4, proficiencyBonus: '+2', features: ['Збільшення характеристик'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 5, proficiencyBonus: '+3', features: ['Додаткова атака', 'Тактичне переміщення'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 6, proficiencyBonus: '+3', features: ['Збільшення характеристик'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 7, proficiencyBonus: '+3', features: ['Особливість підкласу (7 рівень)'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 8, proficiencyBonus: '+3', features: ['Збільшення характеристик'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 9, proficiencyBonus: '+4', features: ['Незламність (1 використання)', 'Тактична майстерність'], resources: { second_wind: 3, weapon_mastery: 4 } },
  { level: 10, proficiencyBonus: '+4', features: ['Особливість підкласу (10 рівень)'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 11, proficiencyBonus: '+4', features: ['Дві додаткові атаки'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 12, proficiencyBonus: '+4', features: ['Збільшення характеристик'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 13, proficiencyBonus: '+5', features: ['Незламність (2 використання)', 'Вивчені атаки'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 14, proficiencyBonus: '+5', features: ['Збільшення характеристик'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 15, proficiencyBonus: '+5', features: ['Особливість підкласу (15 рівень)'], resources: { second_wind: 4, weapon_mastery: 5 } },
  { level: 16, proficiencyBonus: '+5', features: ['Збільшення характеристик'], resources: { second_wind: 4, weapon_mastery: 6 } },
  { level: 17, proficiencyBonus: '+6', features: ['Сплеск дії (2 використання)', 'Незламність (3 використання)'], resources: { second_wind: 4, weapon_mastery: 6 } },
  { level: 18, proficiencyBonus: '+6', features: ['Особливість підкласу (18 рівень)'], resources: { second_wind: 4, weapon_mastery: 6 } },
  { level: 19, proficiencyBonus: '+6', features: ['Епічний дар'], resources: { second_wind: 4, weapon_mastery: 6 } },
  { level: 20, proficiencyBonus: '+6', features: ['Три додаткові атаки'], resources: { second_wind: 4, weapon_mastery: 6 } },
];

const progression: OfficialProgressionRow[] = baseProgression.map((row) => ({
  ...row,
  resources: {
    ...row.resources,
    ...(row.level >= 2 ? { action_surge: row.level >= 17 ? 2 : 1 } : {}),
    ...(row.level >= 5 ? { extra_attack: row.level >= 20 ? '4 атаки' : row.level >= 11 ? '3 атаки' : '2 атаки' } : {}),
  },
}));

const descriptions: Record<string, string> = {
  'Бойовий стиль': 'Отримуєш рису Бойового стилю на свій вибір.',
  'Друге дихання': 'Бонусною дією можеш витратити одне використання й відновити 1к10 + рівень Воїна хітів. Після короткого відпочинку відновлюєш одне використання, після тривалого — всі; кількість використань указана в таблиці прогресії.',
  'Майстерність зброї': 'Можеш використовувати властивості майстерності вибраних видів простої або військової зброї. Кількість вибраних видів указана в таблиці прогресії; після тривалого відпочинку можеш змінити один вибір.',
  'Сплеск дії (1 використання)': 'У свій хід можеш виконати одну додаткову дію, крім дії Магія. Після використання відновлюєш цю здатність після короткого або тривалого відпочинку.',
  'Тактичний розум': 'Після невдалої перевірки характеристики можеш витратити використання Другого дихання, кинути 1к10 і додати результат до перевірки. Якщо перевірка все одно невдала, використання Другого дихання не витрачається.',
  'Підклас воїна': 'Обираєш підклас Воїна. Особливості вибраного підкласу показано окремо в розділі «Підкласи».',
  'Збільшення характеристик': 'Отримуєш рису «Збільшення характеристик» або іншу рису, вимогам якої відповідаєш.',
  'Додаткова атака': 'Коли виконуєш дію Атака у свій хід, можеш атакувати двічі замість одного разу.',
  'Тактичне переміщення': 'Коли активуєш Друге дихання бонусною дією, можеш переміститися на відстань до половини своєї Швидкості, не провокуючи атак при нагоді.',
  'Незламність (1 використання)': 'Після невдалої ряткидки можеш перекинути її з бонусом, рівним твоєму рівню Воїна, і мусиш використати новий результат. Відновлюєш використання після тривалого відпочинку.',
  'Тактична майстерність': 'Коли атакуєш зброєю, властивістю майстерності якої можеш користуватися, для цієї атаки можеш замінити її властивість на Поштовх, Ослаблення або Уповільнення.',
  'Дві додаткові атаки': 'Коли виконуєш дію Атака у свій хід, можеш атакувати тричі замість одного разу.',
  'Незламність (2 використання)': 'Можеш використовувати Незламність двічі між тривалими відпочинками.',
  'Вивчені атаки': 'Якщо промахуєшся атакою по істоті, маєш Перевагу на наступний кидок атаки проти неї до кінця свого наступного ходу.',
  'Сплеск дії (2 використання)': 'Можеш використовувати Сплеск дії двічі між відпочинками, але не більше одного разу за хід.',
  'Незламність (3 використання)': 'Можеш використовувати Незламність тричі між тривалими відпочинками.',
  'Епічний дар': 'Отримуєш рису Епічного дару або іншу рису, вимогам якої відповідаєш.',
  'Три додаткові атаки': 'Коли виконуєш дію Атака у свій хід, можеш атакувати чотири рази замість одного.',
};

const originalNames: Record<string, string> = {
  'Бойовий стиль': 'Fighting Style', 'Друге дихання': 'Second Wind', 'Майстерність зброї': 'Weapon Mastery',
  'Сплеск дії (1 використання)': 'Action Surge (One Use)', 'Тактичний розум': 'Tactical Mind', 'Підклас воїна': 'Fighter Subclass',
  'Збільшення характеристик': 'Ability Score Improvement', 'Додаткова атака': 'Extra Attack', 'Тактичне переміщення': 'Tactical Shift',
  'Незламність (1 використання)': 'Indomitable (One Use)', 'Тактична майстерність': 'Tactical Master',
  'Дві додаткові атаки': 'Two Extra Attacks', 'Незламність (2 використання)': 'Indomitable (Two Uses)',
  'Вивчені атаки': 'Studied Attacks', 'Сплеск дії (2 використання)': 'Action Surge (Two Uses)',
  'Незламність (3 використання)': 'Indomitable (Three Uses)', 'Епічний дар': 'Epic Boon', 'Три додаткові атаки': 'Three Extra Attacks',
};

export const fighter: OfficialClassEntry = {
  entity: 'class',
  slug: 'fighter',
  nameUk: 'Воїн',
  nameOriginal: 'Fighter',
  status: 'official',
  hitDie: 'd10',
  primaryAbility: 'Сила або Спритність',
  savingThrows: ['Сила', 'Статура'],
  armorProficiencies: ['легкі обладунки', 'середні обладунки', 'важкі обладунки', 'щити'],
  weaponProficiencies: ['проста зброя', 'військова зброя'],
  toolProficiencies: [],
  skillChoices: { choose: 2, from: ['Акробатика', 'Догляд за тваринами', 'Атлетика', 'Історія', 'Проникливість', 'Залякування', 'Переконання', 'Сприйняття', 'Виживання'] },
  hasSpellcasting: false,
  progression,
  features: featuresFromProgression('fighter', progression, descriptions, originalNames),
  startingEquipment: [
    { title: 'Варіант A', items: ['Кольчуга, дворучний меч, ціп, 8 дротиків, набір дослідника підземель та 4 зм'] },
    { title: 'Варіант B', items: ['Клепана шкіряна броня, скімітар, короткий меч, довгий лук, 20 стріл, сагайдак, набір дослідника підземель та 11 зм'] },
    { title: 'Варіант C', items: ['155 зм'] },
  ],
  subclasses: [
    createSubclass('fighter', 'champion', 'Чемпіон', 'Champion', [[3, 'Покращений критичний удар', 'Improved Critical'], [3, 'Видатний атлет', 'Remarkable Athlete'], [7, 'Додатковий бойовий стиль', 'Additional Fighting Style'], [10, 'Героїчний воїн', 'Heroic Warrior'], [15, 'Вищий критичний удар', 'Superior Critical'], [18, 'Уцілілий', 'Survivor']], SRD_52_SOURCE),
    createSubclass('fighter', 'battle-master', 'Майстер бойових мистецтв', 'Battle Master', [[3, 'Бойова перевага', 'Combat Superiority'], [3, 'Учень війни', 'Student of War'], [7, 'Пізнай свого ворога', 'Know Your Enemy'], [10, 'Покращена бойова перевага', 'Improved Combat Superiority'], [15, 'Невтомний', 'Relentless'], [18, 'Неперевершена бойова перевага', 'Ultimate Combat Superiority']], PHB_2024_SOURCE),
    createSubclass('fighter', 'eldritch-knight', 'Містичний лицар', 'Eldritch Knight', [[3, 'Накладання заклять', 'Spellcasting'], [3, 'Бойовий зв’язок', 'War Bond'], [7, 'Бойова магія', 'War Magic'], [10, 'Містичний удар', 'Eldritch Strike'], [15, 'Містичний ривок', 'Arcane Charge'], [18, 'Покращена бойова магія', 'Improved War Magic']], PHB_2024_SOURCE),
    createSubclass('fighter', 'psi-warrior', 'Псі-воїн', 'Psi Warrior', [[3, 'Псіонічна сила', 'Psionic Power'], [7, 'Телекінетичний адепт', 'Telekinetic Adept'], [10, 'Захищений розум', 'Guarded Mind'], [15, 'Оплот сили', 'Bulwark of Force'], [18, 'Майстер телекінезу', 'Telekinetic Master']], PHB_2024_SOURCE),
  ],
  source: SRD_52_SOURCE,
};
