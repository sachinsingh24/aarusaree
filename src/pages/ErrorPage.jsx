import { useRouteError } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Ornament from '../components/common/Ornament';
import Icon from '../components/common/Icon';
import Logo from '../components/common/Logo';
import { whatsappLink } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';

// A page file that can't be downloaded: usually a bad connection, or the site was updated
// while the visitor had it open (the old file names no longer exist). A reload fixes both.
const isLoadError = (error) =>
  /dynamically imported module|Importing a module script failed|error loading dynamically|Loading chunk|Failed to fetch/i.test(
    String(error?.message || error),
  );

/**
 * Shown instead of a page when something goes wrong while opening or showing it.
 * `standalone` is used when even the header/footer failed, so it brings its own logo.
 */
export default function ErrorPage({ standalone = false }) {
  const error = useRouteError();
  const { t } = useLanguage();

  if (import.meta.env.DEV) console.error(error);

  const loadError = isLoadError(error);
  const content = (
    <section className="not-found error-page" role="alert">
      <div className="container container--narrow">
        {standalone && (
          <div className="error-page__logo">
            <Logo />
          </div>
        )}
        <p className="not-found__code error-page__mark" aria-hidden="true">
          {loadError ? <Icon name="refresh" size={72} strokeWidth={1.2} /> : '!'}
        </p>
        <h1 className="not-found__title">{t(loadError ? 'errorPage.loadTitle' : 'errorPage.title')}</h1>
        <Ornament className="not-found__ornament" />
        <p>{t(loadError ? 'errorPage.loadText' : 'errorPage.text')}</p>
        <div className="not-found__actions">
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            <Icon name="refresh" size={18} /> {t('errorPage.reload')}
          </button>
          {/* A full page load (not a router link) so the visitor gets a fresh copy of the site. */}
          <a href="/" className="btn btn--outline">
            {t('notFound.back')}
          </a>
          <a href={whatsappLink(t('wa.default'))} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> {t('errorPage.help')}
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Seo title={t('errorPage.seoTitle')} description={t('errorPage.text')} noindex />
      <meta name="robots" content="noindex" />
      {standalone ? <main id="main">{content}</main> : content}
    </>
  );
}

