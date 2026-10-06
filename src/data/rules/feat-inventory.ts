import type { FeatCategory } from './feats';

// Identity audit only. Unverified mechanics never enter the published runtime dataset.
export const phb2024FeatInventory: Record<FeatCategory, readonly string[]> = {
  origin: ['Alert', 'Crafter', 'Healer', 'Lucky', 'Magic Initiate', 'Musician', 'Savage Attacker', 'Skilled', 'Tavern Brawler', 'Tough'],
  general: [
    'Ability Score Improvement', 'Actor', 'Athlete', 'Charger', 'Chef', 'Crossbow Expert', 'Crusher',
    'Defensive Duelist', 'Dual Wielder', 'Durable', 'Elemental Adept', 'Fey-Touched', 'Grappler',
    'Great Weapon Master', 'Heavily Armored', 'Heavy Armor Master', 'Inspiring Leader', 'Keen Mind',
    'Lightly Armored', 'Mage Slayer', 'Martial Weapon Training', 'Medium Armor Master', 'Moderately Armored',
    'Mounted Combatant', 'Observant', 'Piercer', 'Poisoner', 'Polearm Master', 'Resilient', 'Ritual Caster',
    'Sentinel', 'Shadow-Touched', 'Sharpshooter', 'Shield Master', 'Skill Expert', 'Skulker', 'Slasher',
    'Speedy', 'Spell Sniper', 'Telekinetic', 'Telepathic', 'War Caster', 'Weapon Master',
  ],
  fightingStyle: ['Archery', 'Blind Fighting', 'Defense', 'Dueling', 'Great Weapon Fighting', 'Interception', 'Protection', 'Thrown Weapon Fighting', 'Two-Weapon Fighting', 'Unarmed Fighting'],
  epicBoon: [
    'Boon of Combat Prowess', 'Boon of Dimensional Travel', 'Boon of Energy Resistance', 'Boon of Fate',
    'Boon of Fortitude', 'Boon of Irresistible Offense', 'Boon of Recovery', 'Boon of Skill',
    'Boon of Speed', 'Boon of Spell Recall', 'Boon of the Night Spirit', 'Boon of Truesight',
  ],
};
