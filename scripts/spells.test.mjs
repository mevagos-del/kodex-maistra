import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import { loadSpells } from './load-spells.mjs';

const { officialSpells, filterSpells, spellClasses, spellMechanicRows, spellMitigationRows } = await loadSpells();
const sourceIndex = JSON.parse(await readFile(new URL('../src/data/rules/spell-source-index.json', import.meta.url), 'utf8'));
const schoolLabels = { Abjuration: 'Аб’юрація', Conjuration: 'Виклик', Divination: 'Віщування', Enchantment: 'Зачарування', Evocation: 'Евокація', Illusion: 'Ілюзія', Necromancy: 'Некромантія', Transmutation: 'Трансмутація' };
const empty = { search: '', level: '', school: '', class: '', concentration: '', ritual: '' };
const filter = (values) => filterSpells(officialSpells, { ...empty, ...values });
const getSpell = (slug) => {
  const spell = officialSpells.find((entry) => entry.slug === slug);
  assert.ok(spell, `Missing spell: ${slug}`);
  return spell;
};
const batch = {
  'acid-splash': [0, 'Евокація', ['sorcerer', 'wizard']],
  'ray-of-frost': [0, 'Евокація', ['sorcerer', 'wizard']],
  'mage-hand': [0, 'Виклик', ['bard', 'sorcerer', 'warlock', 'wizard']],
  shield: [1, 'Аб’юрація', ['sorcerer', 'wizard']],
  'feather-fall': [1, 'Трансмутація', ['bard', 'sorcerer', 'wizard']],
  'comprehend-languages': [1, 'Віщування', ['bard', 'sorcerer', 'warlock', 'wizard']],
  'cure-wounds': [1, 'Аб’юрація', ['bard', 'cleric', 'druid', 'paladin', 'ranger']],
  thunderwave: [1, 'Евокація', ['bard', 'druid', 'sorcerer', 'wizard']],
  'hold-person': [2, 'Зачарування', ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard']],
  'misty-step': [2, 'Виклик', ['sorcerer', 'warlock', 'wizard']],
  invisibility: [2, 'Ілюзія', ['bard', 'sorcerer', 'warlock', 'wizard']],
  'blindness-deafness': [2, 'Трансмутація', ['bard', 'cleric', 'sorcerer', 'wizard']],
  'dispel-magic': [3, 'Аб’юрація', ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard']],
  counterspell: [3, 'Аб’юрація', ['sorcerer', 'warlock', 'wizard']],
};

test('all spells have unique slugs, complete text and licensed provenance', () => {
  assert.equal(officialSpells.length, 339);
  assert.equal(new Set(officialSpells.map((spell) => spell.slug)).size, officialSpells.length);
  for (const spell of officialSpells) {
    assert.ok(spell.sourceText.trim().length > 0);
    assert.match(spell.nameUk, /[А-Яа-яІіЇїЄє]/u);
    assert.match(spell.nameEn, /^[A-Za-z ’'/]+$/);
    assert.match(spell.slug, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(spell.components.length > 0);
    assert.equal(typeof spell.concentration, 'boolean');
    assert.equal(typeof spell.ritual, 'boolean');
    assert.equal(spell.components.includes('Матеріальний'), !!spell.materialComponent);
    assert.ok(!spell.damage || spell.damageType);
    assert.ok(!spell.castingTrigger || ['1 реакція', '1 бонусна дія'].includes(spell.castingTime), spell.slug);
    assert.ok(!spell.concentration || spell.relatedRules.some((rule) => rule.slug === 'concentration'));
    assert.ok(!spell.savingThrow || spell.relatedRules.some((rule) => rule.slug === 'saving-throws'));
    assert.ok(!spell.spellAttack || spell.relatedRules.some((rule) => rule.slug === 'armor-class'));
    assert.ok(!spell.conditions?.length || spell.relatedRules.some((rule) => rule.slug === 'conditions'));
    assert.ok(spell.relatedRules.every((rule) => !rule.path));
    assert.equal(spell.source.license, 'CC-BY-4.0');
    assert.ok(spell.source.page > 0);
    assert.ok(spell.classes.every((key) => key in spellClasses));
    assert.doesNotMatch(spell.sourceText, /\[object Object\]|undefined|null/);
  }
});
test('search matches Ukrainian, English, slug and tags', () => {
  for (const search of ['куля вогню', ' FIREBALL ', 'fireball', 'сфера']) {
    assert.equal(filter({ search })[0].slug, 'fireball');
  }
  assert.equal(filter({ search: 'немає такого закляття' }).length, 0);
});
test('filters combine and preserve the zero-level cantrip', () => {
  assert.equal(filter({ level: '0' }).length, 27);
  assert.ok(filter({ level: '0' }).some((entry) => entry.slug === 'fire-bolt'));
  for (const [key, value, predicate] of [
    ['school', 'Евокація', s => s.school === 'Евокація'],
    ['class', 'bard', s => s.classes.includes('bard')],
    ['concentration', 'yes', s => s.concentration],
    ['ritual', 'yes', s => s.ritual],
  ]) assert.deepEqual(filter({ [key]: value }), officialSpells.filter(predicate));
  assert.deepEqual(filter({ class: 'wizard', concentration: 'yes', ritual: 'yes' }), officialSpells.filter(s => s.classes.includes('wizard') && s.concentration && s.ritual));
  assert.equal(filter({ concentration: 'no', ritual: 'yes' })[0].slug, 'comprehend-languages');
});

test('runtime entries match the authoritative source identities, levels, schools, pages and class lists', () => {
  assert.equal(sourceIndex.entries.length, 339);
  assert.equal(new Set(sourceIndex.entries.map(s => s.slug)).size, 339);
  assert.equal(new Set(officialSpells.map(s => s.nameEn.toLowerCase())).size, officialSpells.length);
  assert.equal(new Set(officialSpells.map(s => s.nameUk.toLowerCase())).size, officialSpells.length);
  for (const spell of officialSpells) {
    const original = sourceIndex.entries.find(s => s.slug === spell.slug);
    assert.ok(original, spell.slug);
    assert.equal(spell.nameEn.toLowerCase(), original.nameEn.toLowerCase(), spell.slug);
    assert.equal(spell.concentration, original.concentration, `${spell.slug}: concentration`);
    assert.equal(spell.ritual, original.ritual, `${spell.slug}: ritual`);
    assert.deepEqual(spell.components, original.components.map(c => ({ V: 'Вербальний', S: 'Соматичний', M: 'Матеріальний' })[c]), `${spell.slug}: components`);
    assert.equal(spell.level, original.level, spell.slug);
    assert.equal(spell.school, schoolLabels[original.school], spell.slug);
    assert.equal(spell.source.page, original.page, spell.slug);
    assert.deepEqual(spell.classes, original.classes, spell.slug);
    assert.ok(Number.isInteger(spell.level) && spell.level >= 0 && spell.level <= 9);
    assert.ok(!spell.concentration || spell.duration.startsWith('До '));
    assert.ok(spell.castingTime !== '1 реакція' || spell.castingTrigger);
    assert.equal(new Set(spell.classes).size, spell.classes.length);
  }
});

test('every SRD cantrip is translated, including revised 2024 attack and utility rules', () => {
  const originals = sourceIndex.entries.filter(s => s.level === 0);
  assert.deepEqual(officialSpells.filter(s => s.level === 0).map(s => s.slug).sort(), originals.map(s => s.slug).sort());
  assert.equal(getSpell('chill-touch').range, 'Дотик');
  assert.equal(getSpell('chill-touch').damage, '1к10');
  assert.equal(getSpell('poison-spray').savingThrow, undefined);
  assert.equal(getSpell('poison-spray').spellAttack, 'Далекобійна атака закляттям');
  assert.match(getSpell('shocking-grasp').sourceText, /атаки нагоди/);
  assert.match(getSpell('resistance').sourceText, /один раз за хід/);
  assert.match(getSpell('resistance').sourceText, /на 1к4/);
  assert.equal(getSpell('produce-flame').castingTime, '1 бонусна дія');
  assert.match(getSpell('eldritch-blast').higherLevels, /окремий кидок атаки/);
  assert.match(getSpell('true-strike').higherLevels, /променистої шкоди/);
  assert.match(getSpell('message').sourceText, /1 фут каменю, металу або деревини/);
});

test('representatives cover levels 0–9 without confusing slot, duration or conditional mechanics', () => {
  for (let level = 0; level <= 9; level++) assert.ok(officialSpells.some(s => s.level === level), `Missing level ${level}`);
  assert.equal(getSpell('lesser-restoration').castingTime, '1 бонусна дія');
  assert.match(getSpell('mirror-image').sourceText, /3 або більше/);
  assert.doesNotMatch(getSpell('mirror-image').sourceText, /КЗ 10/);
  assert.match(getSpell('chromatic-orb').higherLevels, /лише один раз/);
  assert.match(getSpell('stoneskin').sourceText, /дробильної, колючої та рубальної/);
  assert.doesNotMatch(getSpell('stoneskin').sourceText, /немагічн/);
  assert.match(getSpell('freedom-of-movement').higherLevels, /вище 4-го/);
  assert.match(getSpell('mass-cure-wounds').sourceText, /5к8/);
  assert.equal(getSpell('heroes-feast').duration, 'Миттєво');
  assert.match(getSpell('heroes-feast').sourceText, /тривають 24 години/);
  assert.match(getSpell('regenerate').sourceText, /2 хвилини/);
  assert.equal(getSpell('power-word-stun').duration, 'Миттєво');
  assert.match(getSpell('power-word-stun').mitigation[0].value, /початкового ряткидка немає/);
  assert.equal(getSpell('power-word-kill').savingThrow, undefined);
  assert.match(getSpell('power-word-kill').sourceText, /100 хітів або менше/);
  assert.match(getSpell('power-word-kill').sourceText, /Інакше вона отримує 12к12/);
  assert.match(getSpell('mass-heal').sourceText, /700/);
});
test('2024 healing, fire damage and scaling retain exact source values', () => {
  const healing = officialSpells.find((spell) => spell.slug === 'healing-word');
  assert.match(healing.sourceText, /2к4/);
  const fireball = officialSpells.find((spell) => spell.slug === 'fireball');
  assert.equal(fireball.damage, '8к6');
  assert.match(fireball.higherLevels, /1к6/);
  assert.equal(fireball.mitigation.length, 3);
});

test('the controlled batch preserves source levels, schools and class relationships', () => {
  for (const [slug, [level, school, classes]] of Object.entries(batch)) {
    const spell = getSpell(slug);
    assert.equal(spell.level, level, slug);
    assert.equal(spell.school, school, slug);
    assert.deepEqual(spell.classes, classes, slug);
    assert.equal(spell.edition, 'D&D 2024');
  }
});
test('concentration and repeated saves are distinct from lasting non-concentration effects', () => {
  const hold = getSpell('hold-person');
  assert.equal(hold.concentration, true);
  assert.equal(hold.savingThrow, 'Мудрість');
  assert.deepEqual(hold.conditions, ['Паралізований']);
  assert.match(hold.mitigation.find((row) => row.label === 'Повторення').value, /Наприкінці кожного ходу/);
  const blind = getSpell('blindness-deafness');
  assert.equal(blind.concentration, false);
  assert.equal(blind.duration, '1 хвилина');
  assert.match(blind.conditions[0], /або/);
  assert.equal(blind.savingThrow, 'Статура');
});
test('ritual utility preserves material and reading limitations without requiring concentration', () => {
  const spell = getSpell('comprehend-languages');
  assert.equal(spell.ritual, true);
  assert.equal(spell.concentration, false);
  assert.equal(spell.materialComponent, 'Дрібка сажі та солі');
  assert.equal(spell.duration, '1 година');
  assert.match(spell.sourceText, /жестовій/);
  assert.match(spell.sourceText, /не розшифровує символи або таємні повідомлення/);
});
test('save outcomes distinguish half damage, no damage and forced movement', () => {
  const acid = getSpell('acid-splash');
  assert.equal(acid.area, 'Сфера радіусом 5 фт');
  assert.equal(acid.mitigation.find((row) => row.label === 'Успіх').value, 'Без шкоди');
  const thunder = getSpell('thunderwave');
  assert.match(thunder.mitigation.find((row) => row.label === 'Успіх').value, /Половина шкоди; без відштовхування/);
  assert.match(thunder.mitigation.find((row) => row.label === 'Провал').value, /10 фт/);
});
test('spell attacks display AC defense and movement control, not invented saves', () => {
  const ray = getSpell('ray-of-frost');
  assert.equal(ray.damage, '1к8');
  assert.equal(ray.savingThrow, undefined);
  assert.ok(spellMechanicRows(ray).some((row) => row.label === 'Атака'));
  assert.ok(spellMechanicRows(ray).some((row) => /−10 фт/.test(row.value)));
  assert.deepEqual(spellMitigationRows(ray), [{ label: 'Захист', value: 'Клас захисту цілі' }]);
});
test('reaction triggers and 2024 Counterspell retain the slot and Constitution save', () => {
  const counter = getSpell('counterspell');
  assert.equal(counter.castingTime, '1 реакція');
  assert.match(counter.castingTrigger, /вербальним, соматичним або матеріальним/);
  assert.equal(counter.savingThrow, 'Статура');
  assert.match(counter.sourceText, /комірка не витрачається/);
  assert.equal(counter.higherLevels, undefined);
  const shield = getSpell('shield');
  assert.match(shield.castingTrigger, /Магічна стріла/);
  assert.match(shield.sourceText, /бонус \+5/);
  assert.match(getSpell('feather-fall').sourceText, /60 футів за раунд/);
});
test('higher levels distinguish cantrip character levels, slot scaling and no scaling', () => {
  assert.match(getSpell('ray-of-frost').higherLevels, /5-го \(2к8\), 11-го \(3к8\) та 17-го \(4к8\)/);
  assert.match(getSpell('cure-wounds').sourceText, /2к8/);
  assert.match(getSpell('cure-wounds').higherLevels, /2к8 за кожен рівень комірки/);
  assert.match(getSpell('hold-person').higherLevels, /додаткового Гуманоїда/);
  assert.equal(getSpell('misty-step').higherLevels, undefined);
});
test('invisibility ends on all three 2024 triggers and teleportation needs visible empty space', () => {
  const invisible = getSpell('invisibility');
  assert.equal(invisible.concentration, true);
  assert.deepEqual(invisible.conditions, ['Невидимий']);
  assert.match(invisible.sourceText, /кидок атаки, завдасть шкоди або накладе закляття/);
  assert.equal(getSpell('misty-step').range, 'На себе');
  assert.match(getSpell('misty-step').sourceText, /до 30 футів у незайняте місце, яке бачиш/);
});
test('rendered mechanical rows avoid duplicate save labels and raw metadata', () => {
  for (const spell of officialSpells) {
    const rows = [...spellMechanicRows(spell), ...spellMitigationRows(spell)];
    assert.equal(new Set(rows.map((row) => row.label)).size, rows.length, spell.slug);
    for (const row of rows) {
      assert.ok(row.value.trim());
      assert.match(row.label, /[А-Яа-яІіЇїЄє]/u);
      assert.doesNotMatch(row.value, /\[object Object\]|undefined|null/);
    }
  }
  const spell = { ...getSpell('acid-splash'), mitigation: undefined };
  assert.ok(spellMechanicRows(spell).some((row) => row.label === 'Ряткидок' && row.value === 'Спритність'));
});

test('2024 smites preserve bonus-action hit triggers instead of inventing reaction casting', () => {
  for (const slug of ['divine-smite', 'searing-smite', 'ensnaring-strike']) {
    const spell = getSpell(slug);
    assert.equal(spell.castingTime, '1 бонусна дія');
    assert.match(spell.castingTrigger, /Одразу після влучання/);
  }
  assert.equal(getSpell('divine-smite').concentration, false);
  assert.match(getSpell('divine-smite').sourceText, /2к8/);
  assert.match(getSpell('divine-smite').higherLevels, /1к8/);
});

test('summoned steed rules include the complete stat block and all three creature options', () => {
  const steed = getSpell('find-steed');
  assert.equal(steed.concentration, false);
  for (const clause of ['Зв’язок життя', 'Потойбічний удар', 'Зловісний погляд', 'Крок феї', 'Цілющий дотик']) {
    assert.ok(steed.sourceText.includes(clause), clause);
  }
  assert.match(steed.sourceText, /10 за кожен рівень закляття/);
  assert.match(steed.sourceText, /4-го рівня або вище/);
  assert.match(steed.sourceText, /телепатія на 1 милю/);
});

test('high-level rules preserve teleport outcomes, prismatic thresholds and Wish stress exceptions', () => {
  const teleport = getSpell('teleport');
  for (const clause of ['01–05', '06–13', '14–24', '25–00', '2к12 миль', '3к10']) assert.ok(teleport.sourceText.includes(clause), clause);
  const prism = getSpell('prismatic-wall');
  for (const clause of ['25 холодної', '60 силової', '25 вогняної', 'Індиго', 'Фіолетовий']) assert.ok(prism.sourceText.includes(clause), clause);
  const wish = getSpell('wish');
  for (const clause of ['25000', 'Раптове навчання', '33-відсоткова', '2к4 дні', '1к10']) assert.ok(wish.sourceText.includes(clause), clause);
  assert.match(wish.sourceText, /неможливо зменшити або запобігти/);
});

test('filters cover every source level, school, class and boolean combination', () => {
  for (let level = 0; level <= 9; level++) {
    assert.deepEqual(filter({ level: String(level) }), officialSpells.filter(s => s.level === level));
  }
  for (const school of Object.values(schoolLabels)) assert.deepEqual(filter({ school }), officialSpells.filter(s => s.school === school));
  for (const cls of Object.keys(spellClasses)) {
    for (const concentration of ['yes', 'no']) for (const ritual of ['yes', 'no']) {
      assert.deepEqual(filter({ class: cls, concentration, ritual }), officialSpells.filter(s => s.classes.includes(cls) && s.concentration === (concentration === 'yes') && s.ritual === (ritual === 'yes')));
    }
  }
});

test('source header ranges, durations and casting actions retain exact numeric values', () => {
  for (const spell of officialSpells) {
    const original = sourceIndex.entries.find(s => s.slug === spell.slug);
    const numbers = text => text.match(/\d+/g) ?? [];
    assert.deepEqual(numbers(spell.range), numbers(original.range), `${spell.slug}: range`);
    const durationNumber = numbers(original.duration)[0];
    if (durationNumber) assert.equal(numbers(spell.duration)[0], durationNumber, `${spell.slug}: duration`);
    if (original.duration === 'Instantaneous') assert.equal(spell.duration, 'Миттєво', spell.slug);
    if (original.castingTime.startsWith('Bonus Action')) assert.equal(spell.castingTime, '1 бонусна дія', spell.slug);
    if (original.castingTime.startsWith('Reaction')) {
      assert.equal(spell.castingTime, '1 реакція', spell.slug);
      assert.ok(spell.castingTrigger, `${spell.slug}: reaction trigger`);
    }
    if (/^\d/.test(original.castingTime)) assert.equal(numbers(spell.castingTime)[0], numbers(original.castingTime)[0], `${spell.slug}: casting time`);
  }
});

test('the full source set is covered without aliases or incomplete Telekinesis examples', () => {
  assert.deepEqual(new Set(officialSpells.map(s => s.slug)), new Set(sourceIndex.entries.map(s => s.slug)));
  const spell = getSpell('telekinesis');
  assert.match(spell.sourceText, /відкривати двері чи контейнер/);
  assert.match(spell.sourceText, /виливати вміст флакона/);
  assert.equal(spell.source.supplement.url, 'https://www.dndbeyond.com/sources/dnd/br-2024/spell-descriptions#Telekinesis');
});
