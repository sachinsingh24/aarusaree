import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider, loadLanguage, readStoredLanguage } from './i18n/LanguageContext';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/effects.css';
import './styles/theme.css';
import './styles/motion.css';

const root = createRoot(document.getElementById('root'));
let started = false;
const start = (lang, pendingLang) => {
  if (started) return;
  started = true;
  root.render(
    <StrictMode>
      <LanguageProvider initialLang={lang} pendingLang={pendingLang}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
};

// A returning visitor's saved language is loaded before the first paint (no flash of English)
// — but never at the cost of a blank page: after a short wait the site appears in English and
// switches to the saved language as soon as its file arrives. A failed download keeps the choice.
const saved = readStoredLanguage();
if (saved === 'en') {
  start('en');
} else {
  const fallback = setTimeout(() => start('en', saved), 1200);
  loadLanguage(saved)
    .then(() => {
      clearTimeout(fallback);
      start(saved);
    })
    .catch(() => {
      clearTimeout(fallback);
      start('en');
    });
}
