/**
 * Business information used across the site.
 * Values marked `// DUMMY` are placeholders — replace them with real details.
 */

const phoneDigits = '918626064964'; // used for WhatsApp + tel: links

export const brand = {
  name: "Aaru's Fancy Sarees",
  shortName: "Aaru's",
  tagline: 'Elegance Woven in Tradition',
  established: '2016', // DUMMY
  intro:
    "Aaru's Fancy Sarees is a Badlapur saree house for women who love the six yards. From temple-bordered Narayan Peths to peacock-pallu Paithanis and hand-embellished designer drapes, every piece is hand-picked for its weave, its colour and the occasions it will be worn to.",
  seoDescription:
    "Aaru's Fancy Sarees, Badlapur — Paithani, Narayan Peth, Patola silk, Kalanjali and designer sarees, hand-picked for weddings, festivals and everyday elegance. Enquire on WhatsApp.",
};

export const contact = {
  phoneDisplay: '+91 86260 64964',
  phoneLink: `tel:+${phoneDigits}`,
  whatsappNumber: phoneDigits,
  email: 'hello@aarusfancysarees.in', // DUMMY
  address: {
    // Add the shop number/building (line1), street/area (line2) and pincode when ready;
    // empty parts are simply left out wherever the address is shown.
    line1: '',
    line2: '',
    city: 'Badlapur',
    state: 'Maharashtra',
    pincode: '',
  },
  // Google Maps embed for the (dummy) address — no API key required.
  // Points at Badlapur for now; replace with the shop's exact Google Maps location when available.
  mapEmbed: 'https://www.google.com/maps?q=Badlapur,+Maharashtra&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Badlapur%2C+Maharashtra',
  hours: [
    { days: 'Monday – Saturday', time: '11:00 am – 9:00 pm' }, // DUMMY
    { days: 'Sunday', time: '12:00 pm – 8:00 pm' }, // DUMMY
  ],
};

/** Address parts to display, skipping any that are empty (e.g. ['Badlapur, Maharashtra']). */
export function addressParts(a = contact.address) {
  return [a.line1, a.line2, [a.city, a.state].filter(Boolean).join(', '), a.pincode].filter(Boolean);
}

export const social = [
  { name: 'Instagram', handle: '@aarusfancy_sarees', url: 'https://www.instagram.com/aarusfancy_sarees/', icon: 'instagram' },
  { name: 'WhatsApp', handle: contact.phoneDisplay, url: `https://wa.me/${phoneDigits}`, icon: 'whatsapp' },
  { name: 'Facebook', handle: 'swar.desai.376', url: 'https://www.facebook.com/swar.desai.376', icon: 'facebook' },
  { name: 'YouTube', handle: '@Aarusfancysarees', url: 'https://www.youtube.com/@Aarusfancysarees', icon: 'youtube' },
];

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message = `Hello Aaru's Fancy Sarees, I would like to know more about your saree collection.`) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

/** Site menu (header, mobile menu, footer). `key` is the label's translation key: nav.<key> in src/i18n/ui/*.js. */
export const navLinks = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'collections', to: '/collections', hasDropdown: true },
  { key: 'sarees', to: '/sarees' },
  { key: 'gallery', to: '/gallery' },
  { key: 'contact', to: '/contact' },
];

export const testimonials = [
  // DUMMY — replace with real customer reviews
  {
    name: 'Snehal Patil',
    city: 'Thane',
    occasion: 'Wedding reception',
    quote:
      'I bought the purple Flower Meena Paithani for my reception and the colours were even richer in person. Everyone asked where it was from. They also sent me a draping video on WhatsApp!',
  },
  {
    name: 'Ananya Iyer',
    city: 'Chembur, Mumbai',
    occasion: 'Navratri',
    quote:
      'The Narayan Peth sarees are so light and comfortable for garba nights, and the temple borders look beautiful in photos. Great prices for this quality.',
  },
  {
    name: 'Meera Joshi',
    city: 'Pune',
    occasion: 'Gift for my mother',
    quote:
      'I ordered over WhatsApp from Pune. They shared real photos and videos of every option before I decided. The Patola silk arrived beautifully packed.',
  },
  {
    name: 'Kavita Shah',
    city: 'Badlapur',
    occasion: 'Family function',
    quote:
      'The Kalanjali saree with the peacock blouse piece is a showstopper. The embroidery is neat and the blouse needed very little alteration.',
  },
  {
    name: 'Rutuja Kulkarni',
    city: 'Navi Mumbai',
    occasion: 'Office festive day',
    quote:
      'Lovely collection of designer sarees that are light enough to wear all day. The staff helped me pick a colour that suits my skin tone perfectly.',
  },
];

export const about = {
  story: [
    "Aaru's Fancy Sarees began in 2016 as a small home boutique in Badlapur, with a single cupboard of Paithanis and a long list of friends who wanted one. Word travelled from one wedding to the next, and the cupboard soon became a shop.", // DUMMY
    'Today we work directly with weavers and small workshops in Yeola, Narayanpet, Kanchipuram and Surat. We visit the looms, choose colours by hand and only bring in what we would happily wear ourselves.', // DUMMY
    'We still serve every customer the old way: unfolding sarees one by one, draping them on you, sending real photos and videos on WhatsApp, and remembering what you bought last Diwali.', // DUMMY
  ],
  journey: [
    { year: '2016', title: 'A cupboard of Paithanis', text: 'Started from home in Badlapur, sourcing directly from Yeola weavers.' }, // DUMMY
    { year: '2018', title: 'Our first store', text: 'Opened our Badlapur store with Paithani, Narayan Peth and silk collections.' }, // DUMMY
    { year: '2021', title: 'Saree shopping on WhatsApp', text: 'Began sharing live videos and photos so customers anywhere in India could shop with us.' }, // DUMMY
    { year: '2024', title: 'Designer & Kalanjali lines', text: 'Introduced hand-embellished designer drapes and our Kalanjali collection.' }, // DUMMY
  ],
  mission:
    'To bring authentic, beautifully made sarees to every woman at honest prices, and to help her choose the right drape for every occasion with personal, unhurried service.',
  vision:
    'To be the saree house that families in Maharashtra trust for generations, while keeping traditional weaves and the people who make them thriving.',
  values: [
    { title: 'Authentic weaves', text: 'Every saree is checked for weave, zari and finish before it reaches our shelves.', icon: 'loom' },
    { title: 'Honest pricing', text: 'Fair, clearly stated prices with no inflated discounts.', icon: 'tag' },
    { title: 'Personal styling', text: 'Help with colours, draping and blouse ideas, in store or on WhatsApp.', icon: 'sparkle' },
    { title: 'Supporting artisans', text: 'We buy directly from weaving clusters so more of the price reaches the weaver.', icon: 'hands' },
  ],
  craft: [
    { title: 'Zari that lasts', text: 'Borders and pallus woven with tested zari that holds its shine wash after wash.' },
    { title: 'Hand-picked silks', text: 'We choose each silk by hand for its drape, sheen and how evenly it is woven.' },
    { title: 'Hand embellishment', text: 'Our designer and Kalanjali pieces carry hand-finished cutdana, sequin and thread work.' },
    { title: 'Quality checked', text: 'Every saree is unfolded and checked for weaving flaws, colour bleed and finish before it is sold.' },
  ],
};

export const stats = [
  { value: '10,000+', label: 'Happy customers' }, // DUMMY
  { value: '5', label: 'Signature collections' },
  { value: '40+', label: 'Weaver partners' }, // DUMMY
  { value: '2016', label: 'Draping Badlapur since' }, // DUMMY
];
