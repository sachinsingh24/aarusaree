// Runs after `vite build`. Writes dist/<page>/index.html for every page with that page's own
// title, description, canonical URL and share image, so WhatsApp/Facebook link previews
// (which don't run JavaScript) show the right saree instead of the homepage.
// The React app still loads normally on top of each file.
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';
import { brand, contact } from '../src/data/site.js';
import { collections } from '../src/data/collections.js';
import { products } from '../src/data/products.js';
import ui from '../src/i18n/ui/en.js';

const DIST = 'dist';
const SITE = (loadEnv('production', process.cwd(), '').VITE_SITE_URL || '').replace(/\/$/, '');
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const titled = (t) => `${t} | ${brand.name}`;
const DEFAULT_IMAGE = '/og-image.jpg';

const pages = [
  { path: '/', title: `${brand.name} | ${brand.tagline}`, description: brand.seoDescription },
  { path: '/about', title: titled(ui.about.seoTitle), description: fill(ui.about.seoDescription, { year: brand.established }) },
  { path: '/collections', title: titled(ui.collections.seoTitle), description: ui.collections.seoDescription },
  ...collections.map((c) => ({ path: `/collections/${c.slug}`, title: titled(c.title), description: `${c.title}: ${c.description}` })),
  { path: '/sarees', title: titled(ui.catalogue.seoTitle), description: ui.catalogue.seoDescription },
  ...products.map((p) => {
    const col = collections.find((c) => c.slug === p.collection);
    return {
      path: `/sarees/${p.id}`,
      title: titled(`${p.name}, ${col?.title}`),
      description: `${p.name}: ${p.description}`,
      photo: p.photo,
    };
  }),
  { path: '/gallery', title: titled(ui.gallery.seoTitle), description: ui.gallery.seoDescription },
  { path: '/contact', title: titled(ui.contact.seoTitle), description: fill(ui.contact.seoDescription, { phone: contact.phoneDisplay }) },
  { path: '/privacy-policy', title: titled(ui.footer.privacy), description: brand.seoDescription },
  { path: '/terms', title: titled(ui.footer.terms), description: brand.seoDescription },
];

/** Product share image: the saree photo on a warm background, 1200×630 JPG. */
async function productShareImage(photo) {
  const out = `/images/og/${photo}.jpg`;
  await mkdir(path.join(DIST, 'images/og'), { recursive: true });
  await sharp(path.join(DIST, `images/products/${photo}-960.webp`))
    .resize(1200, 630, { fit: 'contain', background: '#f5f1ea' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(DIST, out));
  return out;
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

function render(page, image) {
  const url = `${SITE}${page.path === '/' ? '/' : page.path}`;
  const abs = `${SITE}${image}`;
  // Replacer functions insert text literally (a '$' in a description can't be read as a pattern).
  const put = (html, re, value) => html.replace(re, (_, before, after) => before + esc(value) + after);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(page.title)}</title>`);
  html = put(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, page.description);
  html = put(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, page.title);
  html = put(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, page.description);
  html = put(html, /(<meta\s+property="og:image"\s+content=")[^"]*(")/, abs);
  html = put(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url);
  html = put(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  return html;
}

let count = 0;
for (const page of pages) {
  const image = page.photo ? await productShareImage(page.photo) : DEFAULT_IMAGE;
  const file = page.path === '/' ? path.join(DIST, 'index.html') : path.join(DIST, page.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, render(page, image));
  count += 1;
}
console.log(`prerender-meta: wrote ${count} pages for ${SITE || '(no VITE_SITE_URL set)'}`);
