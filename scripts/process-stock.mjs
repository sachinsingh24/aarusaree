// Converts downloaded stock photos (see stock-photos.txt) into WebP at 800w and 1600w.
// Usage: node scripts/process-stock.mjs <folder-with-downloaded-jpgs>
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
const OUT = 'public/images/lifestyle';
await mkdir(OUT, { recursive: true });
for (const file of (await readdir(SRC)).filter((f) => f.endsWith('.jpg'))) {
  const name = file.replace(/\.jpg$/, '');
  for (const w of [800, 1600]) {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  const m = await sharp(path.join(SRC, file)).metadata();
  console.log(name, m.width, m.height);
}
