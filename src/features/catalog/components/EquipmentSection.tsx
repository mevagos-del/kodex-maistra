import { CODEX_ICONS } from '../utils/codexIcons';

type EquipmentSectionProps = { value: unknown; id: string; number: number };
type EquipmentGroup = { title: string; items: string[] };

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
    weapon_choice: 'Вибір зброї', ranged_weapon_choice: 'Вибір дальньої зброї',
    armor_choice: 'Вибір обладунку', tool_choice: 'Вибір інструментів',
    pack_choice: 'Вибір набору', pack: 'Набір', equipment: 'Спорядження',
  };
  if (labels[key]) return labels[key];
  return /[а-яіїєґ]/i.test(key) ? key.replace(/_/g, ' ') : 'Група спорядження';
}

function parseGroups(value: unknown): EquipmentGroup[] {
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
      return item ? [{ title: 'Спорядження', items: [item] }] : [];
    }

    const choiceCount = text(entry.choose ?? entry.count);
    const optionsValue = entry.from ?? entry.options ?? entry.choices;
    const options = Array.isArray(optionsValue) ? optionsValue.map(text).filter((item): item is string => Boolean(item)) : [];
    if (options.length > 0) {
      return [{ title: text(entry.title ?? entry.label) ?? `Вибір ${index + 1}`, items: options.map((option) => choiceCount ? `Обери ${choiceCount}: ${option}` : option) }];
    }

    const item = text(entry.value ?? entry);
    return item ? [{ title: text(entry.group ?? entry.category) ?? 'Спорядження', items: [item] }] : [];
  }).reduce<EquipmentGroup[]>((groups, group) => {
    const existing = groups.find((candidate) => candidate.title === group.title);
    if (existing) existing.items.push(...group.items);
    else groups.push({ ...group });
    return groups;
  }, []);
}

export function EquipmentSection({ value, id, number }: EquipmentSectionProps) {
  const groups = parseGroups(value);
  return (
    <section id={id} className="detail-v2-panel codex-detail-section">
      <h2 className="codex-detail-title"><span>{number}.</span> Спорядження</h2>
      {groups.length > 0 ? <div className="codex-equipment-list">{groups.map((group) => (
        <article className="codex-equipment-group" key={group.title}>
          <img className="codex-icon codex-icon--registry" src={CODEX_ICONS.adventuringGear} alt="" />
          <div><h3>{group.title}</h3><ul>{group.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></div>
        </article>
      ))}</div> : <p className="codex-empty-note">Початкове спорядження не вказано.</p>}
    </section>
  );
}
