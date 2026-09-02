import { SRD_52_SOURCE } from '../source';
import { defineRace, raceTrait, raceVariant } from './shared';

export const tiefling = defineRace({
  slug: 'tiefling',
  nameUk: 'Тифлінг',
  nameOriginal: 'Tiefling',
  source: SRD_52_SOURCE,
  creatureType: 'Гуманоїд',
  size: 'Малий або Середній',
  speed: '30 фт',
  languages: [],
  traits: [
    raceTrait('tiefling', 'Темний зір', 'Darkvision', 'Ти маєш Темний зір у межах 60 фт.', { range: '60 фт' }),
    raceTrait('tiefling', 'Потойбічна спадщина', 'Fiendish Legacy', 'Обери потойбічну спадщину й отримай її перевагу 1 рівня. На 3 і 5 рівнях ти вивчаєш указані закляття й завжди маєш їх підготовленими. Кожне можна один раз накласти без комірки; це використання відновлюється після тривалого відпочинку. Також можна використовувати відповідні комірки. Під час вибору спадщини обери Інтелект, Мудрість або Харизму як заклинальну характеристику для цих заклять.', { type: 'Вибір спадщини' }),
    raceTrait('tiefling', 'Потойбічна присутність', 'Otherworldly Presence', 'Ти знаєш замовляння «Тауматургія». Для нього використовується та сама заклинальна характеристика, що й для риси «Потойбічна спадщина».'),
  ],
  variants: [
    raceVariant('tiefling', 'abyssal', 'Безодня спадщина', 'Abyssal Legacy', undefined, [
      raceTrait('tiefling', 'Дар Безодні', 'Abyssal Gift', 'Ти маєш Стійкість до отруйної шкоди й знаєш замовляння «Отруйні бризки». На 3 рівні отримуєш «Промінь хвороби», а на 5 — «Утримання особи».', { resistance: 'Отруйна шкода' }),
    ]),
    raceVariant('tiefling', 'chthonic', 'Хтонічна спадщина', 'Chthonic Legacy', undefined, [
      raceTrait('tiefling', 'Дар хтонічних планів', 'Chthonic Gift', 'Ти маєш Стійкість до некротичної шкоди й знаєш замовляння «Крижаний дотик». На 3 рівні отримуєш «Фальшиве життя», а на 5 — «Промінь ослаблення».', { resistance: 'Некротична шкода' }),
    ]),
    raceVariant('tiefling', 'infernal', 'Інфернальна спадщина', 'Infernal Legacy', undefined, [
      raceTrait('tiefling', 'Дар Пекла', 'Infernal Gift', 'Ти маєш Стійкість до вогняної шкоди й знаєш замовляння «Вогняний заряд». На 3 рівні отримуєш «Пекельну відсіч», а на 5 — «Темрява».', { resistance: 'Вогняна шкода' }),
    ]),
  ],
});
