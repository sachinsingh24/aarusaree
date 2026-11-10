/**
 * "Shop by Occasion" cards on the home page and the catalogue occasion filter (/sarees?occasion=<key>).
 * `keywords` are matched against each saree's English `occasion` text in products.js.
 * `image` is a lifestyle photo name (data/images.js); card text lives in i18n ui → home.occasions.<key>.
 */
export const occasions = [
  {
    key: 'wedding',
    keywords: ['wedding', 'bridal', 'reception', 'engagement', 'mehendi', 'sangeet', 'haldi', 'mangalagaur'],
    image: 'red-silk-garden',
    alt: 'alt.occasionWedding',
  },
  {
    key: 'festive',
    keywords: ['festiv', 'puja', 'diwali', 'navratri', 'ganeshotsav', 'gudi padwa', 'sankranti', 'shravan', 'karva chauth'],
    image: 'green-saree-smile',
    alt: 'alt.occasionFestive',
  },
  {
    key: 'office',
    keywords: ['office', 'day function', 'daytime', 'day reception', 'brunch', 'temple visit'],
    image: 'mint-tissue-saree',
    alt: 'alt.occasionOffice',
  },
  {
    key: 'gifting',
    keywords: ['gift'],
    image: 'trio-purple-sarees',
    alt: 'alt.occasionGifting',
  },
];

export const getOccasion = (key) => occasions.find((o) => o.key === key);

/** True if a saree suits the occasion (based on its English occasion text). */
export const matchesOccasion = (product, occasion) => {
  const text = (product.occasion || '').toLowerCase();
  return occasion.keywords.some((k) => text.includes(k));
};
