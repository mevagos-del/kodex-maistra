import { useState } from 'react';

type RaceHeroProps = {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  originalTitle?: string | null;
  description?: string | null;
  badges: string[];
};

export function RaceHero({
  slug,
  imageUrl,
  imageAlt,
  title,
  originalTitle,
  description,
  badges,
}: RaceHeroProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(imageUrl) && !imageFailed;

  return (
    <header className={`race-archive-hero race-archive-hero--${slug}${hasImage ? '' : ' race-archive-hero--without-art'}`}>
      {hasImage ? (
        <div className="race-archive-hero__art" aria-hidden="true">
          <img
            src={imageUrl}
            alt={imageAlt}
            width="1920"
            height="800"
            decoding="async"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : null}

      <div className="race-archive-hero__copy">
        <div className="race-archive-hero__identity">
          <p className="race-archive-hero__eyebrow">Раса</p>
          <h1>{title}</h1>
        </div>
        <div className="race-archive-hero__details">
          {originalTitle ? <p className="race-archive-hero__original">{originalTitle}</p> : null}
          {badges.length > 0 ? (
            <div className="race-archive-hero__badges" aria-label="Статус матеріалу">
              {badges.map((badge) => <span key={badge}>{badge}</span>)}
            </div>
          ) : null}
          {description ? <p className="race-archive-hero__description">{description}</p> : null}
        </div>
      </div>
    </header>
  );
}
