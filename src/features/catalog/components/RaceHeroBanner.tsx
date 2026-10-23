import { useEffect, useState, type CSSProperties } from 'react';

export type RaceNavigationItem = {
  href: string;
  label: string;
  number: number;
};

type RaceHeroBannerProps = {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  label: string;
  title: string;
  originalTitle?: string | null;
  description?: string | null;
  badges: string[];
  navigation: RaceNavigationItem[];
  imagePosition?: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
};

type RaceHeroStyle = CSSProperties & {
  '--race-hero-position-desktop'?: string;
  '--race-hero-position-tablet'?: string;
  '--race-hero-position-mobile'?: string;
};

function sectionId(href: string) {
  return href.startsWith('#') ? href.slice(1) : href;
}

export function RaceHeroBanner({
  slug,
  imageUrl,
  imageAlt,
  label,
  title,
  originalTitle,
  description,
  badges,
  navigation,
  imagePosition,
}: RaceHeroBannerProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [activeHref, setActiveHref] = useState(navigation[0]?.href ?? '');

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

      if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
    }, {
      rootMargin: '-18% 0px -68% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigation]);

  const style: RaceHeroStyle = imagePosition ? {
    '--race-hero-position-desktop': imagePosition.desktop,
    '--race-hero-position-tablet': imagePosition.tablet,
    '--race-hero-position-mobile': imagePosition.mobile,
  } : {};

  return (
    <div className="race-detail-header">
      <section
        className={`race-detail-hero race-detail-hero--${slug}${imageFailed || !imageUrl ? ' race-detail-hero--without-image' : ''}`}
        style={style}
        aria-labelledby="race-detail-title"
      >
        <div className="race-detail-hero__media" aria-hidden={imageFailed || !imageUrl}>
          {!imageFailed && imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              width="1920"
              height="800"
              decoding="async"
              fetchPriority="high"
              onError={() => setImageFailed(true)}
            />
          ) : null}
        </div>
        <div className="race-detail-hero__shade" aria-hidden="true" />

        <div className="race-detail-hero__content">
          <div className="race-detail-hero__identity">
            <p className="race-detail-hero__eyebrow">{label.toLocaleUpperCase('uk-UA')}</p>
            <h1 id="race-detail-title">{title}</h1>
          </div>

          <div className="race-detail-hero__details">
            {originalTitle ? <p className="race-detail-hero__original">{originalTitle}</p> : null}
            {badges.length > 0 ? (
              <div className="race-detail-hero__badges" aria-label="Статус матеріалу">
                {badges.map((badge) => <span key={badge}>{badge}</span>)}
              </div>
            ) : null}
            {description ? <p className="race-detail-hero__description">{description}</p> : null}
          </div>
        </div>
      </section>

      {navigation.length > 0 ? (
        <nav className="race-detail-nav" aria-label="Розділи сторінки раси">
          <ol>
            {navigation.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setActiveHref(item.href)}
                  >
                    <span aria-hidden="true">{String(item.number).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </div>
  );
}
