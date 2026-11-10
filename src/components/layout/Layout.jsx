import { Suspense, useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollExtras from './ScrollExtras';
import Icon from '../common/Icon';
import { whatsappLink } from '../../data/site';
import { useLanguage } from '../../i18n/LanguageContext';

function PageLoader() {
  const { t } = useLanguage();
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" aria-hidden="true" />
      <span className="sr-only">{t('common.loading')}</span>
    </div>
  );
}

export default function Layout() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  // The fade-up plays when moving between pages, not on the first load (the hero has its own entrance).
  const hasNavigated = useRef(false);
  const firstPath = useRef(pathname);
  useEffect(() => {
    if (pathname !== firstPath.current) hasNavigated.current = true;
  }, [pathname]);
  const animate = hasNavigated.current || pathname !== firstPath.current;
  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skip')}
      </a>
      {/* New pages open at the top; Back/Forward restore where the visitor was. */}
      <ScrollRestoration />
      <ScrollExtras />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          {/* Keyed by page so each new page plays the fade-up (filters and ?search changes don't). */}
          <div key={pathname} className={`page-transition ${animate ? 'is-entering' : ''}`}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <a className="whatsapp-float" href={whatsappLink(t('wa.default'))} target="_blank" rel="noopener noreferrer" aria-label={t('common.chatWithUs')}>
        <Icon name="whatsapp" size={30} className="whatsapp-float__icon" />
      </a>
    </>
  );
}
