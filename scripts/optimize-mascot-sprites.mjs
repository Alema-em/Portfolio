/**
 * Downscale mascot PNGs for web — keeps transparency, pixelated look.
 * Target max frame height ~400px (displayed at ~96px via fitHeight).
 *
 * Usage: node scripts/optimize-mascot-sprites.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/assets/mascot");
const MAX_H = 400;
const FRAME_COUNTS = {
  "idle.png": 4,
  "walk-right.png": 6,
  "walk-left.png": 6,
  "typing.png": 4,
  "wave.png": 4,
  "coffee.png": 3,
  "celebrate.png": 3,
  "peek.png": 2,
  "thinking.png": 2,
  "point.png": 1,
  "sit.png": 1,
  "sleep.png": 1,
};

async function optimize(file) {
  const src = path.join(DIR, file);
  const meta = await sharp(src).metadata();
  if (!meta.height || meta.height <= MAX_H) {
    console.log(`skip ${file} (${meta.width}x${meta.height})`);
    return { file, width: meta.width, height: meta.height };
  }

  const scale = MAX_H / meta.height;
  const width = Math.round((meta.width ?? 0) * scale);

  const buf = await sharp(src)
    .resize({ width, height: MAX_H, kernel: sharp.kernel.nearest })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toBuffer();

  await fs.writeFile(src, buf);
  console.log(`optimized ${file} → ${width}x${MAX_H}`);
  return { file, width, height: MAX_H };
}

async function main() {
  const results = [];
  for (const file of Object.keys(FRAME_COUNTS)) {
    try {
      results.push(await optimize(file));
    } catch (e) {
      console.warn(`failed ${file}:`, e.message);
    }
  }
  console.log("\nRun: npm run mascot:manifest");
}

main();
