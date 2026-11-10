import { Children, useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Native scroll-snap carousel (touch/trackpad friendly) with prev/next buttons.
 * `header` renders to the left of the arrow controls.
 */
export default function Carousel({ label, header, children, className = '' }) {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__head">
        {header}
        {(canPrev || canNext) && (
          <div className="carousel__controls">
            <button type="button" className="icon-btn" onClick={() => scroll(-1)} disabled={!canPrev} aria-label={`${t('common.previous')}: ${label}`}>
              <Icon name="arrowLeft" size={20} />
            </button>
            <button type="button" className="icon-btn" onClick={() => scroll(1)} disabled={!canNext} aria-label={`${t('common.next')}: ${label}`}>
              <Icon name="arrowRight" size={20} />
            </button>
          </div>
        )}
      </div>
      <ul className="carousel__track" ref={trackRef} aria-label={label}>
        {Children.map(children, (child) => (
          <li className="carousel__slide">{child}</li>
        ))}
      </ul>
    </div>
  );
}
