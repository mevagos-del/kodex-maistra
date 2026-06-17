import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import {
  abilityBonusCards,
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
import { StructuredContentBlock } from '@/features/catalog/components/StructuredContentBlock';
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

function addInfo(blocks: Array<{ label: string; value: string }>, label: string, value?: string | null) {
  if (value) blocks.push({ label, value });
}

function mainInfoBlocks(entry: CatalogEntry) {
  const blocks: Array<{ label: string; value: string }> = [];

  blocks.push({ label: 'Версія правил', value: entry.rules_version === '2024' ? 'D&D 2024' : 'homebrew' });
  blocks.push({ label: 'Тип контенту', value: entry.content_type });

  if (entry.entityType === 'race') {
    addInfo(blocks, 'Тип істоти', entry.creature_type);
    addInfo(blocks, 'Розмір', entry.size);
    addInfo(blocks, 'Швидкість', entry.speed);
    addInfo(blocks, 'Мови', entry.languages.join(', '));
    addInfo(blocks, 'Тривалість життя', entry.lifespan);
    addInfo(blocks, 'Поведінка або світогляд', entry.alignment_or_behavior);
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
    blocks.push({ label: 'Магічний', value: booleanLabel(entry.is_magical) });
    blocks.push({ label: 'Потребує налаштування', value: booleanLabel(entry.requires_attunement) });
    addInfo(blocks, 'Шкода', entry.damage);
    addInfo(blocks, 'Тип шкоди', entry.damage_type);
    addInfo(blocks, 'Дальність', entry.range);
    addInfo(blocks, 'КД', entry.armor_class);
    addInfo(blocks, 'Необхідна сила', entry.required_strength);
    blocks.push({ label: 'Перешкода для скритності', value: booleanLabel(entry.stealth_disadvantage) });
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
    <section className="detail-section gameplay-summary-section">
      <h2>{summary.title}</h2>
      <ul className="reference-summary-list">
        {summary.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProficiencyGroups({ entry }: { entry: Extract<CatalogEntry, { entityType: 'race' | 'class' }> }) {
  const groups = groupedProficiencies(entry);
  if (groups.length === 0) return null;

  return (
    <section className="rulebook-section reference-section">
      <h3>Володіння та навички</h3>
      <div className="proficiency-group-grid">
        {groups.map((group) => (
          <div key={group.title} className="proficiency-group">
            <strong>{group.title}</strong>
            <div className="structured-badges">
              {group.values.map((value) => (
                <span key={`${group.title}-${value}`}>{value}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RichReferenceBlocks({ entry }: { entry: CatalogEntry }) {
  if (entry.entityType === 'race') {
    const resistanceInfo = resistanceRows(entry.race_traits, entry.proficiencies, entry.additional_skills);

    return (
      <>
        <DetailReferenceSection title="Бонуси характеристик" cards={abilityBonusCards(entry.ability_bonuses)} />
        <DetailReferenceSection title="Риси раси" cards={referenceCards(entry.race_traits, 'Риса')} />
        <ProficiencyGroups entry={entry} />
        {resistanceInfo.length > 0 ? (
          <section className="rulebook-section reference-section">
            <h3>Стійкості, імунітети та переваги</h3>
            <MechanicInfoGrid items={resistanceInfo} />
          </section>
        ) : null}
        <DetailReferenceSection title="Підраси / варіанти" cards={referenceCards(entry.subraces, 'Варіант')} />
      </>
    );
  }

  if (entry.entityType === 'class') {
    return (
      <>
        <ProficiencyGroups entry={entry} />
        <DetailReferenceSection title="Навички на вибір" cards={referenceCards(entry.skill_choices, 'Вибір')} />
        <DetailReferenceSection title="Початкове спорядження" cards={referenceCards(entry.starting_equipment, 'Спорядження')} />
        <DetailReferenceSection title="Класові особливості" cards={referenceCards(entry.class_features, 'Особливість')} />
        <StructuredContentBlock title="Таблиця прогресії" value={entry.class_progression} />
        <DetailReferenceSection title="Підкласи" cards={referenceCards(entry.subclasses, 'Підклас')} />
        {entry.has_spellcasting ? <DetailReferenceSection title="Заклинальні можливості" cards={referenceCards(entry.spellcasting, 'Заклинання')} /> : null}
      </>
    );
  }

  const requirements = itemRequirementRows(entry);

  return (
    <>
      <DetailReferenceSection title="Властивості предмета" cards={referenceCards(entry.properties, 'Властивість')} />
      {requirements.length > 0 ? (
        <section className="rulebook-section reference-section">
          <h3>Вимоги та обмеження</h3>
          <MechanicInfoGrid items={requirements} />
        </section>
      ) : null}
    </>
  );
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

  return (
    <DetailLayout
      sidebar={
        <DetailSidebar
          imageUrl={imageUrl}
          imageAlt={entry.title_ua}
          label={entityLabels[entity]}
          title={entry.title_ua}
          originalTitle={entry.title_original}
          description={entry.short_description}
          tags={entry.tags}
          quickTitle={quickTitles[entity]}
          quickItems={quickSummaryItems(entry)}
        />
      }
    >
      <section className="detail-section">
        <h2>{mainSectionTitle(entry)}</h2>
        <div className="info-blocks">
          {infoBlocks.map((block) => (
            <span key={`${block.label}-${block.value}`}>
              <strong>{block.label}</strong>
              {block.value}
            </span>
          ))}
        </div>
      </section>

      <SummarySection entry={entry} />

      <section className="detail-section detail-structured-section">
        <h2>Довідкові блоки</h2>
        <RichReferenceBlocks entry={entry} />
      </section>

      <section className="detail-section">
        <h2>Опис</h2>
        {entry.full_description_markdown ? (
          <div className="markdown-content">
            <ReactMarkdown>{entry.full_description_markdown}</ReactMarkdown>
          </div>
        ) : (
          <p className="muted-text">Повний опис ще не додано.</p>
        )}
      </section>

      <section className="detail-section detail-source">
        <p>Джерело: {entry.source?.title ?? 'не вказано'}</p>
      </section>
    </DetailLayout>
  );
}
