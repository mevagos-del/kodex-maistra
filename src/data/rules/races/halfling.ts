import { SRD_52_SOURCE } from '../source';
import { defineRace, raceTrait } from './shared';

export const halfling = defineRace({
  slug: 'halfling',
  nameUk: 'Напіврослик',
  nameOriginal: 'Halfling',
  source: SRD_52_SOURCE,
  creatureType: 'Гуманоїд',
  size: 'Малий',
  speed: '30 фт',
  languages: [],
  lifespan: 'Близько 150 років',
  traits: [
    raceTrait('halfling', 'Хоробрість', 'Brave', 'Ти маєш Перевагу на ряткидки, щоб уникнути або припинити стан Наляканий.', { advantage: 'Ряткидки проти стану Наляканий' }),
    raceTrait('halfling', 'Спритність напіврослика', 'Halfling Nimbleness', 'Ти можеш рухатися крізь простір будь-якої істоти, що більша за тебе на один або більше розмірів, але не можеш зупинятися в тому самому просторі.'),
    raceTrait('halfling', 'Удача', 'Luck', 'Коли на к20 у перевірці к20 випадає 1, ти можеш перекинути кістку й мусиш використати новий результат.', { condition: 'На к20 випало 1' }),
    raceTrait('halfling', 'Природна скритність', 'Naturally Stealthy', 'Ти можеш виконати дію Сховатися, навіть якщо тебе приховує лише істота, яка більша за тебе щонайменше на один розмір.', { action_type: 'Дія Сховатися' }),
  ],
  variants: [],
});
