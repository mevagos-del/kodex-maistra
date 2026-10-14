import { CODEX_ICONS } from '../utils/codexIcons';
import { Link } from 'react-router-dom';

type ClassStartSectionProps = {
  id: string;
  number: number;
  armor: string[];
  weapons: string[];
  tools: string[];
  skills: unknown;
  equipment: unknown;
};

type EquipmentLink = { slug: string; match: string };
type EquipmentGroup = { title: string; items: string[]; itemLinks: EquipmentLink[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value ? 'Так' : 'Ні';
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(', ') || null;
  if (isRecord(value)) {
    const name = text(value.name ?? value.title ?? value.label ?? value.item);
    const quantity = text(value.quantity ?? value.count ?? value.amount);
    return name ? `${quantity ? `${quantity} × ` : ''}${name}` : null;
  }
  const result = String(value).trim();
  return result && result !== '[object Object]' ? result : null;
}

function groupTitle(key: string) {
  const labels: Record<string, string> = {
    weapon_choice: 'Вибір зброї',
    ranged_weapon_choice: 'Вибір дальньої зброї',
    armor_choice: 'Вибір обладунку',
    tool_choice: 'Вибір інструментів',
    pack_choice: 'Вибір набору',
    pack: 'Набір',
    equipment: 'Спорядження',
  };
  if (labels[key]) return labels[key];
  return /[а-яіїєґ]/i.test(key) ? key.replace(/_/g, ' ') : 'Група спорядження';
}

function parseEquipmentLinks(value: unknown): EquipmentLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): EquipmentLink[] => {
    if (!isRecord(entry)) return [];
    const slug = text(entry.slug);
    const match = text(entry.match);
    return slug && match ? [{ slug, match }] : [];
  });
}

function parseEquipmentGroups(value: unknown): EquipmentGroup[] {
  const values = Array.isArray(value)
    ? value
    : isRecord(value) && (Array.isArray(value.from) || Array.isArray(value.options) || Array.isArray(value.choices))
      ? [value]
      : isRecord(value) && Array.isArray(value.items)
        ? value.items
        : isRecord(value)
          ? Object.entries(value).map(([key, child]) => isRecord(child)
            ? { title: groupTitle(key), ...child }
            : { title: groupTitle(key), value: child })
          : [];

  return values.flatMap((entry, index): EquipmentGroup[] => {
    if (!isRecord(entry)) {
      const item = text(entry);
      return item ? [{ title: 'Спорядження', items: [item], itemLinks: [] }] : [];
    }

    const choiceCount = text(entry.choose ?? entry.count);
    const optionsValue = entry.from ?? entry.options ?? entry.choices;
    const options = Array.isArray(optionsValue) ? optionsValue.map(text).filter((item): item is string => Boolean(item)) : [];
    if (options.length > 0) {
      return [{
        title: text(entry.title ?? entry.label) ?? `Варіант ${index + 1}`,
        items: options.map((option) => choiceCount ? `Обери ${choiceCount}: ${option}` : option),
        itemLinks: parseEquipmentLinks(entry.item_links ?? entry.itemLinks),
      }];
    }

    const item = text(entry.value ?? entry);
    return item ? [{
      title: text(entry.group ?? entry.category) ?? 'Спорядження',
      items: [item],
      itemLinks: parseEquipmentLinks(entry.item_links ?? entry.itemLinks),
    }] : [];
  }).reduce<EquipmentGroup[]>((groups, group) => {
    const existing = groups.find((candidate) => candidate.title === group.title);
    if (existing) {
      existing.items.push(...group.items);
      existing.itemLinks.push(...group.itemLinks);
    }
    else groups.push({ ...group });
    return groups;
  }, []);
}

function LinkedEquipmentText({ value, links }: { value: string; links: EquipmentLink[] }) {
  const matches = links
    .map((link) => {
      const start = value.toLocaleLowerCase('uk-UA').indexOf(link.match.toLocaleLowerCase('uk-UA'));
      return start >= 0 ? { ...link, start, end: start + link.match.length } : null;
    })
    .filter((entry): entry is EquipmentLink & { start: number; end: number } => Boolean(entry))
    .sort((left, right) => left.start - right.start || right.end - left.end)
    .filter((entry, index, entries) => index === 0 || entry.start >= entries[index - 1].end);

  if (matches.length === 0) return value;

  const content: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start > cursor) content.push(value.slice(cursor, match.start));
    content.push(
      <Link className="class-start-equipment__link" to={`/items/${match.slug}`} key={`${match.slug}-${match.start}`}>
        {value.slice(match.start, match.end)}
      </Link>,
    );
    cursor = match.end;
  }
  if (cursor < value.length) content.push(value.slice(cursor));
  return <>{content}</>;
}

function parseSkillChoice(value: unknown) {
  if (!isRecord(value)) return { count: null, options: [] as string[] };
  const count = text(value.choose ?? value.count ?? value.amount);
  const source = value.from ?? value.options ?? value.items;
  const options = Array.isArray(source)
    ? source.map(text).filter((item): item is string => Boolean(item))
    : [];
  return { count, options };
}

function RegistryRow({ icon, label, values }: { icon: string; label: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div className="class-start-registry__row">
      <img className="codex-icon codex-icon--registry" src={icon} alt="" />
      <div>
        <strong>{label}</strong>
        <p>{values.join(', ')}</p>
      </div>
    </div>
  );
}

export function ClassStartSection({ id, number, armor, weapons, tools, skills, equipment }: ClassStartSectionProps) {
  const skillChoice = parseSkillChoice(skills);
  const equipmentGroups = parseEquipmentGroups(equipment);

  return (
    <section id={id} className="detail-v2-panel codex-detail-section class-start-section">
      <h2 className="codex-detail-title"><span>{number}.</span> Старт класу</h2>
      <div className="class-start-layout">
        <div className="class-start-registry" aria-label="Володіння на старті">
          <RegistryRow icon={CODEX_ICONS.armorProficiency} label="Обладунки" values={armor} />
          <RegistryRow icon={CODEX_ICONS.weaponProficiency} label="Зброя" values={weapons} />
          <RegistryRow icon={CODEX_ICONS.tools} label="Інструменти" values={tools} />
          {(skillChoice.count || skillChoice.options.length > 0) ? (
            <div className="class-start-registry__row class-start-skills">
              <img className="codex-icon codex-icon--registry" src={CODEX_ICONS.skillProficiency} alt="" />
              <div>
                <strong>Навички</strong>
                {skillChoice.count ? <p className="class-start-skills__count">Оберіть {skillChoice.count}</p> : null}
                {skillChoice.options.length > 0 ? (
                  <p className="class-start-skills__options">
                    {skillChoice.options.map((skill) => <span key={skill}>{skill}</span>)}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="class-start-equipment" aria-label="Початкове спорядження">
          <div className="class-start-equipment__heading">
            <img className="codex-icon codex-icon--registry" src={CODEX_ICONS.adventuringGear} alt="" />
            <strong>Початкове спорядження</strong>
          </div>
          {equipmentGroups.length > 0 ? equipmentGroups.map((group) => (
            <div className="class-start-equipment__group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item, index) => (
                <li key={`${item}-${index}`}><LinkedEquipmentText value={item} links={group.itemLinks} /></li>
              ))}</ul>
            </div>
          )) : <p className="codex-empty-note">Початкове спорядження не вказано.</p>}
        </div>
      </div>
    </section>
  );
}
