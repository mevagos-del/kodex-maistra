import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchAdminSections, saveAdminSection } from '../api/adminApi';
import type { AdminSection } from '../types';
import { uploadImage } from '@/lib/storage';
import { AdminStatusMessage } from './AdminStatusMessage';

const emptySection: AdminSection = {
  title: '',
  slug: '',
  description: '',
  image_url: '',
  sort_order: 0,
  is_published: true,
};

function simpleSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function SectionsAdminTab() {
  const [sections, setSections] = useState<AdminSection[]>([]);
  const [form, setForm] = useState<AdminSection>(emptySection);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string | null }>({
    type: 'info',
    message: null,
  });

  async function loadSections() {
    setIsLoading(true);
    try {
      setSections(await fetchAdminSections());
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не вдалося завантажити розділи.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadSections();
  }, []);

  function updateField<K extends keyof AdminSection>(key: K, value: AdminSection[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug ? current.slug : simpleSlug(value),
    }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadImage('sections', file);

    if (result.errorMessage || !result.publicUrl) {
      setStatus({ type: 'error', message: result.errorMessage ?? 'Не вдалося завантажити зображення.' });
      return;
    }

    updateField('image_url', result.publicUrl);
    setStatus({ type: 'success', message: 'Зображення розділу завантажено.' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: 'info', message: null });

    if (!form.title.trim() || !form.slug.trim()) {
      setStatus({ type: 'error', message: 'Поля title і slug є обов’язковими.' });
      return;
    }

    setIsSaving(true);

    try {
      await saveAdminSection(form);
      await loadSections();
      setStatus({ type: 'success', message: 'Розділ збережено.' });
      setForm(emptySection);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Не вдалося зберегти розділ.' });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="admin-tab-grid">
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Розділи</h2>
          <button type="button" className="secondary-button" onClick={() => setForm(emptySection)}>
            Новий розділ
          </button>
        </div>

        {isLoading ? (
          <div className="placeholder-panel">Завантажуємо розділи...</div>
        ) : (
          <div className="admin-list">
            {sections.map((section) => (
              <button key={section.id ?? section.slug} type="button" onClick={() => setForm(section)}>
                <strong>{section.title}</strong>
                <span>{section.slug}</span>
                <span>{section.is_published ? 'Опубліковано' : 'Приховано'}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="admin-panel">
        <h2>{form.id ? 'Редагувати розділ' : 'Створити розділ'}</h2>
        <AdminStatusMessage type={status.type} message={status.message} />

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Назва
            <input value={form.title} onChange={(event) => handleTitleChange(event.target.value)} required />
          </label>
          <label>
            Slug
            <input value={form.slug} onChange={(event) => updateField('slug', event.target.value)} required />
            <small>Slug використовується в URL. Наприклад: races, classes, items.</small>
          </label>
          <label>
            Опис
            <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} rows={4} />
          </label>
          <label>
            Зображення
            <input value={form.image_url} onChange={(event) => updateField('image_url', event.target.value)} />
          </label>
          <label>
            Завантажити зображення
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <label>
            Порядок
            <input
              type="number"
              value={form.sort_order}
              onChange={(event) => updateField('sort_order', Number(event.target.value))}
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(event) => updateField('is_published', event.target.checked)}
            />
            Опубліковано
          </label>
          <button type="submit" className="accent-button" disabled={isSaving}>
            {isSaving ? 'Зберігаємо...' : 'Зберегти розділ'}
          </button>
        </form>
      </section>
    </div>
  );
}
