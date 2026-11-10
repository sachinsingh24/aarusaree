import { useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { brand, contact, testimonials, about, stats } from '../data/site';
import { collections, collectionGroups } from '../data/collections';
import { galleryCategories } from '../data/gallery';

/** Overlay translated fields on English data. Empty or missing translations keep the English value. */
function merge(base, over) {
  if (!over) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v == null || v === '') continue;
    if (Array.isArray(v) && Array.isArray(base?.[k])) {
      out[k] = base[k].map((item, i) =>
        v[i] == null || v[i] === '' ? item : typeof item === 'object' && !Array.isArray(item) ? merge(item, v[i]) : v[i],
      );
    } else if (typeof v === 'object' && !Array.isArray(v) && base?.[k] && typeof base[k] === 'object') {
      out[k] = merge(base[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

const mergeList = (list, over) => list.map((item, i) => merge(item, over?.[i]));

/**
 * Language-aware view of the site data. English data files stay the single source of truth;
 * Hindi/Marathi files in src/i18n/content only override text.
 */
export function useLocalized() {
  const { content: c, lang } = useLanguage();
  return useMemo(() => {
    const localizedCollections = collections.map((col) => merge(col, c.collections?.[col.slug]));
    return {
      lang,
      brand: merge(brand, c.brand),
      hours: mergeList(contact.hours, c.hours),
      stats: mergeList(stats, c.stats),
      testimonials: mergeList(testimonials, c.testimonials),
      about: merge(about, c.about),
      collections: localizedCollections,
      collection: (slug) => localizedCollections.find((col) => col.slug === slug),
      group: (key) => merge(collectionGroups[key], c.collectionGroups?.[key]),
      product: (p) => (p ? merge(p, c.products?.[p.id]) : p),
      galleryCategories: galleryCategories.map((g) => ({ ...g, label: c.gallery?.categories?.[g.id] || g.label })),
      galleryCaption: (name, fallback) => c.gallery?.captions?.[name] || fallback,
      instagramCaption: (name, fallback) => c.gallery?.instagram?.[name] || fallback,
      legal: (type, page) => merge(page, c.legal?.[type]),
    };
  }, [c, lang]);
}
