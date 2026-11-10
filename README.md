# Aaru's Fancy Sarees: brand website

A static saree showcase website built with **React + Vite**. It has no cart, login or payments; customers enquire over WhatsApp.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # production build into /dist
npm run preview    # preview the production build
```

## Where to change content

All content lives in `src/data/`, separate from the UI:

| File | What it holds |
| --- | --- |
| `site.js` | Brand name, tagline, phone/WhatsApp, email, address, map, store hours, social links, testimonials, About-page story, mission, values |
| `collections.js` | The 5 collections (name, description, highlights, banner and cover image) |
| `products.js` | All 22 sarees (name, price, fabric, colour, design, length, blouse, occasion, care, tags) |
| `gallery.js` | Gallery photos and the Instagram showcase tiles |
| `images.js` | Central image registry and named image slots (hero, banners and so on) |

Values marked `// DUMMY` are placeholders (prices, dates, testimonials). Replace them with real details before going live.

## Logo

`public/brand_logo.jpg` is used for the header, mobile menu and footer. The tab icon (`favicon.png`) and iPhone home-screen icon (`apple-touch-icon.png`) are generated from it on every `npm run build`. To update the logo, replace that file and keep the name. A square image of at least 512×512 looks sharpest.

## Your domain and link previews

- Set your live website address in `.env` (`VITE_SITE_URL=https://...`). It is currently a placeholder.
- `npm run build` creates the share image (`public/og-image.jpg`). After the build it writes a small HTML file per page (`dist/<page>/index.html`) with that page's own title, description and image, so WhatsApp and Facebook previews show the right saree. Product previews use the saree photo.

## Photos

- **Product photos**: put the raw photos in `sarees/<folder>` and run `npm run images`. This creates optimised WebP files in `public/images/products/` (a full view plus two close-ups per saree), with light clean-up (levels, colour, sharpening). Folder-to-collection mapping and crops are at the top of `scripts/process-images.mjs`.
- **Lifestyle/model photos**: free-licence Unsplash photos listed in `scripts/stock-photos.txt`, converted with `scripts/process-stock.mjs`. Replace them with your own shoots whenever you like.

## YouTube reels

- The Shorts shown on the Home page (latest 8) and Gallery page (all) are listed in `src/data/reels.js`, with a translated title key for each (`reels.labels` in `src/i18n/ui/*.js`).
- Thumbnails are stored locally in `public/images/reels/`, so nothing loads from YouTube until a visitor presses play. The video then plays in privacy-enhanced mode (youtube-nocookie).
- **To add a new Short:**
  1. Add `{ id, label }` at the top of the list in `reels.js`, and add the label text in the three `ui` files.
  2. Save `https://i.ytimg.com/vi/<id>/oar2.jpg` into a folder.
  3. Run `node scripts/process-reels.mjs <that folder>`.

## Languages (English, हिंदी, मराठी)

- The language picker sits in the header (and in the mobile menu). The choice is remembered on the visitor's device.
- Interface text (menus, buttons, form messages): `src/i18n/ui/en.js`, `hi.js`, `mr.js` (same keys in each).
- Content translations (sarees, collections, About story, testimonials, gallery captions, policies): `src/i18n/content/hi.js` and `mr.js`. These only override text; the English data files in `src/data/` stay the source of truth, and anything missing falls back to English.
- When you add or change a saree in `products.js`, add its Hindi/Marathi text under the same id in the content files.

## Theme (light & dark)

- Colours and fonts are CSS variables at the top of `src/styles/base.css` (Midnight & Gold; Playfair Display + Montserrat, with Noto Serif Devanagari + Mukta for Hindi/Marathi).
- Dark-mode colours and the Hindi/Marathi typography rules live in `src/styles/theme.css`.
- The sun/moon button in the header switches themes. The site opens in light mode; a visitor who switches to dark mode gets it again on later visits.

## Hosting

The site uses clean URLs (`/collections/paithani`). Redirect files are included for every common host:
`public/_redirects` (Netlify), `vercel.json` (Vercel) and `public/.htaccess` (Apache/cPanel). Upload the contents of `dist/` after `npm run build`.
