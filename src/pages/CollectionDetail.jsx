import { Link, useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import PageBanner from '../components/common/PageBanner';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard';
import NotFound from './NotFound';
import { getProductsByCollection } from '../data/products';
import { lifestyleImage, productImage } from '../data/images';
import { whatsappLink } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

export default function CollectionDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const loc = useLocalized();
  const collection = loc.collection(slug);
  if (!collection) return <NotFound />;

  const items = getProductsByCollection(slug);
  const others = loc.collections.filter((c) => c.slug !== slug);
  const count = t(items.length === 1 ? 'common.sareeOne' : 'common.sareeMany', { count: items.length });

  return (
    <>
      <Seo title={collection.title} description={`${collection.title}: ${collection.description}`} />
      <PageBanner
        title={collection.title}
        eyebrow={collection.origin}
        text={collection.tagline}
        image={lifestyleImage(collection.banner)}
        imageAlt=""
        crumbs={[{ label: t('nav.collections'), to: '/collections' }, { label: collection.name }]}
        position="center 25%"
      />

      <section className="section section--tight" aria-labelledby="collection-about">
        <div className="container collection-intro">
          <div>
            <h2 id="collection-about" className="collection-intro__title">
              {t('collections.aboutTitle', { name: collection.name })}
            </h2>
            <p className="collection-intro__text">{collection.description}</p>
            <a className="text-link" href={whatsappLink(t('wa.collection', { collection: collection.title }))} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> {t('collections.askMore', { name: collection.name })}
            </a>
          </div>
          <ul className="collection-intro__facts">
            {collection.highlights.map((h) => (
              <li key={h}>
                <Icon name="sparkle" size={18} /> {h}
              </li>
            ))}
            <li>
              <Icon name="map" size={18} /> {collection.origin}
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="collection-products">
        <div className="container">
          <div className="list-head">
            <h2 id="collection-products" className="list-head__title">
              {collection.title}
            </h2>
            <p className="list-head__count">{count}</p>
          </div>
          {items.length ? (
            <div className="product-grid">
              {items.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state__title">{t('collections.emptyTitle')}</p>
              <p>{t('collections.emptyText')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="other-collections">
        <div className="container">
          <SectionHeading eyebrow={t('collections.keepExploring')} title={t('collections.otherCollections')} id="other-collections" />
          <ul className="mini-collections">
            {others.map((c) => (
              <li key={c.slug}>
                <Link to={`/collections/${c.slug}`} className="mini-collection">
                  <span className="mini-collection__media">
                    <Img image={productImage(c.cover)} alt="" sizes="(min-width: 900px) 20vw, 45vw" />
                  </span>
                  <span className="mini-collection__name">{c.title}</span>
                  <span className="mini-collection__tagline">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
