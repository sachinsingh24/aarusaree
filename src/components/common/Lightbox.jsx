import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Accessible image lightbox: Esc closes, ←/→ navigate, focus is trapped on the dialog
 * and restored to the trigger on close. Body scroll is locked while open.
 * Rendered into <body> with the rest of the app made inert, so focus can't reach the page behind
 * (needed because key presses inside the YouTube iframe never reach our own focus trap).
 * items: [{ src, srcSet, alt, caption }]
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];

  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const appRoot = document.getElementById('root');
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (appRoot) appRoot.inert = true;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (appRoot) appRoot.inert = false;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll('button, a[href], iframe');
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  if (!item) return null;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t('lightbox.counter', { index: index + 1, total: items.length })}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="lightbox__close" onClick={onClose} ref={closeRef} aria-label={t('lightbox.close')}>
        <Icon name="close" size={26} />
      </button>
      {items.length > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label={t('lightbox.prev')}>
          <Icon name="chevronLeft" size={30} />
        </button>
      )}
      <figure className="lightbox__figure">
        {item.embed ? (
          <div className="lightbox__video">
            {/* key: switching reels reloads the player */}
            <iframe
              key={item.embed}
              src={item.embed}
              title={item.caption || item.alt}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          <img key={item.src} src={item.src} srcSet={item.srcSet} sizes="90vw" alt={item.alt} className="lightbox__img" />
        )}
        {(item.caption || items.length > 1) && (
          <figcaption className="lightbox__caption">
            {item.caption}
            {item.link && (
              <a className="lightbox__link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                {item.link.label}
              </a>
            )}
            {items.length > 1 && (
              <span className="lightbox__count">
                {index + 1} / {items.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>
      {items.length > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label={t('lightbox.next')}>
          <Icon name="chevronRight" size={30} />
        </button>
      )}
    </div>,
    document.body,
  );
}
