import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import PageBanner from '../components/common/PageBanner';
import SectionHeading from '../components/common/SectionHeading';
import { collectionGroups } from '../data/collections';
import { getProductsByCollection, formatPrice, SHOW_PRICES } from '../data/products';
import { lifestyleImage, productImage, siteImages } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

function CollectionRow({ collection, index }) {
  const { t } = useLanguage();
  const items = getProductsByCollection(collection.slug);
  const from = Math.min(...items.map((p) => p.price));
  const count = t(items.length === 1 ? 'common.sareeOne' : 'common.sareeMany', { count: items.length });
  return (
    <Reveal as="article" className={`collection-row ${index % 2 ? 'collection-row--reverse' : ''}`}>
      <Link to={`/collections/${collection.slug}`} className="collection-row__media" tabIndex={-1} aria-hidden="true">
        <Img image={lifestyleImage(collection.banner)} alt="" sizes="(min-width: 900px) 40vw, 100vw" className="collection-row__banner" />
        <span className="collection-row__product">
          <Img image={productImage(collection.cover)} alt="" sizes="(min-width: 900px) 14vw, 30vw" />
        </span>
      </Link>
      <div className="collection-row__body">
        <span className="collection-row__num">{String(index + 1).padStart(2, '0')}</span>
        <p className="eyebrow">{collection.origin}</p>
        <h2 className="collection-row__title">
          <Link to={`/collections/${collection.slug}`}>{collection.title}</Link>
        </h2>
        <p className="collection-row__tagline">{collection.tagline}</p>
        <p>{collection.description}</p>
        <ul className="tick-list">
          {collection.highlights.map((h) => (
            <li key={h}>
              <Icon name="check" size={16} /> {h}
            </li>
          ))}
        </ul>
        <p className="collection-row__meta">
          {count}
          {SHOW_PRICES && items.length > 0 && <> · {t('collections.from', { price: formatPrice(from) })}</>}
        </p>
        <Link to={`/collections/${collection.slug}`} className="btn btn--outline">
          {t('collections.view', { name: collection.name })} <Icon name="arrowRight" size={18} />
        </Link>
      </div>
    </Reveal>
  );
}

export default function Collections() {
  const { t } = useLanguage();
  const loc = useLocalized();
  let n = 0;
  return (
    <>
      <Seo title={t('collections.seoTitle')} description={t('collections.seoDescription')} />
      <PageBanner
        title={t('collections.bannerTitle')}
        eyebrow={t('collections.bannerEyebrow')}
        text={t('collections.bannerText')}
        image={lifestyleImage(siteImages.collectionsBanner)}
        imageAlt={t('alt.collectionsBanner')}
        crumbs={[{ label: t('nav.collections') }]}
        position="center 25%"
      />
      {Object.keys(collectionGroups).map((key) => {
        const group = loc.group(key);
        return (
          <section key={key} className={`section ${key === 'designer' ? 'section--cream' : ''}`} aria-labelledby={`group-${key}`}>
            <div className="container">
              <SectionHeading
                eyebrow={key === 'traditional' ? t('collections.heritageEyebrow') : t('collections.designerEyebrow')}
                title={group.title}
                intro={group.text}
                id={`group-${key}`}
              />
              <div className="collection-rows">
                {loc.collections
                  .filter((c) => c.group === key)
                  .map((c) => (
                    <CollectionRow key={c.slug} collection={c} index={n++} />
                  ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
