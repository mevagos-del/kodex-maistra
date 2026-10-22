import { beastsHumanoidsDescriptions } from './beasts-humanoids';
import { dragonDescriptions } from './dragons';
import { hostileCreatureDescriptions } from './hostile-creatures';
import { worldCreatureDescriptions } from './world-creatures';

export const BESTIARY_DESCRIPTIONS: Readonly<Record<string, string>> = {
  ...beastsHumanoidsDescriptions,
  ...worldCreatureDescriptions,
  ...hostileCreatureDescriptions,
  ...dragonDescriptions,
};
