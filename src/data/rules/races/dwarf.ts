import { SRD_52_SOURCE } from '../source';
import { defineRace, raceTrait } from './shared';

export const dwarf = defineRace({
  slug: 'dwarf',
  nameUk: 'Дворф',
  nameOriginal: 'Dwarf',
  source: SRD_52_SOURCE,
  imageUrl: '/images/catalog/races/dwarf.webp',
  creatureType: 'Гуманоїд',
  size: 'Середній',
  speed: '30 фт',
  languages: [],
  lifespan: 'Близько 350 років',
  traits: [
    raceTrait('dwarf', 'Темний зір', 'Darkvision', 'Ти маєш Темний зір у межах 120 фт.', { range: '120 фт' }),
    raceTrait('dwarf', 'Дворфійська стійкість', 'Dwarven Resilience', 'Ти маєш Стійкість до отруйної шкоди. Також ти маєш Перевагу на ряткидки, щоб уникнути або припинити стан Отруєний.', { resistance: 'Отруйна шкода', advantage: 'Ряткидки проти стану Отруєний' }),
    raceTrait('dwarf', 'Дворфійська витривалість', 'Dwarven Toughness', 'Твій максимум хітів збільшується на 1 і знову збільшується на 1 щоразу, коли ти здобуваєш рівень.', { effect: '+1 до максимуму хітів за кожний рівень' }),
    raceTrait('dwarf', 'Чуття каменю', 'Stonecunning', 'Бонусною дією ти отримуєш Віброчуття в межах 60 фт на 10 хвилин. Для цього ти маєш стояти на кам’яній поверхні або торкатися її; камінь може бути природним чи обробленим. Кількість використань дорівнює бонусу майстерності; усі використання відновлюються після тривалого відпочинку.', { action_type: 'Бонусна дія', range: '60 фт', duration: '10 хвилин' }),
  ],
  variants: [],
});
