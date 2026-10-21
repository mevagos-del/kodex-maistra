import { SRD_52_SOURCE } from '../source';
import type {
  OfficialMonsterAction,
  OfficialMonsterAbility,
  OfficialMonsterEntry,
  OfficialMonsterRuleBlock,
  OfficialMonsterSpellReference,
} from '../types';

type AbilityTuple = [number, string, string?];
type DragonInput = Omit<OfficialMonsterEntry, 'entity' | 'status' | 'source' | 'creatureType' | 'subtype'>;

const ability = ([score, modifier, save = modifier]: AbilityTuple): OfficialMonsterAbility => ({ score, modifier, save });
const abilities = (values: [AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple, AbilityTuple]) => ({
  strength: ability(values[0]), dexterity: ability(values[1]), constitution: ability(values[2]),
  intelligence: ability(values[3]), wisdom: ability(values[4]), charisma: ability(values[5]),
});
const trait = (id: string, nameUk: string, nameOriginal: string, sourceText: string, extra: Partial<OfficialMonsterRuleBlock> = {}): OfficialMonsterRuleBlock => ({ id, nameUk, nameOriginal, sourceText, ...extra });
const action = (id: string, nameUk: string, nameOriginal: string, extra: Omit<OfficialMonsterAction, 'id' | 'nameUk' | 'nameOriginal'> = {}): OfficialMonsterAction => ({ id, nameUk, nameOriginal, ...extra });
const spell = (nameUk: string, slug?: string, qualifier?: string, castAtLevel?: number): OfficialMonsterSpellReference => ({ nameUk, ...(slug ? { slug } : {}), ...(qualifier ? { qualifier } : {}), ...(castAtLevel ? { castAtLevel } : {}) });
const dragon = (input: DragonInput): OfficialMonsterEntry => {
  const spellSlugs = input.spellcasting?.groups.flatMap(group => group.spells.map(entry => entry.slug).filter(Boolean) as string[]) ?? [];
  const relationships = input.relationships || spellSlugs.length
    ? { ...input.relationships, ...(spellSlugs.length ? { spellSlugs: [...new Set([...(input.relationships?.spellSlugs ?? []), ...spellSlugs])] } : {}) }
    : undefined;
  return { entity: 'monster', status: 'official', source: SRD_52_SOURCE, creatureType: 'Дракон', subtype: 'хроматичний', ...input, relationships };
};

const recharge56 = { kind: 'roll', die: 6, minimum: 5, maximum: 6 } as const;
const commonRules = ['initiative', 'attack-rolls', 'damage-rolls', 'saving-throws', 'difficulty-class', 'conditions'];
const spellRules = ['spellcasting', 'spell-components'];
const legendaryActionUses = '3 (4 у лігві); усі витрачені використання відновлюються на початку кожного ходу дракона';
const damageTypeGenitive: Record<string, string> = {
  кислотна: 'кислотної', блискавична: 'блискавичної', отруйна: 'отруйної', вогняна: 'вогняної', холодна: 'холодної',
};

const amphibious = (slug: string) => trait(`${slug}-amphibious`, 'Амфібія', 'Amphibious', 'Дракон може дихати повітрям і водою.');
const iceWalk = (slug: string) => trait(`${slug}-ice-walk`, 'Ходіння по льоду', 'Ice Walk', 'Дракон може переміщатися крижаними поверхнями й лазити ними без перевірки характеристики. Крім того, складна місцевість із льоду або снігу не коштує йому додаткового переміщення.');
const legendaryResistance = (slug: string, uses: number, lairUses: number) => trait(
  `${slug}-legendary-resistance`,
  'Легендарний опір',
  'Legendary Resistance',
  'Якщо дракон провалює ряткидок, він може натомість досягти успіху.',
  { limitedUse: { uses, period: 'day', qualifier: `${lairUses} разів на день у лігві` } },
);
const multiattack = (slug: string, count: number, replacement?: string) => action(`${slug}-multiattack`, 'Мультиатака', 'Multiattack', {
  sourceText: `Дракон виконує ${count === 2 ? 'дві' : 'три'} атаки Роздиранням.${replacement ? ` Він може замінити одну атаку використанням Накладання заклять, щоб накласти ${replacement}.` : ''}`,
});
const rend = (slug: string, attackBonus: string, reach: string, physicalAverage: number, physicalFormula: string, elementalAverage: number, elementalFormula: string, elementalType: string) => action(`${slug}-rend`, 'Роздирання', 'Rend', {
  attackType: 'ближня', attackBonus, reach, target: 'одна ціль',
  damage: `${physicalAverage} (${physicalFormula}) + ${elementalAverage} (${elementalFormula})`, damageType: 'рубальна',
  damageInstances: [
    { average: physicalAverage, formula: physicalFormula, damageType: 'рубальна', application: 'on-hit' },
    { average: elementalAverage, formula: elementalFormula, damageType: elementalType, application: 'on-hit' },
  ],
});
const breath = (slug: string, nameUk: string, nameOriginal: string, abilityKey: 'dexterity' | 'constitution', dc: number, target: string, average: number, formula: string, damageType: string) => action(`${slug}-breath`, nameUk, nameOriginal, {
  recharge: recharge56, target,
  damageInstances: [{ average, formula, damageType, application: 'failed-save' }],
  savingThrow: { ability: abilityKey, dc, onFailure: 'Повна шкода.', onSuccess: 'Половина шкоди.' },
  sourceText: `Кожна ціль виконує ряткидок ${abilityKey === 'dexterity' ? 'Спритності' : 'Статури'} СК ${dc}. При провалі ціль отримує ${average} (${formula}) ${damageTypeGenitive[damageType]} шкоди; при успіху — половину цієї шкоди.`,
});
const spellcastingAction = (slug: string, saveDc: string, attackBonus?: string) => action(`${slug}-spellcasting`, 'Накладання заклять', 'Spellcasting', {
  sourceText: `Дракон накладає одне зі своїх заклять без Матеріальних компонентів, використовуючи Харизму як заклинальну характеристику (СК ряткидка заклять ${saveDc}${attackBonus ? `, ${attackBonus} до влучання атаками закляттями` : ''}).`,
});
const pounce = (slug: string) => action(`${slug}-pounce`, 'Наскок', 'Pounce', {
  legendaryActionCost: 1,
  sourceText: 'Дракон переміщується на відстань до половини своєї Швидкості й виконує одну атаку Роздиранням.',
});
const frightfulPresence = (slug: string, saveDc?: number) => action(`${slug}-frightful-presence`, 'Жахлива присутність', 'Frightful Presence', {
  legendaryActionCost: 1,
  sourceText: saveDc
    ? `Дракон накладає «Страх» без Матеріальних компонентів, використовуючи Харизму як заклинальну характеристику (СК ряткидка заклять ${saveDc}). Дракон не може знову виконати цю дію до початку свого наступного ходу.`
    : 'Дракон використовує Накладання заклять, щоб накласти «Страх». Дракон не може знову виконати цю дію до початку свого наступного ходу.',
});

export const officialChromaticDragons: OfficialMonsterEntry[] = [
  dragon({
    slug: 'black-dragon-wyrmling', nameUk: 'Дитинча чорного дракона', nameOriginal: 'Black Dragon Wyrmling', size: 'Середній', alignment: 'хаотично-злий', armorClass: '17', hitPoints: '33', hitDice: '6к8 + 6', initiative: { modifier: '+4', score: 14 }, speed: ['30 фт', 'політ 60 фт', 'плавання 30 фт'],
    abilities: abilities([[15, '+2'], [14, '+2', '+4'], [13, '+1'], [10, '+0'], [11, '+0', '+2'], [13, '+1']]), skills: { Сприйняття: '+4', Скритність: '+4' }, immunities: ['кислотна'], senses: ['Сліпий зір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '2', experiencePoints: 450, proficiencyBonus: '+2',
    traits: [amphibious('black-dragon-wyrmling')],
    actions: [multiattack('black-dragon-wyrmling', 2), rend('black-dragon-wyrmling', '+4', '5 фт', 5, '1к6 + 2', 2, '1к4', 'кислотна'), breath('black-dragon-wyrmling', 'Кислотний подих', 'Acid Breath', 'dexterity', 11, 'кожна істота в лінії завдовжки 15 фт і завширшки 5 фт', 22, '5к8', 'кислотна')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 263,
  }),
  dragon({
    slug: 'young-black-dragon', nameUk: 'Молодий чорний дракон', nameOriginal: 'Young Black Dragon', size: 'Великий', alignment: 'хаотично-злий', armorClass: '18', hitPoints: '127', hitDice: '15к10 + 45', initiative: { modifier: '+5', score: 15 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[19, '+4'], [14, '+2', '+5'], [17, '+3'], [12, '+1'], [11, '+0', '+3'], [15, '+2']]), skills: { Сприйняття: '+6', Скритність: '+5' }, immunities: ['кислотна'], senses: ['Сліпий зір 30 фт', 'Темний зір 120 фт'], passivePerception: 16, languages: ['Спільна', 'Драконяча'], challengeRating: '7', experiencePoints: 2900, proficiencyBonus: '+3',
    traits: [amphibious('young-black-dragon')],
    actions: [multiattack('young-black-dragon', 3), rend('young-black-dragon', '+7', '10 фт', 9, '2к4 + 4', 3, '1к6', 'кислотна'), breath('young-black-dragon', 'Кислотний подих', 'Acid Breath', 'dexterity', 14, 'кожна істота в лінії завдовжки 30 фт і завширшки 5 фт', 49, '14к6', 'кислотна')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 264,
  }),
  dragon({
    slug: 'adult-black-dragon', nameUk: 'Дорослий чорний дракон', nameOriginal: 'Adult Black Dragon', size: 'Величезний', alignment: 'хаотично-злий', armorClass: '19', hitPoints: '195', hitDice: '17к12 + 85', initiative: { modifier: '+12', score: 22 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[23, '+6'], [14, '+2', '+7'], [21, '+5'], [14, '+2'], [13, '+1', '+6'], [19, '+4']]), skills: { Сприйняття: '+11', Скритність: '+7' }, immunities: ['кислотна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 21, languages: ['Спільна', 'Драконяча'], challengeRating: '14', experiencePoints: 11500, alternativeExperience: [{ experiencePoints: 13000, condition: 'у лігві' }], proficiencyBonus: '+5',
    traits: [amphibious('adult-black-dragon'), legendaryResistance('adult-black-dragon', 3, 4)],
    actions: [multiattack('adult-black-dragon', 3, '«Кислотну стрілу» у версії 3-го рівня'), rend('adult-black-dragon', '+11', '10 фт', 13, '2к6 + 6', 4, '1к8', 'кислотна'), breath('adult-black-dragon', 'Кислотний подих', 'Acid Breath', 'dexterity', 18, 'кожна істота в лінії завдовжки 60 фт і завширшки 5 фт', 54, '12к8', 'кислотна'), spellcastingAction('adult-black-dragon', '17', '+9')],
    spellcasting: { ability: 'Харизма', saveDc: '17', attackBonus: '+9', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Кислотна стріла', 'acid-arrow', 'версія 3-го рівня', 3), spell('Виявлення магії', 'detect-magic'), spell('Страх', 'fear')] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Розмова з мертвими', 'speak-with-dead'), spell('Їдка сфера', 'vitriolic-sphere')] }] },
    legendaryActionUses, legendaryActions: [
      action('adult-black-dragon-cloud-of-insects', 'Хмара комах', 'Cloud of Insects', { legendaryActionCost: 1, target: 'одна видима дракону істота в межах 120 фт', damageInstances: [{ average: 22, formula: '4к10', damageType: 'отруйна', application: 'failed-save' }], savingThrow: { ability: 'dexterity', dc: 17, onFailure: 'Повна шкода й Перешкода на ряткидки для підтримання Концентрації до кінця наступного ходу цілі.' }, sourceText: 'Ціль виконує ряткидок Спритності СК 17. При провалі вона отримує 22 (4к10) отруйної шкоди й має Перешкоду на ряткидки для підтримання Концентрації до кінця свого наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      frightfulPresence('adult-black-dragon'), pounce('adult-black-dragon'),
    ],
    relationships: { conditionSlugs: ['frightened'], ruleSlugs: [...commonRules, ...spellRules, 'concentration', 'disadvantage', 'movement'] }, sourcePage: 264,
  }),
  dragon({
    slug: 'ancient-black-dragon', nameUk: 'Стародавній чорний дракон', nameOriginal: 'Ancient Black Dragon', size: 'Колосальний', alignment: 'хаотично-злий', armorClass: '22', hitPoints: '367', hitDice: '21к20 + 147', initiative: { modifier: '+16', score: 26 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[27, '+8'], [14, '+2', '+9'], [25, '+7'], [16, '+3'], [15, '+2', '+9'], [22, '+6']]), skills: { Сприйняття: '+16', Скритність: '+9' }, immunities: ['кислотна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 26, languages: ['Спільна', 'Драконяча'], challengeRating: '21', experiencePoints: 33000, alternativeExperience: [{ experiencePoints: 41000, condition: 'у лігві' }], proficiencyBonus: '+7',
    traits: [amphibious('ancient-black-dragon'), legendaryResistance('ancient-black-dragon', 4, 5)],
    actions: [multiattack('ancient-black-dragon', 3, '«Кислотну стрілу» у версії 4-го рівня'), rend('ancient-black-dragon', '+15', '15 фт', 17, '2к8 + 8', 9, '2к8', 'кислотна'), breath('ancient-black-dragon', 'Кислотний подих', 'Acid Breath', 'dexterity', 22, 'кожна істота в лінії завдовжки 90 фт і завширшки 10 фт', 67, '15к8', 'кислотна'), spellcastingAction('ancient-black-dragon', '21', '+13')],
    spellcasting: { ability: 'Харизма', saveDc: '21', attackBonus: '+13', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Кислотна стріла', 'acid-arrow', 'версія 4-го рівня', 4), spell('Виявлення магії', 'detect-magic'), spell('Страх', 'fear')] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Створення невмерлих', 'create-undead'), spell('Розмова з мертвими', 'speak-with-dead'), spell('Їдка сфера', 'vitriolic-sphere', 'версія 5-го рівня', 5)] }] },
    legendaryActionUses, legendaryActions: [
      action('ancient-black-dragon-cloud-of-insects', 'Хмара комах', 'Cloud of Insects', { legendaryActionCost: 1, target: 'одна видима дракону істота в межах 120 фт', damageInstances: [{ average: 33, formula: '6к10', damageType: 'отруйна', application: 'failed-save' }], savingThrow: { ability: 'dexterity', dc: 21, onFailure: 'Повна шкода й Перешкода на ряткидки для підтримання Концентрації до кінця наступного ходу цілі.' }, sourceText: 'Ціль виконує ряткидок Спритності СК 21. При провалі вона отримує 33 (6к10) отруйної шкоди й має Перешкоду на ряткидки для підтримання Концентрації до кінця свого наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      frightfulPresence('ancient-black-dragon'), pounce('ancient-black-dragon'),
    ],
    relationships: { conditionSlugs: ['frightened'], ruleSlugs: [...commonRules, ...spellRules, 'concentration', 'disadvantage', 'movement'] }, sourcePage: 265,
  }),

  dragon({
    slug: 'blue-dragon-wyrmling', nameUk: 'Дитинча синього дракона', nameOriginal: 'Blue Dragon Wyrmling', size: 'Середній', alignment: 'законно-злий', armorClass: '17', hitPoints: '65', hitDice: '10к8 + 20', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'копання 15 фт', 'політ 60 фт'],
    abilities: abilities([[17, '+3'], [10, '+0', '+2'], [15, '+2'], [12, '+1'], [11, '+0', '+2'], [15, '+2']]), skills: { Сприйняття: '+4', Скритність: '+2' }, immunities: ['блискавична'], senses: ['Сліпий зір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '3', experiencePoints: 700, proficiencyBonus: '+2',
    actions: [multiattack('blue-dragon-wyrmling', 2), rend('blue-dragon-wyrmling', '+5', '5 фт', 8, '1к10 + 3', 3, '1к6', 'блискавична'), breath('blue-dragon-wyrmling', 'Блискавичний подих', 'Lightning Breath', 'dexterity', 12, 'кожна істота в лінії завдовжки 30 фт і завширшки 5 фт', 21, '6к6', 'блискавична')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 266,
  }),
  dragon({
    slug: 'young-blue-dragon', nameUk: 'Молодий синій дракон', nameOriginal: 'Young Blue Dragon', size: 'Великий', alignment: 'законно-злий', armorClass: '18', hitPoints: '152', hitDice: '16к10 + 64', initiative: { modifier: '+4', score: 14 }, speed: ['40 фт', 'копання 20 фт', 'політ 80 фт'],
    abilities: abilities([[21, '+5'], [10, '+0', '+4'], [19, '+4'], [14, '+2'], [13, '+1', '+5'], [17, '+3']]), skills: { Сприйняття: '+9', Скритність: '+4' }, immunities: ['блискавична'], senses: ['Сліпий зір 30 фт', 'Темний зір 120 фт'], passivePerception: 19, languages: ['Спільна', 'Драконяча'], challengeRating: '9', experiencePoints: 5000, proficiencyBonus: '+4',
    actions: [multiattack('young-blue-dragon', 3), rend('young-blue-dragon', '+9', '10 фт', 12, '2к6 + 5', 5, '1к10', 'блискавична'), breath('young-blue-dragon', 'Блискавичний подих', 'Lightning Breath', 'dexterity', 16, 'кожна істота в лінії завдовжки 60 фт і завширшки 5 фт', 55, '10к10', 'блискавична')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 266,
  }),
  dragon({
    slug: 'adult-blue-dragon', nameUk: 'Дорослий синій дракон', nameOriginal: 'Adult Blue Dragon', size: 'Величезний', alignment: 'законно-злий', armorClass: '19', hitPoints: '212', hitDice: '17к12 + 102', initiative: { modifier: '+10', score: 20 }, speed: ['40 фт', 'копання 30 фт', 'політ 80 фт'],
    abilities: abilities([[25, '+7'], [10, '+0', '+5'], [23, '+6'], [16, '+3'], [15, '+2', '+7'], [20, '+5']]), skills: { Сприйняття: '+12', Скритність: '+5' }, immunities: ['блискавична'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 22, languages: ['Спільна', 'Драконяча'], challengeRating: '16', experiencePoints: 15000, alternativeExperience: [{ experiencePoints: 18000, condition: 'у лігві' }], proficiencyBonus: '+5',
    traits: [legendaryResistance('adult-blue-dragon', 3, 4)],
    actions: [multiattack('adult-blue-dragon', 3, '«Розкол»'), rend('adult-blue-dragon', '+12', '10 фт', 16, '2к8 + 7', 5, '1к10', 'блискавична'), breath('adult-blue-dragon', 'Блискавичний подих', 'Lightning Breath', 'dexterity', 19, 'кожна істота в лінії завдовжки 90 фт і завширшки 5 фт', 60, '11к10', 'блискавична'), spellcastingAction('adult-blue-dragon', '18')],
    spellcasting: { ability: 'Харизма', saveDc: '18', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Виявлення магії', 'detect-magic'), spell('Невидимість', 'invisibility'), spell('Рука мага', 'mage-hand'), spell('Розкол', 'shatter')] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Спостереження', 'scrying'), spell('Послання', 'sending')] }] },
    legendaryActionUses, legendaryActions: [
      action('adult-blue-dragon-cloaked-flight', 'Прихований політ', 'Cloaked Flight', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти на себе «Невидимість», і може пролетіти на відстань до половини своєї Швидкості польоту. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('adult-blue-dragon-sonic-boom', 'Звуковий удар', 'Sonic Boom', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Розкол». Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('adult-blue-dragon-tail-swipe', 'Удар хвостом', 'Tail Swipe', { legendaryActionCost: 1, sourceText: 'Дракон виконує одну атаку Роздиранням.' }),
    ],
    relationships: { conditionSlugs: ['invisible'], ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 266,
  }),
  dragon({
    slug: 'ancient-blue-dragon', nameUk: 'Стародавній синій дракон', nameOriginal: 'Ancient Blue Dragon', size: 'Колосальний', alignment: 'законно-злий', armorClass: '22', hitPoints: '481', hitDice: '26к20 + 208', initiative: { modifier: '+14', score: 24 }, speed: ['40 фт', 'копання 40 фт', 'політ 80 фт'],
    abilities: abilities([[29, '+9'], [10, '+0', '+7'], [27, '+8'], [18, '+4'], [17, '+3', '+10'], [25, '+7']]), skills: { Сприйняття: '+17', Скритність: '+7' }, immunities: ['блискавична'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 27, languages: ['Спільна', 'Драконяча'], challengeRating: '23', experiencePoints: 50000, alternativeExperience: [{ experiencePoints: 62000, condition: 'у лігві' }], proficiencyBonus: '+7',
    traits: [legendaryResistance('ancient-blue-dragon', 4, 5)],
    actions: [multiattack('ancient-blue-dragon', 3, '«Розкол» у версії 3-го рівня'), rend('ancient-blue-dragon', '+16', '15 фт', 18, '2к8 + 9', 11, '2к10', 'блискавична'), breath('ancient-blue-dragon', 'Блискавичний подих', 'Lightning Breath', 'dexterity', 23, 'кожна істота в лінії завдовжки 120 фт і завширшки 10 фт', 88, '16к10', 'блискавична'), spellcastingAction('ancient-blue-dragon', '22')],
    spellcasting: { ability: 'Харизма', saveDc: '22', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Виявлення магії', 'detect-magic'), spell('Невидимість', 'invisibility'), spell('Рука мага', 'mage-hand'), spell('Розкол', 'shatter', 'версія 3-го рівня', 3)] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Спостереження', 'scrying'), spell('Послання', 'sending')] }] },
    legendaryActionUses, legendaryActions: [
      action('ancient-blue-dragon-cloaked-flight', 'Прихований політ', 'Cloaked Flight', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти на себе «Невидимість», і може пролетіти на відстань до половини своєї Швидкості польоту. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('ancient-blue-dragon-sonic-boom', 'Звуковий удар', 'Sonic Boom', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Розкол» у версії 3-го рівня. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('ancient-blue-dragon-tail-swipe', 'Удар хвостом', 'Tail Swipe', { legendaryActionCost: 1, sourceText: 'Дракон виконує одну атаку Роздиранням.' }),
    ],
    relationships: { conditionSlugs: ['invisible'], ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 267,
  }),

  dragon({
    slug: 'green-dragon-wyrmling', nameUk: 'Дитинча зеленого дракона', nameOriginal: 'Green Dragon Wyrmling', size: 'Середній', alignment: 'законно-злий', armorClass: '17', hitPoints: '38', hitDice: '7к8 + 7', initiative: { modifier: '+3', score: 13 }, speed: ['30 фт', 'політ 60 фт', 'плавання 30 фт'],
    abilities: abilities([[15, '+2'], [12, '+1', '+3'], [13, '+1'], [14, '+2'], [11, '+0', '+2'], [13, '+1']]), skills: { Сприйняття: '+4', Скритність: '+3' }, immunities: ['отруйна'], conditionImmunities: ['Отруєний'], senses: ['Сліпий зір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '2', experiencePoints: 450, proficiencyBonus: '+2',
    traits: [amphibious('green-dragon-wyrmling')],
    actions: [multiattack('green-dragon-wyrmling', 2), rend('green-dragon-wyrmling', '+4', '5 фт', 7, '1к10 + 2', 3, '1к6', 'отруйна'), breath('green-dragon-wyrmling', 'Отруйний подих', 'Poison Breath', 'constitution', 11, 'кожна істота в 15-футовому конусі', 21, '6к6', 'отруйна')],
    relationships: { conditionSlugs: ['poisoned'], ruleSlugs: commonRules }, sourcePage: 293,
  }),
  dragon({
    slug: 'young-green-dragon', nameUk: 'Молодий зелений дракон', nameOriginal: 'Young Green Dragon', size: 'Великий', alignment: 'законно-злий', armorClass: '18', hitPoints: '136', hitDice: '16к10 + 48', initiative: { modifier: '+4', score: 14 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[19, '+4'], [12, '+1', '+4'], [17, '+3'], [16, '+3'], [13, '+1', '+4'], [15, '+2']]), skills: { Обман: '+5', Сприйняття: '+7', Скритність: '+4' }, immunities: ['отруйна'], conditionImmunities: ['Отруєний'], senses: ['Сліпий зір 30 фт', 'Темний зір 120 фт'], passivePerception: 17, languages: ['Спільна', 'Драконяча'], challengeRating: '8', experiencePoints: 3900, proficiencyBonus: '+3',
    traits: [amphibious('young-green-dragon')],
    actions: [multiattack('young-green-dragon', 3), rend('young-green-dragon', '+7', '10 фт', 11, '2к6 + 4', 7, '2к6', 'отруйна'), breath('young-green-dragon', 'Отруйний подих', 'Poison Breath', 'constitution', 14, 'кожна істота в 30-футовому конусі', 42, '12к6', 'отруйна')],
    relationships: { conditionSlugs: ['poisoned'], ruleSlugs: commonRules }, sourcePage: 293,
  }),
  dragon({
    slug: 'adult-green-dragon', nameUk: 'Дорослий зелений дракон', nameOriginal: 'Adult Green Dragon', size: 'Величезний', alignment: 'законно-злий', armorClass: '19', hitPoints: '207', hitDice: '18к12 + 90', initiative: { modifier: '+11', score: 21 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[23, '+6'], [12, '+1', '+6'], [21, '+5'], [18, '+4'], [15, '+2', '+7'], [18, '+4']]), skills: { Обман: '+9', Сприйняття: '+12', Переконання: '+9', Скритність: '+6' }, immunities: ['отруйна'], conditionImmunities: ['Отруєний'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 22, languages: ['Спільна', 'Драконяча'], challengeRating: '15', experiencePoints: 13000, alternativeExperience: [{ experiencePoints: 15000, condition: 'у лігві' }], proficiencyBonus: '+5',
    traits: [amphibious('adult-green-dragon'), legendaryResistance('adult-green-dragon', 3, 4)],
    actions: [multiattack('adult-green-dragon', 3, '«Шип розуму» у версії 3-го рівня'), rend('adult-green-dragon', '+11', '10 фт', 15, '2к8 + 6', 7, '2к6', 'отруйна'), breath('adult-green-dragon', 'Отруйний подих', 'Poison Breath', 'constitution', 18, 'кожна істота в 60-футовому конусі', 56, '16к6', 'отруйна'), spellcastingAction('adult-green-dragon', '17')],
    spellcasting: { ability: 'Харизма', saveDc: '17', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Виявлення магії', 'detect-magic'), spell('Шип розуму', 'mind-spike', 'версія 3-го рівня', 3)] }, { mode: 'daily', uses: 1, spells: [spell('Гейс', 'geas')] }] },
    legendaryActionUses, legendaryActions: [
      action('adult-green-dragon-mind-invasion', 'Вторгнення в розум', 'Mind Invasion', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Шип розуму» у версії 3-го рівня.' }),
      action('adult-green-dragon-noxious-miasma', 'Шкідливий міазм', 'Noxious Miasma', { legendaryActionCost: 1, target: 'кожна істота у сфері радіусом 20 фт із центром у видимій дракону точці в межах 90 фт', damageInstances: [{ average: 7, formula: '2к6', damageType: 'отруйна', application: 'failed-save' }], savingThrow: { ability: 'constitution', dc: 17, onFailure: 'Повна шкода й штраф −2 до КЗ до кінця наступного ходу цілі.' }, sourceText: 'Кожна ціль виконує ряткидок Статури СК 17. При провалі вона отримує 7 (2к6) отруйної шкоди й штраф −2 до КЗ до кінця свого наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      pounce('adult-green-dragon'),
    ],
    relationships: { conditionSlugs: ['poisoned'], ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 294,
  }),
  dragon({
    slug: 'ancient-green-dragon', nameUk: 'Стародавній зелений дракон', nameOriginal: 'Ancient Green Dragon', size: 'Колосальний', alignment: 'законно-злий', armorClass: '21', hitPoints: '402', hitDice: '23к20 + 161', initiative: { modifier: '+15', score: 25 }, speed: ['40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[27, '+8'], [12, '+1', '+8'], [25, '+7'], [20, '+5'], [17, '+3', '+10'], [22, '+6']]), skills: { Обман: '+13', Сприйняття: '+17', Переконання: '+13', Скритність: '+8' }, immunities: ['отруйна'], conditionImmunities: ['Отруєний'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 27, languages: ['Спільна', 'Драконяча'], challengeRating: '22', experiencePoints: 41000, alternativeExperience: [{ experiencePoints: 50000, condition: 'у лігві' }], proficiencyBonus: '+7',
    traits: [amphibious('ancient-green-dragon'), legendaryResistance('ancient-green-dragon', 4, 5)],
    actions: [multiattack('ancient-green-dragon', 3, '«Шип розуму» у версії 5-го рівня'), rend('ancient-green-dragon', '+15', '15 фт', 17, '2к8 + 8', 10, '3к6', 'отруйна'), breath('ancient-green-dragon', 'Отруйний подих', 'Poison Breath', 'constitution', 22, 'кожна істота в 90-футовому конусі', 77, '22к6', 'отруйна'), spellcastingAction('ancient-green-dragon', '21')],
    spellcasting: { ability: 'Харизма', saveDc: '21', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Виявлення магії', 'detect-magic'), spell('Шип розуму', 'mind-spike', 'версія 5-го рівня', 5)] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Гейс', 'geas'), spell('Зміна пам’яті', 'modify-memory')] }] },
    legendaryActionUses, legendaryActions: [
      action('ancient-green-dragon-mind-invasion', 'Вторгнення в розум', 'Mind Invasion', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Шип розуму» у версії 5-го рівня.' }),
      action('ancient-green-dragon-noxious-miasma', 'Шкідливий міазм', 'Noxious Miasma', { legendaryActionCost: 1, target: 'кожна істота у сфері радіусом 30 фт із центром у видимій дракону точці в межах 90 фт', damageInstances: [{ average: 17, formula: '5к6', damageType: 'отруйна', application: 'failed-save' }], savingThrow: { ability: 'constitution', dc: 21, onFailure: 'Повна шкода й штраф −2 до КЗ до кінця наступного ходу цілі.' }, sourceText: 'Кожна ціль виконує ряткидок Статури СК 21. При провалі вона отримує 17 (5к6) отруйної шкоди й штраф −2 до КЗ до кінця свого наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      pounce('ancient-green-dragon'),
    ],
    relationships: { conditionSlugs: ['poisoned'], ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 294,
  }),

  dragon({
    slug: 'red-dragon-wyrmling', nameUk: 'Дитинча червоного дракона', nameOriginal: 'Red Dragon Wyrmling', size: 'Середній', alignment: 'хаотично-злий', armorClass: '17', hitPoints: '75', hitDice: '10к8 + 30', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'лазіння 30 фт', 'політ 60 фт'],
    abilities: abilities([[19, '+4'], [10, '+0', '+2'], [17, '+3'], [12, '+1'], [11, '+0', '+2'], [15, '+2']]), skills: { Сприйняття: '+4', Скритність: '+2' }, immunities: ['вогняна'], senses: ['Сліпий зір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '4', experiencePoints: 1100, proficiencyBonus: '+2',
    actions: [multiattack('red-dragon-wyrmling', 2), rend('red-dragon-wyrmling', '+6', '5 фт', 9, '1к10 + 4', 3, '1к6', 'вогняна'), breath('red-dragon-wyrmling', 'Вогняний подих', 'Fire Breath', 'dexterity', 13, 'кожна істота в 15-футовому конусі', 24, '7к6', 'вогняна')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 318,
  }),
  dragon({
    slug: 'young-red-dragon', nameUk: 'Молодий червоний дракон', nameOriginal: 'Young Red Dragon', size: 'Великий', alignment: 'хаотично-злий', armorClass: '18', hitPoints: '178', hitDice: '17к10 + 85', initiative: { modifier: '+4', score: 14 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[23, '+6'], [10, '+0', '+4'], [21, '+5'], [14, '+2'], [11, '+0', '+4'], [19, '+4']]), skills: { Сприйняття: '+8', Скритність: '+4' }, immunities: ['вогняна'], senses: ['Сліпий зір 30 фт', 'Темний зір 120 фт'], passivePerception: 18, languages: ['Спільна', 'Драконяча'], challengeRating: '10', experiencePoints: 5900, proficiencyBonus: '+4',
    actions: [multiattack('young-red-dragon', 3), rend('young-red-dragon', '+10', '10 фт', 13, '2к6 + 6', 3, '1к6', 'вогняна'), breath('young-red-dragon', 'Вогняний подих', 'Fire Breath', 'dexterity', 17, 'кожна істота в 30-футовому конусі', 56, '16к6', 'вогняна')],
    relationships: { ruleSlugs: commonRules }, sourcePage: 318,
  }),
  dragon({
    slug: 'adult-red-dragon', nameUk: 'Дорослий червоний дракон', nameOriginal: 'Adult Red Dragon', size: 'Величезний', alignment: 'хаотично-злий', armorClass: '19', hitPoints: '256', hitDice: '19к12 + 133', initiative: { modifier: '+12', score: 22 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[27, '+8'], [10, '+0', '+6'], [25, '+7'], [16, '+3'], [13, '+1', '+7'], [23, '+6']]), skills: { Сприйняття: '+13', Скритність: '+6' }, immunities: ['вогняна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 23, languages: ['Спільна', 'Драконяча'], challengeRating: '17', experiencePoints: 18000, alternativeExperience: [{ experiencePoints: 20000, condition: 'у лігві' }], proficiencyBonus: '+6',
    traits: [legendaryResistance('adult-red-dragon', 3, 4)],
    actions: [multiattack('adult-red-dragon', 3, '«Пекучий промінь»'), rend('adult-red-dragon', '+14', '10 фт', 13, '1к10 + 8', 5, '2к4', 'вогняна'), breath('adult-red-dragon', 'Вогняний подих', 'Fire Breath', 'dexterity', 21, 'кожна істота в 60-футовому конусі', 59, '17к6', 'вогняна'), spellcastingAction('adult-red-dragon', '20', '+12')],
    spellcasting: { ability: 'Харизма', saveDc: '20', attackBonus: '+12', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Наказ', 'command', 'версія 2-го рівня', 2), spell('Виявлення магії', 'detect-magic'), spell('Пекучий промінь', 'scorching-ray')] }, { mode: 'daily', uses: 1, spells: [spell('Куля вогню', 'fireball')] }] },
    legendaryActionUses, legendaryActions: [
      action('adult-red-dragon-commanding-presence', 'Владна присутність', 'Commanding Presence', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Наказ» у версії 2-го рівня. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('adult-red-dragon-fiery-rays', 'Вогненні промені', 'Fiery Rays', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Пекучий промінь». Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      pounce('adult-red-dragon'),
    ],
    relationships: { ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 318,
  }),
  dragon({
    slug: 'ancient-red-dragon', nameUk: 'Стародавній червоний дракон', nameOriginal: 'Ancient Red Dragon', size: 'Колосальний', alignment: 'хаотично-злий', armorClass: '22', hitPoints: '507', hitDice: '26к20 + 234', initiative: { modifier: '+14', score: 24 }, speed: ['40 фт', 'лазіння 40 фт', 'політ 80 фт'],
    abilities: abilities([[30, '+10'], [10, '+0', '+7'], [29, '+9'], [18, '+4'], [15, '+2', '+9'], [27, '+8']]), skills: { Сприйняття: '+16', Скритність: '+7' }, immunities: ['вогняна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 26, languages: ['Спільна', 'Драконяча'], challengeRating: '24', experiencePoints: 62000, alternativeExperience: [{ experiencePoints: 75000, condition: 'у лігві' }], proficiencyBonus: '+7',
    traits: [legendaryResistance('ancient-red-dragon', 4, 5)],
    actions: [multiattack('ancient-red-dragon', 3, '«Пекучий промінь» у версії 3-го рівня'), rend('ancient-red-dragon', '+17', '15 фт', 19, '2к8 + 10', 10, '3к6', 'вогняна'), breath('ancient-red-dragon', 'Вогняний подих', 'Fire Breath', 'dexterity', 24, 'кожна істота в 90-футовому конусі', 91, '26к6', 'вогняна'), spellcastingAction('ancient-red-dragon', '23', '+15')],
    spellcasting: { ability: 'Харизма', saveDc: '23', attackBonus: '+15', notes: 'Без Матеріальних компонентів.', groups: [{ mode: 'at-will', spells: [spell('Наказ', 'command', 'версія 2-го рівня', 2), spell('Виявлення магії', 'detect-magic'), spell('Пекучий промінь', 'scorching-ray', 'версія 3-го рівня', 3)] }, { mode: 'daily', uses: 1, each: true, spells: [spell('Куля вогню', 'fireball', 'версія 6-го рівня', 6), spell('Спостереження', 'scrying')] }] },
    legendaryActionUses, legendaryActions: [
      action('ancient-red-dragon-commanding-presence', 'Владна присутність', 'Commanding Presence', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Наказ» у версії 2-го рівня. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      action('ancient-red-dragon-fiery-rays', 'Вогненні промені', 'Fiery Rays', { legendaryActionCost: 1, sourceText: 'Дракон використовує Накладання заклять, щоб накласти «Пекучий промінь» у версії 3-го рівня. Дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      pounce('ancient-red-dragon'),
    ],
    relationships: { ruleSlugs: [...commonRules, ...spellRules, 'movement'] }, sourcePage: 319,
  }),

  dragon({
    slug: 'white-dragon-wyrmling', nameUk: 'Дитинча білого дракона', nameOriginal: 'White Dragon Wyrmling', size: 'Середній', alignment: 'хаотично-злий', armorClass: '16', hitPoints: '32', hitDice: '5к8 + 10', initiative: { modifier: '+2', score: 12 }, speed: ['30 фт', 'копання 15 фт', 'політ 60 фт', 'плавання 30 фт'],
    abilities: abilities([[14, '+2'], [10, '+0', '+2'], [14, '+2'], [5, '−3'], [10, '+0', '+2'], [11, '+0']]), skills: { Сприйняття: '+4', Скритність: '+2' }, immunities: ['холодна'], senses: ['Сліпий зір 10 фт', 'Темний зір 60 фт'], passivePerception: 14, languages: ['Драконяча'], challengeRating: '2', experiencePoints: 450, proficiencyBonus: '+2',
    traits: [iceWalk('white-dragon-wyrmling')],
    actions: [multiattack('white-dragon-wyrmling', 2), rend('white-dragon-wyrmling', '+4', '5 фт', 6, '1к8 + 2', 2, '1к4', 'холодна'), breath('white-dragon-wyrmling', 'Крижаний подих', 'Cold Breath', 'constitution', 12, 'кожна істота в 15-футовому конусі', 22, '5к8', 'холодна')],
    relationships: { ruleSlugs: [...commonRules, 'movement', 'difficult-terrain'] }, sourcePage: 339,
  }),
  dragon({
    slug: 'young-white-dragon', nameUk: 'Молодий білий дракон', nameOriginal: 'Young White Dragon', size: 'Великий', alignment: 'хаотично-злий', armorClass: '17', hitPoints: '123', hitDice: '13к10 + 52', initiative: { modifier: '+3', score: 13 }, speed: ['40 фт', 'копання 20 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[18, '+4'], [10, '+0', '+3'], [18, '+4'], [6, '−2'], [11, '+0', '+3'], [12, '+1']]), skills: { Сприйняття: '+6', Скритність: '+3' }, immunities: ['холодна'], senses: ['Сліпий зір 30 фт', 'Темний зір 120 фт'], passivePerception: 16, languages: ['Спільна', 'Драконяча'], challengeRating: '6', experiencePoints: 2300, proficiencyBonus: '+3',
    traits: [iceWalk('young-white-dragon')],
    actions: [multiattack('young-white-dragon', 3), rend('young-white-dragon', '+7', '10 фт', 9, '2к4 + 4', 2, '1к4', 'холодна'), breath('young-white-dragon', 'Крижаний подих', 'Cold Breath', 'constitution', 15, 'кожна істота в 30-футовому конусі', 40, '9к8', 'холодна')],
    relationships: { ruleSlugs: [...commonRules, 'movement', 'difficult-terrain'] }, sourcePage: 340,
  }),
  dragon({
    slug: 'adult-white-dragon', nameUk: 'Дорослий білий дракон', nameOriginal: 'Adult White Dragon', size: 'Величезний', alignment: 'хаотично-злий', armorClass: '18', hitPoints: '200', hitDice: '16к12 + 96', initiative: { modifier: '+10', score: 20 }, speed: ['40 фт', 'копання 30 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[22, '+6'], [10, '+0', '+5'], [22, '+6'], [8, '−1'], [12, '+1', '+6'], [12, '+1']]), skills: { Сприйняття: '+11', Скритність: '+5' }, immunities: ['холодна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 21, languages: ['Спільна', 'Драконяча'], challengeRating: '13', experiencePoints: 10000, alternativeExperience: [{ experiencePoints: 11500, condition: 'у лігві' }], proficiencyBonus: '+5',
    traits: [iceWalk('adult-white-dragon'), legendaryResistance('adult-white-dragon', 3, 4)],
    actions: [multiattack('adult-white-dragon', 3), rend('adult-white-dragon', '+11', '10 фт', 13, '2к6 + 6', 4, '1к8', 'холодна'), breath('adult-white-dragon', 'Крижаний подих', 'Cold Breath', 'constitution', 19, 'кожна істота в 60-футовому конусі', 54, '12к8', 'холодна')],
    legendaryActionUses, legendaryActions: [
      action('adult-white-dragon-freezing-burst', 'Морозний вибух', 'Freezing Burst', { legendaryActionCost: 1, target: 'кожна істота у сфері радіусом 30 фт із центром у видимій дракону точці в межах 120 фт', damageInstances: [{ average: 7, formula: '2к6', damageType: 'холодна', application: 'failed-save' }], savingThrow: { ability: 'constitution', dc: 14, onFailure: 'Повна шкода, а Швидкість цілі дорівнює 0 до кінця її наступного ходу.' }, sourceText: 'Кожна ціль виконує ряткидок Статури СК 14. При провалі вона отримує 7 (2к6) холодної шкоди, а її Швидкість дорівнює 0 до кінця її наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      frightfulPresence('adult-white-dragon', 14), pounce('adult-white-dragon'),
    ],
    relationships: { spellSlugs: ['fear'], conditionSlugs: ['frightened'], ruleSlugs: [...commonRules, ...spellRules, 'movement', 'difficult-terrain'] }, sourcePage: 340,
  }),
  dragon({
    slug: 'ancient-white-dragon', nameUk: 'Стародавній білий дракон', nameOriginal: 'Ancient White Dragon', size: 'Колосальний', alignment: 'хаотично-злий', armorClass: '20', hitPoints: '333', hitDice: '18к20 + 144', initiative: { modifier: '+12', score: 22 }, speed: ['40 фт', 'копання 40 фт', 'політ 80 фт', 'плавання 40 фт'],
    abilities: abilities([[26, '+8'], [10, '+0', '+6'], [26, '+8'], [10, '+0'], [13, '+1', '+7'], [18, '+4']]), skills: { Сприйняття: '+13', Скритність: '+6' }, immunities: ['холодна'], senses: ['Сліпий зір 60 фт', 'Темний зір 120 фт'], passivePerception: 23, languages: ['Спільна', 'Драконяча'], challengeRating: '20', experiencePoints: 25000, alternativeExperience: [{ experiencePoints: 33000, condition: 'у лігві' }], proficiencyBonus: '+6',
    traits: [iceWalk('ancient-white-dragon'), legendaryResistance('ancient-white-dragon', 4, 5)],
    actions: [multiattack('ancient-white-dragon', 3), rend('ancient-white-dragon', '+14', '15 фт', 17, '2к8 + 8', 7, '2к6', 'холодна'), breath('ancient-white-dragon', 'Крижаний подих', 'Cold Breath', 'constitution', 22, 'кожна істота в 90-футовому конусі', 63, '14к8', 'холодна')],
    legendaryActionUses, legendaryActions: [
      action('ancient-white-dragon-freezing-burst', 'Морозний вибух', 'Freezing Burst', { legendaryActionCost: 1, target: 'кожна істота у сфері радіусом 30 фт із центром у видимій дракону точці в межах 120 фт', damageInstances: [{ average: 14, formula: '4к6', damageType: 'холодна', application: 'failed-save' }], savingThrow: { ability: 'constitution', dc: 20, onFailure: 'Повна шкода, а Швидкість цілі дорівнює 0 до кінця її наступного ходу.' }, sourceText: 'Кожна ціль виконує ряткидок Статури СК 20. При провалі вона отримує 14 (4к6) холодної шкоди, а її Швидкість дорівнює 0 до кінця її наступного ходу. Незалежно від результату дракон не може знову виконати цю дію до початку свого наступного ходу.' }),
      frightfulPresence('ancient-white-dragon', 18), pounce('ancient-white-dragon'),
    ],
    relationships: { spellSlugs: ['fear'], conditionSlugs: ['frightened'], ruleSlugs: [...commonRules, ...spellRules, 'movement', 'difficult-terrain'] }, sourcePage: 341,
  }),
];
