// Converts the raw photos in /sarees into optimised WebP files in /public/images/products.
// Run with: npm run images
//
// For every photo it writes:
//   <id>-480.webp / <id>-960.webp          full product view (3:4)
//   <id>-d1-480.webp / <id>-d1-960.webp    detail: upper body & motifs
//   <id>-d2-480.webp / <id>-d2-960.webp    detail: border / pallu
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'sarees';
const OUT = 'public/images/products';

// folder name on disk -> collection slug used across the site
const FOLDERS = {
  'Dizainar saree': 'designer',
  Kalanjali: 'kalanjali',
  'Kanjivaram silk': 'paithani',
  'Narayan peth': 'narayan-peth',
  'Patola silk': 'patola',
};

// Per-file crops (left, top, width, height in source pixels) — removes third-party catalogue cards.
const CROPS = {
  'Patola silk/WhatsApp Image 2026-11-07 at 5.23.12 PM.jpeg': { left: 250, top: 470, width: 607, height: 810 },
  'Patola silk/WhatsApp Image 2026-11-07 at 5.23.14 PM.jpeg': { left: 40, top: 400, width: 660, height: 880 },
  'Patola silk/WhatsApp Image 2026-11-07 at 5.23.15 PM (1).jpeg': { left: 90, top: 440, width: 630, height: 840 },
  'Patola silk/WhatsApp Image 2026-11-07 at 5.23.15 PM.jpeg': { left: 40, top: 400, width: 660, height: 880 },
  'Patola silk/WhatsApp Image 2026-11-07 at 5.23.16 PM.jpeg': { left: 60, top: 340, width: 705, height: 940 },
};

// Detail views, as fractions of the (cropped) frame.
const DETAILS = {
  d1: { x: 0.12, y: 0.04, w: 0.76, h: 0.6 },
  d2: { x: 0.12, y: 0.36, w: 0.76, h: 0.6 },
};

const WIDTHS = [480, 960];
// Detail crops are never upscaled past their real pixels (keeps them crisp, not blurry).
const toWebp = (img, w, file, maxW = Infinity) =>
  img
    .resize({ width: Math.min(w, maxW), height: Math.round((Math.min(w, maxW) * 4) / 3), fit: 'cover', position: 'attention' })
    .webp({ quality: 82, smartSubsample: true })
    .toFile(path.join(OUT, file));

await mkdir(OUT, { recursive: true });
const manifest = [];

for (const [folder, slug] of Object.entries(FOLDERS)) {
  const files = (await readdir(path.join(SRC, folder))).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  let i = 0;
  for (const file of files) {
    i += 1;
    const id = `${slug}-${String(i).padStart(2, '0')}`;
    let base = sharp(path.join(SRC, folder, file)).rotate();
    const crop = CROPS[`${folder}/${file}`];
    if (crop) base = base.extract(crop);
    // Clean-up pass: stretch levels (removes the grey phone-camera haze), lift brightness
    // a touch, enrich colour slightly and sharpen the weave without halos.
    base = base
      .normalise({ lower: 0.5, upper: 99.6 })
      .modulate({ brightness: 1.03, saturation: 1.06 })
      .sharpen({ sigma: 0.8, m1: 0.6, m2: 2 });
    const { data, info } = await base.toBuffer({ resolveWithObject: true });

    for (const w of WIDTHS) {
      await toWebp(sharp(data), w, `${id}-${w}.webp`);
      for (const [key, r] of Object.entries(DETAILS)) {
        const region = {
          left: Math.round(info.width * r.x),
          top: Math.round(info.height * r.y),
          width: Math.round(info.width * r.w),
          height: Math.round(info.height * r.h),
        };
        await toWebp(sharp(data).extract(region), w, `${id}-${key}-${w}.webp`, region.width);
      }
    }
    manifest.push({ id, source: `${folder}/${file}` });
  }
}
console.table(manifest);
