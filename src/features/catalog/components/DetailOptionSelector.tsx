import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

export type DetailSelectorOption = {
  key: string;
  title: string;
  originalTitle?: string;
  edition?: string;
  imageUrl?: string;
  meta?: string;
};

type DetailOptionSelectorProps = {
  id?: string;
  number?: number;
  label: 'Підклас' | 'Підраса';
  options: DetailSelectorOption[];
  selectedKey: string;
  onSelect: (key: string) => void;
};

export function DetailOptionSelector({ id, number, label, options, selectedKey, onSelect }: DetailOptionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const selected = options.find((option) => option.key === selectedKey) ?? options[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => {
        dialog.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
      });
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!selected) return null;

  const close = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown'
      ? 1
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
        ? -1
        : 0;
    if (!direction && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? options.length - 1
        : (index + direction + options.length) % options.length;
    dialogRef.current?.querySelectorAll<HTMLButtonElement>('[data-detail-option]')[nextIndex]?.focus();
  };

  return (
    <section id={id} className="detail-option-selector" aria-labelledby={titleId}>
      <h2 id={titleId} className="detail-option-selector__title">
        {number ? <span>{number}.</span> : null} {label}
      </h2>
      <div className="detail-option-current">
        {selected.imageUrl ? (
          <span className="detail-option-current__art" aria-hidden="true">
            <img src={selected.imageUrl} alt="" />
          </span>
        ) : null}
        <span className="detail-option-current__copy">
          <small>Поточний вибір</small>
          <span className="detail-option-current__title-row">
            <strong>{selected.title}</strong>
            {options.length > 1 ? (
              <button ref={triggerRef} type="button" className="detail-option-current__change" onClick={() => setIsOpen(true)}>
                Змінити <span aria-hidden="true">›</span>
              </button>
            ) : null}
          </span>
          {selected.originalTitle ? <span className="detail-option-current__original">{selected.originalTitle}</span> : null}
          {selected.edition || selected.meta ? (
            <span className="detail-option-current__metadata">
              {selected.edition ? <small>{selected.edition}</small> : null}
              {selected.meta ? <small>{selected.meta}</small> : null}
            </span>
          ) : null}
        </span>
      </div>

      <dialog
        ref={dialogRef}
        className="detail-option-dialog"
        aria-labelledby={`${titleId}-dialog`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="detail-option-dialog__panel">
          <header className="detail-option-dialog__header">
            <div>
              <small>Довідник</small>
              <h2 id={`${titleId}-dialog`}>Оберіть {label.toLowerCase()}</h2>
            </div>
            <button type="button" className="detail-option-dialog__close" aria-label="Закрити вибір" onClick={close}>×</button>
          </header>
          <div className="detail-option-grid" role="listbox" aria-label={`Доступні варіанти: ${label.toLowerCase()}`}>
            {options.map((option, index) => {
              const isSelected = option.key === selected.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-detail-option
                  className={isSelected ? 'detail-option-card detail-option-card--selected' : 'detail-option-card'}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  onClick={() => {
                    onSelect(option.key);
                    close();
                  }}
                >
                  {option.imageUrl ? <span className="detail-option-card__art" aria-hidden="true"><img src={option.imageUrl} alt="" /></span> : null}
                  <span className="detail-option-card__copy">
                    <strong>{option.title}</strong>
                    {option.originalTitle ? <small>{option.originalTitle}</small> : null}
                    {option.edition ? <small>{option.edition}</small> : null}
                  </span>
                  {isSelected ? <span className="detail-option-card__check" aria-hidden="true">✓</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      </dialog>
    </section>
  );
}
