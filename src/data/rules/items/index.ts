import type { OfficialItemEntry } from '../types';
import { adventuringGear } from './adventuringGear';
import { armor } from './armor';
import { magicItems } from './magicItems';
import { tools } from './tools';
import { weapons } from './weapons';

export const officialItems: OfficialItemEntry[] = [...weapons, ...armor, ...adventuringGear, ...tools, ...magicItems];
