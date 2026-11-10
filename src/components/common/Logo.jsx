import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

/** Brand logo image (public/brand_logo.jpg). Replace that file to update the logo everywhere. */
export const LOGO_SRC = '/brand_logo.jpg';

/** Brand logo + name. `light` = footer variant (larger logo, light text on navy). */
export default function Logo({ light = false, onClick }) {
  const { t } = useLanguage();
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={t('header.homeLink')} onClick={onClick}>
      <img className="logo__mark" src={LOGO_SRC} alt="" width="150" height="150" decoding="async" />
      <span className="logo__text">
        <span className="logo__name">Aaru’s</span>
        <span className="logo__sub">Fancy Sarees</span>
      </span>
    </Link>
  );
}
