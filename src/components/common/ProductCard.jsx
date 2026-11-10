import { Link } from 'react-router-dom';
import Img from './Img';
import Icon from './Icon';
import { productImage } from '../../data/images';
import { formatPrice } from '../../data/products';
import { useLanguage } from '../../i18n/LanguageContext';
import { useLocalized } from '../../i18n/useLocalized';

const BADGES = { new: 'common.newArrival', bestseller: 'common.bestseller' };

/** Product tile: image swaps to a close-up on hover; the whole card links to the details page. */
export default function ProductCard({ product: base, sizes = '(min-width: 1200px) 22vw, (min-width: 768px) 30vw, 46vw', headingLevel = 3 }) {
  const { t } = useLanguage();
  const loc = useLocalized();
  const product = loc.product(base);
  const collection = loc.collection(product.collection);
  const badge = product.tags.find((tag) => BADGES[tag]);
  const Heading = `h${headingLevel}`;

  return (
    <article className="product-card">
      <Link to={`/sarees/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <Img image={productImage(product.photo)} alt={`${product.name}: ${product.colour}`} sizes={sizes} className="product-card__img" />
          <Img image={productImage(product.photo, 'd1')} alt="" sizes={sizes} className="product-card__img product-card__img--alt" />
          {badge && <span className={`badge badge--${badge}`}>{t(BADGES[badge])}</span>}
          <span className="product-card__cta" aria-hidden="true">
            {t('common.viewDetails')} <Icon name="arrowRight" size={16} />
          </span>
        </div>
        <div className="product-card__body">
          <p className="product-card__collection">{collection?.name}</p>
          <Heading className="product-card__name">{product.name}</Heading>
          <p className="product-card__desc">{product.description}</p>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
