import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon';
import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext';

/** Phone menu variant: three one-tap buttons. */
function LanguageSegments({ className }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className={`lang-seg ${className}`} role="group" aria-label={t('header.language')}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.htmlLang}
          className={`lang-seg__btn ${lang === l.code ? 'is-active' : ''}`}
          aria-pressed={lang === l.code}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

/** Header variant: a styled dropdown menu (mouse, touch and keyboard). */
function LanguageMenu({ className }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Focus the selected language when the menu opens.
  useEffect(() => {
    if (!open) return undefined;
    const idx = Math.max(0, LANGUAGES.findIndex((l) => l.code === lang));
    const raf = requestAnimationFrame(() => itemRefs.current[idx]?.focus());
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, lang]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const choose = (code) => {
    setLang(code);
    close();
  };

  const onButtonKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKey = (e) => {
    const items = itemRefs.current.filter(Boolean);
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      close(false);
    }
  };

  return (
    <div className={`lang-menu ${open ? 'is-open' : ''} ${className}`} ref={wrapRef}>
      <button
        type="button"
        ref={buttonRef}
        className="lang-menu__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('header.language')}: ${current.label}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
      >
        <Icon name="globe" size={18} />
        <span lang={current.htmlLang}>{current.label}</span>
        <Icon name="chevronDown" size={14} strokeWidth={2} className="lang-menu__chevron" />
      </button>

      <div className="lang-menu__panel" id={menuId} role="menu" aria-label={t('header.language')} hidden={!open} onKeyDown={onMenuKey}>
        <p className="lang-menu__title" aria-hidden="true">
          {t('header.language')}
        </p>
        {LANGUAGES.map((l, i) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              role="menuitemradio"
              aria-checked={active}
              tabIndex={-1}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`lang-menu__item ${active ? 'is-active' : ''}`}
              onClick={() => choose(l.code)}
            >
              <span className="lang-menu__names">
                <span className="lang-menu__native" lang={l.htmlLang}>
                  {l.label}
                </span>
                {l.english !== l.label && <span className="lang-menu__english">{l.english}</span>}
              </span>
              <span className="lang-menu__check" aria-hidden="true">
                {active && <Icon name="check" size={18} strokeWidth={2} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Language picker. `full` = phone-menu segmented buttons; default = header dropdown. */
export default function LanguageSwitcher({ className = '', full = false }) {
  return full ? <LanguageSegments className={className} /> : <LanguageMenu className={className} />;
}
