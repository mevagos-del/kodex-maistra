import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ruleBySlug } from '@/data/rules/rules';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { RULE_REFERENCE_ICONS } from '@/features/catalog/utils/codexIcons';
import './rules.css';

export function RuleDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const entry = ruleBySlug(slug);
  if (!entry) return <main className="rule-detail"><h1>Правило не знайдено</h1><Link to="/rules">До списку правил</Link></main>;

  const navigation = [
    ['mechanics', 'Як працює'],
    ...(entry.keyCases?.length ? [['cases', 'Ключові випадки']] : []),
  ];

  return <main className="rule-detail">
    <ArchiveAtmosphere />
    <header className="rule-detail__header">
      <Link to="/rules">‹ Правила</Link>
      <div className="rule-detail__identity"><span aria-hidden="true"><img src={RULE_REFERENCE_ICONS[entry.iconKey]} alt="" /></span><div><h1>{entry.nameUk}</h1><small>{entry.nameOriginal}</small><strong>{entry.shortDescription}</strong></div></div>
    </header>
    <nav className="rule-local-nav" aria-label="Розділи правила">{navigation.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <div className="rule-detail__content">
      <section id="mechanics" className="rule-section rule-section--primary">
        <h2>Як працює</h2>
        <p className="rule-lead">{entry.overview}</p>
        <div className="rule-text-blocks">{entry.mechanics.map(point => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div>
      </section>
      {!!entry.keyCases?.length && <section id="cases" className="rule-section rule-section--cases"><h2>Ключові випадки</h2><div className="rule-text-blocks">{entry.keyCases.map(point => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div></section>}
    </div>
    <footer className="rule-source">Джерело: <a href="https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf" target="_blank" rel="noreferrer">SRD 5.2.1</a> · CC-BY-4.0</footer>
  </main>;
}

