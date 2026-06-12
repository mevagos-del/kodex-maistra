-- Кодекс Майстра: Storage policies for the manually created `images` bucket.
-- Run after creating the `images` bucket in Supabase Storage.

drop policy if exists "Public can read images" on storage.objects;
create policy "Public can read images"
  on storage.objects for select
  using (bucket_id = 'images');

drop policy if exists "Admin editors can upload images" on storage.objects;
create policy "Admin editors can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'images'
    and public.has_admin_access()
  );

drop policy if exists "Admin editors can update images" on storage.objects;
create policy "Admin editors can update images"
  on storage.objects for update
  using (
    bucket_id = 'images'
    and public.has_admin_access()
  )
  with check (
    bucket_id = 'images'
    and public.has_admin_access()
  );

drop policy if exists "Admin editors can delete images" on storage.objects;
create policy "Admin editors can delete images"
  on storage.objects for delete
  using (
    bucket_id = 'images'
    and public.has_admin_access()
  );
