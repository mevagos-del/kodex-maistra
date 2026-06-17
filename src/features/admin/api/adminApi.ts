import { supabase } from '@/lib/supabaseClient';
import type { EntityType } from '@/types/content';
import type { AdminMaterialListItem, AdminSection, AdminSource } from '../types';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase ще не налаштовано. Заповніть .env файл.');
  }

  return supabase;
}

function tableForEntity(entity: EntityType) {
  if (entity === 'race') return 'races';
  if (entity === 'class') return 'classes';
  return 'items';
}

export async function fetchAdminSections() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('sections')
    .select('id,title,slug,description,image_url,sort_order,is_published')
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((section) => ({
    id: section.id,
    title: section.title ?? '',
    slug: section.slug ?? '',
    description: section.description ?? '',
    image_url: section.image_url ?? '',
    sort_order: section.sort_order ?? 0,
    is_published: Boolean(section.is_published),
  })) as AdminSection[];
}

export async function saveAdminSection(section: AdminSection) {
  const client = requireSupabase();
  const payload = {
    title: section.title.trim(),
    slug: section.slug.trim(),
    description: section.description.trim() || null,
    image_url: section.image_url.trim() || null,
    sort_order: Number(section.sort_order) || 0,
    is_published: section.is_published,
  };

  const query = section.id
    ? client.from('sections').update(payload).eq('id', section.id).select().single()
    : client.from('sections').insert(payload).select().single();

  const { error } = await query;
  if (error) throw error;
}

export async function fetchAdminSources() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('sources')
    .select('id,title,source_type')
    .order('title', { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminSource[];
}

export async function fetchAdminMaterials(entity: EntityType) {
  const client = requireSupabase();
  const { data, error } = await client
    .from(tableForEntity(entity))
    .select('id,title_ua,title_original,slug,publication_status,rules_version,content_type,updated_at')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminMaterialListItem[];
}

export async function fetchAdminMaterialById(entity: EntityType, id: string) {
  const client = requireSupabase();
  const { data, error } = await client.from(tableForEntity(entity)).select('*').eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function saveAdminMaterial(entity: EntityType, id: string | undefined, payload: Record<string, unknown>) {
  const client = requireSupabase();
  const table = tableForEntity(entity);
  const query = id
    ? client.from(table).update(payload).eq('id', id).select().single()
    : client.from(table).insert(payload).select().single();

  const { error } = await query;
  if (error) throw error;
}

export async function fetchExistingSlugs(entity: EntityType, slugs: string[]) {
  const client = requireSupabase();
  const uniqueSlugs = Array.from(new Set(slugs.filter(Boolean)));

  if (uniqueSlugs.length === 0) return new Set<string>();

  const { data, error } = await client.from(tableForEntity(entity)).select('slug').in('slug', uniqueSlugs);
  if (error) throw error;

  return new Set((data ?? []).map((row) => row.slug as string));
}

export type ImportRowsResult = {
  importedCount: number;
  skippedCount: number;
  failedRows: Array<{ row: number; message: string }>;
};

export async function importAdminMaterials(
  entity: EntityType,
  rows: Array<{ rowNumber: number; payload: Record<string, unknown> }>,
  existingSlugs: Set<string>,
): Promise<ImportRowsResult> {
  const client = requireSupabase();
  const rowsToInsert = rows.filter((row) => !existingSlugs.has(String(row.payload.slug)));
  const skippedCount = rows.length - rowsToInsert.length;

  if (rowsToInsert.length === 0) {
    return { importedCount: 0, skippedCount, failedRows: [] };
  }

  const { error } = await client.from(tableForEntity(entity)).insert(rowsToInsert.map((row) => row.payload));

  if (!error) {
    return { importedCount: rowsToInsert.length, skippedCount, failedRows: [] };
  }

  const failedRows: Array<{ row: number; message: string }> = [];
  let importedCount = 0;

  for (const row of rowsToInsert) {
    const { error: rowError } = await client.from(tableForEntity(entity)).insert(row.payload);
    if (rowError) {
      failedRows.push({ row: row.rowNumber, message: rowError.message });
    } else {
      importedCount += 1;
    }
  }

  return { importedCount, skippedCount, failedRows };
}
