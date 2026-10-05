import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { officialSpells, spellClasses, spellLevelLabel } from '@/data/rules/spells';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import './spells.css';

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return <dl className="spell-facts">{rows.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
export function SpellDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const spell = officialSpells.find((entry) => entry.slug === slug);
  if (!spell) return <div className="spell-detail"><h1>Закляття не знайдено</h1><Link to="/spells">До списку заклять</Link></div>;
  const facts = [
    { label: 'Час накладання', value: spell.castingTime }, { label: 'Дальність', value: spell.range },
    { label: 'Компоненти', value: spell.components.join(', ') }, { label: 'Тривалість', value: spell.duration },
    ...(spell.materialComponent ? [{ label: 'Матеріальний компонент', value: spell.materialComponent }] : []),
    ...(spell.concentration ? [{ label: 'Концентрація', value: 'Потрібна' }] : []),
    ...(spell.ritual ? [{ label: 'Ритуал', value: 'Можливий' }] : []),
    ...(spell.area ? [{ label: 'Зона дії', value: spell.area }] : []),
  ];
  const mechanics = [
    ...(spell.spellAttack ? [{ label: 'Атака', value: spell.spellAttack }] : []),
    ...(spell.damage ? [{ label: 'Шкода', value: `${spell.damage}${spell.damageType ? ` · ${spell.damageType}` : ''}` }] : []),
    ...(spell.conditions?.length ? [{ label: 'Стани', value: spell.conditions.join(', ') }] : []),
    ...(spell.mechanics ?? []),
  ];
  return <article className="spell-detail">
    <ArchiveAtmosphere />
    <header className="spell-detail__header"><Link to="/spells">‹ Закляття</Link><h1>{spell.nameUk}</h1><p>{spell.nameEn}</p><span>{spellLevelLabel(spell.level)} · {spell.school} · {spell.edition} · Офіційний</span></header>
    <section><h2>Основні параметри</h2><Rows rows={facts} /></section>
    <section><h2>Опис</h2>{spell.sourceText.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    {mechanics.length > 0 && <section><h2>Що відбувається</h2><Rows rows={mechanics} /></section>}
    {!!spell.mitigation?.length && <section><h2>Як уникнути / зменшити ефект</h2><Rows rows={spell.mitigation} /></section>}
    {spell.higherLevels && <section><h2>На вищих рівнях</h2><p>{spell.higherLevels}</p></section>}
    <section><h2>Доступно класам</h2><ul className="spell-relationships">{spell.classes.map((key) => <li key={key}><Link to={`/classes/${key}`}>{spellClasses[key]}</Link></li>)}</ul></section>
    {!!spell.relatedRules.length && <section><h2>Пов’язані правила</h2><ul className="spell-relationships">{spell.relatedRules.map((rule) => <li key={rule.slug}>{rule.path ? <Link to={rule.path}>{rule.label}</Link> : rule.label}</li>)}</ul></section>}
    <footer>Джерело: <a href={`${spell.source.url}#page=${spell.source.page}`} target="_blank" rel="noreferrer">{spell.source.title}, с. {spell.source.page}</a> · <a href="https://creativecommons.org/licenses/by/4.0/">{spell.source.license}</a>.<br />System Reference Document 5.2 © Wizards of the Coast LLC. Текст перекладено українською; оригінал англійською за посиланням.</footer>
  </article>;
}
