import { MISSING_SOURCE_TEXT, PHB_2024_SOURCE } from '../source';
import { defineRace, raceTrait } from './shared';

export const aasimar = defineRace({
  slug: 'aasimar',
  nameUk: 'Аасімар',
  nameOriginal: 'Aasimar',
  source: PHB_2024_SOURCE,
  shortDescription: 'Вид із рисами небесного походження.',
  creatureType: 'Гуманоїд',
  size: 'Малий або Середній',
  speed: '30 фт',
  languages: [],
  traits: [
    raceTrait('aasimar', 'Небесна стійкість', 'Celestial Resistance', MISSING_SOURCE_TEXT),
    raceTrait('aasimar', 'Темний зір', 'Darkvision', MISSING_SOURCE_TEXT),
    raceTrait('aasimar', 'Цілющі руки', 'Healing Hands', MISSING_SOURCE_TEXT),
    raceTrait('aasimar', 'Носій світла', 'Light Bearer', MISSING_SOURCE_TEXT),
    raceTrait('aasimar', 'Небесне одкровення', 'Celestial Revelation', MISSING_SOURCE_TEXT),
  ],
  variants: [],
});
