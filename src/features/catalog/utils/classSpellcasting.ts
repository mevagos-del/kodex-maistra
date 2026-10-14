export function classSpellFilterHref(classSlug: string) {
  const params = new URLSearchParams({ class: classSlug });
  return `/spells?${params.toString()}`;
}
