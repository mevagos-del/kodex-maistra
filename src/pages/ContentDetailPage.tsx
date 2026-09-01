import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import {
  abilityScoreCells,
  gameplaySummary,
  groupedProficiencies,
  itemRequirementRows,
  quickSummaryItems,
  referenceCards,
  resistanceRows,
} from '@/features/catalog/api/detailReference';
import { DetailReferenceSection } from '@/features/catalog/components/DetailReferenceSection';
import { DetailLayout } from '@/features/catalog/components/DetailLayout';
import { DetailSidebar } from '@/features/catalog/components/DetailSidebar';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { MechanicInfoGrid } from '@/features/catalog/components/MechanicInfoGrid';
import { RaceTraitSection } from '@/features/catalog/components/RaceTraitSection';
import { StructuredContentBlock } from '@/features/catalog/components/StructuredContentBlock';
import { SubraceSelector } from '@/features/catalog/components/SubraceSelector';
import { sectionSlugForEntity } from '@/features/catalog/api/catalogApi';
import { useCatalogEntry } from '@/features/catalog/hooks/useCatalogData';
import type { CatalogEntry } from '@/features/catalog/types';
import { getDefaultImageUrl } from '@/lib/storage';
import type { EntityType } from '@/types/content';

type ContentDetailPageProps = {
  entity: EntityType;
};

const entityLabels: Record<EntityType, string> = {
  race: 'Раса',
  class: 'Клас',
  item: 'Предмет',
};

const quickTitles: Record<EntityType, string> = {
  race: 'Коротко про расу',
  class: 'Коротко про клас',
  item: 'Коротко про предмет',
};

function booleanLabel(value: boolean) {
  return value ? 'Так' : 'Ні';
}

function contentTypeLabel(value: CatalogEntry['content_type']) {
  const labels: Record<CatalogEntry['content_type'], string> = {
    official: 'Офіційний',
    homebrew: 'Авторський матеріал',
    campaign: 'Матеріал кампанії',
    draft: 'Чернетка',
  };

  return labels[value];
}

function rulesVersionLabel(value: CatalogEntry['rules_version']) {
  return value === '2024' ? 'D&D 2024' : 'Homebrew';
}

function addInfo(blocks: Array<{ label: string; value: string }>, label: string, value?: string | null) {
  if (value) blocks.push({ label, value });
}

const raceTermLabels: Record<string, string> = {
  humanoid: 'Гуманоїд', 'гуманоїд': 'Гуманоїд', medium: 'Середній', 'середній': 'Середній',
  small: 'Малий', 'малий': 'Малий', common: 'Спільна', 'спільна': 'Спільна',
  dwarvish: 'Дворфійська', 'дворфійська': 'Дворфійська', elvish: 'Ельфійська', 'ельфійська': 'Ельфійська',
};

function localizeRaceValue(value: string) {
  const normalized = value.trim().toLowerCase();
  return raceTermLabels[normalized] ?? value.replace(/\b(feet|foot|ft\.?)\b/gi, 'фт');
}

function mainInfoBlocks(entry: CatalogEntry) {
  const blocks: Array<{ label: string; value: string }> = [];

  blocks.push({ label: 'Версія правил', value: rulesVersionLabel(entry.rules_version) });
  blocks.push({ label: 'Тип контенту', value: contentTypeLabel(entry.content_type) });

  if (entry.entityType === 'race') {
    addInfo(blocks, 'Тип істоти', entry.creature_type ? localizeRaceValue(entry.creature_type) : null);
    addInfo(blocks, 'Розмір', entry.size ? localizeRaceValue(entry.size) : null);
    addInfo(blocks, 'Швидкість', entry.speed ? localizeRaceValue(entry.speed) : null);
    addInfo(blocks, 'Мови', entry.languages.map(localizeRaceValue).join(', '));
    addInfo(blocks, 'Тривалість життя', entry.lifespan);
    addInfo(blocks, 'Поведінка', entry.alignment_or_behavior);
  }

  if (entry.entityType === 'class') {
    addInfo(blocks, 'Кістка хітів', entry.hit_die);
    addInfo(blocks, 'Основна характеристика', entry.primary_ability);
    addInfo(blocks, 'Ряткидки', entry.saving_throws.join(', '));
    addInfo(blocks, 'Володіння бронею', entry.armor_proficiencies.join(', '));
    addInfo(blocks, 'Володіння зброєю', entry.weapon_proficiencies.join(', '));
    addInfo(blocks, 'Володіння інструментами', entry.tool_proficiencies.join(', '));
    blocks.push({ label: 'Заклинання', value: booleanLabel(entry.has_spellcasting) });
  }

  if (entry.entityType === 'item') {
    addInfo(blocks, 'Тип предмета', entry.item_type);
    addInfo(blocks, 'Категорія', entry.category);
    addInfo(blocks, 'Рідкість', entry.rarity);
    addInfo(blocks, 'Ціна', entry.price);
    addInfo(blocks, 'Вага', entry.weight);
    blocks.push({ label: 'Магічний предмет', value: booleanLabel(entry.is_magical) });
    blocks.push({ label: 'Потребує налаштування', value: booleanLabel(entry.requires_attunement) });
    addInfo(blocks, 'Шкода', entry.damage);
    addInfo(blocks, 'Тип шкоди', entry.damage_type);
    addInfo(blocks, 'Дальність', entry.range);
    addInfo(blocks, 'Клас захисту', entry.armor_class);
    addInfo(blocks, 'Необхідна сила', entry.required_strength);
    blocks.push({ label: 'Перешкода: Скритність', value: booleanLabel(entry.stealth_disadvantage) });
    addInfo(blocks, 'Кількість', entry.quantity);
  }

  return blocks;
}

function mainSectionTitle(entry: CatalogEntry) {
  if (entry.entityType === 'class') return 'Основні характеристики класу';
  if (entry.entityType === 'item') return 'Основні характеристики предмета';
  return 'Основні характеристики';
}

function SummarySection({ entry }: { entry: CatalogEntry }) {
  const summary = gameplaySummary(entry);

  if (summary.items.length === 0) return null;

  return (
    <section className="detail-v2-panel gameplay-summary-section">
      <h2>{summary.title}</h2>
      <ul className="reference-summary-list">
        {summary.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function DetailGroupPanel({ title, groups, presentation = 'chips', id, sectionNumber }: {
  title: string;
  groups: Array<{ title: string; values: string[] }>;
  presentation?: 'chips' | 'rows';
  id?: string;
  sectionNumber?: number;
}) {
  const visibleGroups = groups.filter((group) => group.values.length > 0);
  if (visibleGroups.length === 0) return null;

  const sectionClass = sectionNumber ? ' race-detail-section' : '';

  return (
    <section id={id} className={`detail-v2-group-panel detail-v2-group-panel--${presentation}${sectionClass}`}>
      {sectionNumber ? (
        <h2 className="race-section-title"><span>{sectionNumber}.</span> {title}</h2>
      ) : <h3>{title}</h3>}
      <div className="detail-v2-group-list">
        {visibleGroups.map((group) => (
          <div key={group.title} className="detail-v2-group">
            <strong className="detail-v2-group-title">{group.title}</strong>
            {presentation === 'rows' ? (
              <div className="detail-v2-group-values">
                {group.values.map((value) => <p key={`${group.title}-${value}`}>{value}</p>)}
              </div>
            ) : (
              <div className="detail-v2-chip-list">
                {group.values.map((value) => <span key={`${group.title}-${value}`} className="detail-v2-clean-chip">{value}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function infoRowsToGroups(rows: Array<{ label: string; value: string }>) {
  const grouped = new Map<string, string[]>();

  for (const row of rows) {
    const current = grouped.get(row.label) ?? [];
    current.push(...row.value.split(',').map((value) => value.trim()).filter(Boolean));
    grouped.set(row.label, Array.from(new Set(current)));
  }

  return Array.from(grouped.entries()).map(([title, values]) => ({ title, values }));
}

function mechanicalIndexGroups(rows: Array<{ label: string; value: string }>) {
  return infoRowsToGroups(rows.map((row) => {
    if (row.label.startsWith('Стійкість')) return { ...row, label: 'Стійкості' };
    if (row.label.includes('Переваг')) return { ...row, label: 'Переваги' };
    return row;
  }));
}

function AbilityScoreGrid({ entry, id, sectionNumber }: {
  entry: Extract<CatalogEntry, { entityType: 'race' }>;
  id: string;
  sectionNumber: number;
}) {
  const { cells, note } = abilityScoreCells(entry.ability_bonuses);
  const hasVisibleRule = cells.some((cell) => cell.isActive) || Boolean(note);

  if (!hasVisibleRule) return null;

  return (
    <section id={id} className="detail-v2-panel race-detail-section">
      <h2 className="race-section-title"><span>{sectionNumber}.</span> Збільшення характеристик</h2>
      <div className="detail-v2-score-grid">
        {cells.map((cell) => (
          <div key={cell.label} className={cell.isActive ? 'detail-v2-score-cell detail-v2-score-cell-active' : 'detail-v2-score-cell'}>
            <span title={cell.label}>{({ Сила: 'СИЛ', Спритність: 'СПР', Статура: 'СТАТ', Інтелект: 'ІНТ', Мудрість: 'МУД', Харизма: 'ХАР' } as Record<string, string>)[cell.label] ?? cell.label}</span>
            <strong>{cell.value}</strong>
          </div>
        ))}
      </div>
      {note ? <p className="detail-v2-note">Додатково: {note}</p> : null}
    </section>
  );
}

function ProficiencyGroups({ entry, presentation = 'chips' }: {
  entry: Extract<CatalogEntry, { entityType: 'race' | 'class' }>;
  presentation?: 'chips' | 'rows';
}) {
  const groups = groupedProficiencies(entry);
  return <DetailGroupPanel title={entry.entityType === 'class' ? 'Володіння' : 'Володіння та навички'} groups={groups} presentation={presentation} />;
}

function RichReferenceBlocks({ entry }: { entry: CatalogEntry }) {
  if (entry.entityType === 'race') {
    const resistanceInfo = resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills);

    return (
      <>
        <RaceTraitSection id="race-traits" sectionNumber={3} cards={referenceCards(entry.race_traits, 'Риса')} />
        <div className="detail-v2-lower-grid">
          <DetailGroupPanel id="race-proficiencies" sectionNumber={4} title="Володіння та навички" groups={groupedProficiencies(entry)} presentation="rows" />
          <DetailGroupPanel id="race-resistances" sectionNumber={5} title="Стійкості та переваги" groups={mechanicalIndexGroups(resistanceInfo)} presentation="rows" />
        </div>
        <SubraceSelector id="race-subraces" sectionNumber={6} value={entry.subraces} />
      </>
    );
  }

  if (entry.entityType === 'class') {
    return (
      <>
        <DetailReferenceSection title="Класові особливості" cards={referenceCards(entry.class_features, 'Особливість')} />
        <div className="detail-v2-lower-grid">
          <ProficiencyGroups entry={entry} />
          <div className="detail-v2-column-stack">
            <DetailReferenceSection title="Навички на вибір" cards={referenceCards(entry.skill_choices, 'Вибір')} />
            <DetailReferenceSection title="Початкове спорядження" cards={referenceCards(entry.starting_equipment, 'Спорядження')} />
            <DetailReferenceSection title="Підкласи" cards={referenceCards(entry.subclasses, 'Підклас')} />
            {entry.has_spellcasting ? <DetailReferenceSection title="Заклинання" cards={referenceCards(entry.spellcasting, 'Заклинання')} /> : null}
          </div>
        </div>
        <StructuredContentBlock title="Таблиця прогресії" value={entry.class_progression} />
      </>
    );
  }

  const requirements = itemRequirementRows(entry);

  return (
    <>
      <DetailReferenceSection title="Властивості предмета" cards={referenceCards(entry.properties, 'Властивість')} />
      <div className="detail-v2-lower-grid">
        <DetailGroupPanel title="Вимоги та обмеження" groups={infoRowsToGroups(requirements)} />
        <DetailGroupPanel
          title="Вміст / кількість"
          groups={[
            {
              title: 'Параметри',
              values: [
                entry.quantity ? `Кількість: ${entry.quantity}` : null,
                entry.weight ? `Вага: ${entry.weight}` : null,
                entry.price ? `Ціна: ${entry.price}` : null,
              ].filter((item): item is string => Boolean(item)),
            },
          ]}
        />
      </div>
      <SummarySection entry={entry} />
    </>
  );
}

function hasUsefulValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false;
  if (Array.isArray(value)) return value.some(hasUsefulValue);
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasUsefulValue);
  return true;
}

function splitRaceDescription(markdown: string | null, title: string) {
  if (!markdown?.trim()) return { description: null, creation: null };
  const marker = /^#{1,6}\s+Під час створення персонажа\s*$/im;
  const match = marker.exec(markdown);
  const rawDescription = match ? markdown.slice(0, match.index).trim() : markdown.trim();
  const creation = match ? markdown.slice(match.index + match[0].length).trim() || null : null;
  const lines = rawDescription.split(/\r?\n/);
  const firstHeading = lines[0]?.replace(/^#{1,6}\s+/, '').trim().toLowerCase();
  if (firstHeading === title.trim().toLowerCase()) lines.shift();
  return { description: lines.join('\n').trim() || null, creation };
}

export function ContentDetailPage({ entity }: ContentDetailPageProps) {
  const { slug } = useParams();
  const { data: entry, isLoading, errorMessage } = useCatalogEntry(entity, slug);
  const sectionSlug = sectionSlugForEntity(entity);

  if (isLoading) {
    return <div className="placeholder-panel">Завантажуємо матеріал...</div>;
  }

  if (errorMessage) {
    return <div className="placeholder-panel">Не вдалося завантажити матеріал: {errorMessage}</div>;
  }

  if (!entry) {
    return (
      <div className="page-stack">
        <EmptyState title="Матеріал не знайдено" description="Він не існує або ще не опублікований." />
        <Link to={`/${sectionSlug}`} className="accent-link detail-back-link">
          Повернутися до розділу
        </Link>
      </div>
    );
  }

  const imageUrl = entry.image_url ?? getDefaultImageUrl(sectionSlug);
  const infoBlocks = mainInfoBlocks(entry);
  const raceDescription = entry.entityType === 'race'
    ? splitRaceDescription(entry.full_description_markdown, entry.title_ua)
    : null;
  const raceAbilityRules = entry.entityType === 'race' ? abilityScoreCells(entry.ability_bonuses) : null;
  const hasRaceAbilityRules = Boolean(raceAbilityRules?.note || raceAbilityRules?.cells.some((cell) => cell.isActive));
  const raceNavigation = entry.entityType === 'race' ? [
    { href: '#race-main', label: 'Основні характеристики', number: 1 },
    ...(hasRaceAbilityRules ? [{ href: '#race-abilities', label: 'Збільшення характеристик', number: 2 }] : []),
    ...(referenceCards(entry.race_traits, 'Риса').length > 0 ? [{ href: '#race-traits', label: 'Риси раси', number: 3 }] : []),
    ...(groupedProficiencies(entry).length > 0 ? [{ href: '#race-proficiencies', label: 'Володіння та навички', number: 4 }] : []),
    ...(resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills).length > 0
      ? [{ href: '#race-resistances', label: 'Стійкості та переваги', number: 5 }]
      : []),
    ...(hasUsefulValue(entry.subraces) ? [{ href: '#race-subraces', label: 'Підраси / варіанти', number: 6 }] : []),
    ...(raceDescription?.description ? [{ href: '#race-description', label: 'Опис', number: 7 }] : []),
    ...(raceDescription?.creation ? [{ href: '#race-creation', label: 'Під час створення персонажа', number: 8 }] : []),
    ...(entry.source?.title ? [{ href: '#race-source', label: 'Джерело', number: 9 }] : []),
  ] : [];

  return (
    <DetailLayout
      variant={entry.entityType === 'race' ? 'race' : undefined}
      sidebar={
        <DetailSidebar
          imageUrl={imageUrl}
          imageAlt={entry.title_ua}
          label={entityLabels[entity]}
          title={entry.title_ua}
          originalTitle={entry.title_original}
          description={entry.entityType === 'race' ? null : entry.short_description}
          tags={entry.entityType === 'race' ? [] : entry.tags}
          quickTitle={quickTitles[entity]}
          quickItems={entry.entityType === 'race' ? [] : quickSummaryItems(entry)}
          badges={entry.entityType === 'race' ? [rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)] : []}
          navigation={raceNavigation}
        />
      }
    >
      <section id={entry.entityType === 'race' ? 'race-main' : undefined} className={`detail-v2-panel${entry.entityType === 'race' ? ' race-detail-section' : ''}`}>
        {entry.entityType === 'race' ? (
          <h2 className="race-section-title"><span>1.</span> Основні характеристики</h2>
        ) : <h2>{mainSectionTitle(entry)}</h2>}
        <MechanicInfoGrid items={infoBlocks} />
      </section>

      {entry.entityType === 'race' ? <AbilityScoreGrid id="race-abilities" sectionNumber={2} entry={entry} /> : null}

      {entry.entityType === 'class' ? <SummarySection entry={entry} /> : null}

      <RichReferenceBlocks entry={entry} />

      {(entry.entityType === 'race' ? raceDescription?.description : entry.full_description_markdown) ? (
        <section id={entry.entityType === 'race' ? 'race-description' : undefined} className={`detail-v2-description-panel${entry.entityType === 'race' ? ' race-detail-section' : ''}`}>
          {entry.entityType === 'race' ? <h2 className="race-section-title"><span>7.</span> Опис</h2> : <h2>Опис</h2>}
          <div className="markdown-content">
            <ReactMarkdown>{entry.entityType === 'race' ? raceDescription?.description : entry.full_description_markdown}</ReactMarkdown>
          </div>
        </section>
      ) : null}

      {entry.entityType === 'race' && raceDescription?.creation ? (
        <section id="race-creation" className="detail-v2-description-panel detail-v2-creation-panel race-detail-section">
          <h2 className="race-section-title"><span>8.</span> Під час створення персонажа</h2>
          <div className="markdown-content"><ReactMarkdown>{raceDescription.creation}</ReactMarkdown></div>
        </section>
      ) : null}

      {entry.source?.title ? (
        entry.entityType === 'race' ? (
          <section id="race-source" className="detail-v2-source-note race-detail-section race-source-panel">
            <h2 className="race-section-title"><span>9.</span> Джерело</h2>
            <p>{entry.source.title}. На основі відкритих правил SRD, якщо зазначено в джерелі. Текст адаптовано українською для довідника.</p>
          </section>
        ) : (
          <section className="detail-v2-source-note">
            <p>Джерело: {entry.source.title}. На основі відкритих правил SRD, якщо зазначено в джерелі. Текст адаптовано українською для довідника.</p>
          </section>
        )
      ) : null}
    </DetailLayout>
  );
}
