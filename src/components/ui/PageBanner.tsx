type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export function PageBanner({ eyebrow, title, description, imageUrl }: PageBannerProps) {
  return (
    <section className={imageUrl ? 'page-banner page-banner-with-image' : 'page-banner'}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {imageUrl ? <img src={imageUrl} alt="" aria-hidden="true" /> : null}
    </section>
  );
}
