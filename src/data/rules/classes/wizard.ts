import { MISSING_SOURCE_TEXT, SRD_52_SOURCE } from '../source';
import type { OfficialClassEntry, OfficialProgressionRow } from '../types';
import { featuresFromProgression } from './shared';

const slotRows = [
  [2, '—', '—', '—', '—', '—', '—', '—', '—'], [3, '—', '—', '—', '—', '—', '—', '—', '—'],
  [4, 2, '—', '—', '—', '—', '—', '—', '—'], [4, 3, '—', '—', '—', '—', '—', '—', '—'],
  [4, 3, 2, '—', '—', '—', '—', '—', '—'], [4, 3, 3, '—', '—', '—', '—', '—', '—'],
  [4, 3, 3, 1, '—', '—', '—', '—', '—'], [4, 3, 3, 2, '—', '—', '—', '—', '—'],
  [4, 3, 3, 3, 1, '—', '—', '—', '—'], [4, 3, 3, 3, 2, '—', '—', '—', '—'],
  [4, 3, 3, 3, 2, 1, '—', '—', '—'], [4, 3, 3, 3, 2, 1, '—', '—', '—'],
  [4, 3, 3, 3, 2, 1, 1, '—', '—'], [4, 3, 3, 3, 2, 1, 1, '—', '—'],
  [4, 3, 3, 3, 2, 1, 1, 1, '—'], [4, 3, 3, 3, 2, 1, 1, 1, '—'],
  [4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 3, 2, 2, 1, 1],
] as const;

const featureNames = [
  ['Накладання заклять', 'Знавець ритуалів', 'Відновлення магії'], ['Науковець'], ['Підклас чарівника'],
  ['Збільшення характеристик'], ['Запам’ятовування закляття'], ['Особливість підкласу (6 рівень)'], [],
  ['Збільшення характеристик'], [], ['Особливість підкласу (10 рівень)'], [], ['Збільшення характеристик'], [],
  ['Особливість підкласу (14 рівень)'], [], ['Збільшення характеристик'], [], ['Майстерність заклять'],
  ['Епічний дар'], ['Фірмові закляття'],
];
const cantrips = [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
const prepared = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25];

const progression: OfficialProgressionRow[] = slotRows.map((slots, index) => ({
  level: index + 1,
  proficiencyBonus: index < 4 ? '+2' : index < 8 ? '+3' : index < 12 ? '+4' : index < 16 ? '+5' : '+6',
  features: featureNames[index],
  spellcasting: {
    cantrips: cantrips[index],
    prepared_spells: prepared[index],
    ...Object.fromEntries(slots.map((value, slotIndex) => [`slot_${slotIndex + 1}`, value])),
  },
}));

export const wizard: OfficialClassEntry = {
  entity: 'class',
  slug: 'wizard',
  nameUk: 'Чарівник',
  nameOriginal: 'Wizard',
  status: 'official',
  hitDie: 'd6',
  primaryAbility: 'Інтелект',
  savingThrows: ['Інтелект', 'Мудрість'],
  armorProficiencies: [],
  weaponProficiencies: ['проста зброя'],
  toolProficiencies: [],
  skillChoices: { choose: 2, from: ['Арканознавство', 'Історія', 'Проникливість', 'Розслідування', 'Медицина', 'Природа', 'Релігія'] },
  hasSpellcasting: true,
  progression,
  features: featuresFromProgression('wizard', progression),
  startingEquipment: [
    { title: 'Варіант A', items: ['2 кинджали, магічний фокус (бойовий посох), мантія, книга заклять, набір науковця та 5 зм'] },
    { title: 'Варіант B', items: ['55 зм'] },
  ],
  subclasses: [{
    id: 'wizard-evoker',
    slug: 'evoker',
    nameUk: 'Евокатор',
    nameOriginal: 'Evoker',
    chosenAtLevel: 3,
    features: [
      { id: 'evoker-evocation-savant', nameUk: 'Знавець евокації', nameOriginal: 'Evocation Savant', level: 3, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-evoker-evocation-savant' },
      { id: 'evoker-potent-cantrip', nameUk: 'Потужне замовляння', nameOriginal: 'Potent Cantrip', level: 3, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-evoker-potent-cantrip' },
      { id: 'evoker-sculpt-spells', nameUk: 'Формування заклять', nameOriginal: 'Sculpt Spells', level: 6, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-evoker-sculpt-spells' },
      { id: 'evoker-empowered-evocation', nameUk: 'Посилена евокація', nameOriginal: 'Empowered Evocation', level: 10, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-evoker-empowered-evocation' },
      { id: 'evoker-overchannel', nameUk: 'Перенапруження', nameOriginal: 'Overchannel', level: 14, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-evoker-overchannel' },
    ],
  }],
  source: SRD_52_SOURCE,
};
