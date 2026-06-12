import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '@/features/catalog/components/EmptyState';
import { TagList } from '@/features/catalog/components/TagList';
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
  }

  if (entry.entityType === 'class') {
    addInfo(blocks, 'Кістка здоров’я', entry.hit_die);
    addInfo(blocks, 'Основна здібність', entry.primary_ability);
    addInfo(blocks, 'Рятівні кидки', entry.saving_throws.join(', '));
    blocks.push({ label: 'Заклинання', value: booleanLabel(entry.has_spellcasting) });
  }

  if (entry.entityType === 'item') {
    addInfo(blocks, 'Тип предмета', entry.item_type);
    addInfo(blocks, 'Категорія', entry.category);
    addInfo(blocks, 'Рідкість', entry.rarity);
    blocks.push({ label: 'Магічний', value: booleanLabel(entry.is_magical) });
    blocks.push({ label: 'Потребує налаштування', value: booleanLabel(entry.requires_attunement) });
  }

  return blocks;
}

function specialFields(entry: CatalogEntry) {
  const rows: Array<{ label: string; value: string }> = [];

  if (entry.entityType === 'race') {
    addInfo(rows, 'Тривалість життя', entry.lifespan);
    addInfo(rows, 'Поведінка або світогляд', entry.alignment_or_behavior);
  }

  if (entry.entityType === 'class') {
    addInfo(rows, 'Володіння бронею', entry.armor_proficiencies.join(', '));
    addInfo(rows, 'Володіння зброєю', entry.weapon_proficiencies.join(', '));
    addInfo(rows, 'Інструменти', entry.tool_proficiencies.join(', '));
  }

  if (entry.entityType === 'item') {
    addInfo(rows, 'Ціна', entry.price);
    addInfo(rows, 'Вага', entry.weight);
    addInfo(rows, 'Пошкодження', entry.damage);
    addInfo(rows, 'Тип пошкодження', entry.damage_type);
    addInfo(rows, 'Дистанція', entry.range);
    addInfo(rows, 'Клас броні', entry.armor_class);
    addInfo(rows, 'Потрібна сила', entry.required_strength);
    addInfo(rows, 'Кількість', entry.quantity);
    rows.push({ label: 'Перешкода скритності', value: booleanLabel(entry.stealth_disadvantage) });
  }

  return rows;
}

function JsonBlock({ title, value }: { title: string; value: unknown }) {
  if (value === null || value === undefined) return null;
  const isEmptyArray = Array.isArray(value) && value.length === 0;
  const isEmptyObject = typeof value === 'object' && !Array.isArray(value) && Object.keys(value as object).length === 0;

  if (isEmptyArray || isEmptyObject) return null;

  return (
    <details className="json-block">
      <summary>{title}</summary>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </details>
  );
}

function JsonBlocks({ entry }: { entry: CatalogEntry }) {
  if (entry.entityType === 'race') {
    return (
      <>
        <JsonBlock title="Риси раси" value={entry.race_traits} />
        <JsonBlock title="Бонуси здібностей" value={entry.ability_bonuses} />
        <JsonBlock title="Володіння" value={entry.proficiencies} />
        <JsonBlock title="Додаткові навички" value={entry.additional_skills} />
        <JsonBlock title="Підраси" value={entry.subraces} />
      </>
    );
  }

  if (entry.entityType === 'class') {
    return (
      <>
        <JsonBlock title="Вибір навичок" value={entry.skill_choices} />
        <JsonBlock title="Початкове спорядження" value={entry.starting_equipment} />
        <JsonBlock title="Особливості класу" value={entry.class_features} />
        <JsonBlock title="Прогресія класу" value={entry.class_progression} />
        <JsonBlock title="Підкласи" value={entry.subclasses} />
        <JsonBlock title="Заклинання" value={entry.spellcasting} />
      </>
    );
  }

  return <JsonBlock title="Властивості предмета" value={entry.properties} />;
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
  const fields = specialFields(entry);

  return (
    <article className="detail-page">
      <div className="detail-hero">
        <img src={imageUrl} alt={entry.title_ua} />
        <div className="detail-hero-content">
          <p className="eyebrow">{entityLabels[entity]}</p>
          <h1>{entry.title_ua}</h1>
          {entry.title_original ? <p className="original-title">{entry.title_original}</p> : null}
          {entry.short_description ? <p className="detail-summary">{entry.short_description}</p> : null}
          <TagList tags={entry.tags} />
        </div>
      </div>

      <section className="detail-section">
        <h2>Основні характеристики</h2>
        <div className="info-blocks">
          {infoBlocks.map((block) => (
            <span key={`${block.label}-${block.value}`}>
              <strong>{block.label}</strong>
              {block.value}
            </span>
          ))}
        </div>
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

      {fields.length > 0 ? (
        <section className="detail-section">
          <h2>Додаткові поля</h2>
          <div className="detail-field-grid">
            {fields.map((field) => (
              <div key={`${field.label}-${field.value}`} className="detail-field">
                <strong>{field.label}</strong>
                <span>{field.value}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="detail-section">
        <h2>Структуровані блоки</h2>
        <JsonBlocks entry={entry} />
      </section>

      <section className="detail-section detail-source">
        <p>Джерело: {entry.source?.title ?? 'не вказано'}</p>
      </section>
    </article>
  );
}
