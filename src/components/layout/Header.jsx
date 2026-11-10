import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import Icon from '../common/Icon';
import Img from '../common/Img';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { navLinks, whatsappLink, contact } from '../../data/site';
import { productImage } from '../../data/images';
import { useLanguage } from '../../i18n/LanguageContext';
import { useLocalized } from '../../i18n/useLocalized';

export default function Header() {
  const { t } = useLanguage();
  const { collections } = useLocalized();
  const label = (link) => t(`nav.${link.key}`);
  const waLink = whatsappLink(t('wa.default'));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  // After navigating from the dropdown, keep it closed until the pointer leaves the menu.
  const [suppressHover, setSuppressHover] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dropdownToggleRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Compact header after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileCollectionsOpen(false);
    setSuppressHover(dropdownRef.current?.matches(':hover') ?? false);
  }, [location.pathname, location.search]);

  // Dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const onDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // If focus was inside the panel, move it back to the toggle before the panel hides.
      if (dropdownRef.current?.contains(document.activeElement)) dropdownToggleRef.current?.focus();
      setDropdownOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdownOpen]);

  // Mobile drawer: lock scroll, focus close button, Escape closes, restore focus.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    // Wait a frame so the drawer is rendered visible before moving focus into it.
    const raf = requestAnimationFrame(() => drawerCloseRef.current?.focus());
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    const trigger = menuButtonRef.current;
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // Close the drawer if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isCollectionsActive = location.pathname.startsWith('/collections');

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner container">
          <Logo />

          <nav className="main-nav" aria-label={t('nav.main')}>
            <ul className="main-nav__list">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <li
                    key={link.to}
                    className={`main-nav__item has-dropdown ${dropdownOpen ? 'is-open' : ''} ${suppressHover ? 'no-hover' : ''}`}
                    ref={dropdownRef}
                    onMouseLeave={() => {
                      setSuppressHover(false);
                      setDropdownOpen(false);
                    }}
                  >
                    <NavLink to={link.to} className={`main-nav__link ${isCollectionsActive ? 'active' : ''}`}>
                      {label(link)}
                    </NavLink>
                    <button
                      type="button"
                      className="main-nav__toggle"
                      ref={dropdownToggleRef}
                      aria-expanded={dropdownOpen}
                      aria-controls="collections-menu"
                      aria-label={t('header.showCollections')}
                      onClick={() => setDropdownOpen((o) => !o)}
                    >
                      <Icon name="chevronDown" size={14} strokeWidth={2} />
                    </button>

                    {/* Shown on hover via CSS (mouse) or via the toggle button (touch / keyboard). */}
                    <div className="dropdown" id="collections-menu">
                      <div className="dropdown__inner">
                        <ul className="dropdown__list">
                          {collections.map((c) => (
                            <li key={c.slug}>
                              <Link to={`/collections/${c.slug}`} className="dropdown__link">
                                <span className="dropdown__thumb">
                                  <Img image={productImage(c.cover)} alt="" sizes="56px" />
                                </span>
                                <span>
                                  <span className="dropdown__name">{c.title}</span>
                                  <span className="dropdown__tagline">{c.tagline}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="dropdown__footer">
                          <Link to="/collections" className="text-link">
                            {t('header.allCollections')} <Icon name="arrowRight" size={16} />
                          </Link>
                          <Link to="/sarees" className="text-link">
                            {t('header.browseAll')} <Icon name="arrowRight" size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={link.to} className="main-nav__item">
                    <NavLink to={link.to} end={link.to === '/'} className="main-nav__link">
                      {label(link)}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="site-header__actions">
            <LanguageSwitcher className="header-lang" />
            <ThemeToggle />
            <a className="btn btn--whatsapp btn--sm header-whatsapp" href={waLink} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>{t('common.whatsappEnquiry')}</span>
            </a>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t('header.openMenu')}
              ref={menuButtonRef}
            >
              <Icon name="menu" size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <aside
        id="mobile-menu"
        className={`drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label={t('header.mobileMenu')}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="drawer__top">
          <Logo onClick={() => setMenuOpen(false)} />
          <button type="button" className="drawer__close" onClick={() => setMenuOpen(false)} aria-label={t('header.closeMenu')} ref={drawerCloseRef}>
            <Icon name="close" size={26} />
          </button>
        </div>
        <nav aria-label={t('nav.mobile')}>
          <ul className="drawer__list">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <li key={link.to}>
                  <div className="drawer__row">
                    <NavLink to={link.to} className="drawer__link">
                      {label(link)}
                    </NavLink>
                    <button
                      type="button"
                      className={`drawer__expand ${mobileCollectionsOpen ? 'is-open' : ''}`}
                      aria-expanded={mobileCollectionsOpen}
                      aria-controls="mobile-collections"
                      aria-label={t('header.showCollections')}
                      onClick={() => setMobileCollectionsOpen((o) => !o)}
                    >
                      <Icon name="chevronDown" size={20} />
                    </button>
                  </div>
                  <ul id="mobile-collections" className="drawer__sublist" hidden={!mobileCollectionsOpen}>
                    {collections.map((c) => (
                      <li key={c.slug}>
                        <NavLink to={`/collections/${c.slug}`}>{c.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className="drawer__link">
                    {label(link)}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="drawer__prefs">
          <LanguageSwitcher full />
        </div>
        <div className="drawer__contact">
          <a className="btn btn--whatsapp btn--block" href={waLink} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> {t('common.whatsappEnquiry')}
          </a>
          <a className="drawer__phone" href={contact.phoneLink}>
            <Icon name="phone" size={18} /> {contact.phoneDisplay}
          </a>
        </div>
      </aside>
    </>
  );
}
