import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { officialSpells, spellClasses, spellLevelLabel, spellMechanicRows, spellMitigationRows } from '@/data/rules/spells';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { officialConditions, type ConditionSlug } from '@/data/rules/conditions';
import { conditionTextMatches, spellConditionApplications } from '@/data/rules/spellConditions';
import { ConditionText } from '@/features/catalog/components/ConditionText';
import './spells.css';

function Rows({ rows, slugs }: { rows: { label: string; value: string }[]; slugs: readonly ConditionSlug[] }) {
  return <dl className="spell-facts">{rows.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd><ConditionText slugs={slugs}>{value}</ConditionText></dd></div>)}</dl>;
}
export function SpellDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const spell = officialSpells.find((entry) => entry.slug === slug);
  if (!spell) return <div className="spell-detail"><h1>Закляття не знайдено</h1><Link to="/spells">До списку заклять</Link></div>;
  const facts = [
    { label: 'Час накладання', value: spell.castingTime }, { label: 'Дальність', value: spell.range },
    ...(spell.castingTrigger ? [{ label: spell.castingTime === '1 реакція' ? 'Умова реакції' : 'Умова накладання', value: spell.castingTrigger }] : []),
    { label: 'Компоненти', value: spell.components.join(', ') }, { label: 'Тривалість', value: spell.duration },
    ...(spell.materialComponent ? [{ label: 'Матеріальний компонент', value: spell.materialComponent }] : []),
    ...(spell.concentration ? [{ label: 'Концентрація', value: 'Потрібна' }] : []),
    ...(spell.ritual ? [{ label: 'Ритуал', value: 'Можливий' }] : []),
    ...(spell.area ? [{ label: 'Зона дії', value: spell.area }] : []),
  ];
  const appliedConditions = spellConditionApplications[spell.slug] ?? [];
  // Linking a reference is different from claiming that a spell applies it.
  const references = officialConditions.map(condition => condition.slug);
  const mechanics = spellMechanicRows(spell).filter(row => row.label !== 'Стани');
  if (appliedConditions.length) {
    const qualifiedValues = (spell.conditions ?? []).filter(value => conditionTextMatches(value, appliedConditions).length > 0);
    mechanics.push({ label: 'Стани', value: qualifiedValues.length ? qualifiedValues.join(', ') : appliedConditions.map(key => officialConditions.find(condition => condition.slug === key)!.nameUk).join(', ') });
  }
  const mitigation = spellMitigationRows(spell);
  return <article className="spell-detail">
    <ArchiveAtmosphere />
    <header className="spell-detail__header"><Link to="/spells">‹ Закляття</Link><h1>{spell.nameUk}</h1><p>{spell.nameEn}</p><span>{spellLevelLabel(spell.level)} · {spell.school} · {spell.edition} · Офіційний</span></header>
    <section><h2>Основні параметри</h2><Rows rows={facts} slugs={[]} /></section>
    <section><h2>Опис</h2>{spell.sourceText.split('\n\n').map((paragraph) => <p key={paragraph}><ConditionText slugs={references.filter(key => key !== 'invisible' || /стан[\p{L}\s,]{0,40}Невидим/iu.test(paragraph))}>{paragraph}</ConditionText></p>)}</section>
    {mechanics.length > 0 && <section><h2>Що відбувається</h2><Rows rows={mechanics} slugs={references} /></section>}
    {mitigation.length > 0 && <section><h2>Як уникнути / зменшити ефект</h2><Rows rows={mitigation} slugs={references} /></section>}
    {spell.higherLevels && <section><h2>На вищих рівнях</h2><p><ConditionText slugs={references}>{spell.higherLevels}</ConditionText></p></section>}
    <section><h2>Доступно класам</h2><ul className="spell-relationships">{spell.classes.map((key) => <li key={key}><Link to={`/classes/${key}`}>{spellClasses[key]}</Link></li>)}</ul></section>
    {!!spell.relatedRules.length && <section><h2>Пов’язані правила</h2><ul className="spell-relationships">{spell.relatedRules.map((rule) => <li key={rule.slug}>{rule.slug === 'conditions' ? <Link to="/conditions">{rule.label}</Link> : rule.path ? <Link to={rule.path}>{rule.label}</Link> : rule.label}</li>)}</ul></section>}
    <footer>Джерело: <a href={`${spell.source.url}#page=${spell.source.page}`} target="_blank" rel="noreferrer">{spell.source.title}, с. {spell.source.page}</a> · <a href="https://creativecommons.org/licenses/by/4.0/">{spell.source.license}</a>.<br />Ця робота містить матеріал із {spell.source.title} від Wizards of the Coast LLC, доступний на <a href="https://www.dndbeyond.com/srd">dndbeyond.com/srd</a> за ліцензією CC-BY-4.0. Текст перекладено українською; оригінал англійською за посиланням.{spell.source.supplement && <><br />Завершення прикладу: <a href={spell.source.supplement.url} target="_blank" rel="noreferrer">{spell.source.supplement.title}</a>.</>}</footer>
  </article>;
}
