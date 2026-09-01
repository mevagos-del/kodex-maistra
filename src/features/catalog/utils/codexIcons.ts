export const CODEX_ICONS = {
  ruleVersion: '/icons/codex/01-icon-rule-version.png',
  contentType: '/icons/codex/02-icon-content-type.png',
  creatureType: '/icons/codex/03-icon-creature-type.png',
  size: '/icons/codex/04-icon-size.png',
  speed: '/icons/codex/05-icon-speed.png',
  languages: '/icons/codex/06-icon-languages.png',
  lifespan: '/icons/codex/07-icon-lifespan.png',
  behavior: '/icons/codex/08-icon-behavior-culture.png',
  strength: '/icons/codex/09-icon-strength.png',
  dexterity: '/icons/codex/10-icon-dexterity.png',
  constitution: '/icons/codex/11-icon-constitution.png',
  intelligence: '/icons/codex/12-icon-intelligence.png',
  wisdom: '/icons/codex/13-icon-wisdom.png',
  charisma: '/icons/codex/14-icon-charisma.png',
  darkvision: '/icons/codex/15-icon-darkvision.png',
  poisonResistance: '/icons/codex/16-icon-poison-resistance.png',
  dwarvenToughness: '/icons/codex/17-icon-dwarven-toughness.png',
  stoneMemory: '/icons/codex/18-icon-stone-memory.png',
  keenSenses: '/icons/codex/19-icon-keen-senses.png',
  feyAncestry: '/icons/codex/20-icon-fey-ancestry.png',
  trance: '/icons/codex/21-icon-trance.png',
  brave: '/icons/codex/22-icon-brave.png',
  lucky: '/icons/codex/23-icon-lucky.png',
  draconicAncestry: '/icons/codex/24-icon-draconic-ancestry.png',
  tools: '/icons/codex/25-icon-tools.png',
  weaponProficiency: '/icons/codex/26-icon-weapon-proficiency.png',
  armorProficiency: '/icons/codex/27-icon-armor-proficiency.png',
  skillProficiency: '/icons/codex/28-icon-skill-proficiency.png',
  savingThrow: '/icons/codex/29-icon-saving-throw.png',
  resistance: '/icons/codex/30-icon-resistance.png',
  advantage: '/icons/codex/31-icon-advantage.png',
  condition: '/icons/codex/32-icon-condition.png',
  damageType: '/icons/codex/33-icon-damage-type.png',
  choice: '/icons/codex/34-icon-choice-optional-rule.png',
  races: '/icons/codex/35-icon-races.png',
  classes: '/icons/codex/36-icon-classes.png',
  items: '/icons/codex/37-icon-items.png',
  spells: '/icons/codex/38-icon-spells.png',
  characters: '/icons/codex/39-icon-characters.png',
  combatTracker: '/icons/codex/43-icon-combat-tracker.png',
  weapon: '/icons/codex/45-icon-weapon.png',
  armor: '/icons/codex/46-icon-armor.png',
  adventuringGear: '/icons/codex/47-icon-adventuring-gear.png',
  magicItem: '/icons/codex/48-icon-magic-item.png',
  potion: '/icons/codex/49-icon-potion.png',
  ring: '/icons/codex/50-icon-ring.png',
  wand: '/icons/codex/51-icon-wand.png',
  scroll: '/icons/codex/52-icon-scroll.png',
  protection: '/icons/codex/55-icon-protection-spell.png',
} as const;

const factIcons: Record<string, string> = {
  'Версія правил': CODEX_ICONS.ruleVersion,
  'Тип контенту': CODEX_ICONS.contentType,
  'Тип істоти': CODEX_ICONS.creatureType,
  'Розмір': CODEX_ICONS.size,
  'Швидкість': CODEX_ICONS.speed,
  'Мови': CODEX_ICONS.languages,
  'Тривалість життя': CODEX_ICONS.lifespan,
  'Поведінка': CODEX_ICONS.behavior,
};

const abilityIcons: Record<string, string> = {
  'Сила': CODEX_ICONS.strength,
  'Спритність': CODEX_ICONS.dexterity,
  'Статура': CODEX_ICONS.constitution,
  'Інтелект': CODEX_ICONS.intelligence,
  'Мудрість': CODEX_ICONS.wisdom,
  'Харизма': CODEX_ICONS.charisma,
};

export function factIconForLabel(label: string) {
  return factIcons[label] ?? CODEX_ICONS.races;
}

export function abilityIconForLabel(label: string) {
  return abilityIcons[label] ?? CODEX_ICONS.choice;
}

export function traitIconForTitle(title: string) {
  const normalized = title.toLowerCase();
  if (/темн.*зір|darkvision|нічн.*баченн/.test(normalized)) return CODEX_ICONS.darkvision;
  if (/отрут|poison/.test(normalized)) return CODEX_ICONS.poisonResistance;
  if (/дворф.*витрив|витриваліст|toughness/.test(normalized)) return CODEX_ICONS.dwarvenToughness;
  if (/кам['’ʼ]?ян|камен|stone|підзем|ремес/.test(normalized)) return CODEX_ICONS.stoneMemory;
  if (/гостр.*чут|keen senses|senses/.test(normalized)) return CODEX_ICONS.keenSenses;
  if (/фей.*поход|fey ancestry/.test(normalized)) return CODEX_ICONS.feyAncestry;
  if (/транс|trance/.test(normalized)) return CODEX_ICONS.trance;
  if (/хоробр|brave/.test(normalized)) return CODEX_ICONS.brave;
  if (/удач|lucky/.test(normalized)) return CODEX_ICONS.lucky;
  if (/дракон.*поход|draconic ancestry/.test(normalized)) return CODEX_ICONS.draconicAncestry;
  if (/вибір|обрати|optional|choice|варіант/.test(normalized)) return CODEX_ICONS.choice;
  return CODEX_ICONS.races;
}

export function registryIconForLabel(label: string) {
  const normalized = label.toLowerCase();
  if (/інструмент/.test(normalized)) return CODEX_ICONS.tools;
  if (/збро/.test(normalized)) return CODEX_ICONS.weaponProficiency;
  if (/брон|обладунк/.test(normalized)) return CODEX_ICONS.armorProficiency;
  if (/навич/.test(normalized)) return CODEX_ICONS.skillProficiency;
  if (/ряткид/.test(normalized)) return CODEX_ICONS.savingThrow;
  if (/мов/.test(normalized)) return CODEX_ICONS.languages;
  if (/стійк/.test(normalized)) return CODEX_ICONS.resistance;
  if (/переваг/.test(normalized)) return CODEX_ICONS.advantage;
  if (/стан/.test(normalized)) return CODEX_ICONS.condition;
  if (/тип шкоди|шкод/.test(normalized)) return CODEX_ICONS.damageType;
  return CODEX_ICONS.choice;
}

export function subraceIconForTitle(title: string) {
  return /гір|пагорб|кам|mountain|hill|stone/i.test(title)
    ? CODEX_ICONS.stoneMemory
    : CODEX_ICONS.choice;
}

export function classFactIconForLabel(label: string, value = '') {
  const normalized = `${label} ${value}`.toLowerCase();
  if (/кістк.*хіт/.test(normalized)) return CODEX_ICONS.dwarvenToughness;
  if (/основн.*характер/.test(normalized)) {
    const ability = Object.keys(abilityIcons).find((name) => normalized.includes(name.toLowerCase()));
    return ability ? abilityIconForLabel(ability) : CODEX_ICONS.classes;
  }
  if (/ряткид/.test(normalized)) return CODEX_ICONS.savingThrow;
  if (/обладунк|брон/.test(normalized)) return CODEX_ICONS.armorProficiency;
  if (/збро/.test(normalized)) return CODEX_ICONS.weaponProficiency;
  if (/інструмент/.test(normalized)) return CODEX_ICONS.tools;
  if (/навич/.test(normalized)) return CODEX_ICONS.skillProficiency;
  if (/заклин/.test(normalized)) return CODEX_ICONS.spells;
  return CODEX_ICONS.classes;
}

export function classFeatureIconForTitle(title: string) {
  const normalized = title.toLowerCase();
  if (/заклин|магі|spell/.test(normalized)) return CODEX_ICONS.spells;
  if (/ата|бій|combat|action/.test(normalized)) return CODEX_ICONS.combatTracker;
  if (/хіт|здоров|витрив|друге дих/.test(normalized)) return CODEX_ICONS.dwarvenToughness;
  if (/збро|weapon/.test(normalized)) return CODEX_ICONS.weaponProficiency;
  if (/брон|захист|armor/.test(normalized)) return CODEX_ICONS.armorProficiency;
  return CODEX_ICONS.choice;
}

export function itemIconForType(...values: Array<string | null | undefined>) {
  const normalized = values.filter(Boolean).join(' ').toLowerCase();
  if (/збро|меч|weapon|sword/.test(normalized)) return CODEX_ICONS.weapon;
  if (/брон|обладунк|armor/.test(normalized)) return CODEX_ICONS.armor;
  if (/зілл|potion/.test(normalized)) return CODEX_ICONS.potion;
  if (/перст|кільц|ring/.test(normalized)) return CODEX_ICONS.ring;
  if (/жезл|wand/.test(normalized)) return CODEX_ICONS.wand;
  if (/сувій|scroll/.test(normalized)) return CODEX_ICONS.scroll;
  if (/магі|magic/.test(normalized)) return CODEX_ICONS.magicItem;
  if (/споряд|набір|gear|pack/.test(normalized)) return CODEX_ICONS.adventuringGear;
  return CODEX_ICONS.items;
}

export function itemFactIconForLabel(label: string, itemType?: string | null, category?: string | null) {
  const normalized = label.toLowerCase();
  if (/тип|категор/.test(normalized)) return itemIconForType(itemType, category);
  if (/рідкіст|магіч/.test(normalized)) return CODEX_ICONS.magicItem;
  if (/налаштуван|вимог/.test(normalized)) return CODEX_ICONS.choice;
  if (/ваг/.test(normalized)) return CODEX_ICONS.size;
  if (/варт|цін/.test(normalized)) return CODEX_ICONS.items;
  if (/шкод/.test(normalized)) return CODEX_ICONS.damageType;
  if (/клас захист|захист/.test(normalized)) return CODEX_ICONS.protection;
  return itemIconForType(itemType, category);
}
