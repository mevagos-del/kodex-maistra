import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bestiaryBySlug } from '@/data/rules/bestiary';
import { officialConditions } from '@/data/rules/conditions';
import { officialItems } from '@/data/rules/items';
import type { OfficialMonsterAction, OfficialMonsterRuleBlock } from '@/data/rules/types';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import './bestiary.css';

const abilityLabels = {
  strength: 'СИЛ', dexterity: 'СПР', constitution: 'СТАТ', intelligence: 'ІНТ', wisdom: 'МДР', charisma: 'ХАР',
} as const;

function RuleList({ entries }: { entries: OfficialMonsterRuleBlock[] }) {
  return <div className="bestiary-rule-list">{entries.map(entry => <p key={entry.id}><strong>{entry.nameUk}.</strong> {entry.sourceText}</p>)}</div>;
}

function ActionList({ entries }: { entries: OfficialMonsterAction[] }) {
  return <div className="bestiary-action-list">{entries.map(entry => {
    const attackFacts = [
      entry.attackType ? `${entry.attackType} атака` : null,
      entry.attackBonus ? `до атаки ${entry.attackBonus}` : null,
      entry.reach ? `досяжність ${entry.reach}` : null,
      entry.range ? `дальність ${entry.range}` : null,
      entry.target,
      entry.damage ? `${entry.damage} ${entry.damageType ?? ''} шкоди`.trim() : null,
    ].filter(Boolean);
    return <article className="bestiary-action" key={entry.id}>
      <h3>{entry.nameUk}</h3>
      {attackFacts.length ? <p className="bestiary-action__facts">{attackFacts.join(' · ')}</p> : null}
      {entry.sourceText ? <p>{entry.sourceText}</p> : null}
    </article>;
  })}</div>;
}

export function BestiaryDetailPage() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);
  const entry = bestiaryBySlug(slug);
  if (!entry) return <main className="bestiary-detail"><h1>Істоту не знайдено</h1><Link to="/bestiary">До Бестіарію</Link></main>;

  const sections = [
    ['statistics', 'Статистика', true],
    ['traits', 'Риси', Boolean(entry.traits?.length)],
    ['actions', 'Дії', entry.actions.length > 0],
    ['bonus-actions', 'Бонусні дії', Boolean(entry.bonusActions?.length)],
    ['reactions', 'Реакції', Boolean(entry.reactions?.length)],
    ['legendary-actions', 'Легендарні дії', Boolean(entry.legendaryActions?.length)],
    ['lair-actions', 'Дії лігва', Boolean(entry.lairActions?.length)],
    ['spellcasting', 'Закляття', Boolean(entry.spellcasting)],
    ['description', 'Опис', Boolean(entry.description || entry.environment?.length)],
  ].filter(([, , visible]) => visible) as Array<[string, string, boolean]>;

  const secondaryFacts = [
    entry.skills && Object.keys(entry.skills).length ? ['Навички', Object.entries(entry.skills).map(([key, value]) => `${key} ${value}`).join(', ')] : null,
    entry.vulnerabilities?.length ? ['Вразливості', entry.vulnerabilities.join(', ')] : null,
    entry.resistances?.length ? ['Стійкості', entry.resistances.join(', ')] : null,
    entry.immunities?.length ? ['Імунітети', entry.immunities.join(', ')] : null,
    entry.conditionImmunities?.length ? ['Імунітети до станів', entry.conditionImmunities.join(', ')] : null,
    entry.senses?.length ? ['Чуття', entry.senses.join(', ')] : null,
    entry.passivePerception !== undefined ? ['Пасивне сприйняття', String(entry.passivePerception)] : null,
    entry.languages?.length ? ['Мови', entry.languages.join(', ')] : null,
    ['Бонус майстерності', entry.proficiencyBonus],
    ['Показник небезпеки', entry.challengeRating],
    ['Досвід', entry.experiencePoints.toLocaleString('uk-UA')],
  ].filter(Boolean) as string[][];

  const relatedConditions = (entry.relationships?.conditionSlugs ?? []).map(conditionSlug => officialConditions.find(condition => condition.slug === conditionSlug)).filter(Boolean);
  const relatedItems = (entry.relationships?.itemSlugs ?? []).map(itemSlug => officialItems.find(item => item.slug === itemSlug)).filter(Boolean);

  return <main className="bestiary-detail">
    <ArchiveAtmosphere />
    <header className="bestiary-detail__header">
      <div className="bestiary-detail__heading"><Link to="/bestiary">‹ Бестіарій</Link><h1>{entry.nameUk}</h1><small>{entry.nameOriginal}</small>
        <p>{entry.size} {entry.creatureType}{entry.subtype ? ` (${entry.subtype})` : ''}{entry.alignment ? `, ${entry.alignment}` : ''}</p>
        <div className="bestiary-detail__header-meta"><span>ПО {entry.challengeRating}</span><span>{entry.experiencePoints.toLocaleString('uk-UA')} досвіду</span><span>{entry.source.title}</span></div>
      </div>
      {entry.imageUrl ? <img className="bestiary-detail__art" src={entry.imageUrl} alt={entry.nameUk} /> : null}
    </header>
    <nav className="bestiary-local-nav" aria-label="Розділи істоти">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <div className="bestiary-detail__content">
      <section id="statistics" className="bestiary-section bestiary-stat-block"><h2>Статистика</h2>
        <dl className="bestiary-vitals"><div><dt>Клас захисту</dt><dd>{entry.armorClass}</dd></div><div><dt>Хіти</dt><dd>{entry.hitPoints} <small>({entry.hitDice})</small></dd></div><div><dt>Швидкість</dt><dd>{entry.speed.join(', ')}</dd></div></dl>
        <div className="bestiary-abilities">{Object.entries(entry.abilities).map(([key, value]) => <div key={key}><strong>{abilityLabels[key as keyof typeof abilityLabels]}</strong><span>{value.score}</span><small>{value.modifier}</small></div>)}</div>
        <dl className="bestiary-save-row">{Object.entries(entry.abilities).map(([key, value]) => <div key={key}><dt>{abilityLabels[key as keyof typeof abilityLabels]}</dt><dd>{value.save}</dd></div>)}</dl>
        <dl className="bestiary-secondary-facts">{secondaryFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      {entry.traits?.length ? <section id="traits" className="bestiary-section"><h2>Риси</h2><RuleList entries={entry.traits} /></section> : null}
      {entry.actions.length ? <section id="actions" className="bestiary-section"><h2>Дії</h2><ActionList entries={entry.actions} /></section> : null}
      {entry.bonusActions?.length ? <section id="bonus-actions" className="bestiary-section"><h2>Бонусні дії</h2><ActionList entries={entry.bonusActions} /></section> : null}
      {entry.reactions?.length ? <section id="reactions" className="bestiary-section"><h2>Реакції</h2><ActionList entries={entry.reactions} /></section> : null}
      {entry.legendaryActions?.length ? <section id="legendary-actions" className="bestiary-section"><h2>Легендарні дії</h2>{entry.legendaryActionUses ? <p className="bestiary-section__note">{entry.legendaryActionUses}</p> : null}<ActionList entries={entry.legendaryActions} /></section> : null}
      {entry.lairActions?.length ? <section id="lair-actions" className="bestiary-section"><h2>Дії лігва</h2><ActionList entries={entry.lairActions} /></section> : null}
      {entry.spellcasting ? <section id="spellcasting" className="bestiary-section"><h2>Закляття</h2>
        <p className="bestiary-section__note">Заклинальна характеристика: {entry.spellcasting.ability}{entry.spellcasting.saveDc ? ` · СК ряткидка ${entry.spellcasting.saveDc}` : ''}{entry.spellcasting.attackBonus ? ` · до атаки ${entry.spellcasting.attackBonus}` : ''}</p>
        {entry.spellcasting.notes ? <p>{entry.spellcasting.notes}</p> : null}
        <dl className="bestiary-spells">{entry.spellcasting.groups.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.spells.map((spell, index) => <span key={spell.slug}>{index ? ', ' : ''}<Link to={`/spells/${spell.slug}`}>{spell.nameUk}</Link></span>)}</dd></div>)}</dl>
      </section> : null}
      {(entry.description || entry.environment?.length) ? <section id="description" className="bestiary-section"><h2>Опис</h2>{entry.description ? <p>{entry.description}</p> : null}{entry.environment?.length ? <p><strong>Середовище:</strong> {entry.environment.join(', ')}.</p> : null}</section> : null}
    </div>

    {(relatedConditions.length || relatedItems.length) ? <aside className="bestiary-related" aria-label="Пов’язані механіки">
      {relatedConditions.length ? <p><strong>Стани:</strong> {relatedConditions.map((condition, index) => <span key={condition!.slug}>{index ? ', ' : ''}<Link to={`/conditions/${condition!.slug}`}>{condition!.nameUk}</Link></span>)}</p> : null}
      {relatedItems.length ? <p><strong>Спорядження:</strong> {relatedItems.map((item, index) => <span key={item!.slug}>{index ? ', ' : ''}<Link to={`/items/${item!.slug}`}>{item!.nameUk}</Link></span>)}</p> : null}
    </aside> : null}
    <footer className="bestiary-source">Джерело: <a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.title}</a>, с. {entry.sourcePage}</footer>
  </main>;
}
