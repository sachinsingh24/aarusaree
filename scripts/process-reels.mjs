// Creates small upright WebP thumbnails for the YouTube Shorts listed in src/data/reels.js.
// 1. Download each Short's thumbnail:  https://i.ytimg.com/vi/<VIDEO_ID>/oar2.jpg  saved as <VIDEO_ID>.jpg
//    (any filename containing the video id works, e.g. "03_UnWZ3I5-HUM.jpg")
// 2. Run:  node scripts/process-reels.mjs <folder-with-the-jpgs>
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
const OUT = 'public/images/reels';
const { reels } = await import('../src/data/reels.js');

await mkdir(OUT, { recursive: true });
const files = await readdir(SRC);
for (const { id } of reels) {
  const file = files.find((f) => f.includes(id));
  if (!file) {
    console.warn('missing thumbnail for', id);
    continue;
  }
  for (const w of [360, 540]) {
    await sharp(path.join(SRC, file))
      .resize({ width: w, height: Math.round((w * 16) / 9), fit: 'cover' })
      .webp({ quality: 74 })
      .toFile(path.join(OUT, `${id}-${w}.webp`));
  }
  console.log('ok', id);
}
