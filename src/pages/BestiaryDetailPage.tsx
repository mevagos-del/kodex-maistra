import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bestiaryBySlug } from '@/data/rules/bestiary';
import { officialConditions } from '@/data/rules/conditions';
import { officialItems } from '@/data/rules/items';
import type { OfficialMonsterAction, OfficialMonsterRuleBlock } from '@/data/rules/types';
import { ArchiveAtmosphere } from '@/features/catalog/components/ArchiveAtmosphere';
import { BESTIARY_ICONS } from '@/features/catalog/utils/codexIcons';
import { extractDamageFormula, formatAttackMetadata, formatDamageText, parseDiceFormula, rollDiceFormula, splitBestiarySpeed } from '@/features/catalog/utils/bestiaryMechanics';
import { segmentBestiaryReferences, type BestiaryInlineReference } from '@/features/catalog/utils/bestiaryReferences';
import './bestiary.css';

const abilityLabels = {
  strength: 'СИЛ', dexterity: 'СПР', constitution: 'СТАТ', intelligence: 'ІНТ', wisdom: 'МДР', charisma: 'ХАР',
} as const;

const conditionAliases: Record<string, string[]> = {
  charmed: ['Зачарований', 'Зачарована', 'Зачаровану', 'Зачарованої'],
  grappled: ['Схоплений', 'Схоплена', 'Схоплену', 'Схопленої'],
  incapacitated: ['Недієздатний', 'Недієздатна', 'Недієздатну'],
  prone: ['Збитий з ніг', 'Збита з ніг'],
};

function InlineReferences({ text, references }: { text: string; references: BestiaryInlineReference[] }) {
  return <>{segmentBestiaryReferences(text, references).map((segment, index) => segment.href
    ? <Link className="bestiary-inline-reference" to={segment.href} key={`${segment.slug}-${index}`}>{segment.text}</Link>
    : <span key={`text-${index}`}>{segment.text}</span>)}</>;
}

function HitPointsControl({ average, formula }: { average: string; formula: string }) {
  const parsed = parseDiceFormula(formula);
  const [rolled, setRolled] = useState<number | null>(null);
  if (!parsed) return <dd className="bestiary-combat-stat__body">
    <span className="bestiary-combat-stat__icon bestiary-combat-stat__icon--hp">
      <img src={BESTIARY_ICONS.hitPoints} alt="" />
      <strong>{average}</strong>
    </span>
    <span className="bestiary-combat-stat__formula">{formula}</span>
  </dd>;

  const roll = () => {
    const result = rollDiceFormula(formula);
    if (result) setRolled(result.total);
  };

  return <dd className="bestiary-combat-stat__body bestiary-hp-control">
    <button className="bestiary-combat-stat__icon bestiary-combat-stat__icon--hp bestiary-hp-control__roll" type="button" onClick={roll} aria-label={rolled === null ? 'Кинути хіти' : 'Кинути хіти ще раз'} title={rolled === null ? 'Кинути хіти' : 'Кинути ще раз'}>
      <img src={BESTIARY_ICONS.hitPoints} alt="" />
      <strong className={rolled === null ? undefined : 'bestiary-hp-control__rolled'} key={rolled ?? 'standard'} aria-live="polite">{rolled ?? average}</strong>
    </button>
    <span className="bestiary-combat-stat__formula">{parsed.canonical}</span>
    {rolled !== null ? <span className="bestiary-hp-control__standard">Стандартне: {average} <button type="button" onClick={() => setRolled(null)}>Повернути стандартне</button></span> : null}
  </dd>;
}

function RuleList({ entries, references }: { entries: OfficialMonsterRuleBlock[]; references: BestiaryInlineReference[] }) {
  return <div className="bestiary-detail__rule-list">{entries.map(entry => <p key={entry.id}><strong>{entry.nameUk}.</strong> <InlineReferences text={entry.sourceText} references={references} /></p>)}</div>;
}

function ActionList({ entries, references }: { entries: OfficialMonsterAction[]; references: BestiaryInlineReference[] }) {
  return <div className="bestiary-action-list">{entries.map(entry => {
    const attackMetadata = formatAttackMetadata(entry);
    return <article className="bestiary-action" key={entry.id}>
      <h3><InlineReferences text={entry.nameUk} references={references} /></h3>
      {attackMetadata ? <p className="bestiary-action__facts"><InlineReferences text={attackMetadata} references={references} /></p> : null}
      {entry.damage ? <p className="bestiary-action__damage"><strong>Влучання:</strong> {extractDamageFormula(entry.damage)} {entry.damageType ? `${entry.damageType} шкоди` : 'шкоди'}</p> : null}
      {entry.sourceText ? <p className="bestiary-action__effect"><InlineReferences text={formatDamageText(entry.sourceText)} references={references} /></p> : null}
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

  const savingThrows = Object.entries(entry.abilities)
    .filter(([, value]) => value.save !== value.modifier)
    .map(([key, value]) => `${abilityLabels[key as keyof typeof abilityLabels]} ${value.save}`)
    .join(', ');

  const secondaryFacts = [
    savingThrows ? ['Ряткидки', savingThrows] : null,
    entry.skills && Object.keys(entry.skills).length ? ['Навички', Object.entries(entry.skills).map(([key, value]) => `${key} ${value}`).join(', ')] : null,
    entry.vulnerabilities?.length ? ['Вразливості', entry.vulnerabilities.join(', ')] : null,
    entry.resistances?.length ? ['Стійкості', entry.resistances.join(', ')] : null,
    entry.immunities?.length ? ['Імунітети', entry.immunities.join(', ')] : null,
    entry.conditionImmunities?.length ? ['Імунітети до станів', entry.conditionImmunities.join(', ')] : null,
    entry.senses?.length ? ['Чуття', entry.senses.join(', ')] : null,
    entry.passivePerception !== undefined ? ['Пасивне сприйняття', String(entry.passivePerception)] : null,
    entry.languages?.length ? ['Мови', entry.languages.join(', ')] : null,
    ['Бонус майстерності', entry.proficiencyBonus],
  ].filter(Boolean) as string[][];

  const relatedConditions = (entry.relationships?.conditionSlugs ?? []).map(conditionSlug => officialConditions.find(condition => condition.slug === conditionSlug)).filter(Boolean);
  const relatedItems = (entry.relationships?.itemSlugs ?? []).map(itemSlug => officialItems.find(item => item.slug === itemSlug)).filter(Boolean);
  const relatedSpellSlugs = new Set(entry.relationships?.spellSlugs ?? []);
  const relatedSpells = Array.from(new Map((entry.spellcasting?.groups.flatMap(group => group.spells) ?? [])
    .filter(spell => relatedSpellSlugs.has(spell.slug))
    .map(spell => [spell.slug, spell])).values());
  const inlineReferences: BestiaryInlineReference[] = [
    ...relatedConditions.map(condition => ({
      slug: condition!.slug,
      href: `/conditions/${condition!.slug}`,
      labels: Array.from(new Set([condition!.nameUk, ...(conditionAliases[condition!.slug] ?? [])])),
    })),
    ...relatedSpells.map(spell => ({ slug: spell.slug, href: `/spells/${spell.slug}`, labels: [spell.nameUk] })),
  ];
  const speed = splitBestiarySpeed(entry.speed);

  return <main className="bestiary-detail">
    <ArchiveAtmosphere />
    <header className="bestiary-detail__header">
      <div className="bestiary-detail__heading"><Link to="/bestiary">‹ Бестіарій</Link><h1>{entry.nameUk}</h1><small>{entry.nameOriginal}</small>
        <p>{entry.size} {entry.creatureType}{entry.subtype ? ` (${entry.subtype})` : ''}{entry.alignment ? `, ${entry.alignment}` : ''}</p>
        <div className="bestiary-detail__header-meta"><strong>ПО {entry.challengeRating}</strong><span>{entry.experiencePoints.toLocaleString('uk-UA')} досвіду</span><span>{entry.source.title}</span></div>
      </div>
    </header>
    <nav className="bestiary-local-nav" aria-label="Розділи істоти">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <div className="bestiary-detail__layout">
      <div className="bestiary-detail__main">
        <section id="statistics" className="bestiary-section bestiary-detail__statistics"><h2>Статистика</h2>
          <dl className="bestiary-detail__combat-summary">
            <div className="bestiary-combat-stat"><dt>Клас захисту</dt><dd className="bestiary-combat-stat__body"><span className="bestiary-combat-stat__icon bestiary-combat-stat__icon--ac"><img src={BESTIARY_ICONS.armorClass} alt="" /><strong>{entry.armorClass}</strong></span></dd></div>
            <div className="bestiary-combat-stat"><dt>Хіти</dt><HitPointsControl average={entry.hitPoints} formula={entry.hitDice} key={entry.slug} /></div>
            <div className="bestiary-combat-stat"><dt>Швидкість</dt><dd className="bestiary-combat-stat__body"><span className="bestiary-combat-stat__speed"><span className="bestiary-combat-stat__icon bestiary-combat-stat__icon--speed"><img src={BESTIARY_ICONS.speed} alt="" /></span><span className="bestiary-combat-stat__speed-value"><strong>{speed.value}</strong>{speed.unit ? <small>{speed.unit}</small> : null}</span></span>{speed.additional.length ? <span className="bestiary-combat-stat__additional">{speed.additional.join(' · ')}</span> : null}</dd></div>
          </dl>
          <div className="bestiary-detail__abilities">{Object.entries(entry.abilities).map(([key, value]) => <div key={key}><strong>{abilityLabels[key as keyof typeof abilityLabels]}</strong><span>{value.score}</span><small>{value.modifier}</small></div>)}</div>
          <dl className="bestiary-detail__secondary">{secondaryFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>

        {entry.traits?.length ? <section id="traits" className="bestiary-section"><h2>Риси</h2><RuleList entries={entry.traits} references={inlineReferences} /></section> : null}
        {entry.actions.length ? <section id="actions" className="bestiary-section bestiary-detail__actions"><h2>Дії</h2><ActionList entries={entry.actions} references={inlineReferences} /></section> : null}
        {entry.bonusActions?.length ? <section id="bonus-actions" className="bestiary-section bestiary-detail__actions"><h2>Бонусні дії</h2><ActionList entries={entry.bonusActions} references={inlineReferences} /></section> : null}
        {entry.reactions?.length ? <section id="reactions" className="bestiary-section bestiary-detail__actions"><h2>Реакції</h2><ActionList entries={entry.reactions} references={inlineReferences} /></section> : null}
        {entry.legendaryActions?.length ? <section id="legendary-actions" className="bestiary-section bestiary-detail__actions"><h2>Легендарні дії</h2>{entry.legendaryActionUses ? <p className="bestiary-section__note">{entry.legendaryActionUses}</p> : null}<ActionList entries={entry.legendaryActions} references={inlineReferences} /></section> : null}
        {entry.lairActions?.length ? <section id="lair-actions" className="bestiary-section bestiary-detail__actions"><h2>Дії лігва</h2><ActionList entries={entry.lairActions} references={inlineReferences} /></section> : null}
        {entry.spellcasting ? <section id="spellcasting" className="bestiary-section"><h2>Закляття</h2>
          <p className="bestiary-section__note">Заклинальна характеристика: {entry.spellcasting.ability}{entry.spellcasting.saveDc ? ` · СК ряткидка ${entry.spellcasting.saveDc}` : ''}{entry.spellcasting.attackBonus ? ` · до атаки ${entry.spellcasting.attackBonus}` : ''}</p>
          {entry.spellcasting.notes ? <p><InlineReferences text={entry.spellcasting.notes} references={inlineReferences} /></p> : null}
          <dl className="bestiary-spells">{entry.spellcasting.groups.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.spells.map((spell, index) => <span key={spell.slug}>{index ? ', ' : ''}<Link to={`/spells/${spell.slug}`}>{spell.nameUk}</Link></span>)}</dd></div>)}</dl>
        </section> : null}
      </div>

      <aside className="bestiary-detail__aside">
        {entry.imageUrl ? <img className="bestiary-detail__art" src={entry.imageUrl} alt={entry.nameUk} /> : null}
        {(entry.description || entry.environment?.length) ? <section id="description" className="bestiary-detail__lore"><h2>Опис</h2>{entry.description ? <p>{entry.description}</p> : null}{entry.environment?.length ? <p><strong>Середовище:</strong> {entry.environment.join(', ')}.</p> : null}</section> : null}
        {(relatedConditions.length || relatedItems.length) ? <div className="bestiary-related" aria-label="Пов’язані механіки">
          <h2>Пов’язані механіки</h2>
          {relatedConditions.length ? <p><strong>Стани:</strong> {relatedConditions.map((condition, index) => <span key={condition!.slug}>{index ? ', ' : ''}<Link to={`/conditions/${condition!.slug}`}>{condition!.nameUk}</Link></span>)}</p> : null}
          {relatedItems.length ? <p><strong>Спорядження:</strong> {relatedItems.map((item, index) => <span key={item!.slug}>{index ? ', ' : ''}<Link to={`/items/${item!.slug}`}>{item!.nameUk}</Link></span>)}</p> : null}
        </div> : null}
        <footer className="bestiary-source">Джерело: <a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.title}</a>, с. {entry.sourcePage}</footer>
      </aside>
    </div>
  </main>;
}
