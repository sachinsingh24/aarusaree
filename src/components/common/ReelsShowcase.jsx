import { useMemo, useState } from 'react';
import Img from './Img';
import Icon from './Icon';
import Carousel from './Carousel';
import Lightbox from './Lightbox';
import SectionHeading from './SectionHeading';
import { reels, reelThumb, reelEmbed, reelWatchUrl, youtubeChannel } from '../../data/reels';
import { useLanguage } from '../../i18n/LanguageContext';

function ReelCard({ reel, onPlay, sizes }) {
  const { t } = useLanguage();
  return (
    <button type="button" className="reel-card" onClick={onPlay} aria-label={t('reels.play', { title: reel.title })}>
      <Img image={reelThumb(reel.id)} alt="" sizes={sizes} className="reel-card__img" />
      <span className="reel-card__shade" aria-hidden="true" />
      <span className="reel-card__badge" aria-hidden="true">
        <Icon name="youtube" size={14} /> Shorts
      </span>
      <span className="reel-card__play" aria-hidden="true">
        <Icon name="play" size={26} />
      </span>
      <span className="reel-card__title" aria-hidden="true">
        {reel.title}
      </span>
    </button>
  );
}

/**
 * YouTube Shorts from the shop's channel.
 * variant="carousel" (home page, latest few) or "grid" (gallery page, all).
 * Thumbnails are local; the YouTube player only loads after the visitor presses play.
 */
export default function ReelsShowcase({ variant = 'carousel', limit, dark = false, id = 'reels-title', className = '' }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () =>
      (limit ? reels.slice(0, limit) : reels).map((r) => {
        const title = t(`reels.labels.${r.label}`);
        return {
          ...r,
          title,
          ...reelThumb(r.id),
          embed: reelEmbed(r.id),
          alt: title,
          caption: title,
          link: { href: reelWatchUrl(r.id), label: t('reels.watchOnYoutube') },
        };
      }),
    [limit, t],
  );

  const heading = (
    <SectionHeading
      eyebrow={t('reels.eyebrow')}
      title={t('reels.title')}
      intro={variant === 'grid' ? t('reels.intro') : undefined}
      align={variant === 'carousel' ? 'left' : 'center'}
      light={dark}
      id={id}
    />
  );

  return (
    <section className={`section reels ${dark ? 'reels--dark' : ''} ${className}`} aria-labelledby={id}>
      <div className="container">
        {variant === 'carousel' ? (
          <Carousel label={t('reels.title')} header={heading} className="carousel--reels">
            {items.map((r, i) => (
              <ReelCard key={r.id} reel={r} onPlay={() => setOpen(i)} sizes="(min-width: 1000px) 18vw, (min-width: 600px) 30vw, 46vw" />
            ))}
          </Carousel>
        ) : (
          <>
            {heading}
            <ul className="reels-grid">
              {items.map((r, i) => (
                <li key={r.id}>
                  <ReelCard reel={r} onPlay={() => setOpen(i)} sizes="(min-width: 1100px) 18vw, (min-width: 700px) 30vw, 46vw" />
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="section__more">
          <a href={youtubeChannel.shortsUrl} target="_blank" rel="noopener noreferrer" className={`btn ${dark ? 'btn--ghost-light' : 'btn--outline'}`}>
            <Icon name="youtube" size={18} /> {t('reels.channelCta')}
          </a>
        </div>
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </section>
  );
}
