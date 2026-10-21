import type { OfficialMonsterEntry } from '../types';
import { officialChromaticDragons } from './dragons-chromatic';
import { officialMetallicDragons } from './dragons-metallic';
import { officialOtherDragons } from './dragons-other';

export const officialDragons: OfficialMonsterEntry[] = [
  ...officialChromaticDragons,
  ...officialMetallicDragons,
  ...officialOtherDragons,
];
