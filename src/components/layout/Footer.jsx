import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import { contact, social, navLinks, addressParts } from '../../data/site';
import { useLanguage } from '../../i18n/LanguageContext';
import { useLocalized } from '../../i18n/useLocalized';

export default function Footer() {
  const { t } = useLanguage();
  const { brand, collections, hours } = useLocalized();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__border" aria-hidden="true" />
      {/* Decorative: soft gold glow and a slowly turning mandala watermark */}
      <div className="site-footer__glow" aria-hidden="true" />
      <svg className="site-footer__mandala" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="98" />
          <circle cx="100" cy="100" r="92" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="34" />
          <circle cx="100" cy="100" r="12" />
          {Array.from({ length: 16 }, (_, i) => (
            <ellipse key={`p${i}`} cx="100" cy="52" rx="9" ry="20" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <path key={`l${i}`} d="M100 8 L106 22 L100 30 L94 22 Z" transform={`rotate(${i * 22.5 + 11.25} 100 100)`} />
          ))}
        </g>
      </svg>
      <div className="container site-footer__grid">
        <Reveal className="site-footer__brand">
          <Logo light />
          <p>{brand.intro}</p>
          <ul className="social-list" aria-label={t('common.socialMedia')}>
            {social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}: ${s.handle}`} className="social-list__link">
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="nav" className="site-footer__col" aria-labelledby="footer-explore" delay={100}>
          <h2 id="footer-explore" className="site-footer__title">
            {t('footer.explore')}
          </h2>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="site-footer__link">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="nav" className="site-footer__col" aria-labelledby="footer-collections" delay={200}>
          <h2 id="footer-collections" className="site-footer__title">
            {t('footer.collections')}
          </h2>
          <ul>
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to={`/collections/${c.slug}`} className="site-footer__link">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="site-footer__col" delay={300}>
          <h2 className="site-footer__title">{t('footer.visitUs')}</h2>
          <address>
            <p className="site-footer__line">
              <Icon name="map" size={18} />
              <span>
                {addressParts().join(', ')}
              </span>
            </p>
            <p className="site-footer__line">
              <Icon name="phone" size={18} />
              <a href={contact.phoneLink}>{contact.phoneDisplay}</a>
            </p>
            <p className="site-footer__line">
              <Icon name="mail" size={18} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p className="site-footer__line">
              <Icon name="clock" size={18} />
              <span>
                {hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </p>
          </address>
        </Reveal>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © {year} {brand.name}. {t('footer.rights')}
          </p>
          <ul>
            <li>
              <Link to="/privacy-policy">{t('footer.privacy')}</Link>
            </li>
            <li>
              <Link to="/terms">{t('footer.terms')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
