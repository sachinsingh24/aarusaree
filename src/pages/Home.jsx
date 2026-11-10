import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Ornament from '../components/common/Ornament';
import Reveal from '../components/common/Reveal';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard';
import Carousel from '../components/common/Carousel';
import HeroSlideshow, { SlideFade } from '../components/common/HeroSlideshow';
import CountUp from '../components/common/CountUp';
import FaqSection from '../components/common/FaqSection';
import { occasions } from '../data/occasions';
import ReelsShowcase from '../components/common/ReelsShowcase';
import { social, whatsappLink, addressParts } from '../data/site';
import { getProductsByTag, getProduct } from '../data/products';
import { productImage, lifestyleImage, galleryImage, siteImages } from '../data/images';
import { galleryItems, instagramPosts } from '../data/gallery';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => Array.from(n)[0])
    .join('');

/**
 * 50 twinkling gold stars in the hero, spread evenly with a fixed pattern (same layout on every
 * visit). Stars that would sit on the headline and text are skipped; on phones, where the text
 * spans the full width, only the stars along the side edges show.
 * Each star: [top %, left %, size px, delay s, show on phones].
 */
const HERO_STAR_COUNT = 50;
const heroSparkles = (() => {
  const stars = [];
  const frac = (n) => n - Math.floor(n);
  for (let i = 1; stars.length < HERO_STAR_COUNT; i += 1) {
    // R2 low-discrepancy sequence: even coverage without clumps.
    const left = +(frac(i * 0.7548776662) * 100).toFixed(1);
    const top = +(frac(i * 0.5698402910) * 100).toFixed(1);
    const onText = left > 3 && left < 48 && top > 9 && top < 93;
    if (onText) continue;
    const size = 5 + ((i * 7) % 9);
    const delay = +((i * 0.37) % 5).toFixed(2);
    // Phones: the side edges, plus the margins beside the photos in the lower half.
    const phone = left < 6 || left > 93 || (top > 50 && (left < 12 || left > 88));
    stars.push([top, left, size, delay, phone]);
  }
  return stars;
})();

function Hero() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const spotlight = loc.product(getProduct('rani-wine-mayur-kalanjali'));
  const [slide, setSlide] = useState(0);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__sparkles" aria-hidden="true">
        {heroSparkles.map(([top, left, size, delay, phone], i) => (
          <i
            key={i}
            className={phone ? undefined : 'hero__sparkle--wide'}
            style={{ top: `${top}%`, left: `${left}%`, '--s': `${size}px`, '--d': `${delay}s`, '--t': `${4 + (i % 4) * 0.7}s` }}
          />
        ))}
      </div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{t('home.heroEyebrow', { year: loc.brand.established })}</p>
          <h1 id="hero-title" className="hero__title">
            {t('home.heroTitleBefore')} <em>{t('home.heroTitleEm')}</em>
            <br /> {t('home.heroTitleAfter')}
          </h1>
          <Ornament className="hero__ornament" />
          <p className="hero__text">{t('home.heroText')}</p>
          <div className="hero__actions">
            <Link to="/collections" className="btn btn--primary">
              {t('home.explore')} <Icon name="arrowRight" size={18} />
            </Link>
            <a href={whatsappLink(t('wa.default'))} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> {t('common.enquireWhatsapp')}
            </a>
          </div>
          <ul className="hero__trust">
            <li>
              <Icon name="check" size={16} /> {t('home.trust1')}
            </li>
            <li>
              <Icon name="check" size={16} /> {t('home.trust2')}
            </li>
            <li>
              <Icon name="check" size={16} /> {t('home.trust3')}
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <div className="hero__arch hero__arch--main">
            <HeroSlideshow
              slides={siteImages.heroSlides.map((s) => ({ image: lifestyleImage(s.name), alt: t(s.alt) }))}
              sizes="(min-width: 1080px) 34vw, (min-width: 700px) 50vw, 70vw"
              index={slide}
              onIndexChange={setSlide}
            />
          </div>
          <div className="hero__arch hero__arch--side">
            <SlideFade
              slides={siteImages.heroSlides.map((s) => ({ image: lifestyleImage(s.side), alt: t(s.sideAlt) }))}
              index={slide}
              sizes="(min-width: 1080px) 16vw, 30vw"
            />
          </div>
          {spotlight && (
            <Link to={`/sarees/${spotlight.id}`} className="hero__spotlight">
              <span className="hero__spotlight-img">
                <Img image={productImage(spotlight.photo)} alt="" sizes="64px" />
              </span>
              <span>
                <span className="hero__spotlight-label">{t('home.newArrivalLabel')}</span>
                <span className="hero__spotlight-name">{spotlight.name}</span>
              </span>
              <Icon name="arrowRight" size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useLanguage();
  const { collections } = useLocalized();
  const words = [...collections.map((c) => c.title), t('home.marqueeExtra1'), t('home.marqueeExtra2')];
  const row = (
    <ul className="marquee__row">
      {words.map((w) => (
        <li key={w}>
          {w}
          <span className="marquee__dot">✦</span>
        </li>
      ))}
    </ul>
  );
  // Purely decorative (the same collections are linked right below), so hidden from screen readers.
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__inner">
        {row}
        {row}
      </div>
    </div>
  );
}

function Intro() {
  const { t } = useLanguage();
  const { brand, stats } = useLocalized();
  return (
    <section className="section intro" aria-labelledby="intro-title">
      <div className="container container--narrow">
        <Reveal>
          <SectionHeading eyebrow={t('home.introEyebrow', { brand: brand.name })} title={t('home.introTitle')} id="intro-title" />
          <p className="intro__lead">{brand.intro}</p>
        </Reveal>
        <Reveal as="dl" className="stats" delay={100}>
          {stats.map((s) => (
            <div key={s.value} className="stats__item">
              <dt className="stats__label">{s.label}</dt>
              <dd className="stats__value">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const { t } = useLanguage();
  const { collections } = useLocalized();
  return (
    <section className="section section--cream" aria-labelledby="collections-title">
      <div className="container">
        <SectionHeading eyebrow={t('home.featuredEyebrow')} title={t('home.featuredTitle')} intro={t('home.featuredIntro')} id="collections-title" />
        <div className="collection-mosaic">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80} className={`collection-tile ${i === 0 ? 'collection-tile--feature' : ''}`}>
              <Link to={`/collections/${c.slug}`} className="collection-tile__link">
                <div className="collection-tile__media">
                  <Img
                    image={productImage(c.cover)}
                    alt={`${c.title}: ${c.tagline}`}
                    sizes={i === 0 ? '(min-width: 900px) 38vw, 90vw' : '(min-width: 900px) 28vw, 45vw'}
                  />
                </div>
                <div className="collection-tile__body">
                  <span className="collection-tile__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="collection-tile__title">{c.title}</h3>
                  <p className="collection-tile__tagline">{c.tagline}</p>
                  <span className="collection-tile__cta">
                    {t('home.discover')} <Icon name="arrowRight" size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({ tag, eyebrow, title, id }) {
  const { t } = useLanguage();
  const items = getProductsByTag(tag);
  return (
    <section className="section" aria-labelledby={id}>
      <div className="container">
        <Carousel label={title} header={<SectionHeading eyebrow={eyebrow} title={title} align="left" id={id} />}>
          {items.map((p) => (
            <ProductCard key={p.id} product={p} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 32vw, 72vw" />
          ))}
        </Carousel>
        <div className="section__more">
          <Link to="/sarees" className="btn btn--outline">
            {t('home.viewAll')} <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const panels = [
    { key: 'traditional', image: siteImages.traditionalPanel, alt: t('alt.traditional'), eyebrow: t('home.heritage') },
    { key: 'designer', image: siteImages.designerPanel, alt: t('alt.designer'), eyebrow: t('home.contemporary') },
  ];
  return (
    <section className="section section--tight" aria-label={t('home.highlightsLabel')}>
      <div className="container highlights">
        {panels.map((p, i) => {
          const group = loc.group(p.key);
          const list = loc.collections.filter((c) => c.group === p.key);
          return (
            <Reveal key={p.key} delay={i * 120} className="highlight">
              <Img image={lifestyleImage(p.image)} alt={p.alt} sizes="(min-width: 900px) 50vw, 100vw" className="highlight__img" />
              <div className="highlight__body">
                <p className="eyebrow eyebrow--light">{p.eyebrow}</p>
                <h2 className="highlight__title">{group.title}</h2>
                <p className="highlight__text">{group.text}</p>
                <ul className="highlight__links">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/collections/${c.slug}`} className="chip chip--light">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Occasions() {
  const { t } = useLanguage();
  return (
    <section className="section occasions" aria-labelledby="occasions-title">
      <div className="container">
        <Carousel
          label={t('home.occasionTitle')}
          header={<SectionHeading eyebrow={t('home.occasionEyebrow')} title={t('home.occasionTitle')} intro={t('home.occasionIntro')} align="left" id="occasions-title" />}
          className="carousel--occasions"
        >
          {occasions.map((o) => (
            <Link key={o.key} to={`/sarees?occasion=${o.key}`} className="occasion-card">
              <Img image={lifestyleImage(o.image)} alt={t(o.alt)} sizes="(min-width: 1000px) 24vw, (min-width: 600px) 36vw, 72vw" className="occasion-card__img" />
              <span className="occasion-card__shade" aria-hidden="true" />
              <span className="occasion-card__body">
                <span className="occasion-card__title">{t(`home.occasions.${o.key}.title`)}</span>
                <span className="occasion-card__text">{t(`home.occasions.${o.key}.text`)}</span>
                <span className="occasion-card__cta">
                  {t('home.occasionCta')} <Icon name="arrowRight" size={16} />
                </span>
              </span>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function BestSellers() {
  const { t } = useLanguage();
  const items = getProductsByTag('bestseller').slice(0, 8);
  return (
    <section className="section section--cream" aria-labelledby="bestsellers-title">
      <div className="container">
        <SectionHeading eyebrow={t('home.bestEyebrow')} title={t('home.bestTitle')} intro={t('home.bestIntro')} id="bestsellers-title" />
        <div className="product-grid">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <div className="section__more">
          <Link to="/sarees" className="btn btn--primary">
            {t('home.bestCta')} <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StoryPreview() {
  const { t } = useLanguage();
  const { brand } = useLocalized();
  return (
    <section className="section story-preview" aria-labelledby="story-title">
      <div className="container story-preview__grid">
        <Reveal className="story-preview__media">
          <div className="story-preview__arch">
            <Img image={lifestyleImage(siteImages.storyPreview)} alt={t('alt.storyPreview')} sizes="(min-width: 900px) 30vw, 70vw" />
          </div>
          <div className="story-preview__inset">
            <Img image={productImage('paithani-02', 'd1')} alt={t('alt.storyInset')} sizes="(min-width: 900px) 16vw, 40vw" />
          </div>
        </Reveal>
        <Reveal className="story-preview__copy" delay={120}>
          <SectionHeading eyebrow={t('home.storyEyebrow')} title={t('home.storyTitle')} align="left" id="story-title" />
          <p>{t('home.storyP1', { year: brand.established })}</p>
          <p>{t('home.storyP2')}</p>
          <Link to="/about" className="btn btn--outline">
            {t('home.storyCta')} <Icon name="arrowRight" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const picks = ['bridal-ivory-red', 'craft-zari-border', 'georgette-courtyard', 'kalanjali-05', 'seaside-banarasi', 'black-silver-saree']
    .map((name) => galleryItems.find((g) => g.name === name))
    .filter(Boolean)
    .map((g) => ({ ...g, caption: loc.galleryCaption(g.name, g.caption) }));
  return (
    <section className="section section--cream" aria-labelledby="lookbook-title">
      <div className="container">
        <SectionHeading eyebrow={t('home.lookbookEyebrow')} title={t('home.lookbookTitle')} intro={t('home.lookbookIntro')} id="lookbook-title" />
        <div className="lookbook">
          {picks.map((item, i) => (
            <Reveal key={item.name} delay={i * 60} className={`lookbook__item lookbook__item--${i + 1}`}>
              <Link to="/gallery" className="lookbook__link" aria-label={t('home.openGallery', { caption: item.caption })}>
                <Img image={galleryImage(item)} alt={item.caption} sizes="(min-width: 900px) 25vw, 50vw" />
                <span className="lookbook__caption" aria-hidden="true">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="section__more">
          <Link to="/gallery" className="btn btn--outline">
            {t('home.lookbookCta')} <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useLanguage();
  const { testimonials } = useLocalized();
  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <Carousel
          label={t('home.testimonialsLabel')}
          header={<SectionHeading eyebrow={t('home.testimonialsEyebrow')} title={t('home.testimonialsTitle')} align="left" id="testimonials-title" />}
          className="carousel--testimonials"
        >
          {testimonials.map((item, i) => (
            <figure key={i} className="testimonial">
              <Icon name="quote" size={34} className="testimonial__mark" />
              <blockquote className="testimonial__quote">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="testimonial__by">
                <span className="testimonial__avatar" aria-hidden="true">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="testimonial__name">{item.name}</span>
                  <span className="testimonial__meta">
                    {item.city} · {item.occasion}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function Instagram() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const ig = social.find((s) => s.icon === 'instagram');
  return (
    <section className="section section--cream instagram" aria-labelledby="instagram-title">
      <div className="container">
        <SectionHeading eyebrow={t('home.instagramEyebrow')} title={ig.handle} intro={t('home.instagramIntro')} id="instagram-title" />
        <ul className="instagram__grid">
          {instagramPosts.map((post) => (
            <li key={post.name}>
              <a
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram__tile"
                aria-label={t('home.instagramView', { caption: loc.instagramCaption(post.name, post.caption) })}
              >
                <Img image={galleryImage(post)} alt="" sizes="(min-width: 900px) 16vw, 33vw" />
                <span className="instagram__overlay" aria-hidden="true">
                  <Icon name="instagram" size={28} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="section__more">
          <a href={ig.url} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <Icon name="instagram" size={18} /> {t('home.instagramFollow')}
          </a>
        </div>
      </div>
    </section>
  );
}

function VisitBand() {
  const { t } = useLanguage();
  const { hours } = useLocalized();
  return (
    <section className="visit-band" aria-labelledby="visit-title">
      <div className="container visit-band__grid">
        <div>
          <p className="eyebrow eyebrow--light">{t('home.visitEyebrow')}</p>
          <h2 id="visit-title" className="visit-band__title">
            {t('home.visitTitle')}
          </h2>
        </div>
        <div className="visit-band__info">
          <p>
            <Icon name="map" size={18} /> <span>{addressParts().join(', ')}</span>
          </p>
          <p>
            <Icon name="clock" size={18} /> {hours[0].days}, {hours[0].time}
          </p>
          <div className="visit-band__actions">
            <a href={whatsappLink(t('wa.default'))} className="btn btn--gold" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> {t('common.chatWhatsapp')}
            </a>
            <Link to="/contact" className="btn btn--ghost-light">
              {t('home.visitDirections')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <Seo />
      <Hero />
      <Marquee />
      <Intro />
      <FeaturedCollections />
      <ProductRail tag="new" eyebrow={t('home.newEyebrow')} title={t('home.newTitle')} id="new-title" />
      <Highlights />
      <Occasions />
      <BestSellers />
      <StoryPreview />
      <GalleryPreview />
      <ReelsShowcase limit={8} dark id="reels-title" />
      <Testimonials />
      <Instagram />
      <FaqSection />
      <VisitBand />
    </>
  );
}
