import { useMemo, useState } from 'react';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Lightbox from '../components/common/Lightbox';
import PageBanner from '../components/common/PageBanner';
import ReelsShowcase from '../components/common/ReelsShowcase';
import { galleryItems } from '../data/gallery';
import { lifestyleImage, galleryImage, siteImages } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

export default function Gallery() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () =>
      galleryItems
        .filter((g) => filter === 'all' || g.category === filter)
        .map((g) => {
          const caption = loc.galleryCaption(g.name, g.caption);
          return { ...g, ...galleryImage(g), caption, alt: caption };
        }),
    [filter, loc],
  );

  return (
    <>
      <Seo title={t('gallery.seoTitle')} description={t('gallery.seoDescription')} />
      <PageBanner
        title={t('gallery.bannerTitle')}
        eyebrow={t('gallery.bannerEyebrow')}
        text={t('gallery.bannerText')}
        image={lifestyleImage(siteImages.galleryBanner)}
        imageAlt={t('alt.galleryBanner')}
        crumbs={[{ label: t('nav.gallery') }]}
        position="center 35%"
      />

      <section className="section section--tight" aria-label={t('gallery.sectionLabel')}>
        <div className="container">
          <div className="filter-chips filter-chips--center" role="group" aria-label={t('gallery.filterLabel')}>
            {loc.galleryCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${filter === c.id ? 'is-active' : ''}`}
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="masonry">
            {items.map((item, i) => (
              <li key={item.name} className="masonry__item">
                <button type="button" className="masonry__button" onClick={() => setOpen(i)} aria-label={t('gallery.open', { caption: item.caption })}>
                  <Img image={item} alt={item.caption} sizes="(min-width: 1100px) 25vw, (min-width: 700px) 33vw, 50vw" />
                  <span className="masonry__overlay" aria-hidden="true">
                    <Icon name="zoom" size={22} />
                    <span>{item.caption}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReelsShowcase variant="grid" className="section--cream" id="gallery-reels-title" />

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </>
  );
}
