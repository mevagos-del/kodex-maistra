import type { OfficialItemEntry } from '../../types';
import { armorMagicItems } from './armor';
import { weaponsMagicItems } from './weapons';
import { wondrousMagicItems } from './wondrous';
import { potionsMagicItems } from './potions';
import { ringsMagicItems } from './rings';
import { staffsMagicItems } from './staffs';
import { wandsMagicItems } from './wands';
import { shieldsMagicItems } from './shields';
import { ammunitionMagicItems } from './ammunition';
import { rodsMagicItems } from './rods';
import { scrollsMagicItems } from './scrolls';

export const completeMagicItems: OfficialItemEntry[] = [
  ...armorMagicItems,
  ...weaponsMagicItems,
  ...wondrousMagicItems,
  ...potionsMagicItems,
  ...ringsMagicItems,
  ...staffsMagicItems,
  ...wandsMagicItems,
  ...shieldsMagicItems,
  ...ammunitionMagicItems,
  ...rodsMagicItems,
  ...scrollsMagicItems,
];
