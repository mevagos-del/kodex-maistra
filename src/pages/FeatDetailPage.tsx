import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eligibleFeatSpells, eligibleFeatWeapons, featAbilities, featCategories, officialFeats, prerequisiteLabel } from '@/data/rules/feats';
import { officialClasses } from '@/data/rules/classes';
import { officialItems } from '@/data/rules/items';
import { officialSpells, spellClasses, spellLevelLabel } from '@/data/rules/spells';
import { officialConditions } from '@/data/rules/conditions';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { ConditionText } from '@/features/catalog/components/ConditionText';
import './spells.css';
import './feats.css';

export function FeatDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const entry = officialFeats.find(feat => feat.slug === slug);
  if (!entry) return <article className="spell-detail"><h1>Рису не знайдено</h1><Link to="/feats">До списку рис</Link></article>;
  const classes = officialClasses.filter(item => entry.classSlugs.includes(item.slug));
  const weapons = eligibleFeatWeapons(entry, officialItems);
  const spells = eligibleFeatSpells(entry, officialSpells);
  const increase = entry.increase;
  const source = entry.source;
  return <article className="spell-detail feat-detail">
    <ArchiveAtmosphere />
    <header className="spell-detail__header"><Link to="/feats">‹ Риси</Link><h1>{entry.nameUk}</h1><p>{entry.nameEn}</p><span>{featCategories[entry.category]} · {source.edition} · {source.title}</span><p className="feat-repeatability">{entry.repeatable ? 'Цю рису можна брати більше одного разу.' : 'Цю рису можна взяти лише один раз.'}{entry.repeatRestriction && ` ${entry.repeatRestriction}`}</p></header>
    {entry.prerequisites.length > 0 && <section><h2>Передумови</h2><ul>{entry.prerequisites.map((value, index) => <li key={`${value.kind}-${index}`}>{prerequisiteLabel(value)}</li>)}</ul></section>}
    {entry.effects.length > 0 && <section><h2>Ефект</h2>{entry.effects.map(effect => <div className="feat-effect" key={effect.title}><h3>{effect.title}</h3><p><ConditionText slugs={entry.conditions}>{effect.text}</ConditionText></p></div>)}</section>}
    {increase && <section><h2>Підвищення характеристики</h2><dl className="spell-facts"><div><dt>Характеристики на вибір</dt><dd>{increase.choices.map(key => featAbilities[key]).join(', ')}</dd></div><div><dt>Підвищення</dt><dd>Одну на +{increase.amount}{increase.alternative && ` або ${increase.alternative.count === 2 ? 'дві' : increase.alternative.count} на +${increase.alternative.amount} кожну`}</dd></div><div><dt>Максимальне значення</dt><dd>{increase.maximum}</dd></div></dl></section>}
    {classes.length > 0 && <section><h2>Пов’язані класи</h2><p>{entry.classContext}</p><ul className="spell-relationships">{classes.map(item => <li key={item.slug}><Link to={`/classes/${item.slug}`}>{item.nameUk}</Link></li>)}</ul></section>}
    {weapons.length > 0 && <section><h2>Пов’язана зброя</h2><p>{entry.weaponRule === 'two-handed-melee' ? 'Зброя ближнього бою з властивістю Дворучна або Універсальна; для риси її потрібно тримати двома руками.' : 'Відповідні записи з поточного довідника зброї.'}</p><ul className="spell-relationships">{weapons.map(item => <li key={item.slug}><Link to={`/items/${item.slug}`}>{item.nameUk}</Link></li>)}</ul></section>}
    {entry.spellChoice && spells.length > 0 && <section><h2>Пов’язані закляття</h2><p>Обери один список, а в ньому — {entry.spellChoice.cantrips} замовляння та {entry.spellChoice.levelOne} закляття 1-го рівня. Переліки нижче показують можливі варіанти, а не всі закляття, які ти отримуєш.</p>
      {entry.spellChoice.lists.map(list => <details className="feat-spell-list" key={list}><summary>{spellClasses[list]} · Варіантів: {spells.filter(spell => spell.classes.includes(list)).length}</summary><ul>{spells.filter(spell => spell.classes.includes(list)).map(spell => <li key={spell.slug}><Link to={`/spells/${spell.slug}`}>{spell.nameUk}</Link><small>{spellLevelLabel(spell.level)}</small></li>)}</ul></details>)}
    </section>}
    {entry.spellSlotInteraction && spells.length > 0 && <section><h2>Пов’язані закляття</h2><p>Закляття, які можна накласти коміркою 1–4-го рівня. Риса не надає ці закляття: вона взаємодіє з витратою комірки. При накладанні коміркою 5-го рівня або вище цей ефект не діє.</p>{[1, 2, 3, 4].map(level => <details className="feat-spell-list" key={level}><summary>{spellLevelLabel(level)}</summary><ul>{spells.filter(spell => spell.level === level).map(spell => <li key={spell.slug}><Link to={`/spells/${spell.slug}`}>{spell.nameUk}</Link></li>)}</ul></details>)}</section>}
    {(entry.rules.length > 0 || entry.conditions.length > 0) && <section><h2>Пов’язані правила</h2><ul className="spell-relationships">{entry.conditions.map(key => <li key={key}><Link to={`/conditions/${key}`}>{officialConditions.find(condition => condition.slug === key)!.nameUk}</Link></li>)}{entry.rules.map(rule => <li key={rule.slug}>{rule.label}</li>)}</ul></section>}
    <footer>Джерело: <a href={source.origin === 'srd' && entry.page ? `${source.url}#page=${entry.page}` : source.url} target="_blank" rel="noreferrer">{source.title}{entry.page && `, с. ${entry.page}`}</a>.
      {source.origin === 'srd' ? <><br />Ця робота містить матеріал із System Reference Document 5.2.1 від Wizards of the Coast LLC, доступний на <a href="https://www.dndbeyond.com/srd">dndbeyond.com/srd</a> за ліцензією <a href="https://creativecommons.org/licenses/by/4.0/">{source.license}</a>. Текст перекладено українською; оригінал англійською за посиланням.</> : <><br />Власний український виклад механік, звірений із {source.origin === 'ttg' ? 'TTG.club' : 'офіційним відкритим матеріалом'}. Не є дослівним перекладом джерела чи матеріалом SRD за ліцензією CC-BY.</>}
    </footer>
  </article>;
}
