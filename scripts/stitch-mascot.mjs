/**
 * Stitch multiple PNG frames into one horizontal sprite sheet.
 *
 * Usage:
 *   node scripts/stitch-mascot.mjs <output.png> <frame1.png> <frame2.png> ...
 *   node scripts/stitch-mascot.mjs celebrate.png yay1.png yay2.png yay3.png
 */

import fs from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";

const OUT_DIR = path.resolve("public/assets/mascot");

function stitchHorizontal(buffers) {
  const images = buffers.map((buf) => PNG.sync.read(buf));
  const height = Math.max(...images.map((img) => img.height));
  const width = images.reduce((sum, img) => sum + img.width, 0);
  const out = new PNG({ width, height });

  let x = 0;
  for (const img of images) {
    PNG.bitblt(img, out, 0, 0, img.width, img.height, x, 0);
    x += img.width;
  }

  return PNG.sync.write(out);
}

async function main() {
  const [, , outName, ...inputs] = process.argv;
  if (!outName || inputs.length === 0) {
    console.error("Usage: node scripts/stitch-mascot.mjs <output.png> <frame1.png> ...");
    process.exit(1);
  }

  const buffers = [];
  for (const input of inputs) {
    const file = path.isAbsolute(input) ? input : path.join(OUT_DIR, input);
    buffers.push(await fs.readFile(file));
  }

  const dest = path.join(OUT_DIR, outName);
  const stitched = stitchHorizontal(buffers);
  await fs.writeFile(dest, stitched);

  const width = stitched.readUInt32BE(16);
  const height = stitched.readUInt32BE(20);
  console.log(`wrote ${dest} (${inputs.length} frames, ${width}x${height})`);
  console.log("Run: npm run mascot:manifest");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
