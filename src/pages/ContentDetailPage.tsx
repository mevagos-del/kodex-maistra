import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import {
  abilityScoreCells,
  groupedProficiencies,
  referenceCards,
  resistanceRows,
} from '@/features/catalog/api/detailReference';
import { DetailLayout } from '@/features/catalog/components/DetailLayout';
import { DetailSidebar } from '@/features/catalog/components/DetailSidebar';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { EquipmentSection } from '@/features/catalog/components/EquipmentSection';
import { MechanicInfoGrid } from '@/features/catalog/components/MechanicInfoGrid';
import { ProgressionTable } from '@/features/catalog/components/ProgressionTable';
import { QuickScanSection } from '@/features/catalog/components/QuickScanSection';
import { RaceTraitSection } from '@/features/catalog/components/RaceTraitSection';
import { SubraceSelector } from '@/features/catalog/components/SubraceSelector';
import { SubclassSelector } from '@/features/catalog/components/SubclassSelector';
import { SourceFooter } from '@/features/catalog/components/SourceFooter';
import { sectionSlugForEntity } from '@/features/catalog/api/catalogApi';
import { useCatalogEntry } from '@/features/catalog/hooks/useCatalogData';
import type { CatalogEntry, ClassEntry, ItemEntry } from '@/features/catalog/types';
import { getDefaultImageUrl } from '@/lib/storage';
import {
  abilityIconForLabel,
  classFeatureIconForTitle,
  CODEX_ICONS,
  itemIconForType,
  registryIconForLabel,
} from '@/features/catalog/utils/codexIcons';
import { formatValueSafely, isRecord, isUsefulValue, referenceLevel, sourceRuleText } from '@/features/catalog/utils/detailContent';
import type { EntityType } from '@/types/content';

type ContentDetailPageProps = {
  entity: EntityType;
};

const entityLabels: Record<EntityType, string> = {
  race: 'Раса',
  class: 'Клас',
  item: 'Предмет',
};

const localRaceImageOverrides: Record<string, string> = {
  dwarf: '/images/catalog/races/dwarf.webp',
  elf: '/images/catalog/races/elf.webp',
  human: '/images/catalog/races/human.webp',
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

function classSkillSummary(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const count = record.choose ?? record.count ?? record.amount;
  return typeof count === 'number' || typeof count === 'string' ? `Обрати ${count}` : null;
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

  if (entry.entityType === 'race') {
    blocks.push({ label: 'Версія правил', value: rulesVersionLabel(entry.rules_version) });
    blocks.push({ label: 'Тип контенту', value: contentTypeLabel(entry.content_type) });
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
    addInfo(blocks, 'Володіння обладунками', entry.armor_proficiencies.join(', '));
    addInfo(blocks, 'Володіння зброєю', entry.weapon_proficiencies.join(', '));
    addInfo(blocks, 'Володіння інструментами', entry.tool_proficiencies.join(', '));
    addInfo(blocks, 'Навички', classSkillSummary(entry.skill_choices));
    blocks.push({ label: 'Заклинання', value: booleanLabel(entry.has_spellcasting) });
  }

  if (entry.entityType === 'item') {
    addInfo(blocks, 'Тип', entry.item_type);
    addInfo(blocks, 'Категорія', entry.category);
    addInfo(blocks, 'Рідкість', entry.rarity);
    addInfo(blocks, 'Вартість', entry.price);
    addInfo(blocks, 'Вага', entry.weight);
    addInfo(blocks, 'Шкода', entry.damage);
    addInfo(blocks, 'Тип шкоди', entry.damage_type);
    addInfo(blocks, 'Клас захисту', entry.armor_class);
    addInfo(blocks, 'Дальність', entry.range);
    const versatileMatch = entry.full_description_markdown?.match(/універсальн\w*\s+([^\s.,;]+)/i);
    const propertyNames = referenceCards(entry.properties, 'Властивість')
      .map((property) => property.title)
      .filter((title) => title !== 'Властивість');
    if (versatileMatch) propertyNames.unshift(`Універсальна ${versatileMatch[1]}`);
    addInfo(blocks, 'Властивості', Array.from(new Set(propertyNames)).join(', '));
    blocks.push({ label: 'Магічний предмет', value: booleanLabel(entry.is_magical) });
    blocks.push({ label: 'Налаштування', value: booleanLabel(entry.requires_attunement) });
    addInfo(blocks, 'Вимоги', entry.required_strength ? `Сила ${entry.required_strength}` : null);
  }

  return blocks;
}

function DetailGroupPanel({ title, groups, presentation = 'chips', id, sectionNumber, showCodexIcons = false }: {
  title: string;
  groups: Array<{ title: string; values: string[] }>;
  presentation?: 'chips' | 'rows';
  id?: string;
  sectionNumber?: number;
  showCodexIcons?: boolean;
}) {
  const visibleGroups = groups.filter((group) => group.values.length > 0);
  if (visibleGroups.length === 0) return null;

  const sectionClass = sectionNumber ? ' codex-detail-section race-detail-section' : '';

  return (
    <section id={id} className={`detail-v2-group-panel detail-v2-group-panel--${presentation}${sectionClass}`}>
      {sectionNumber ? (
        <h2 className="codex-detail-title race-section-title"><span>{sectionNumber}.</span> {title}</h2>
      ) : <h3>{title}</h3>}
      <div className="detail-v2-group-list">
        {visibleGroups.map((group) => (
          <div key={group.title} className="detail-v2-group">
            <strong className="detail-v2-group-title">
              {showCodexIcons ? <img className="codex-icon codex-icon--registry" src={registryIconForLabel(group.title)} alt="" /> : null}
              <span>{group.title}</span>
            </strong>
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
  const activeCells = cells.filter((cell) => cell.isActive);
  const abilityAbbreviations: Record<string, string> = {
    'Сила': 'СИЛ',
    'Спритність': 'СПР',
    'Статура': 'СТАТ',
    'Інтелект': 'ІНТ',
    'Мудрість': 'МУД',
    'Харизма': 'ХАР',
  };

  return (
    <section id={id} className="detail-v2-panel race-detail-section">
      <h2 className="race-section-title"><span>{sectionNumber}.</span> Збільшення характеристик</h2>
      <p className={activeCells.length > 0 ? 'race-ability-summary race-ability-summary--active' : 'race-ability-summary'}>
        {activeCells.length > 0
          ? <>Ключове підсилення: <strong>{activeCells.map((cell) => `${cell.label} ${cell.value}`).join(' · ')}</strong></>
          : note ?? 'Фіксоване збільшення не задано'}
      </p>
      <div className="detail-v2-score-grid">
        {cells.map((cell) => (
          <div key={cell.label} className={cell.isActive ? 'detail-v2-score-cell detail-v2-score-cell-active' : 'detail-v2-score-cell detail-v2-score-cell-muted'}>
            <span className="race-ability-glyph" aria-hidden="true">
              <img className="codex-icon codex-icon--ability" src={abilityIconForLabel(cell.label)} alt="" />
            </span>
            <span className="race-ability-label" title={cell.label}>{abilityAbbreviations[cell.label] ?? cell.label}</span>
            <strong>{cell.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function RichReferenceBlocks({ entry }: { entry: CatalogEntry }) {
  if (entry.entityType === 'race') {
    const resistanceInfo = resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills);
    const proficiencyGroups = groupedProficiencies(entry).filter((group) => group.title !== 'Мови');

    return (
      <>
        <RaceTraitSection id="race-traits" sectionNumber={3} cards={referenceCards(entry.race_traits, 'Риса')} />
        <div className="detail-v2-lower-grid race-detail-compact-grid">
          <DetailGroupPanel id="race-proficiencies" sectionNumber={4} title="Володіння та навички" groups={proficiencyGroups} presentation="rows" showCodexIcons />
          <DetailGroupPanel id="race-resistances" sectionNumber={5} title="Стійкості та переваги" groups={mechanicalIndexGroups(resistanceInfo)} presentation="rows" showCodexIcons />
        </div>
        <SubraceSelector id="race-subraces" sectionNumber={6} value={entry.subraces} />
      </>
    );
  }

  return null;
}

function safeText(value: unknown): string | null {
  return formatValueSafely(value);
}

function choiceText(value: unknown) {
  if (!isRecord(value)) return safeText(value);
  const count = safeText(value.choose ?? value.count ?? value.amount);
  const options = safeText(value.from ?? value.options ?? value.items);
  if (count && options) return `Обери ${count} з переліку: ${options}.`;
  return options ?? safeText(value);
}

function normalizeClassFeatures(entry: ClassEntry) {
  const cards = referenceCards(entry.class_features, 'Уміння');
  const spellcastingCards = entry.has_spellcasting ? referenceCards(entry.spellcasting, 'Заклинання') : [];
  return [...cards, ...spellcastingCards].map((card) => {
    const mechanicalEffect = card.rows.find((row) => row.label === 'Механічний ефект')?.value;
    return {
      ...card,
      description: sourceRuleText(card.description ?? mechanicalEffect),
      rows: card.rows.filter((row) => row.label !== 'Механічний ефект').map((row) => {
        if (row.label === 'Використання' && /^(бонусна дія|дія|реакція)$/i.test(row.value)) return { ...row, label: 'Дія' };
        return { ...row, value: safeText(row.value) ?? 'Не вказано' };
      }).sort((a, b) => (a.label === 'Рівень' ? -1 : b.label === 'Рівень' ? 1 : 0)),
    };
  });
}

function progressionFeatureCards(value: unknown) {
  const rows = Array.isArray(value)
    ? value
    : isRecord(value)
      ? (['rows', 'levels', 'progression', 'items'].map((key) => value[key]).find(Array.isArray) as unknown[] | undefined) ?? []
      : [];

  return rows.flatMap((row) => {
    if (!isRecord(row)) return [];
    const featureText = safeText(row.features ?? row.feature);
    if (!featureText) return [];
    const level = safeText(row.level);
    return featureText.split(/[,;]+/).map((title) => title.trim()).filter(Boolean).map((title) => ({
      title,
      description: 'Точний опис уміння не вказано у доступному джерелі.',
      rows: level ? [{ label: 'Рівень', value: level }] : [],
    }));
  });
}

function classProficiencyGroups(entry: ClassEntry) {
  return [
    { title: 'Обладунки', values: entry.armor_proficiencies },
    { title: 'Зброя', values: entry.weapon_proficiencies },
    { title: 'Інструменти', values: entry.tool_proficiencies },
    { title: 'Ряткидки', values: entry.saving_throws },
    { title: 'Навички', values: choiceText(entry.skill_choices) ? [choiceText(entry.skill_choices) as string] : [] },
  ].filter((group) => group.values.length > 0);
}

const itemUsageLabels = new Set(['Використання', 'Тип дії', 'Відновлення', 'Тривалість', 'Дальність', 'Обмеження', 'Вимога']);

function itemPropertyData(entry: ItemEntry) {
  const cards = referenceCards(entry.properties, 'Властивість');
  const versatileMatch = entry.full_description_markdown?.match(/універсальн\w*\s+([^\s.,;]+)/i);
  const coreRows = [
    entry.damage ? { label: 'Шкода', value: [entry.damage, entry.damage_type].filter(Boolean).join(' ') } : null,
    entry.range ? { label: 'Дальність', value: entry.range } : null,
    entry.armor_class ? { label: 'Клас захисту', value: entry.armor_class } : null,
    versatileMatch ? { label: 'Властивість', value: `універсальна ${versatileMatch[1]}` } : null,
  ].filter((row): row is { label: string; value: string } => Boolean(row));
  const coreCard = coreRows.length > 0 ? [{ title: entry.title_ua, description: entry.short_description ?? undefined, rows: coreRows }] : [];
  const normalizedCards = cards
    .filter((card) => !(versatileMatch && /універсаль/i.test(card.title)))
    .map((card) => card.description || card.rows.some((row) => row.value !== 'Так')
      ? { ...card, description: card.description ? sourceRuleText(card.description) : undefined, rows: card.rows.map((row) => ({ ...row, value: safeText(row.value) ?? 'Не вказано' })) }
      : { ...card, description: 'Точне значення не вказано у доступному джерелі.', rows: [] });
  const allCards = [...coreCard, ...normalizedCards];
  const variants = allCards.filter((card) => /варіант|покращ|\+\d/i.test(card.title));
  const properties = allCards
    .filter((card) => !variants.includes(card))
    .map((card) => ({ ...card, rows: card.rows.filter((row) => !itemUsageLabels.has(row.label)) }));
  const usageRows = allCards.flatMap((card) => card.rows.filter((row) => itemUsageLabels.has(row.label)));
  return { properties, variants, usageRows };
}

function itemUsageGroups(entry: ItemEntry, propertyRows: Array<{ label: string; value: string }>) {
  const rows = [
    entry.required_strength ? { title: 'Вимоги', values: [`Сила ${entry.required_strength}`] } : null,
    entry.range ? { title: 'Дальність', values: [entry.range] } : null,
    entry.stealth_disadvantage ? { title: 'Скритність', values: ['Невдача'] } : null,
    entry.quantity ? { title: 'Кількість', values: [entry.quantity] } : null,
    ...propertyRows.map((row) => ({ title: row.label === 'Тип дії' ? 'Активація' : row.label, values: [row.value] })),
  ].filter((row): row is { title: string; values: string[] } => Boolean(row));
  return rows.filter((row, index) => rows.findIndex((candidate) => candidate.title === row.title && candidate.values.join('|') === row.values.join('|')) === index);
}

function descriptionWithoutHeading(markdown: string | null, title: string, lead?: string | null) {
  if (!markdown?.trim()) return null;
  const lines = markdown.trim().split(/\r?\n/);
  if (lines[0]?.replace(/^#{1,6}\s+/, '').trim().toLowerCase() === title.trim().toLowerCase()) lines.shift();
  const technicalLine = /^(кістка хітів|основна характеристика|заклинальна характеристика|ряткидки|шкода|клас захисту|перешкода|вміст вказано)\s*:?/i;
  const normalizedLead = lead?.trim().toLowerCase();
  return lines.filter((line) => {
    const normalizedLine = line.trim().toLowerCase();
    if (technicalLine.test(line.trim())) return false;
    if (normalizedLead && normalizedLine && (normalizedLead.includes(normalizedLine) || normalizedLine.includes(normalizedLead))) return false;
    return true;
  }).join('\n').trim() || null;
}

function ClassDetailContent({ entry, imageUrl, fallbackImageUrl }: { entry: ClassEntry; imageUrl: string; fallbackImageUrl: string }) {
  const explicitFeatures = normalizeClassFeatures(entry);
  const existingFeatureKeys = new Set(explicitFeatures.map((feature) => `${feature.title.toLowerCase()}|${referenceLevel(feature)}`));
  const features = [...explicitFeatures, ...progressionFeatureCards(entry.class_progression)
    .filter((feature) => !existingFeatureKeys.has(`${feature.title.toLowerCase()}|${referenceLevel(feature)}`))];
  const hasSubclasses = isUsefulValue(entry.subclasses);
  const navigation = [
    { href: '#class-passport', label: 'Паспорт класу', number: 1 },
    { href: '#class-progression', label: 'Таблиця прогресії', number: 2 },
    { href: '#class-features', label: 'Уміння класу', number: 3 },
    { href: '#class-proficiencies', label: 'Володіння', number: 4 },
    { href: '#class-equipment', label: 'Спорядження', number: 5 },
    ...(hasSubclasses ? [{ href: '#class-subclasses', label: 'Підкласи', number: 6 }] : []),
    ...(entry.source?.title ? [{ href: '#class-source', label: 'Джерело', number: 7 }] : []),
  ];

  return (
    <DetailLayout variant="class" sidebar={<DetailSidebar variant="class" imageUrl={imageUrl} imageAlt={entry.title_ua} fallbackImageUrl={fallbackImageUrl} label="Клас" title={entry.title_ua} originalTitle={entry.title_original} description={null} tags={[]} quickTitle="" quickItems={[]} badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]} navigation={navigation} />}>
      <section id="class-passport" className="detail-v2-panel codex-detail-section">
        <h2 className="codex-detail-title"><span>1.</span> Паспорт класу</h2>
        <MechanicInfoGrid items={mainInfoBlocks(entry)} variant="class" />
      </section>
      <ProgressionTable id="class-progression" number={2} value={entry.class_progression} features={features} />
      <QuickScanSection id="class-features" number={3} title="Уміння класу" cards={features} iconForCard={classFeatureIconForTitle} emptyMessage="Уміння класу не вказано у доступному джерелі." />
      <DetailGroupPanel id="class-proficiencies" sectionNumber={4} title="Володіння" groups={classProficiencyGroups(entry)} presentation="rows" showCodexIcons />
      <EquipmentSection id="class-equipment" number={5} value={entry.starting_equipment} />
      <SubclassSelector id="class-subclasses" number={6} value={entry.subclasses} />
      <SourceFooter id="class-source" title={entry.source?.title} />
    </DetailLayout>
  );
}

function ItemDetailContent({ entry, imageUrl, fallbackImageUrl }: { entry: ItemEntry; imageUrl: string; fallbackImageUrl: string }) {
  const propertyData = itemPropertyData(entry);
  const properties = propertyData.properties;
  const variants = propertyData.variants;
  const usageGroups = itemUsageGroups(entry, propertyData.usageRows);
  const description = descriptionWithoutHeading(entry.full_description_markdown, entry.title_ua, entry.short_description);
  const navigation = [
    { href: '#item-passport', label: 'Паспорт предмета', number: 1 },
    ...(properties.length ? [{ href: '#item-properties', label: 'Властивості', number: 2 }] : []),
    ...(usageGroups.length ? [{ href: '#item-usage', label: 'Правила використання', number: 3 }] : []),
    ...(variants.length ? [{ href: '#item-variants', label: 'Варіанти / покращення', number: 4 }] : []),
    ...(description ? [{ href: '#item-description', label: 'Опис', number: 5 }] : []),
    ...(entry.source?.title ? [{ href: '#item-source', label: 'Джерело', number: 6 }] : []),
  ];

  return (
    <DetailLayout variant="item" sidebar={<DetailSidebar variant="item" imageUrl={imageUrl} imageAlt={entry.title_ua} fallbackImageUrl={fallbackImageUrl} label="Предмет" title={entry.title_ua} originalTitle={entry.title_original} description={null} tags={[]} quickTitle="" quickItems={[]} badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]} navigation={navigation} />}>
      <section id="item-passport" className="detail-v2-panel codex-detail-section">
        <h2 className="codex-detail-title"><span>1.</span> Паспорт предмета</h2>
        <MechanicInfoGrid items={mainInfoBlocks(entry)} variant="item" itemType={entry.item_type} itemCategory={entry.category} />
      </section>
      <QuickScanSection id="item-properties" number={2} title="Основний ефект / Властивості" cards={properties} iconForCard={() => itemIconForType(entry.item_type, entry.category, entry.is_magical ? 'магічний' : null)} emptyMessage="Властивості не вказано у доступному джерелі." />
      <DetailGroupPanel id="item-usage" sectionNumber={3} title="Правила використання" groups={usageGroups} presentation="rows" showCodexIcons />
      <QuickScanSection id="item-variants" number={4} title="Варіанти / покращення" cards={variants} iconForCard={() => CODEX_ICONS.choice} />
      {description ? <section id="item-description" className="detail-v2-description-panel codex-detail-section"><h2 className="codex-detail-title"><span>5.</span> Опис</h2><div className="markdown-content"><ReactMarkdown>{description}</ReactMarkdown></div></section> : null}
      <SourceFooter id="item-source" title={entry.source?.title} />
    </DetailLayout>
  );
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

  const defaultImageUrl = getDefaultImageUrl(sectionSlug);
  const imageUrl = entry.entityType === 'race'
    ? localRaceImageOverrides[entry.slug] || entry.image_url?.trim() || defaultImageUrl
    : entry.image_url?.trim() || defaultImageUrl;
  if (entry.entityType === 'class') {
    return <ClassDetailContent entry={entry} imageUrl={imageUrl} fallbackImageUrl={defaultImageUrl} />;
  }

  if (entry.entityType === 'item') {
    return <ItemDetailContent entry={entry} imageUrl={imageUrl} fallbackImageUrl={defaultImageUrl} />;
  }

  const infoBlocks = mainInfoBlocks(entry);
  const raceDescription = splitRaceDescription(entry.full_description_markdown, entry.title_ua);
  const raceProficiencyGroups = groupedProficiencies(entry).filter((group) => group.title !== 'Мови');
  const raceNavigation = [
    { href: '#race-main', label: 'Основні характеристики', number: 1 },
    { href: '#race-abilities', label: 'Збільшення характеристик', number: 2 },
    ...(referenceCards(entry.race_traits, 'Риса').length > 0 ? [{ href: '#race-traits', label: 'Риси раси', number: 3 }] : []),
    ...(raceProficiencyGroups.length > 0 ? [{ href: '#race-proficiencies', label: 'Володіння та навички', number: 4 }] : []),
    ...(resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills).length > 0
      ? [{ href: '#race-resistances', label: 'Стійкості та переваги', number: 5 }]
      : []),
    ...(isUsefulValue(entry.subraces) ? [{ href: '#race-subraces', label: 'Підраси / варіанти', number: 6 }] : []),
    ...(raceDescription?.description ? [{ href: '#race-description', label: 'Опис', number: 7 }] : []),
    ...(entry.source?.title ? [{ href: '#race-source', label: 'Джерело', number: 8 }] : []),
  ];

  return (
    <DetailLayout
      variant="race"
      sidebar={
        <DetailSidebar
          imageUrl={imageUrl}
          imageAlt={entry.title_ua}
          label={entityLabels[entity]}
          title={entry.title_ua}
          originalTitle={entry.title_original}
          description={null}
          tags={[]}
          quickTitle=""
          quickItems={[]}
          badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]}
          navigation={raceNavigation}
          fallbackImageUrl={defaultImageUrl}
          variant="race"
        />
      }
    >
      <section id="race-main" className="detail-v2-panel race-detail-section">
        <h2 className="race-section-title"><span>1.</span> Основні характеристики</h2>
        <MechanicInfoGrid items={infoBlocks} variant="race" />
      </section>

      <AbilityScoreGrid id="race-abilities" sectionNumber={2} entry={entry} />

      <RichReferenceBlocks entry={entry} />

      {raceDescription.description ? (
        <section id="race-description" className="detail-v2-description-panel race-detail-section">
          <h2 className="race-section-title"><span>7.</span> Опис</h2>
          <div className="markdown-content">
            <ReactMarkdown>{raceDescription.description}</ReactMarkdown>
          </div>
        </section>
      ) : null}

      {entry.source?.title ? <footer id="race-source" className="race-attribution">Джерело: {entry.source.title}</footer> : null}
    </DetailLayout>
  );
}
