import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CODEX_ICONS } from '../utils/codexIcons';
import { classSpellFilterHref } from '../utils/classSpellcasting';
import { parseSubclasses } from '../utils/subclassData';
import { DetailOptionSelector, type DetailSelectorOption } from './DetailOptionSelector';

type SubclassSelectorProps = {
  value: unknown;
  id: string;
  number: number;
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
  spellShortcut?: {
    classSlug: string;
    className: string;
  };
};

export function SubclassSelector({ value, id, number, selectedIndex, onSelectedIndexChange, spellShortcut }: SubclassSelectorProps) {
  const subclasses = useMemo(() => parseSubclasses(value), [value]);
  if (subclasses.length === 0) return null;

  const safeIndex = Math.min(selectedIndex, subclasses.length - 1);
  const selected = subclasses[safeIndex];
  const options: DetailSelectorOption[] = subclasses.map((subclass) => ({
    key: subclass.slug,
    title: subclass.name,
    originalTitle: subclass.originalName,
    edition: 'D&D 2024',
    imageUrl: CODEX_ICONS.classes,
    meta: subclass.level ? `Рівень ${subclass.level}` : undefined,
  }));

  return (
    <div className="detail-option-section">
      <div className={spellShortcut ? 'class-subclass-layout class-subclass-layout--with-spells' : 'class-subclass-layout'}>
        <div className="class-subclass-layout__selection">
          <DetailOptionSelector
            id={id}
            number={number}
            label="Підклас"
            options={options}
            selectedKey={selected.slug}
            onSelect={(key) => {
              const index = subclasses.findIndex((subclass) => subclass.slug === key);
              if (index >= 0) onSelectedIndexChange(index);
            }}
          />
          <div className="detail-selection-content" key={selected.slug}>
            {selected.description ? <p>{selected.description}</p> : null}
          </div>
        </div>
        {spellShortcut ? (
          <aside className="class-spell-shortcut" aria-labelledby={`${id}-spells-title`}>
            <small>Довідник</small>
            <h3 id={`${id}-spells-title`}>Закляття класу</h3>
            <p>Переглянути закляття, доступні цьому класу.</p>
            <strong>{spellShortcut.className}</strong>
            <Link to={classSpellFilterHref(spellShortcut.classSlug)}>
              Відкрити довідник заклять <span aria-hidden="true">›</span>
            </Link>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
