import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { officialClasses } from '@/data/rules/classes';
import { officialConditions } from '@/data/rules/conditions';
import { officialFeats } from '@/data/rules/feats';
import { officialItems } from '@/data/rules/items';
import { ruleBySlug, ruleCategories } from '@/data/rules/rules';
import { officialSpells } from '@/data/rules/spells';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { RULE_REFERENCE_ICONS } from '@/features/catalog/utils/codexIcons';
import './rules.css';

type RelatedLink = { slug: string; name: string; path: string };

function related<T extends { slug: string }>(slugs: string[], entries: T[], name: (entry: T) => string, base: string): RelatedLink[] {
  return slugs.flatMap(slug => {
    const entry = entries.find(candidate => candidate.slug === slug);
    return entry ? [{ slug, name: name(entry), path: `/${base}/${slug}` }] : [];
  });
}

export function RuleDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const entry = ruleBySlug(slug);
  if (!entry) return <main className="rule-detail"><h1>Правило не знайдено</h1><Link to="/rules">До списку правил</Link></main>;

  const relatedRules = entry.relatedRuleSlugs.flatMap(ruleSlug => {
    const target = ruleBySlug(ruleSlug);
    return target ? [target] : [];
  });
  const entityGroups = [
    { label: 'Класи', links: related(entry.relatedClassSlugs, officialClasses, item => item.nameUk, 'classes') },
    { label: 'Риси', links: related(entry.relatedFeatSlugs, officialFeats, item => item.nameUk, 'feats') },
    { label: 'Закляття', links: related(entry.relatedSpellSlugs, officialSpells, item => item.nameUk, 'spells') },
    { label: 'Предмети', links: related(entry.relatedItemSlugs, officialItems, item => item.nameUk, 'items') },
    { label: 'Стани', links: related(entry.relatedConditionSlugs, officialConditions, item => item.nameUk, 'conditions') },
  ].filter(group => group.links.length > 0);
  const navigation = [
    ['overview', 'Огляд'], ['mechanics', 'Як працює'],
    ...(entry.keyCases?.length ? [['cases', 'Ключові випадки']] : []),
    ...(relatedRules.length ? [['related-rules', 'Пов’язані правила']] : []),
    ...(entityGroups.length ? [['related-entities', 'Пов’язані сутності']] : []),
  ];

  return <main className="rule-detail">
    <ArchiveAtmosphere />
    <header className="rule-detail__header">
      <Link to="/rules">‹ Правила</Link>
      <div className="rule-detail__identity"><span aria-hidden="true"><img src={RULE_REFERENCE_ICONS[entry.iconKey]} alt="" /></span><div><p>{ruleCategories[entry.category]}</p><h1>{entry.nameUk}</h1><small>{entry.nameOriginal}</small><strong>{entry.shortDescription}</strong></div></div>
    </header>
    <nav className="rule-local-nav" aria-label="Розділи правила">{navigation.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <div className="rule-detail__content">
      <section id="overview" className="rule-section"><h2>Огляд</h2><dl className="rule-passport"><div><dt>Категорія</dt><dd>{ruleCategories[entry.category]}</dd></div><div><dt>Тип механіки</dt><dd>{entry.mechanicType}</dd></div><div><dt>Джерело</dt><dd>{entry.source}</dd></div><div><dt>Пов’язані правила</dt><dd>{relatedRules.length}</dd></div></dl><p className="rule-overview">{entry.overview}</p></section>
      <section id="mechanics" className="rule-section"><h2>Як працює</h2><div className="rule-points">{entry.mechanics.map(point => <article key={point.title}><h3>{point.title}</h3><p>{point.text}</p></article>)}</div></section>
      {!!entry.keyCases?.length && <section id="cases" className="rule-section"><h2>Ключові випадки</h2><div className="rule-points">{entry.keyCases.map(point => <article key={point.title}><h3>{point.title}</h3><p>{point.text}</p></article>)}</div></section>}
      {relatedRules.length > 0 && <section id="related-rules" className="rule-section"><h2>Пов’язані правила</h2><div className="rule-related-grid">{relatedRules.map(target => <Link to={`/rules/${target.slug}`} key={target.slug}><img src={RULE_REFERENCE_ICONS[target.iconKey]} alt="" /><span><strong>{target.nameUk}</strong><small>{target.shortDescription}</small></span></Link>)}</div></section>}
      {entityGroups.length > 0 && <section id="related-entities" className="rule-section"><h2>Пов’язані сутності</h2><div className="rule-entity-groups">{entityGroups.map(group => <div key={group.label}><h3>{group.label}<span>{group.links.length}</span></h3><ul>{group.links.map(link => <li key={link.slug}><Link to={link.path}>{link.name}</Link></li>)}</ul></div>)}</div></section>}
    </div>
    <footer className="rule-source">Джерело: <a href="https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf" target="_blank" rel="noreferrer">SRD 5.2.1</a> · CC-BY-4.0</footer>
  </main>;
}

