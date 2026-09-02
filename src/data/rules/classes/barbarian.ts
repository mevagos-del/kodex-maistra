import { PHB_2024_SOURCE, SRD_52_SOURCE } from '../source';
import type { OfficialClassEntry, OfficialProgressionRow } from '../types';
import { createSubclass, featuresFromProgression } from './shared';

const progression: OfficialProgressionRow[] = [
  { level: 1, proficiencyBonus: '+2', features: ['Лють', 'Захист без обладунків', 'Майстерність зброї'], resources: { rages: 2, rage_damage: '+2', weapon_mastery: 2 } },
  { level: 2, proficiencyBonus: '+2', features: ['Відчуття небезпеки', 'Безрозсудна атака'], resources: { rages: 2, rage_damage: '+2', weapon_mastery: 2 } },
  { level: 3, proficiencyBonus: '+2', features: ['Підклас варвара', 'Первісне знання'], resources: { rages: 3, rage_damage: '+2', weapon_mastery: 2 } },
  { level: 4, proficiencyBonus: '+2', features: ['Збільшення характеристик'], resources: { rages: 3, rage_damage: '+2', weapon_mastery: 3 } },
  { level: 5, proficiencyBonus: '+3', features: ['Додаткова атака', 'Швидкий рух'], resources: { rages: 3, rage_damage: '+2', weapon_mastery: 3 } },
  { level: 6, proficiencyBonus: '+3', features: ['Особливість підкласу (6 рівень)'], resources: { rages: 4, rage_damage: '+2', weapon_mastery: 3 } },
  { level: 7, proficiencyBonus: '+3', features: ['Дикий інстинкт', 'Інстинктивний ривок'], resources: { rages: 4, rage_damage: '+2', weapon_mastery: 3 } },
  { level: 8, proficiencyBonus: '+3', features: ['Збільшення характеристик'], resources: { rages: 4, rage_damage: '+2', weapon_mastery: 3 } },
  { level: 9, proficiencyBonus: '+4', features: ['Жорстокий удар'], resources: { rages: 4, rage_damage: '+3', weapon_mastery: 3 } },
  { level: 10, proficiencyBonus: '+4', features: ['Особливість підкласу (10 рівень)'], resources: { rages: 4, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 11, proficiencyBonus: '+4', features: ['Невпинна лють'], resources: { rages: 4, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 12, proficiencyBonus: '+4', features: ['Збільшення характеристик'], resources: { rages: 5, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 13, proficiencyBonus: '+5', features: ['Покращений жорстокий удар'], resources: { rages: 5, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 14, proficiencyBonus: '+5', features: ['Особливість підкласу (14 рівень)'], resources: { rages: 5, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 15, proficiencyBonus: '+5', features: ['Тривала лють'], resources: { rages: 5, rage_damage: '+3', weapon_mastery: 4 } },
  { level: 16, proficiencyBonus: '+5', features: ['Збільшення характеристик'], resources: { rages: 5, rage_damage: '+4', weapon_mastery: 4 } },
  { level: 17, proficiencyBonus: '+6', features: ['Покращений жорстокий удар'], resources: { rages: 6, rage_damage: '+4', weapon_mastery: 4 } },
  { level: 18, proficiencyBonus: '+6', features: ['Нездоланна міць'], resources: { rages: 6, rage_damage: '+4', weapon_mastery: 4 } },
  { level: 19, proficiencyBonus: '+6', features: ['Епічний дар'], resources: { rages: 6, rage_damage: '+4', weapon_mastery: 4 } },
  { level: 20, proficiencyBonus: '+6', features: ['Первісний чемпіон'], resources: { rages: 6, rage_damage: '+4', weapon_mastery: 4 } },
];

const descriptions: Record<string, string> = {
  'Лють': 'Бонусною дією входиш у Лють, якщо не носиш важких обладунків. Кількість використань указана в таблиці прогресії; після короткого відпочинку відновлюєш одне використання, а після тривалого — всі. Під час Люті маєш Стійкість до дробильної, колотої та рубальної шкоди, Перевагу на перевірки й ряткидки Сили та додаєш Шкоду люті до атак, що використовують Силу.',
  'Захист без обладунків': 'Поки не носиш обладунків, твій базовий Клас захисту дорівнює 10 + модифікатор Спритності + модифікатор Статури. Можеш користуватися щитом і зберігати цю перевагу.',
  'Майстерність зброї': 'Можеш використовувати властивості майстерності вибраних видів простої або військової зброї ближнього бою. Кількість вибраних видів указана в таблиці прогресії; після тривалого відпочинку можеш змінити один вибір.',
  'Відчуття небезпеки': 'Маєш Перевагу на ряткидки Спритності, якщо не перебуваєш у стані Недієздатний.',
  'Безрозсудна атака': 'Коли робиш перший кидок атаки у свій хід, можеш атакувати безрозсудно. До початку твого наступного ходу маєш Перевагу на атаки, що використовують Силу, але кидки атак проти тебе також мають Перевагу.',
  'Підклас варвара': 'Обираєш підклас Варвара. Особливості вибраного підкласу показано окремо в розділі «Підкласи».',
  'Первісне знання': 'Отримуєш володіння ще однією навичкою зі списку навичок Варвара. Під час Люті можеш виконувати перевірки Акробатики, Залякування, Сприйняття, Скритності або Виживання як перевірки Сили.',
  'Збільшення характеристик': 'Отримуєш рису «Збільшення характеристик» або іншу рису, вимогам якої відповідаєш.',
  'Додаткова атака': 'Коли виконуєш дію Атака у свій хід, можеш атакувати двічі замість одного разу.',
  'Швидкий рух': 'Твоя Швидкість збільшується на 10 футів, поки не носиш важких обладунків.',
  'Дикий інстинкт': 'Маєш Перевагу на кидки Ініціативи.',
  'Інстинктивний ривок': 'Як частину бонусної дії, якою входиш у Лють, можеш переміститися на відстань до половини своєї Швидкості.',
  'Жорстокий удар': 'Коли використовуєш Безрозсудну атаку, можеш відмовитися від Переваги на одному кидку атаки Силою, який не має Невдачі. У разі влучання атака завдає додатково 1к10 шкоди того самого типу й застосовує один доступний ефект Жорстокого удару.',
  'Невпинна лють': 'Якщо під час Люті твої хіти зменшуються до 0 і ти не гинеш одразу, зроби ряткидок Статури СК 10. У разі успіху кількість хітів стає рівною подвоєному рівню Варвара. Після кожного наступного використання СК зростає на 5; після короткого або тривалого відпочинку повертається до 10.',
  'Покращений жорстокий удар': 'На 13 рівні отримуєш додаткові варіанти ефекту Жорстокого удару. На 17 рівні додаткова шкода стає 2к10, і за одне використання можеш застосувати два різні ефекти.',
  'Тривала лють': 'Коли кидаєш Ініціативу, можеш відновити всі витрачені використання Люті; повторно це можна зробити після тривалого відпочинку. Лють триває 10 хвилин і завершується достроково, якщо ти Непритомний або вдягаєш важкі обладунки.',
  'Нездоланна міць': 'Якщо результат перевірки Сили або ряткидка Сили менший за твоє значення Сили, можеш використати значення Сили замість результату.',
  'Епічний дар': 'Отримуєш рису Епічного дару або іншу рису, вимогам якої відповідаєш.',
  'Первісний чемпіон': 'Значення Сили та Статури збільшуються на 4, максимум для кожного з них стає 25.',
};

const originalNames: Record<string, string> = {
  'Лють': 'Rage', 'Захист без обладунків': 'Unarmored Defense', 'Майстерність зброї': 'Weapon Mastery',
  'Відчуття небезпеки': 'Danger Sense', 'Безрозсудна атака': 'Reckless Attack', 'Підклас варвара': 'Barbarian Subclass',
  'Первісне знання': 'Primal Knowledge', 'Збільшення характеристик': 'Ability Score Improvement', 'Додаткова атака': 'Extra Attack',
  'Швидкий рух': 'Fast Movement', 'Дикий інстинкт': 'Feral Instinct', 'Інстинктивний ривок': 'Instinctive Pounce',
  'Жорстокий удар': 'Brutal Strike', 'Невпинна лють': 'Relentless Rage', 'Покращений жорстокий удар': 'Improved Brutal Strike',
  'Тривала лють': 'Persistent Rage', 'Нездоланна міць': 'Indomitable Might', 'Епічний дар': 'Epic Boon',
  'Первісний чемпіон': 'Primal Champion',
};

export const barbarian: OfficialClassEntry = {
  entity: 'class',
  slug: 'barbarian',
  nameUk: 'Варвар',
  nameOriginal: 'Barbarian',
  status: 'official',
  hitDie: 'd12',
  primaryAbility: 'Сила',
  savingThrows: ['Сила', 'Статура'],
  armorProficiencies: ['легкі обладунки', 'середні обладунки', 'щити'],
  weaponProficiencies: ['проста зброя', 'військова зброя'],
  toolProficiencies: [],
  skillChoices: { choose: 2, from: ['Догляд за тваринами', 'Атлетика', 'Залякування', 'Природа', 'Сприйняття', 'Виживання'] },
  hasSpellcasting: false,
  progression,
  features: featuresFromProgression('barbarian', progression, descriptions, originalNames),
  startingEquipment: [
    { title: 'Варіант A', items: ['Сокира, 4 ручні сокири, набір мандрівника та 15 зм'] },
    { title: 'Варіант B', items: ['75 зм'] },
  ],
  subclasses: [
    createSubclass('barbarian', 'berserker', 'Шлях берсерка', 'Path of the Berserker', [[3, 'Шал', 'Frenzy'], [6, 'Бездумна лють', 'Mindless Rage'], [10, 'Відплата', 'Retaliation'], [14, 'Залякувальна присутність', 'Intimidating Presence']], SRD_52_SOURCE),
    createSubclass('barbarian', 'wild-heart', 'Шлях дикого серця', 'Path of the Wild Heart', [[3, 'Промовець із тваринами', 'Animal Speaker'], [3, 'Лють дикої природи', 'Rage of the Wilds'], [6, 'Аспект дикої природи', 'Aspect of the Wilds'], [10, 'Промовець природи', 'Nature Speaker'], [14, 'Сила дикої природи', 'Power of the Wilds']], PHB_2024_SOURCE),
    createSubclass('barbarian', 'world-tree', 'Шлях Світового дерева', 'Path of the World Tree', [[3, 'Життєва сила дерева', 'Vitality of the Tree'], [6, 'Гілки дерева', 'Branches of the Tree'], [10, 'Ударне коріння', 'Battering Roots'], [14, 'Подорож деревом', 'Travel Along the Tree']], PHB_2024_SOURCE),
    createSubclass('barbarian', 'zealot', 'Шлях фанатика', 'Path of the Zealot', [[3, 'Божественна лють', 'Divine Fury'], [3, 'Воїн богів', 'Warrior of the Gods'], [6, 'Фанатичний фокус', 'Fanatical Focus'], [10, 'Фанатична присутність', 'Zealous Presence'], [14, 'Лють богів', 'Rage of the Gods']], PHB_2024_SOURCE),
  ],
  source: SRD_52_SOURCE,
};
