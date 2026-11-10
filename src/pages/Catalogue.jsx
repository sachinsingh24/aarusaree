import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Icon from '../components/common/Icon';
import PageBanner from '../components/common/PageBanner';
import ProductCard from '../components/common/ProductCard';
import { products, SHOW_PRICES } from '../data/products';
import { collections } from '../data/collections';
import { getOccasion, matchesOccasion } from '../data/occasions';
import { lifestyleImage, siteImages } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

const SORTS = [
  { id: 'featured', key: 'catalogue.sortFeatured' },
  { id: 'new', key: 'catalogue.sortNew' },
  { id: 'price-asc', key: 'catalogue.sortPriceAsc', needsPrices: true },
  { id: 'price-desc', key: 'catalogue.sortPriceDesc', needsPrices: true },
  { id: 'name', key: 'catalogue.sortName' },
].filter((s) => SHOW_PRICES || !s.needsPrices);

const score = (p) => (p.tags.includes('featured') ? 2 : 0) + (p.tags.includes('bestseller') ? 1 : 0);

export default function Catalogue() {
  const { t, lang } = useLanguage();
  const loc = useLocalized();
  const [params, setParams] = useSearchParams();
  const active = collections.some((c) => c.slug === params.get('collection')) ? params.get('collection') : 'all';
  const query = params.get('q') ?? '';
  const occasion = getOccasion(params.get('occasion'));
  const sort = SORTS.some((s) => s.id === params.get('sort')) ? params.get('sort') : 'featured';

  const update = (key, value, defaultValue) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => active === 'all' || p.collection === active);
    if (occasion) list = list.filter((p) => matchesOccasion(p, occasion));
    if (q) {
      // Match English and the current language, so "पैठणी" and "paithani" both work.
      list = list.filter((p) => {
        const l = loc.product(p);
        const col = collections.find((c) => c.slug === p.collection);
        const lc = loc.collection(p.collection);
        return [p.name, p.colour, p.fabric, p.design, p.occasion, col?.name, l.name, l.colour, l.fabric, l.design, l.occasion, lc?.name]
          .join(' ')
          .toLowerCase()
          .includes(q);
      });
    }
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'name') sorted.sort((a, b) => loc.product(a).name.localeCompare(loc.product(b).name, lang));
    else if (sort === 'new') sorted.sort((a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')));
    else sorted.sort((a, b) => score(b) - score(a));
    return sorted;
  }, [active, query, sort, loc, lang, occasion]);

  const counts = useMemo(
    () => Object.fromEntries(collections.map((c) => [c.slug, products.filter((p) => p.collection === c.slug).length])),
    [],
  );

  const activeCollection = active === 'all' ? null : loc.collection(active);
  const reset = () => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true });
  const countText = t(results.length === 1 ? 'common.sareeOne' : 'common.sareeMany', { count: results.length });

  return (
    <>
      <Seo
        title={activeCollection ? t('catalogue.seoTitleFiltered', { title: activeCollection.title }) : t('catalogue.seoTitle')}
        description={t('catalogue.seoDescription')}
      />
      <PageBanner
        title={t('catalogue.bannerTitle')}
        eyebrow={t('catalogue.bannerEyebrow')}
        text={t('catalogue.bannerText')}
        image={lifestyleImage(siteImages.catalogueBanner)}
        imageAlt=""
        crumbs={[{ label: t('catalogue.crumb') }]}
      />

      <section className="section section--tight" aria-label={t('catalogue.sectionLabel')}>
        <div className="container">
          <div className="catalogue-toolbar">
            <div className="filter-chips" role="group" aria-label={t('catalogue.filterLabel')}>
              <button type="button" className={`chip ${active === 'all' ? 'is-active' : ''}`} aria-pressed={active === 'all'} onClick={() => update('collection', 'all', 'all')}>
                {t('catalogue.all')} <span className="chip__count">{products.length}</span>
              </button>
              {loc.collections.map((c) => (
                <button
                  type="button"
                  key={c.slug}
                  className={`chip ${active === c.slug ? 'is-active' : ''}`}
                  aria-pressed={active === c.slug}
                  onClick={() => update('collection', c.slug, 'all')}
                >
                  {c.name} <span className="chip__count">{counts[c.slug]}</span>
                </button>
              ))}
            </div>

            <div className="catalogue-toolbar__row">
              <div className="search-field">
                <label htmlFor="catalogue-search" className="sr-only">
                  {t('catalogue.searchLabel')}
                </label>
                <Icon name="search" size={18} className="search-field__icon" />
                <input
                  id="catalogue-search"
                  type="search"
                  placeholder={t('catalogue.searchPlaceholder')}
                  value={query}
                  onChange={(e) => update('q', e.target.value, '')}
                  autoComplete="off"
                />
              </div>
              <div className="select-field">
                <label htmlFor="catalogue-sort">{t('catalogue.sortBy')}</label>
                <select id="catalogue-sort" value={sort} onChange={(e) => update('sort', e.target.value, 'featured')}>
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(s.key)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="catalogue-count" aria-live="polite">
            <strong>{t('catalogue.showing', { count: countText })}</strong>
            {activeCollection && <> · {activeCollection.title}</>}
            {occasion && (
              <>
                {' · '}
                <button type="button" className="chip chip--active-filter" onClick={() => update('occasion', '', '')} aria-label={`${t(`home.occasions.${occasion.key}.title`)}: ${t('catalogue.clearFilter')}`}>
                  {t(`home.occasions.${occasion.key}.title`)} <Icon name="close" size={14} />
                </button>
              </>
            )}
            {query.trim() && <> · “{query.trim()}”</>}
          </p>

          {results.length ? (
            <div className="product-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={36} className="empty-state__icon" />
              <p className="empty-state__title">{t('catalogue.emptyTitle')}</p>
              <p>{t('catalogue.emptyText')}</p>
              <button type="button" className="btn btn--primary" onClick={reset}>
                {t('catalogue.clear')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
