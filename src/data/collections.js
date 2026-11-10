/**
 * Saree collections. `group` drives the Traditional / Designer highlights on the home page.
 * `banner` is a lifestyle image name; `cover` is a product image id (see data/images.js).
 */
export const collections = [
  {
    slug: 'paithani',
    name: 'Paithani',
    title: 'Paithani Sarees',
    group: 'traditional',
    origin: 'Yeola & Paithan, Maharashtra',
    tagline: 'The queen of Maharashtrian silks',
    description:
      'Paithani sarees are known for their peacock and lotus pallus and their rich zari borders. Our Paithanis come in jewel tones with contrast borders, made for weddings, Mangalagaur and family celebrations.',
    highlights: ['Peacock & lotus meena pallu', 'Contrast zari border', 'Blouse piece included'],
    banner: 'green-red-paithani-style',
    cover: 'paithani-01',
  },
  {
    slug: 'narayan-peth',
    name: 'Narayan Peth',
    title: 'Narayan Peth Sarees',
    group: 'traditional',
    origin: 'Narayanpet, Telangana',
    tagline: 'Temple borders, everyday grace',
    description:
      'Light, crisp Narayan Peth sarees in cotton-silk with traditional temple (kotakomma) borders and small woven buttis. Easy to drape and comfortable all day: ideal for festivals, pujas and office occasions.',
    highlights: ['Temple (kotakomma) border', 'Light cotton-silk body', 'Contrast pallu stripes'],
    banner: 'ivory-handloom-garden',
    cover: 'narayan-peth-02',
  },
  {
    slug: 'patola',
    name: 'Patola Silk',
    title: 'Patola Silk Sarees',
    group: 'traditional',
    origin: 'Inspired by Patan, Gujarat',
    tagline: 'Woven stories of deer & trees',
    description:
      'Soft silk sarees with Patola-inspired woven borders: deer, trees and geometric motifs in contrast colours, finished with tasselled pallus. A graceful choice for festive evenings and gifting.',
    highlights: ['Patola-inspired woven motifs', 'Soft silk drape', 'Tasselled pallu'],
    banner: 'royal-blue-silk',
    cover: 'patola-01',
  },
  {
    slug: 'kalanjali',
    name: 'Kalanjali',
    title: 'Kalanjali Collection',
    group: 'designer',
    origin: 'Aaru’s signature collection',
    tagline: 'Silk with a hand-embroidered peacock',
    description:
      'Our signature Kalanjali sarees pair a smooth silk body and gold butti weave with a statement blouse piece: a hand-embellished peacock in zari, thread, beads and stones. A saree and designer blouse in one.',
    highlights: ['Hand-embellished peacock blouse', 'Gold butti body', 'Ready to stitch'],
    banner: 'mint-silk-jewellery',
    cover: 'kalanjali-02',
  },
  {
    slug: 'designer',
    name: 'Designer',
    title: 'Designer Sarees',
    group: 'designer',
    origin: 'Contemporary drapes',
    tagline: 'Cutwork, threadwork, modern shimmer',
    description:
      'Lightweight designer sarees with cutwork borders, floral thread embroidery and cutdana highlights. Contemporary colours and an easy drape, made for receptions, cocktail evenings and festive parties.',
    highlights: ['Cutwork scalloped borders', 'Thread & cutdana embroidery', 'Lightweight drape'],
    banner: 'purple-saree-studio',
    cover: 'designer-02',
  },
];

export const collectionGroups = {
  traditional: {
    title: 'Traditional Weaves',
    text: 'Heritage handloom styles from Maharashtra, Telangana and Gujarat: Paithani, Narayan Peth and Patola silk.',
  },
  designer: {
    title: 'Designer & Signature',
    text: 'Hand-embellished Kalanjali sarees and contemporary designer drapes for receptions and celebrations.',
  },
};

export const getCollection = (slug) => collections.find((c) => c.slug === slug);
