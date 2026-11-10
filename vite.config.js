import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { brand, contact, social } from './src/data/site.js';

/**
 * Adds the store details that Google reads (name, phone, address, map pin, social pages) to
 * index.html, built from src/data/site.js so they always match what the website shows.
 */
function storeDetails(siteUrl) {
  const { address, geo } = contact;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: brand.name,
    slogan: brand.tagline,
    ...(siteUrl && { url: `${siteUrl}/`, image: `${siteUrl}/og-image.jpg` }),
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [address.line1, address.line2].filter(Boolean).join(', '),
      addressLocality: address.city,
      postalCode: address.pincode || undefined,
      addressRegion: address.state,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng },
    sameAs: social.filter((s) => s.icon !== 'whatsapp').map((s) => s.url),
  };
  // "<" is escaped so text in the data can never close the script tag early.
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return {
    name: 'store-details',
    transformIndexHtml: () => [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: json, injectTo: 'head' }],
  };
}

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL || '').replace(/\/$/, '');
  return {
    plugins: [react(), storeDetails(siteUrl)],
    server: { port: 5173 },
  };
});
