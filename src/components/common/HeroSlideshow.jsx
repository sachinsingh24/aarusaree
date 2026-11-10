import { useEffect, useState } from 'react';
import Img from './Img';
import Icon from './Icon';
import { useLanguage } from '../../i18n/LanguageContext';

const INTERVAL = 5500;
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * A stack of cross-fading images showing slide `index`, with a slow zoom on the active one.
 * Only the current and next images are loaded; ones already seen stay loaded.
 * slides: [{ image, alt }]
 */
export function SlideFade({ slides, index, sizes, priority = false }) {
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));

  useEffect(() => {
    setLoaded((prev) => {
      const next = (index + 1) % slides.length;
      if (prev.has(index) && prev.has(next)) return prev;
      return new Set([...prev, index, next]);
    });
  }, [index, slides.length]);

  return slides.map((s, i) => (
    <div key={s.image.src} className={`hero-slideshow__slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
      {loaded.has(i) && <Img image={s.image} alt={s.alt} sizes={sizes} priority={priority && i === 0} />}
    </div>
  ));
}

/**
 * Cross-fading hero slideshow with dot controls.
 * Autoplay pauses on hover/focus, can be paused with the button, and is off for reduced motion.
 * Pass `index` and `onIndexChange` to drive other images (e.g. a second photo) from the same slideshow.
 */
export default function HeroSlideshow({ slides, sizes, className = '', index: controlledIndex, onIndexChange }) {
  const { t } = useLanguage();
  const [ownIndex, setOwnIndex] = useState(0);
  const index = controlledIndex ?? ownIndex;
  const setIndex = onIndexChange ?? setOwnIndex;
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (paused || hovering || slides.length < 2) return undefined;
    const timer = setTimeout(() => setIndex((index + 1) % slides.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, paused, hovering, slides.length, setIndex]);

  return (
    <div
      className={`hero-slideshow ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={t('home.slideshowLabel')}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <SlideFade slides={slides} index={index} sizes={sizes} priority />
      {slides.length > 1 && (
        <div className="hero-slideshow__controls">
          {slides.map((s, i) => (
            <button
              key={s.image.src}
              type="button"
              className={`hero-slideshow__dot ${i === index ? 'is-active' : ''}`}
              aria-label={t('home.slide', { n: i + 1 })}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
          <button
            type="button"
            className="hero-slideshow__pause"
            aria-label={paused ? t('home.play') : t('home.pause')}
            onClick={() => setPaused((p) => !p)}
          >
            <Icon name={paused ? 'play' : 'pause'} size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
