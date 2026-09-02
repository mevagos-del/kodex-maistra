import { SRD_52_SOURCE } from '../source';
import { defineRace, raceTrait } from './shared';

export const human = defineRace({
  slug: 'human',
  nameUk: 'Людина',
  nameOriginal: 'Human',
  source: SRD_52_SOURCE,
  imageUrl: '/images/catalog/races/human.webp',
  creatureType: 'Гуманоїд',
  size: 'Малий або Середній',
  speed: '30 фт',
  languages: [],
  traits: [
    raceTrait('human', 'Винахідливість', 'Resourceful', 'Ти отримуєш Героїчне натхнення щоразу, коли завершуєш тривалий відпочинок.', { recovery: 'Тривалий відпочинок' }),
    raceTrait('human', 'Умілість', 'Skillful', 'Ти отримуєш володіння однією навичкою на вибір.', { type: 'Вибір навички' }),
    raceTrait('human', 'Універсальність', 'Versatile', 'Ти отримуєш одну рису Походження на вибір. Рекомендована риса — «Умілий».', { type: 'Вибір риси Походження' }),
  ],
  variants: [],
});
