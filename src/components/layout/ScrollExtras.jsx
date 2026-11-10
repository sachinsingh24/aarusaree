import { useEffect, useRef, useState } from 'react';
import Icon from '../common/Icon';
import { useLanguage } from '../../i18n/LanguageContext';

/** Thin gold reading-progress bar at the top of the page + a back-to-top button. */
export default function ScrollExtras() {
  const { t } = useLanguage();
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - progress * 100);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Recalculate when the page itself grows or shrinks (images loading, accordions, page changes).
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null;
    ro?.observe(document.body);
    return () => {
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" ref={barRef} />
      </div>
      <button
        type="button"
        className={`back-to-top ${showTop ? 'is-visible' : ''}`}
        onClick={toTop}
        aria-label={t('common.backToTop')}
        tabIndex={showTop ? 0 : -1}
      >
        {/* Gold ring that fills as the visitor scrolls down the page */}
        <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="22" pathLength="100" className="back-to-top__track" />
          <circle cx="24" cy="24" r="22" pathLength="100" className="back-to-top__progress" ref={ringRef} />
        </svg>
        <Icon name="arrowUp" size={22} strokeWidth={2.2} />
      </button>
    </>
  );
}
