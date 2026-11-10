import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import CountUp from '../components/common/CountUp';
import PageBanner from '../components/common/PageBanner';
import SectionHeading from '../components/common/SectionHeading';
import { whatsappLink } from '../data/site';
import { lifestyleImage, productImage, siteImages } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

const CRAFT_ALTS = ['alt.craftZari', 'alt.craftStack', 'alt.craftEmbroidery', 'alt.craftWeave'];

export default function About() {
  const { t } = useLanguage();
  const { about, brand, stats } = useLocalized();

  return (
    <>
      <Seo title={t('about.seoTitle')} description={t('about.seoDescription', { year: brand.established })} />
      <PageBanner
        title={t('about.bannerTitle')}
        eyebrow={brand.tagline}
        text={t('about.bannerText')}
        image={lifestyleImage(siteImages.aboutBanner)}
        imageAlt={t('alt.aboutBanner')}
        crumbs={[{ label: t('nav.about') }]}
        position="center 40%"
      />

      {/* Brand introduction & story */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container about-story">
          <Reveal className="about-story__media">
            <div className="about-story__arch">
              <Img image={lifestyleImage(siteImages.aboutStory)} alt={t('alt.aboutStory')} sizes="(min-width: 900px) 34vw, 80vw" />
            </div>
            <div className="about-story__badge" aria-hidden="true">
              <span className="about-story__badge-year">{brand.established}</span>
              <span>{t('about.badge')}</span>
            </div>
          </Reveal>
          <Reveal className="about-story__copy" delay={120}>
            <SectionHeading eyebrow={t('about.storyEyebrow', { brand: brand.name })} title={t('about.storyTitle')} align="left" id="story-heading" />
            {about.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="section section--cream" aria-labelledby="journey-heading">
        <div className="container">
          <SectionHeading eyebrow={t('about.journeyEyebrow')} title={t('about.journeyTitle')} id="journey-heading" />
          <ol className="timeline">
            {about.journey.map((j, i) => (
              <Reveal as="li" key={j.year} className="timeline__item" delay={i * 90}>
                <span className="timeline__year">{j.year}</span>
                <h3 className="timeline__title">{j.title}</h3>
                <p>{j.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section" aria-label={t('about.missionVisionLabel')}>
        <div className="container mission">
          <Reveal className="mission__card">
            <p className="eyebrow">{t('about.mission')}</p>
            <p className="mission__text">{about.mission}</p>
          </Reveal>
          <Reveal className="mission__image" delay={80}>
            <Img image={productImage('paithani-01', 'd1')} alt={t('alt.missionImage')} sizes="(min-width: 900px) 30vw, 90vw" />
          </Reveal>
          <Reveal className="mission__card mission__card--dark" delay={160}>
            <p className="eyebrow eyebrow--light">{t('about.vision')}</p>
            <p className="mission__text">{about.vision}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section section--cream" aria-labelledby="values-heading">
        <div className="container">
          <SectionHeading eyebrow={t('about.valuesEyebrow')} title={t('about.valuesTitle')} id="values-heading" />
          <ul className="values">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.icon} className="value" delay={i * 80}>
                <span className="value__icon">
                  <Icon name={v.icon} size={28} />
                </span>
                <h3 className="value__title">{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section craft" aria-labelledby="craft-heading">
        <div className="container">
          <SectionHeading eyebrow={t('about.craftEyebrow')} title={t('about.craftTitle')} intro={t('about.craftIntro')} id="craft-heading" />
          <div className="craft__grid">
            {about.craft.map((c, i) => (
              <Reveal key={i} className="craft__item" delay={i * 80}>
                <div className="craft__media">
                  <Img image={lifestyleImage(siteImages.craft[i])} alt={t(CRAFT_ALTS[i])} sizes="(min-width: 900px) 25vw, 50vw" />
                </div>
                <h3 className="craft__title">{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="about-cta__media">
          <Img image={lifestyleImage(siteImages.aboutStorySecondary)} alt="" sizes="100vw" />
        </div>
        <div className="container about-cta__inner">
          <dl className="stats stats--light">
            {stats.map((s) => (
              <div key={s.value} className="stats__item">
                <dt className="stats__label">{s.label}</dt>
                <dd className="stats__value">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <h2 id="about-cta-title" className="about-cta__title">
            {t('about.ctaTitle')}
          </h2>
          <div className="about-cta__actions">
            <Link to="/collections" className="btn btn--gold">
              {t('about.ctaExplore')} <Icon name="arrowRight" size={18} />
            </Link>
            <a href={whatsappLink(t('wa.default'))} className="btn btn--ghost-light" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> {t('about.ctaStylist')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
