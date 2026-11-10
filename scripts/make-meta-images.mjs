// Builds icons and the link-preview image from your own files. Runs automatically on `npm run build`.
//   public/brand_logo.jpg  →  public/favicon.png (64×64), public/apple-touch-icon.png (180×180)
//   hero photo + logo      →  public/og-image.jpg (1200×630, used when the site is shared)
// Files are only regenerated when the logo or hero photo is newer than them. If they can't be
// written (e.g. a read-only checkout), the existing files are kept and the build continues.
import sharp from 'sharp';
import { existsSync, statSync } from 'node:fs';

const LOGO = 'public/brand_logo.jpg';
const HERO = 'public/images/lifestyle/bridal-ivory-red-1600.webp';
const OUTPUTS = ['public/favicon.png', 'public/apple-touch-icon.png', 'public/og-image.jpg'];

if (!existsSync(LOGO)) {
  console.warn('make-meta-images: public/brand_logo.jpg not found, icons not updated');
  process.exit(0);
}

const newestSource = Math.max(statSync(LOGO).mtimeMs, existsSync(HERO) ? statSync(HERO).mtimeMs : 0, statSync(new URL(import.meta.url)).mtimeMs);
const upToDate = OUTPUTS.every((f) => existsSync(f) && statSync(f).mtimeMs >= newestSource);
if (upToDate) {
  console.log('make-meta-images: icons and share image are up to date');
  process.exit(0);
}

try {
  // Round logo on white for icons (iOS adds its own rounded corners).
  await sharp(LOGO).resize(64, 64, { fit: 'contain', background: '#ffffff' }).png().toFile('public/favicon.png');
  await sharp(LOGO).resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');

  // Share image: hero photo with a round logo badge in the corner.
  const badgeSize = 150;
  const circle = Buffer.from(`<svg width="${badgeSize}" height="${badgeSize}"><circle cx="${badgeSize / 2}" cy="${badgeSize / 2}" r="${badgeSize / 2}" fill="#fff"/></svg>`);
  const logoCircle = await sharp(LOGO)
    .resize(badgeSize, badgeSize)
    .composite([{ input: circle, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const ring = Buffer.from(
    `<svg width="${badgeSize + 12}" height="${badgeSize + 12}"><circle cx="${(badgeSize + 12) / 2}" cy="${(badgeSize + 12) / 2}" r="${(badgeSize + 12) / 2 - 1}" fill="#fff" stroke="#c9a55c" stroke-width="3"/></svg>`,
  );
  // Frame from near the top of the portrait so the face, jewellery and saree are all visible.
  const heroBuffer = await sharp(HERO).resize({ width: 1200 }).toBuffer({ resolveWithObject: true });
  const top = Math.min(Math.round(heroBuffer.info.height * 0.06), heroBuffer.info.height - 630);
  await sharp(heroBuffer.data)
    .extract({ left: 0, top, width: 1200, height: 630 })
    .composite([
      { input: ring, left: 34, top: 34 },
      { input: logoCircle, left: 40, top: 40 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile('public/og-image.jpg');

  console.log('make-meta-images: favicon.png, apple-touch-icon.png, og-image.jpg updated');
} catch (err) {
  console.warn(`make-meta-images: could not update icons (${err.message}); keeping the existing files`);
}
