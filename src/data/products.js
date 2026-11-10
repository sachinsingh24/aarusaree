/**
 * Product catalogue. Names, prices and specifications are DUMMY: replace them with real details.
 * `photo` is the product image id (see data/images.js). Every product automatically gets
 * three gallery images: the full view plus two close-up details.
 * `tags`: 'new' → New Arrivals, 'bestseller' → Best Sellers, 'featured' → home highlights.
 */
import { productImage } from './images.js';

const STANDARD_LENGTH = '5.5 m saree + 0.8 m blouse piece';

const paithaniCare = 'Dry clean only. Store folded in a muslin cloth and refold every few months.';
const silkCare = 'Dry clean recommended. Avoid spraying perfume directly on the zari.';
const cottonSilkCare = 'Gentle hand wash in cold water for the first wash, or dry clean. Dry in shade.';
const embellishedCare = 'Dry clean only. Store flat or loosely folded to protect the embellishment.';

export const products = [
  // ── Paithani ────────────────────────────────────────────
  {
    id: 'flower-meena-paithani-purple',
    photo: 'paithani-01',
    name: 'Flower Meena Paithani',
    collection: 'paithani',
    price: 8950,
    colour: 'Royal purple with bottle-green border',
    fabric: 'Semi-silk Paithani',
    design: 'Peacock & lotus-vine meena pallu, traditional Paithani zari border',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece with zari border',
    occasion: 'Weddings, Mangalagaur, festive pujas',
    care: paithaniCare,
    description:
      'A rich royal-purple Paithani with a multicolour peacock perched on a lotus vine, framed by a deep bottle-green border with fine zari checks. A timeless choice for brides and wedding guests.',
    tags: ['bestseller', 'featured'],
  },
  {
    id: 'rama-green-meena-paithani',
    photo: 'paithani-02',
    name: 'Rama Green Meena Paithani',
    collection: 'paithani',
    price: 9450,
    colour: 'Rama green with sindoor-red border',
    fabric: 'Semi-silk Paithani',
    design: 'Pink & blue peacock with gold floral vine, red zari border',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched red blouse piece with zari border',
    occasion: 'Weddings, haldi, Gudi Padwa',
    care: paithaniCare,
    description:
      'Fresh rama green meets classic sindoor red in this Paithani. The pallu features a pink-and-blue peacock among gold flowering vines, and the wide red border is woven with fine zari diamonds.',
    tags: ['new', 'featured'],
  },

  // ── Narayan Peth ────────────────────────────────────────
  {
    id: 'royal-blue-mint-narayan-peth',
    photo: 'narayan-peth-01',
    name: 'Royal Blue & Mint Narayan Peth',
    collection: 'narayan-peth',
    price: 2450,
    colour: 'Royal blue with mint-green border',
    fabric: 'Cotton silk',
    design: 'Paisley buttis, temple border, broad zari pallu stripes',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece',
    occasion: 'Festivals, pujas, office festive days',
    care: cottonSilkCare,
    description:
      'Deep royal blue scattered with gold paisley buttis and finished with a cool mint-green temple border. Light, crisp and easy to drape for long festive days.',
    tags: ['bestseller'],
  },
  {
    id: 'violet-sindoor-narayan-peth',
    photo: 'narayan-peth-02',
    name: 'Violet & Sindoor Narayan Peth',
    collection: 'narayan-peth',
    price: 2450,
    colour: 'Violet with sindoor-red & orange border',
    fabric: 'Cotton silk',
    design: 'Paisley buttis, kotakomma temple border, zari bands',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece',
    occasion: 'Navratri, Ganeshotsav, family functions',
    care: cottonSilkCare,
    description:
      'A glowing violet body paired with a vivid sindoor-and-orange temple border and woven zari bands. One of our most loved Narayan Peths for festive evenings.',
    tags: ['bestseller', 'featured'],
  },
  {
    id: 'purple-haldi-narayan-peth',
    photo: 'narayan-peth-03',
    name: 'Purple & Haldi Yellow Narayan Peth',
    collection: 'narayan-peth',
    price: 2350,
    colour: 'Plum purple with haldi-yellow border',
    fabric: 'Cotton silk',
    design: 'Paisley buttis with a tall temple border',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece',
    occasion: 'Haldi, Sankranti, festive pujas',
    care: cottonSilkCare,
    description:
      'Plum purple paired with sunny haldi yellow. The tall temple border and gold paisley buttis give this light cotton-silk saree a classic festive look.',
    tags: [],
  },
  {
    id: 'indigo-rani-narayan-peth',
    photo: 'narayan-peth-04',
    name: 'Indigo & Rani Pink Narayan Peth',
    collection: 'narayan-peth',
    price: 2450,
    colour: 'Indigo violet with rani-pink border',
    fabric: 'Cotton silk',
    design: 'Floral buttis, temple border, multi-stripe zari pallu',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece',
    occasion: 'Festivals, temple visits, gifting',
    care: cottonSilkCare,
    description:
      'Indigo violet with copper-gold floral buttis and a bright rani-pink temple border with orange and green zari stripes: the classic Narayan Peth look.',
    tags: [],
  },
  {
    id: 'parrot-green-narayan-peth',
    photo: 'narayan-peth-05',
    name: 'Parrot Green & Purple Narayan Peth',
    collection: 'narayan-peth',
    price: 2250,
    colour: 'Parrot green with magenta-purple border',
    fabric: 'Cotton silk',
    design: 'Small gold buttis, temple border, zari band pallu',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched contrast blouse piece',
    occasion: 'Shravan, baby showers, daytime functions',
    care: cottonSilkCare,
    description:
      'Bright parrot green with a magenta-purple temple border. A cheerful, light saree for daytime celebrations.',
    tags: ['new'],
  },

  // ── Patola Silk ─────────────────────────────────────────
  {
    id: 'teal-violet-patola-silk',
    photo: 'patola-01',
    name: 'Teal & Violet Patola Silk',
    collection: 'patola',
    price: 3950,
    colour: 'Peacock teal with violet border',
    fabric: 'Soft silk',
    design: 'Patola-inspired deer & tree border, tasselled pallu',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched violet blouse piece',
    occasion: 'Festive evenings, receptions, gifting',
    care: silkCare,
    description:
      'Peacock teal soft silk with a violet border woven with deer and trees in the Patola style, finished with a tasselled pallu. Lustrous, light and easy to wear.',
    tags: ['new', 'featured'],
  },
  {
    id: 'olive-bottle-green-patola-silk',
    photo: 'patola-02',
    name: 'Olive & Bottle Green Patola Silk',
    collection: 'patola',
    price: 3950,
    colour: 'Olive green with bottle-green border',
    fabric: 'Soft silk',
    design: 'Woven deer, tree & bird motifs with zari border bands',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched bottle-green blouse piece',
    occasion: 'Diwali, family functions, gifting',
    care: silkCare,
    description:
      'Earthy olive green paired with a deep bottle-green border of red and blue deer, trees and birds, framed by gold zari bands.',
    tags: ['bestseller'],
  },
  {
    id: 'magenta-teal-patola-silk',
    photo: 'patola-03',
    name: 'Magenta & Teal Patola Silk',
    collection: 'patola',
    price: 4250,
    colour: 'Magenta purple with teal border',
    fabric: 'Soft silk',
    design: 'Patola-style deer & tree border, floral body motifs',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched teal blouse piece',
    occasion: 'Receptions, sangeet, festive evenings',
    care: silkCare,
    description:
      'Vivid magenta purple with a teal border of woven deer and trees and soft floral motifs on the body. A striking contrast that photographs beautifully.',
    tags: ['new'],
  },
  {
    id: 'olive-maroon-zari-patola-silk',
    photo: 'patola-05',
    name: 'Olive & Maroon Zari Pallu Silk',
    collection: 'patola',
    price: 4450,
    colour: 'Olive with maroon & gold pallu',
    fabric: 'Soft silk',
    design: 'Rich zari jacquard pallu with floral and diamond motifs',
    length: STANDARD_LENGTH,
    blouse: 'Unstitched maroon blouse piece',
    occasion: 'Weddings, Diwali, family functions',
    care: silkCare,
    description:
      'An olive silk body leads into a deep maroon pallu woven with gold floral bands and diamond motifs. Grand without being heavy.',
    tags: ['bestseller'],
  },

  // ── Kalanjali ───────────────────────────────────────────
  {
    id: 'peacock-blue-mayur-kalanjali',
    photo: 'kalanjali-01',
    name: 'Peacock Blue Mayur Kalanjali',
    collection: 'kalanjali',
    price: 4850,
    colour: 'Peacock blue with green shot',
    fabric: 'Soft silk with gold butti weave',
    design: 'Hand-embellished peacock blouse with zari, beads & stones',
    length: STANDARD_LENGTH,
    blouse: 'Embroidered peacock blouse piece (unstitched)',
    occasion: 'Receptions, engagements, festive parties',
    care: embellishedCare,
    description:
      'Shimmering peacock-blue silk with gold flower buttis, paired with a blouse piece hand-embellished with a full peacock in copper zari, maroon thread, beads and stones.',
    tags: ['bestseller', 'featured'],
  },
  {
    id: 'emerald-mayur-kalanjali',
    photo: 'kalanjali-02',
    name: 'Emerald Mayur Kalanjali',
    collection: 'kalanjali',
    price: 4850,
    colour: 'Emerald green',
    fabric: 'Soft silk with gold butti weave',
    design: 'Hand-embellished peacock blouse with zari, beads & stones',
    length: STANDARD_LENGTH,
    blouse: 'Embroidered peacock blouse piece (unstitched)',
    occasion: 'Mehendi, engagements, festive parties',
    care: embellishedCare,
    description:
      'Rich emerald silk with gold buttis and a red, mustard and gold hand-embroidered peacock blouse piece. A festive look that needs very little jewellery.',
    tags: ['new'],
  },
  {
    id: 'aqua-teal-mayur-kalanjali',
    photo: 'kalanjali-03',
    name: 'Aqua Teal Mayur Kalanjali',
    collection: 'kalanjali',
    price: 4650,
    colour: 'Aqua teal with green shot',
    fabric: 'Soft silk with gold butti weave',
    design: 'Hand-embellished peacock blouse with zari, beads & stones',
    length: STANDARD_LENGTH,
    blouse: 'Embroidered peacock blouse piece (unstitched)',
    occasion: 'Day functions, baby showers, festive pujas',
    care: embellishedCare,
    description:
      'Fresh aqua teal silk with a green shot and gold butti weave, paired with a colourful hand-embroidered peacock blouse piece.',
    tags: [],
  },
  {
    id: 'rani-wine-mayur-kalanjali',
    photo: 'kalanjali-04',
    name: 'Rani Wine Mayur Kalanjali',
    collection: 'kalanjali',
    price: 4850,
    colour: 'Wine with rani-pink sheen',
    fabric: 'Soft silk with gold butti weave',
    design: 'Hand-embellished peacock blouse, gold woven border',
    length: STANDARD_LENGTH,
    blouse: 'Embroidered peacock blouse piece (unstitched)',
    occasion: 'Weddings, receptions, karva chauth',
    care: embellishedCare,
    description:
      'Deep wine silk with a rani-pink sheen and a gold woven border, paired with a green and gold hand-embellished peacock blouse piece. Regal and romantic.',
    tags: ['new', 'featured'],
  },
  {
    id: 'sindoor-red-mayur-kalanjali',
    photo: 'kalanjali-05',
    name: 'Sindoor Red Mayur Kalanjali',
    collection: 'kalanjali',
    price: 4950,
    colour: 'Sindoor red',
    fabric: 'Soft silk with gold butti weave',
    design: 'Hand-embellished peacock blouse with zari, beads & stones',
    length: STANDARD_LENGTH,
    blouse: 'Embroidered peacock blouse piece (unstitched)',
    occasion: 'Bridal functions, karva chauth, festivals',
    care: embellishedCare,
    description:
      'Traditional sindoor red silk with gold buttis and a richly embellished peacock blouse piece in gold, green and orange. A favourite for new brides.',
    tags: ['bestseller'],
  },

  // ── Designer ────────────────────────────────────────────
  {
    id: 'copper-rose-tissue-designer',
    photo: 'designer-01',
    name: 'Copper Rose Crush Tissue Saree',
    collection: 'designer',
    price: 6450,
    colour: 'Copper brown',
    fabric: 'Crushed tissue silk',
    design: 'Rose-vine thread embroidery with cutdana, scalloped border',
    length: STANDARD_LENGTH,
    blouse: 'Matching embroidered blouse piece (unstitched)',
    occasion: 'Receptions, cocktail evenings, Diwali parties',
    care: embellishedCare,
    description:
      'Soft crushed tissue in a warm copper tone, embroidered with climbing roses in matching thread and sparkling cutdana, finished with a delicate scalloped border.',
    tags: ['new', 'featured'],
  },
  {
    id: 'peacock-teal-cutwork-designer',
    photo: 'designer-02',
    name: 'Peacock Teal Cutwork Saree',
    collection: 'designer',
    price: 5250,
    colour: 'Peacock teal',
    fabric: 'Dola silk blend',
    design: 'Ivory leaf cutwork border with embroidered leaf buttis',
    length: STANDARD_LENGTH,
    blouse: 'Matching blouse piece (unstitched)',
    occasion: 'Receptions, sangeet, festive parties',
    care: embellishedCare,
    description:
      'Deep peacock teal with a wide ivory cutwork border of leaves and vines, plus embroidered leaf buttis across the body. Light, elegant and easy to carry.',
    tags: ['bestseller'],
  },
  {
    id: 'turquoise-cutwork-designer',
    photo: 'designer-03',
    name: 'Turquoise Leaf Cutwork Saree',
    collection: 'designer',
    price: 5250,
    colour: 'Turquoise blue',
    fabric: 'Dola silk blend',
    design: 'Ivory leaf cutwork border with embroidered leaf buttis',
    length: STANDARD_LENGTH,
    blouse: 'Matching blouse piece (unstitched)',
    occasion: 'Day receptions, engagements, festive brunches',
    care: embellishedCare,
    description:
      'Bright turquoise with ivory leaf cutwork borders. A fresh, contemporary saree for daytime celebrations.',
    tags: [],
  },
  {
    id: 'bottle-green-cutwork-designer',
    photo: 'designer-04',
    name: 'Bottle Green Leaf Cutwork Saree',
    collection: 'designer',
    price: 5250,
    colour: 'Bottle green',
    fabric: 'Dola silk blend',
    design: 'Ivory leaf cutwork border with embroidered leaf buttis',
    length: STANDARD_LENGTH,
    blouse: 'Matching blouse piece (unstitched)',
    occasion: 'Mehendi, festive evenings, parties',
    care: embellishedCare,
    description:
      'Rich bottle green with an ivory cutwork border that stands out beautifully. An elegant, versatile evening saree.',
    tags: [],
  },
  {
    id: 'orchid-purple-cutwork-designer',
    photo: 'designer-05',
    name: 'Orchid Purple Cutwork Saree',
    collection: 'designer',
    price: 5250,
    colour: 'Orchid purple',
    fabric: 'Dola silk blend',
    design: 'Ivory leaf cutwork border with embroidered leaf buttis',
    length: STANDARD_LENGTH,
    blouse: 'Matching blouse piece (unstitched)',
    occasion: 'Sangeet, cocktail evenings, receptions',
    care: embellishedCare,
    description:
      'A rich orchid purple with a wide ivory cutwork border. Pair it with pearls or silver jewellery for a modern look.',
    tags: ['new'],
  },
  {
    id: 'midnight-indigo-cutwork-designer',
    photo: 'designer-06',
    name: 'Midnight Indigo Cutwork Saree',
    collection: 'designer',
    price: 5450,
    colour: 'Midnight indigo',
    fabric: 'Dola silk blend',
    design: 'Ivory leaf cutwork border with embroidered leaf buttis',
    length: STANDARD_LENGTH,
    blouse: 'Matching blouse piece (unstitched)',
    occasion: 'Cocktail evenings, receptions, winter weddings',
    care: embellishedCare,
    description:
      'A deep midnight indigo with an ivory cutwork border. Dark and dramatic, made for evening events.',
    tags: [],
  },
];

/* ── Helpers ─────────────────────────────────────────────── */

/**
 * Price display switch. While false, every price on the site shows PRICE_PLACEHOLDER,
 * price sorting is hidden and prices are left out of WhatsApp messages.
 * The `price` values above are kept, so set this to true to bring prices back.
 */
export const SHOW_PRICES = false;
export const PRICE_PLACEHOLDER = '₹ ----';

export const formatPrice = (value) =>
  SHOW_PRICES
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
    : PRICE_PLACEHOLDER;

export const getProduct = (id) => products.find((p) => p.id === id);

export const getProductsByCollection = (slug) => products.filter((p) => p.collection === slug);

export const getProductsByTag = (tag) => products.filter((p) => p.tags.includes(tag));

/** Gallery images for a product: full view + two detail close-ups. */
export const getProductImages = (product) => [
  { ...productImage(product.photo), label: 'Full view' },
  { ...productImage(product.photo, 'd1'), label: 'Body & motifs' },
  { ...productImage(product.photo, 'd2'), label: 'Border & pallu' },
];

/** Same-collection products first, then others, excluding the current one. */
export const getRelatedProducts = (product, count = 4) => {
  const same = products.filter((p) => p.collection === product.collection && p.id !== product.id);
  const others = products.filter((p) => p.collection !== product.collection);
  return [...same, ...others].slice(0, count);
};
