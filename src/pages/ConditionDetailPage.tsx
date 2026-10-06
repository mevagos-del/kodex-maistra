import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { conditionSource, officialConditions } from '@/data/rules/conditions';
import { officialSpells, spellLevelLabel } from '@/data/rules/spells';
import { spellConditionApplications } from '@/data/rules/spellConditions';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { ConditionIcon } from '@/features/catalog/components/ConditionIcon';
import { ConditionText } from '@/features/catalog/components/ConditionText';
import './spells.css';
import './conditions.css';

export function ConditionDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const condition = officialConditions.find(entry => entry.slug === slug);
  if (!condition) return <article className="spell-detail"><h1>Стан не знайдено</h1><Link to="/conditions">До списку станів</Link></article>;
  const spells = officialSpells.filter(spell => spellConditionApplications[spell.slug]?.includes(condition.slug)).sort((a, b) => a.level - b.level || a.nameUk.localeCompare(b.nameUk, 'uk'));
  const text = (value: string) => <ConditionText slugs={condition.relatedConditions}>{value}</ConditionText>;
  return <article className="spell-detail condition-detail">
    <ArchiveAtmosphere />
    <header className="spell-detail__header"><Link to="/conditions">‹ Стани</Link>
      <div className="condition-detail__identity"><ConditionIcon slug={condition.slug} /><div><h1>{condition.nameUk}</h1><p>{condition.nameEn}</p></div></div>
      <span>{conditionSource.edition} · Офіційний · {conditionSource.title}</span>
    </header>
    <section><h2>Ефект</h2><dl className="condition-effects">{condition.effects.map(point => <div key={point.title}><dt>{point.title}</dt><dd>{text(point.text)}</dd></div>)}</dl></section>
    {!!condition.ending?.length && <section><h2>Завершення стану</h2>{condition.ending.map(point => <p key={point.title}>{text(point.text)}</p>)}{condition.slug === 'grappled' && <small>Правило «Завершення захоплення»: SRD 5.2.1, с. 182.</small>}</section>}
    {(condition.relatedConditions.length > 0 || condition.relatedRules.length > 0) && <section><h2>Пов’язані механіки</h2><ul className="spell-relationships">
      {condition.relatedConditions.map(key => <li key={key}><Link to={`/conditions/${key}`}>{officialConditions.find(entry => entry.slug === key)!.nameUk}</Link></li>)}
      {condition.relatedRules.map(rule => <li key={rule.slug}>{rule.label}</li>)}
    </ul></section>}
    {spells.length > 0 && <section><h2>Закляття, що накладають стан</h2><p className="condition-spells-note">Стан може накладатися за певної умови, вибору ефекту або через викликану істоту. Точні умови — в описі закляття.</p>
      <ul className="condition-spells">{spells.map(spell => <li key={spell.slug}><Link to={`/spells/${spell.slug}`}>{spell.nameUk}</Link><small>{spellLevelLabel(spell.level)}</small></li>)}</ul>
    </section>}
    <footer>Джерело: <a href={`${conditionSource.url}#page=${condition.page}`} target="_blank" rel="noreferrer">{conditionSource.title}, с. {condition.page}</a> · <a href="https://creativecommons.org/licenses/by/4.0/">{conditionSource.license}</a>.<br />Ця робота містить матеріал із System Reference Document 5.2.1 від Wizards of the Coast LLC, доступний на <a href="https://www.dndbeyond.com/srd">dndbeyond.com/srd</a> за ліцензією CC-BY-4.0. Текст перекладено українською; оригінал англійською за посиланням.</footer>
  </article>;
}
