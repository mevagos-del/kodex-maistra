import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/rules/spells.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { officialSpells, filterSpells, spellClasses, spellMechanicRows, spellMitigationRows } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
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
  assert.equal(officialSpells.length, 20);
  assert.equal(new Set(officialSpells.map((spell) => spell.slug)).size, officialSpells.length);
  for (const spell of officialSpells) {
    assert.ok(spell.sourceText.length > 80);
    assert.match(spell.nameUk, /[А-Яа-яІіЇїЄє]/u);
    assert.match(spell.nameEn, /^[A-Za-z /]+$/);
    assert.match(spell.slug, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(spell.components.length > 0);
    assert.equal(typeof spell.concentration, 'boolean');
    assert.equal(typeof spell.ritual, 'boolean');
    assert.equal(spell.components.includes('Матеріальний'), !!spell.materialComponent);
    assert.ok(!spell.damage || spell.damageType);
    assert.ok(!spell.castingTrigger || spell.castingTime === '1 реакція');
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
  assert.equal(filter({ level: '0' }).length, 4);
  assert.ok(filter({ level: '0' }).some((entry) => entry.slug === 'fire-bolt'));
  assert.equal(filter({ school: 'Евокація' }).length, 6);
  assert.equal(filter({ class: 'bard' }).length, 11);
  assert.equal(filter({ concentration: 'yes' }).length, 4);
  assert.equal(filter({ ritual: 'yes' }).length, 2);
  assert.equal(filter({ class: 'wizard', concentration: 'yes', ritual: 'yes' }).length, 1);
  assert.equal(filter({ concentration: 'no', ritual: 'yes' })[0].slug, 'comprehend-languages');
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
