import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import en from './ui/en';

/** Supported languages. `htmlLang` is written to <html lang> for screen readers, fonts and SEO. */
export const LANGUAGES = [
  { code: 'en', label: 'English', english: 'English', short: 'EN', htmlLang: 'en-IN' },
  { code: 'hi', label: 'हिंदी', english: 'Hindi', short: 'हिं', htmlLang: 'hi' },
  { code: 'mr', label: 'मराठी', english: 'Marathi', short: 'मरा', htmlLang: 'mr' },
];

const STORAGE_KEY = 'aarus-language';

/**
 * English ships with the app (it is also the fallback). Hindi and Marathi are separate chunks,
 * downloaded only when a visitor actually uses that language.
 */
const LOADERS = {
  hi: () => Promise.all([import('./ui/hi'), import('./content/hi')]),
  mr: () => Promise.all([import('./ui/mr'), import('./content/mr')]),
};
const cache = { en: { ui: en, content: {} } };
const inFlight = {};

/** Returns { ui, content } for a language, loading it on first use (one request per language). */
export function loadLanguage(code) {
  if (cache[code]) return Promise.resolve(cache[code]);
  if (!LOADERS[code]) return Promise.resolve(cache.en);
  inFlight[code] ??= LOADERS[code]()
    .then(([ui, content]) => {
      cache[code] = { ui: ui.default, content: content.default };
      return cache[code];
    })
    .finally(() => {
      delete inFlight[code];
    });
  return inFlight[code];
}

function saveLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage unavailable (private mode) — language still applies for this visit */
  }
}

export function readStoredLanguage() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.some((l) => l.code === v) ? v : 'en';
  } catch {
    return 'en';
  }
}

const LanguageContext = createContext(null);
const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);

/**
 * `initialLang` is the language to show on first render (already loaded).
 * `pendingLang` is a saved language still downloading; the site switches to it when it arrives.
 */
export function LanguageProvider({ initialLang = 'en', pendingLang, children }) {
  const [lang, setLangState] = useState(() => (cache[initialLang] ? initialLang : 'en'));
  const latestRequest = useRef(0);

  useEffect(() => {
    document.documentElement.lang = LANGUAGES.find((l) => l.code === lang).htmlLang;
  }, [lang]);

  /**
   * Switches once the language file has loaded; only the most recent choice wins.
   * The visitor's choice is saved immediately, so a slow or failed download never resets it.
   */
  const setLang = useCallback((code, { save = true } = {}) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    if (save) saveLanguage(code);
    const request = ++latestRequest.current;
    loadLanguage(code)
      .then(() => {
        if (request === latestRequest.current) setLangState(code);
      })
      .catch(() => {
        /* network error: stay on the current language */
      });
  }, []);

  // A saved language that was still downloading at startup: apply it as soon as it arrives.
  useEffect(() => {
    if (pendingLang && pendingLang !== initialLang) setLang(pendingLang, { save: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bundle = cache[lang];

  /** t('home.heroText', { year: 2016 }) — falls back to English, then to the key itself. */
  const t = useCallback(
    (key, vars) => {
      let str = lookup(bundle.ui, key);
      if (str == null || str === '') str = lookup(en, key);
      if (str == null) return key;
      if (typeof str !== 'string' || !vars) return str;
      return str.replace(/\{(\w+)\}/g, (m, name) => (vars[name] != null ? String(vars[name]) : m));
    },
    [bundle],
  );

  const value = useMemo(() => ({ lang, setLang, t, content: bundle.content }), [lang, setLang, t, bundle]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
