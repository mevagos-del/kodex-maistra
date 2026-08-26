import { supabase } from './supabaseClient';

export type ImageFolder = 'sections' | 'races' | 'classes' | 'items';

const IMAGES_BUCKET = 'images';

const defaultImageByFolder: Record<ImageFolder, string> = {
  sections: '/images/placeholders/section-placeholder.svg',
  races: '/images/placeholders/content-placeholder.svg',
  classes: '/images/placeholders/content-placeholder.svg',
  items: '/images/placeholders/content-placeholder.svg',
};

export function getDefaultImageUrl(folder: ImageFolder) {
  return defaultImageByFolder[folder];
}

export function buildImageStoragePath(folder: ImageFolder, fileName: string) {
  const safeName = fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${folder}/${Date.now()}-${safeName || 'image'}`;
}

export async function uploadImage(folder: ImageFolder, file: File) {
  if (!supabase) {
    return {
      publicUrl: null,
      path: null,
      errorMessage: 'Supabase ще не налаштовано. Заповніть .env файл.',
    };
  }

  const path = buildImageStoragePath(folder, file.name);
  const { error } = await supabase.storage.from(IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    return { publicUrl: null, path: null, errorMessage: error.message };
  }

  const { data } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(path);

  return { publicUrl: data.publicUrl, path, errorMessage: null };
}

export async function removeImage(path: string) {
  if (!supabase) {
    return { errorMessage: 'Supabase ще не налаштовано. Заповніть .env файл.' };
  }

  const { error } = await supabase.storage.from(IMAGES_BUCKET).remove([path]);

  return { errorMessage: error?.message ?? null };
}
