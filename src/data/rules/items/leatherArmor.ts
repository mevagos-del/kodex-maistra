import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

export const leatherArmor: OfficialItemEntry = {
  entity: 'item',
  slug: 'leather-armor',
  nameUk: 'Шкіряна броня',
  nameOriginal: 'Leather Armor',
  status: 'official',
  itemType: 'обладунок',
  category: 'легкі обладунки',
  rarity: 'звичайний',
  attunement: false,
  weight: '10 фунтів',
  cost: '10 зм',
  armorClass: '11 + модифікатор Спритності',
  properties: [{
    id: 'leather-armor-class',
    nameUk: 'Клас захисту',
    sourceText: 'Базовий Клас захисту становить 11 + модифікатор Спритності.',
    scanLine: { armor_class: '11 + модифікатор Спритності' },
  }],
  source: SRD_52_SOURCE,
};
