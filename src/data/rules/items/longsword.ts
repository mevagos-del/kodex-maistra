import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

export const longsword: OfficialItemEntry = {
  entity: 'item',
  slug: 'longsword',
  nameUk: 'Довгий меч',
  nameOriginal: 'Longsword',
  status: 'official',
  itemType: 'зброя',
  category: 'військова зброя ближнього бою',
  rarity: 'звичайний',
  attunement: false,
  weight: '3 фунти',
  cost: '15 зм',
  damage: '1к8',
  damageType: 'рубальна',
  properties: [{
    id: 'longsword-properties',
    nameUk: 'Властивості довгого меча',
    sourceText: 'Шкода: 1к8 рубальна. Властивість: універсальна (1к10). Майстерність: Ослаблення.',
    scanLine: { damage: '1к8', damage_type: 'рубальна', property: 'універсальна (1к10)' },
  }],
  source: SRD_52_SOURCE,
};
