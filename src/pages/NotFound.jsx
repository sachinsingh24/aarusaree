import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Ornament from '../components/common/Ornament';
import Icon from '../components/common/Icon';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <>
      <Seo title={t('notFound.seoTitle')} description={t('notFound.seoDescription')} noindex />
      <meta name="robots" content="noindex" />
      <section className="not-found">
        <div className="container container--narrow">
          <p className="not-found__code" aria-hidden="true">
            404
          </p>
          <h1 className="not-found__title">{t('notFound.title')}</h1>
          <Ornament className="not-found__ornament" />
          <p>{t('notFound.text')}</p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary">
              {t('notFound.back')}
            </Link>
            <Link to="/sarees" className="btn btn--outline">
              {t('notFound.browse')} <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
