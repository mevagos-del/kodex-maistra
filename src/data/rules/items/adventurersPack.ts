import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

export const adventurersPack: OfficialItemEntry = {
  entity: 'item',
  slug: 'adventurers-pack',
  nameUk: 'Набір мандрівника',
  nameOriginal: 'Explorer’s Pack',
  status: 'official',
  itemType: 'спорядження',
  category: 'пригодницьке спорядження',
  rarity: 'звичайний',
  attunement: false,
  weight: '55 фунтів',
  cost: '10 зм',
  properties: [{
    id: 'explorers-pack-contents',
    nameUk: 'Вміст набору',
    sourceText: 'Рюкзак, спальник, 2 фляги олії, 10 денних пайків, мотузка, кресало, 10 смолоскипів і бурдюк.',
    scanLine: { contains: '8 типів спорядження' },
  }],
  source: SRD_52_SOURCE,
};
