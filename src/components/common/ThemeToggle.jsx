import { useEffect, useState } from 'react';
import Icon from './Icon';
import { useLanguage } from '../../i18n/LanguageContext';

const STORAGE_KEY = 'aarus-theme';
const THEME_COLORS = { light: '#15233f', dark: '#0b1222' };

function storedTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

/**
 * Light/dark switch. The site opens in light mode; a visitor who picks dark mode gets it on later visits.
 * index.html applies the saved theme before the page paints, so there is no flash.
 */
export default function ThemeToggle({ className = '' }) {
  const { t } = useLanguage();
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || storedTheme() || 'light');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? t('header.toLight') : t('header.toDark');
  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
    </button>
  );
}
