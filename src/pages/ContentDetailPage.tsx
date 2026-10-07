import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { referenceCards } from '@/features/catalog/api/detailReference';
import { DetailLayout } from '@/features/catalog/components/DetailLayout';
import { DetailSidebar } from '@/features/catalog/components/DetailSidebar';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { ClassStartSection } from '@/features/catalog/components/ClassStartSection';
import { MechanicInfoGrid } from '@/features/catalog/components/MechanicInfoGrid';
import { ProgressionTable } from '@/features/catalog/components/ProgressionTable';
import { QuickScanSection } from '@/features/catalog/components/QuickScanSection';
import { RaceTraitSection } from '@/features/catalog/components/RaceTraitSection';
import { SubraceSelector } from '@/features/catalog/components/SubraceSelector';
import { SourceFooter } from '@/features/catalog/components/SourceFooter';
import { SubclassSelector } from '@/features/catalog/components/SubclassSelector';
import { sectionSlugForEntity } from '@/features/catalog/api/catalogApi';
import { useCatalogEntry } from '@/features/catalog/hooks/useCatalogData';
import type { CatalogEntry, ClassEntry, ItemEntry } from '@/features/catalog/types';
import { getDefaultImageUrl } from '@/lib/storage';
import {
  classFeatureIconForTitle,
  CODEX_ICONS,
  itemIconForType,
  registryIconForLabel,
} from '@/features/catalog/utils/codexIcons';
import { formatValueSafely, isRecord, isUsefulValue, referenceLevel, sourceRuleText } from '@/features/catalog/utils/detailContent';
import { parseSubclasses } from '@/features/catalog/utils/subclassData';
import { resolveCatalogImageUrl } from '@/features/catalog/utils/catalogImages';
import { capitalizeItemTerm, itemMasteryLabel, itemWeaponPropertyLabel } from '@/features/catalog/utils/itemTerminology';
import type { EntityType } from '@/types/content';

type ContentDetailPageProps = {
  entity: EntityType;
};

const entityLabels: Record<EntityType, string> = {
  race: 'Раса',
  class: 'Клас',
  item: 'Предмет',
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
    blocks.push({ label: 'Заклинання', value: booleanLabel(entry.has_spellcasting) });
  }

  if (entry.entityType === 'item') {
    addInfo(blocks, 'Категорія', entry.category);
    if (entry.item_type === 'зброя') {
      addInfo(blocks, 'Клас', entry.weapon_category ? capitalizeItemTerm(entry.weapon_category) : null);
      addInfo(blocks, 'Бій', entry.weapon_mode ? capitalizeItemTerm(entry.weapon_mode) : null);
    } else if (entry.item_type === 'обладунок' || entry.item_type === 'щит') {
      addInfo(blocks, 'Клас', entry.armor_category ? capitalizeItemTerm(entry.armor_category) : null);
    } else {
      const specificType = entry.subcategory && entry.subcategory.toLocaleLowerCase('uk-UA') !== entry.category?.toLocaleLowerCase('uk-UA')
        ? entry.subcategory
        : entry.item_type;
      addInfo(blocks, 'Тип', specificType ? capitalizeItemTerm(specificType) : null);
    }
    addInfo(blocks, 'Рідкість', entry.rarity);
    addInfo(blocks, 'Вартість', entry.price);
    addInfo(blocks, 'Вага', entry.weight);
    addInfo(blocks, 'Шкода', entry.damage);
    addInfo(blocks, 'Тип шкоди', entry.damage_type);
    addInfo(blocks, 'Клас захисту', entry.armor_class);
    addInfo(blocks, 'Дальність', entry.normal_range && entry.long_range ? `${entry.normal_range}/${entry.long_range} футів` : entry.range);
    if (entry.is_magical) blocks.push({ label: 'Магічний предмет', value: 'Так' });
    if (entry.requires_attunement) blocks.push({ label: 'Налаштування', value: entry.attunement_requirement ?? 'Потрібне' });
    addInfo(blocks, 'Вимоги', entry.required_strength ? `Сила ${entry.required_strength}` : null);
    if (entry.stealth_disadvantage) blocks.push({ label: 'Скритність', value: 'Перешкода' });
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

function safeText(value: unknown): string | null {
  return formatValueSafely(value);
}

function normalizeClassFeatures(entry: ClassEntry) {
  const metadataTitles = new Set([
    'заклинальна характеристика',
    'spellcasting ability',
    'основна характеристика',
    'primary ability',
    'кістка здоров’я',
    'кістка хітів',
    'hit die',
    'володіння обладунками',
    'armor training',
    'володіння зброєю',
    'weapon proficiencies',
    'володіння інструментами',
    'tool proficiencies',
    'рятівні кидки',
    'ряткидки',
    'saving throws',
    'навички',
    'skill proficiencies',
    'стартове спорядження',
    'starting equipment',
  ]);
  const cards = referenceCards(entry.class_features, 'Уміння')
    .filter((card) => !metadataTitles.has(card.title.trim().toLowerCase()));
  return cards.map((card) => {
    const mechanicalEffect = card.rows.find((row) => row.label === 'Механічний ефект')?.value;
    return {
      ...card,
      kind: 'base' as const,
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
    return featureText.split(/[,;]+/).map((title) => title.trim()).filter((title) => title && !/^(особливість підкласу|subclass feature|підкласова особливість)/i.test(title)).map((title) => ({
      title,
      description: 'Точний опис уміння не вказано у доступному джерелі.',
      rows: level ? [{ label: 'Рівень', value: level }] : [],
      kind: 'base' as const,
    }));
  });
}

const masteryRules: Record<string,string> = {
  Cleave:'Після влучання атакою ближнього бою можеш атакувати другу істоту в межах 5 футів від першої та у своїй досяжності. При влучанні друга ціль отримує шкоду зброї без додавання модифікатора характеристики, якщо він не від’ємний. Один раз за хід.',
  Graze:'Якщо атака цією зброєю не влучає, ціль отримує шкоду типу зброї, що дорівнює модифікатору характеристики атаки. Цю шкоду можна збільшити лише збільшенням самого модифікатора.',
  Nick:'Додаткову атаку властивості «Легка» виконуєш як частину дії Атака, а не бонусною дією. Один раз за хід.',
  Push:'Після влучання можеш відштовхнути істоту Великого або меншого розміру на відстань до 10 футів прямо від себе.',
  Sap:'Після влучання ціль має Перешкоду на наступний кидок атаки до початку твого наступного ходу.',
  Slow:'Після влучання зі шкодою можеш зменшити Швидкість цілі на 10 футів до початку твого наступного ходу. Кілька влучань цією властивістю не збільшують зменшення.',
  Topple:'Після влучання можеш змусити ціль виконати ряткидок Статури зі СК 8 + модифікатор характеристики атаки + бонус майстерності. У разі провалу ціль отримує стан «Збита з ніг».',
  Vex:'Після влучання зі шкодою маєш Перевагу на наступний кидок атаки проти цієї цілі до кінця свого наступного ходу.',
};

function weaponPropertyDescription(property: string) {
  const name = itemWeaponPropertyLabel(property).replace(/\s*\([^)]*\)$/, '');
  const rules: Record<string,string> = {
    'Боєприпаси':'Для далекобійної атаки потрібен зазначений боєприпас; кожна атака витрачає один боєприпас.',
    'Фехтувальна':'Для кидків атаки й шкоди можеш використати модифікатор Сили або Спритності; для обох кидків використовується та сама характеристика.',
    'Важка':'Маєш Перешкоду на атаки, якщо для важкої зброї ближнього бою Сила нижча за 13 або для далекобійної Спритність нижча за 13.',
    'Легка':'Після атаки легкою зброєю дією Атака можеш пізніше цього ходу виконати бонусною дією одну атаку іншою легкою зброєю; додатний модифікатор характеристики не додається до шкоди цієї атаки.',
    'Перезаряджання':'Незалежно від кількості доступних атак можеш випустити лише один боєприпас цією зброєю, коли використовуєш дію, бонусну дію або реакцію для пострілу.',
    'Досяжність':'Додає 5 футів до досяжності атак цією зброєю та до визначення досяжності для провокованих атак.',
    'Метальна':'Можеш метнути зброю для далекобійної атаки й дістати її як частину цієї атаки.',
    'Дворучна':'Для атаки цією зброєю потрібні дві руки.',
    'Універсальна':'Можеш атакувати однією або двома руками; при використанні двома руками застосовуй зазначену кістку шкоди.',
  };
  return rules[name] ?? property;
}

function itemPropertyData(entry: ItemEntry) {
  const cards = referenceCards(entry.properties, 'Властивість');
  const weaponCards = entry.weapon_properties.map((property) => ({ title: itemWeaponPropertyLabel(property).replace(/\s*\([^)]*\)$/, ''), description: weaponPropertyDescription(property), rows: [] }));
  if (entry.versatile_damage && !weaponCards.some((card)=>/універсаль/i.test(card.title))) weaponCards.push({title:'Універсальна',description:`При використанні двома руками кістка шкоди становить ${entry.versatile_damage}.`,rows:[]});
  const normalizedCards = cards
    .map((card) => card.description || card.rows.some((row) => row.value !== 'Так')
      ? { ...card, description: card.description ? sourceRuleText(card.description) : undefined, rows: card.rows.map((row) => ({ ...row, value: safeText(row.value) ?? 'Не вказано' })) }
      : { ...card, description: 'Точне значення не вказано у доступному джерелі.', rows: [] });
  return {
    properties: [...weaponCards, ...normalizedCards],
    mastery: entry.mastery ? {
      label: 'Майстерність',
      value: `${itemMasteryLabel(entry.mastery)} (${entry.mastery})`,
      description: `${masteryRules[entry.mastery] ?? ''} Ця властивість діє лише за наявності уміння, що відкриває майстерність цієї зброї.`.trim(),
      ruleSlug: `weapon-mastery-${entry.mastery.toLowerCase()}`,
    } : null,
    variants: referenceCards(entry.variants, 'Варіант'),
  };
}

function itemUsageGroups(entry: ItemEntry) {
  const labels: Record<string,string> = { activation:'Активація',charges:'Заряди',recharge:'Відновлення',duration:'Тривалість',range:'Дальність',saveDc:'СК ряткидка',restrictions:'Обмеження' };
  const rows = [
    entry.quantity ? { title: 'Кількість', values: [entry.quantity] } : null,
    ...Object.entries(entry.usage).map(([key,value])=>({title:labels[key] ?? key,values:[value]})),
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

function ClassDetailContent({ entry, imageUrl }: { entry: ClassEntry; imageUrl: string }) {
  const explicitFeatures = normalizeClassFeatures(entry);
  const existingFeatureKeys = new Set(explicitFeatures.map((feature) => `${feature.title.toLowerCase()}|${referenceLevel(feature)}`));
  const baseFeatures = [...explicitFeatures, ...progressionFeatureCards(entry.class_progression)
    .filter((feature) => !existingFeatureKeys.has(`${feature.title.toLowerCase()}|${referenceLevel(feature)}`))];
  const subclasses = parseSubclasses(entry.subclasses);
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlightedFeatureAnchor, setHighlightedFeatureAnchor] = useState<string | null>(null);
  const highlightTimer = useRef<number | null>(null);
  const requestedSubclass = searchParams.get('subclass');
  const requestedSubclassIndex = subclasses.findIndex((subclass) => subclass.slug === requestedSubclass);
  const selectedSubclassIndex = requestedSubclassIndex >= 0 ? requestedSubclassIndex : 0;
  const selectedSubclass = subclasses[selectedSubclassIndex];
  const selectSubclass = (index: number) => {
    const subclass = subclasses[index];
    if (!subclass) return;
    const next = new URLSearchParams(searchParams);
    next.set('subclass', subclass.slug);
    setSearchParams(next, { replace: true });
  };
  const features = [...baseFeatures, ...(selectedSubclass?.features ?? [])].sort((left, right) => {
    const levelDifference = Number.parseInt(referenceLevel(left), 10) - Number.parseInt(referenceLevel(right), 10);
    if (Number.isFinite(levelDifference) && levelDifference !== 0) return levelDifference;
    if (left.kind !== right.kind) return left.kind === 'base' ? -1 : 1;
    return left.title.localeCompare(right.title, 'uk');
  });

  useEffect(() => () => {
    if (highlightTimer.current !== null) window.clearTimeout(highlightTimer.current);
  }, []);

  const navigateToFeature = (anchor: string) => {
    if (highlightTimer.current !== null) window.clearTimeout(highlightTimer.current);
    window.history.replaceState(null, '', `#${anchor}`);
    setHighlightedFeatureAnchor(anchor);
    window.requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
    highlightTimer.current = window.setTimeout(() => setHighlightedFeatureAnchor(null), 3200);
  };
  const navigation = [
    { href: '#class-passport', label: 'Паспорт класу', number: 1 },
    { href: '#class-start', label: 'Старт класу', number: 2 },
    ...(subclasses.length ? [{ href: '#class-subclasses', label: 'Підклас', number: 3 }] : []),
    { href: '#class-progression', label: 'Таблиця прогресії', number: subclasses.length ? 4 : 3 },
    { href: '#class-features', label: 'Уміння класу', number: subclasses.length ? 5 : 4 },
  ];
  const offset = subclasses.length ? 1 : 0;

  return (
    <DetailLayout variant="class" sidebar={<DetailSidebar variant="class" imageUrl={imageUrl} imageAlt={entry.title_ua} hideImage={!imageUrl} hideImageOnError label="Клас" title={entry.title_ua} originalTitle={entry.title_original} description={entry.short_description} tags={[]} quickTitle="" quickItems={[]} badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]} navigation={navigation} />}>
      <section id="class-passport" className="detail-v2-panel codex-detail-section">
        <h2 className="codex-detail-title"><span>1.</span> Паспорт класу</h2>
        <MechanicInfoGrid items={mainInfoBlocks(entry)} variant="class" />
      </section>
      <ClassStartSection id="class-start" number={2} armor={entry.armor_proficiencies} weapons={entry.weapon_proficiencies} tools={entry.tool_proficiencies} skills={entry.skill_choices} equipment={entry.starting_equipment} />
      {subclasses.length ? <SubclassSelector value={entry.subclasses} id="class-subclasses" number={3} selectedIndex={selectedSubclassIndex} onSelectedIndexChange={selectSubclass} /> : null}
      <ProgressionTable id="class-progression" number={3 + offset} value={entry.class_progression} features={features} onFeatureNavigate={navigateToFeature} />
      <div className="detail-selection-content" key={selectedSubclass?.slug ?? 'base'}>
        <QuickScanSection id="class-features" number={4 + offset} title="Уміння класу" cards={features} iconForCard={classFeatureIconForTitle} emptyMessage="Уміння класу не вказано у доступному джерелі." groupByLevel highlightedAnchor={highlightedFeatureAnchor} />
      </div>
      <SourceFooter id="class-source" title={entry.source?.title} />
    </DetailLayout>
  );
}

function ItemDetailContent({ entry, imageUrl, fallbackImageUrl }: { entry: ItemEntry; imageUrl: string; fallbackImageUrl: string }) {
  const propertyData = itemPropertyData(entry);
  const properties = propertyData.properties;
  const mastery = propertyData.mastery;
  const variants = propertyData.variants;
  const usageGroups = itemUsageGroups(entry);
  const description = descriptionWithoutHeading(entry.full_description_markdown, entry.title_ua, entry.short_description);
  const navigation = [
    { href: '#item-passport', label: 'Паспорт предмета', number: 1 },
    ...(properties.length || mastery ? [{ href: '#item-properties', label: 'Властивості', number: 2 }] : []),
    ...(usageGroups.length ? [{ href: '#item-usage', label: 'Правила використання', number: 3 }] : []),
    ...(variants.length ? [{ href: '#item-variants', label: 'Варіанти / покращення', number: 4 }] : []),
    ...(description ? [{ href: '#item-description', label: 'Опис', number: 5 }] : []),
  ];

  return (
    <DetailLayout variant="item" sidebar={<DetailSidebar variant="item" imageUrl={imageUrl} imageAlt={entry.title_ua} fallbackImageUrl={fallbackImageUrl} hideImage label="Предмет" title={entry.title_ua} originalTitle={entry.title_original} description={null} tags={[]} quickTitle="" quickItems={[]} badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]} navigation={navigation} />}>
      <section id="item-passport" className="detail-v2-panel codex-detail-section">
        <h2 className="codex-detail-title"><span>1.</span> Паспорт предмета</h2>
        <MechanicInfoGrid items={mainInfoBlocks(entry)} variant="item" itemType={entry.item_type} itemCategory={entry.category} />
      </section>
      <QuickScanSection id="item-properties" number={2} title="Властивості" cards={properties} compactEntry={mastery} iconForCard={() => itemIconForType(entry.item_type, entry.category, entry.is_magical ? 'магічний' : null)} emptyMessage="Властивості не вказано у доступному джерелі." />
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
    return <div className="placeholder-panel"><LoadingIndicator label="Завантажуємо матеріал…" /></div>;
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
  const resolvedImageUrl = resolveCatalogImageUrl(
    entry.entityType,
    entry.slug,
    entry.content_type,
    entry.image_url,
  );
  const imageUrl = entry.entityType === 'item'
    ? resolvedImageUrl || defaultImageUrl
    : resolvedImageUrl;
  if (entry.entityType === 'class') {
    return <ClassDetailContent entry={entry} imageUrl={imageUrl} />;
  }

  if (entry.entityType === 'item') {
    return <ItemDetailContent entry={entry} imageUrl={imageUrl} fallbackImageUrl={defaultImageUrl} />;
  }

  const infoBlocks = mainInfoBlocks(entry);
  const raceDescription = splitRaceDescription(entry.full_description_markdown, entry.title_ua);
  const raceTraits = referenceCards(entry.race_traits, 'Риса');
  const hasRaceVariants = isUsefulValue(entry.subraces);
  const traitSectionNumber = hasRaceVariants ? 3 : 2;
  const descriptionSectionNumber = traitSectionNumber + (raceTraits.length > 0 ? 1 : 0);
  const raceNavigation = [
    { href: '#race-main', label: 'Паспорт раси', number: 1 },
    ...(hasRaceVariants ? [{ href: '#race-subraces', label: 'Варіанти / походження', number: 2 }] : []),
    ...(raceTraits.length > 0 ? [{ href: '#race-traits', label: 'Риси раси', number: traitSectionNumber }] : []),
    ...(raceDescription?.description ? [{ href: '#race-description', label: 'Опис', number: descriptionSectionNumber }] : []),
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
          description={entry.short_description}
          tags={[]}
          quickTitle=""
          quickItems={[]}
          badges={[rulesVersionLabel(entry.rules_version), contentTypeLabel(entry.content_type)]}
          navigation={raceNavigation}
          hideImage={!imageUrl}
          hideImageOnError
          variant="race"
        />
      }
    >
      <section id="race-main" className="detail-v2-panel race-detail-section">
        <h2 className="race-section-title"><span>1.</span> Паспорт раси</h2>
        <MechanicInfoGrid items={infoBlocks} variant="race" />
      </section>

      <SubraceSelector id="race-subraces" sectionNumber={2} value={entry.subraces} />
      <RaceTraitSection id="race-traits" sectionNumber={traitSectionNumber} cards={raceTraits} />

      {raceDescription.description ? (
        <section id="race-description" className="detail-v2-description-panel race-detail-section">
          <h2 className="race-section-title"><span>{descriptionSectionNumber}.</span> Опис</h2>
          <div className="markdown-content">
            <ReactMarkdown>{raceDescription.description}</ReactMarkdown>
          </div>
        </section>
      ) : null}

      {entry.source?.title ? <footer id="race-source" className="race-attribution">Джерело: {entry.source.title}</footer> : null}
    </DetailLayout>
  );
}
