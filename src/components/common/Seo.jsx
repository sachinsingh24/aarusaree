import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalized } from '../../i18n/useLocalized';

const SITE = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

function setAttr(selector, attr, value) {
  if (!value) return;
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Per-page title & meta.
 * Updates the tags that already exist in index.html instead of adding new ones, so the head never
 * contains duplicates. Link-preview bots (which don't run JavaScript) get per-page tags from the
 * static files written by scripts/prerender-meta.mjs at build time.
 */
export default function Seo({ title, description, image, noindex = false }) {
  const { brand } = useLocalized();
  const { pathname } = useLocation();
  const desc = description || brand.seoDescription;
  const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.tagline}`;

  useEffect(() => {
    const url = `${SITE}${pathname}`;
    document.title = fullTitle;
    setAttr('meta[name="description"]', 'content', desc);
    setAttr('meta[property="og:title"]', 'content', fullTitle);
    setAttr('meta[property="og:description"]', 'content', desc);
    setAttr('meta[property="og:url"]', 'content', url);
    if (noindex) {
      // A not-found page must not declare itself the preferred URL.
      document.head.querySelector('link[rel="canonical"]')?.removeAttribute('href');
    } else {
      setAttr('link[rel="canonical"]', 'href', url);
    }
    setAttr('meta[property="og:image"]', 'content', `${SITE}${image || '/og-image.jpg'}`);
  }, [fullTitle, desc, image, pathname, noindex]);

  return null;
}
