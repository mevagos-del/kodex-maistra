import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ItemEntry } from '../types';

const categoryOrder = ['Зброя', 'Обладунки', 'Пригодницьке спорядження', 'Інструменти', 'Магічні предмети'];
const masteryLabels: Record<string,string> = { Cleave:'Розсікання', Graze:'Зачіпання', Nick:'Швидкий надріз', Push:'Поштовх', Sap:'Ослаблення', Slow:'Уповільнення', Topple:'Збивання', Vex:'Виснаження' };

function normalize(value: string) {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('uk-UA');
}

function itemMatchesSearch(entry: ItemEntry, search: string) {
  const query = normalize(search);
  if (!query) return true;
  return normalize([
    entry.title_ua, entry.title_original ?? '', entry.slug, entry.category ?? '', entry.subcategory ?? '', entry.item_type ?? '',
    entry.weapon_category ?? '', entry.weapon_mode ?? '', entry.armor_category ?? '', entry.mastery ?? '', ...entry.weapon_properties,
  ].join(' ')).includes(query);
}

function summary(entry: ItemEntry) {
  if (entry.item_type === 'зброя') return [entry.subcategory, entry.damage && `${entry.damage} ${entry.damage_type ?? ''}`.trim(), entry.mastery ? masteryLabels[entry.mastery] ?? entry.mastery : null].filter(Boolean).join(' · ');
  if (entry.item_type === 'обладунок' || entry.item_type === 'щит') return [entry.subcategory, entry.armor_class && `КЗ ${entry.armor_class}`, entry.required_strength && `Сила ${entry.required_strength}`].filter(Boolean).join(' · ');
  if (entry.is_magical) return [entry.item_type, entry.rarity, entry.requires_attunement ? 'Налаштування' : null].filter(Boolean).join(' · ');
  return [entry.subcategory, entry.price, entry.weight].filter(Boolean).join(' · ');
}

type Props = { entries: ItemEntry[]; search: string };

export function ItemsArchiveCatalog({ entries, search }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Зброя: true });
  const [subcategory, setSubcategory] = useState('');
  const [rarity, setRarity] = useState('');
  const [magical, setMagical] = useState('');
  const [attunement, setAttunement] = useState('');
  const [weaponCategory, setWeaponCategory] = useState('');
  const [armorCategory, setArmorCategory] = useState('');
  const filtered = useMemo(() => entries.filter((entry) => itemMatchesSearch(entry, search))
    .filter((entry) => !subcategory || entry.subcategory === subcategory)
    .filter((entry) => !rarity || entry.rarity === rarity)
    .filter((entry) => !magical || String(entry.is_magical) === magical)
    .filter((entry) => !attunement || String(entry.requires_attunement) === attunement)
    .filter((entry) => !weaponCategory || entry.weapon_category === weaponCategory)
    .filter((entry) => !armorCategory || entry.armor_category === armorCategory), [entries, search, subcategory, rarity, magical, attunement, weaponCategory, armorCategory]);
  const options = (field: keyof ItemEntry) => Array.from(new Set(entries.map((entry) => entry[field]).filter((value): value is string => typeof value === 'string' && Boolean(value)))).sort((a,b)=>a.localeCompare(b,'uk'));
  const searching = Boolean(search.trim());

  return <>
    <details className="item-archive-filters">
      <summary>Уточнити каталог</summary>
      <div className="item-archive-filter-grid">
        <label>Підтип<select value={subcategory} onChange={(event)=>setSubcategory(event.target.value)}><option value="">Усі</option>{options('subcategory').map((value)=><option key={value}>{value}</option>)}</select></label>
        <label>Рідкість<select value={rarity} onChange={(event)=>setRarity(event.target.value)}><option value="">Усі</option>{options('rarity').map((value)=><option key={value}>{value}</option>)}</select></label>
        <label>Магічність<select value={magical} onChange={(event)=>setMagical(event.target.value)}><option value="">Усі</option><option value="false">Немагічні</option><option value="true">Магічні</option></select></label>
        <label>Налаштування<select value={attunement} onChange={(event)=>setAttunement(event.target.value)}><option value="">Усі</option><option value="false">Не потрібне</option><option value="true">Потрібне</option></select></label>
        <label>Категорія зброї<select value={weaponCategory} onChange={(event)=>setWeaponCategory(event.target.value)}><option value="">Усі</option>{options('weapon_category').map((value)=><option key={value}>{value}</option>)}</select></label>
        <label>Категорія обладунку<select value={armorCategory} onChange={(event)=>setArmorCategory(event.target.value)}><option value="">Усі</option>{options('armor_category').map((value)=><option key={value}>{value}</option>)}</select></label>
      </div>
    </details>
    <div className="item-archive-categories">
      {categoryOrder.map((category) => {
        const items = filtered.filter((entry)=>entry.category===category).sort((a,b)=>a.title_ua.localeCompare(b.title_ua,'uk'));
        if ((searching || subcategory || rarity || magical || attunement || weaponCategory || armorCategory) && items.length === 0) return null;
        const open = searching || Boolean(expanded[category]);
        const groups = items.reduce((result, entry) => {
          const letter = entry.title_ua[0]?.toLocaleUpperCase('uk') ?? '#';
          const group = result.get(letter) ?? [];
          group.push(entry);
          result.set(letter, group);
          return result;
        }, new Map<string, ItemEntry[]>());
        return <section key={category} className="item-archive-category">
          <button type="button" className="item-archive-category__toggle" aria-expanded={open} onClick={()=>setExpanded((state)=>({...state,[category]:!state[category]}))}>
            <span>{category}</span><span>{items.length}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
          {open ? <div className="item-archive-category__content">
            {items.length ? <>
              <nav className="item-archive-alphabet" aria-label={`Алфавіт категорії ${category}`}>{Array.from(groups.keys()).map((letter)=><a key={letter} href={`#items-${category}-${letter}`}>{letter}</a>)}</nav>
              {Array.from(groups.entries()).map(([letter, group])=><section key={letter} id={`items-${category}-${letter}`} className="item-archive-letter-group"><h2>{letter}</h2><div>{group.map((entry)=><Link className="item-archive-row" key={entry.id} to={`/items/${entry.slug}`}><span><strong>{entry.title_ua}</strong><small>{entry.title_original}</small></span><span>{summary(entry)}</span><span aria-hidden="true">›</span></Link>)}</div></section>)}
            </> : <p className="item-archive-empty">Немає предметів за вибраними умовами.</p>}
          </div> : null}
        </section>;
      })}
    </div>
  </>;
}
