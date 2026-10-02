import { useMemo } from 'react';
import { CODEX_ICONS } from '../utils/codexIcons';
import { parseSubclasses } from '../utils/subclassData';
import { DetailOptionSelector, type DetailSelectorOption } from './DetailOptionSelector';

type SubclassSelectorProps = {
  value: unknown;
  id: string;
  number: number;
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
};

export function SubclassSelector({ value, id, number, selectedIndex, onSelectedIndexChange }: SubclassSelectorProps) {
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
        {selected.level ? <p className="subclass-choice-level">Підклас обирається на {selected.level} рівні.</p> : null}
        {selected.description ? <p>{selected.description}</p> : null}
        <p className="subclass-integrated-note">Уміння вибраного підкласу включено до розділу «Уміння класу».</p>
      </div>
    </div>
  );
}
