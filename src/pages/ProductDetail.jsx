import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import Img from '../components/common/Img';
import Icon from '../components/common/Icon';
import Lightbox from '../components/common/Lightbox';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/common/ProductCard';
import Accordion from '../components/common/Accordion';
import NotFound from './NotFound';
import { getProduct, getProductImages, getRelatedProducts, formatPrice, SHOW_PRICES } from '../data/products';
import { contact, whatsappLink } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

const IMAGE_LABELS = ['product.imgFull', 'product.imgBody', 'product.imgBorder'];

function ProductGallery({ product }) {
  const { t } = useLanguage();
  const images = getProductImages(product).map((img, i) => ({ ...img, label: t(IMAGE_LABELS[i]) }));
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const lightboxItems = images.map((img) => ({ ...img, alt: `${product.name}: ${img.label}`, caption: `${product.name}: ${img.label}` }));

  return (
    <div className="pd-gallery">
      <div className="pd-gallery__main">
        <button type="button" className="pd-gallery__zoom" onClick={() => setLightbox(current)} aria-label={t('product.enlarge', { label: images[current].label })}>
          <Img key={images[current].src} image={images[current]} alt={`${product.name}: ${images[current].label}`} sizes="(min-width: 960px) 46vw, 100vw" priority />
          <span className="pd-gallery__zoom-hint" aria-hidden="true">
            <Icon name="zoom" size={18} /> {t('product.enlargeHint')}
          </span>
        </button>
        <div className="pd-gallery__arrows">
          <button
            type="button"
            className="icon-btn icon-btn--light"
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
            aria-label={t('product.prevImage')}
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button type="button" className="icon-btn icon-btn--light" onClick={() => setCurrent((c) => (c + 1) % images.length)} aria-label={t('product.nextImage')}>
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
      <ul className="pd-gallery__thumbs" aria-label={t('product.images')}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              className={`pd-gallery__thumb ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={t('product.show', { label: img.label })}
              aria-current={i === current ? 'true' : undefined}
            >
              <Img image={img} alt="" sizes="120px" />
              <span className="pd-gallery__thumb-label">{img.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {lightbox !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightbox}
          onClose={() => setLightbox(null)}
          // Keep the main image in step with the enlarged view.
          onChange={(i) => {
            setLightbox(i);
            setCurrent(i);
          }}
        />
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const loc = useLocalized();
  const base = getProduct(id);
  if (!base) return <NotFound />;

  const product = loc.product(base);
  const collection = loc.collection(product.collection);
  const related = getRelatedProducts(base, 4);
  const enquiry = whatsappLink(
    t('wa.product', { name: product.name, collection: collection?.title }) + (SHOW_PRICES ? '' : t('wa.productPrice')),
  );
  const specs = [
    ['product.fabric', product.fabric],
    ['product.colour', product.colour],
    ['product.design', product.design],
    ['product.length', product.length],
    ['product.blouse', product.blouse],
    ['product.occasion', product.occasion],
  ];

  return (
    <>
      <Seo
        title={`${product.name}, ${collection?.title}`}
        description={`${product.name}: ${product.description}`}
        image={`/images/og/${product.photo}.jpg`}
      />

      <section className="section section--tight product-detail">
        <div className="container">
          <nav aria-label={t('common.breadcrumb')} className="breadcrumbs breadcrumbs--dark">
            <ol>
              <li>
                <Link to="/">{t('common.home')}</Link>
              </li>
              <li>
                <Link to="/collections">{t('product.collections')}</Link>
              </li>
              <li>
                <Link to={`/collections/${collection?.slug}`}>{collection?.name}</Link>
              </li>
              <li>
                <span aria-current="page">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="pd-grid">
            {/* key resets the gallery to the first image when navigating between products */}
            <ProductGallery key={product.id} product={product} />

            <div className="pd-info">
              <Link to={`/collections/${collection?.slug}`} className="pd-info__collection">
                {collection?.title}
              </Link>
              <h1 className="pd-info__title">{product.name}</h1>
              <p className="pd-info__price">
                {formatPrice(product.price)} {SHOW_PRICES && <span className="pd-info__tax">{t('product.tax')}</span>}
              </p>
              {(product.tags.includes('new') || product.tags.includes('bestseller')) && (
                <ul className="pd-info__tags" aria-label={t('common.highlights')}>
                  {product.tags.includes('new') && <li className="badge badge--new">{t('common.newArrival')}</li>}
                  {product.tags.includes('bestseller') && <li className="badge badge--bestseller">{t('common.bestseller')}</li>}
                </ul>
              )}
              <p className="pd-info__desc">{product.description}</p>

              <div className="pd-info__actions">
                <a href={enquiry} className="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={20} /> {t('common.enquireWhatsapp')}
                </a>
                <a href={contact.phoneLink} className="btn btn--outline btn--lg">
                  <Icon name="phone" size={18} /> {t('product.call', { phone: contact.phoneDisplay })}
                </a>
              </div>

              <ul className="pd-info__perks">
                <li>
                  <Icon name="sparkle" size={18} /> {t('product.perk1')}
                </li>
                <li>
                  <Icon name="truck" size={18} /> {t('product.perk2')}
                </li>
                <li>
                  <Icon name="ruler" size={18} /> {t('product.perk3')}
                </li>
              </ul>

              <div className="pd-specs">
                <h2 className="sr-only">{t('product.details')}</h2>
                <Accordion
                  defaultOpen="details"
                  items={[
                    {
                      id: 'details',
                      title: t('product.accDetails'),
                      content: (
                        <>
                          <dl>
                            {specs.map(([k, v]) => (
                              <div key={k} className="pd-specs__row">
                                <dt>{t(k)}</dt>
                                <dd>{v}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="pd-specs__note">{t('product.note')}</p>
                        </>
                      ),
                    },
                    {
                      id: 'care',
                      title: t('product.accCare'),
                      content: (
                        <>
                          <p>{product.care}</p>
                          <p>{t('product.accCareTip')}</p>
                        </>
                      ),
                    },
                    {
                      id: 'help',
                      title: t('product.accHelp'),
                      content: <p>{t('product.accHelpText')}</p>,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading eyebrow={t('product.relatedEyebrow')} title={t('product.relatedTitle')} id="related-title" />
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
