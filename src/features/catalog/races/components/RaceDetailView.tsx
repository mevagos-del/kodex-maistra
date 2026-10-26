import { referenceCards } from '../../api/detailReference';
import { DetailBackButton } from '@/features/navigation/DetailBackButton';
import type { RaceEntry } from '../../types';
import { isUsefulValue } from '../../utils/detailContent';
import { localOfficialRaceAssets } from '../../utils/catalogImages';
import { RaceOverview } from './RaceOverview';
import { RaceTraitSection } from './RaceTraitSection';
import { SubraceSelector } from './SubraceSelector';
import { RaceHero } from './RaceHero';
import { RaceNavigation, type RaceNavigationItem } from './RaceNavigation';

type RaceDetailViewProps = {
  entry: RaceEntry;
  fallbackImageUrl: string;
};

const raceTermLabels: Record<string, string> = {
  humanoid: 'Гуманоїд', 'гуманоїд': 'Гуманоїд', medium: 'Середній', 'середній': 'Середній',
  small: 'Малий', 'малий': 'Малий', common: 'Спільна', 'спільна': 'Спільна',
  dwarvish: 'Дворфійська', 'дворфійська': 'Дворфійська', elvish: 'Ельфійська', 'ельфійська': 'Ельфійська',
};

function localizeRaceValue(value: string) {
  const normalized = value.trim().toLowerCase();
  return raceTermLabels[normalized] ?? value.replace(/\b(feet|foot|ft\.?)\b/gi, 'фт');
}

function splitRaceDescription(markdown: string | null, title: string) {
  if (!markdown?.trim()) return null;
  const creationMarker = /^#{1,6}\s+Під час створення персонажа\s*$/im;
  const markerMatch = creationMarker.exec(markdown);
  const description = markerMatch ? markdown.slice(0, markerMatch.index).trim() : markdown.trim();
  const lines = description.split('\n');
  const firstHeading = lines[0]?.replace(/^#{1,6}\s+/, '').trim().toLowerCase();
  if (firstHeading === title.trim().toLowerCase()) lines.shift();
  return lines.join('\n').trim() || null;
}

function contentTypeLabel(value: RaceEntry['content_type']) {
  return value === 'official'
    ? 'Офіційний'
    : value === 'homebrew'
      ? 'Авторський матеріал'
      : value === 'campaign'
        ? 'Матеріал кампанії'
        : 'Чернетка';
}

export function RaceDetailView({ entry, fallbackImageUrl }: RaceDetailViewProps) {
  const traits = referenceCards(entry.race_traits, 'Риса');
  const hasTraits = traits.length > 0;
  const hasVariants = isUsefulValue(entry.subraces);
  const variantNumber = hasTraits ? 3 : 2;
  const navigation: RaceNavigationItem[] = [
    { href: '#race-overview', label: 'Огляд', number: 1 },
    ...(hasTraits ? [{ href: '#race-traits', label: 'Особливості', number: 2 }] : []),
    ...(hasVariants ? [{ href: '#race-subraces', label: 'Підраси', number: variantNumber }] : []),
  ];
  const assets = entry.content_type === 'official' ? localOfficialRaceAssets(entry.slug) : undefined;
  const heroImageUrl = assets?.bannerImage ?? entry.image_url ?? fallbackImageUrl;
  const facts = [
    entry.creature_type ? { label: 'Тип істоти', value: localizeRaceValue(entry.creature_type) } : null,
    entry.size ? { label: 'Розмір', value: localizeRaceValue(entry.size) } : null,
    entry.speed ? { label: 'Швидкість', value: localizeRaceValue(entry.speed) } : null,
  ].filter((fact): fact is { label: string; value: string } => fact !== null);
  const fullDescription = splitRaceDescription(entry.full_description_markdown, entry.title_ua);
  const description = fullDescription?.trim() === entry.short_description?.trim() ? null : fullDescription;

  return (
    <div className="race-archive-page">
      <DetailBackButton fallback="/races" />
      <article className="race-archive-detail">
        <RaceHero
          slug={entry.slug}
          imageUrl={heroImageUrl}
          imageAlt={`${entry.title_ua} — художня ілюстрація`}
          title={entry.title_ua}
          originalTitle={entry.title_original}
          description={entry.short_description}
          badges={[entry.rules_version === '2024' ? 'D&D 2024' : 'Homebrew', contentTypeLabel(entry.content_type)]}
        />
        <RaceNavigation items={navigation} />
        <main className="race-archive-content">
          <RaceOverview facts={facts} description={description} />
          <RaceTraitSection id="race-traits" sectionNumber={2} cards={traits} />
          <SubraceSelector id="race-subraces" sectionNumber={variantNumber} value={entry.subraces} />
          {entry.source?.title ? <footer className="race-archive-source">Джерело: {entry.source.title}</footer> : null}
        </main>
      </article>
    </div>
  );
}
