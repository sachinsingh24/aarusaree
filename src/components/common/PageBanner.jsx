import { Link } from 'react-router-dom';
import Img from './Img';
import Ornament from './Ornament';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Inner-page hero banner with breadcrumbs.
 * crumbs: [{ label, to? }] — last item is the current page.
 */
export default function PageBanner({ title, eyebrow, text, image, imageAlt = '', crumbs = [], position = 'center 30%' }) {
  const { t } = useLanguage();
  return (
    <section className="page-banner" aria-labelledby="page-title">
      {image && (
        <div className="page-banner__media">
          <Img image={image} alt={imageAlt} sizes="100vw" priority style={{ objectPosition: position }} />
        </div>
      )}
      <div className="page-banner__inner container">
        {crumbs.length > 0 && (
          <nav aria-label={t('common.breadcrumb')} className="breadcrumbs">
            <ol>
              <li>
                <Link to="/">{t('common.home')}</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 id="page-title" className="page-banner__title">
          {title}
        </h1>
        <Ornament className="page-banner__ornament" />
        {text && <p className="page-banner__text">{text}</p>}
      </div>
    </section>
  );
}
