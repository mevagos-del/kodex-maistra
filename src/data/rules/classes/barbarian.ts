import { MISSING_SOURCE_TEXT, SRD_52_SOURCE } from '../source';
import type { OfficialClassEntry, OfficialProgressionRow } from '../types';
import { featuresFromProgression } from './shared';

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
  features: featuresFromProgression('barbarian', progression),
  startingEquipment: [
    { title: 'Варіант A', items: ['Сокира, 4 ручні сокири, набір мандрівника та 15 зм'] },
    { title: 'Варіант B', items: ['75 зм'] },
  ],
  subclasses: [{
    id: 'barbarian-berserker',
    slug: 'berserker',
    nameUk: 'Шлях берсерка',
    nameOriginal: 'Path of the Berserker',
    chosenAtLevel: 3,
    features: [
      { id: 'berserker-frenzy', nameUk: 'Шал', nameOriginal: 'Frenzy', level: 3, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-berserker-frenzy' },
      { id: 'berserker-mindless-rage', nameUk: 'Бездумна лють', nameOriginal: 'Mindless Rage', level: 6, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-berserker-mindless-rage' },
      { id: 'berserker-retaliation', nameUk: 'Відплата', nameOriginal: 'Retaliation', level: 10, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-berserker-retaliation' },
      { id: 'berserker-intimidating-presence', nameUk: 'Залякувальна присутність', nameOriginal: 'Intimidating Presence', level: 14, sourceText: MISSING_SOURCE_TEXT, anchorId: 'subclass-berserker-intimidating-presence' },
    ],
  }],
  source: SRD_52_SOURCE,
};
