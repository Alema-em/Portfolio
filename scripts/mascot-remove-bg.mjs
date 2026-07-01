/**
 * Remove near-white backgrounds from mascot PNGs (API exports ship with white).
 * Usage: node scripts/mascot-remove-bg.mjs [file.png ...]
 */

import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const DEFAULT_FILES = ["idle.png", "walk-right.png", "walk-left.png"];

const DIR = path.resolve("public/assets/mascot");
const THRESHOLD = 248;

function removeWhite(filePath) {
  const buf = fs.readFileSync(filePath);
  const png = PNG.sync.read(buf);
  let cleared = 0;

  for (let i = 0; i < png.data.length; i += 4) {
    const r = png.data[i];
    const g = png.data[i + 1];
    const b = png.data[i + 2];
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      png.data[i + 3] = 0;
      cleared++;
    }
  }

  fs.writeFileSync(filePath, PNG.sync.write(png));
  console.log(`${path.basename(filePath)}: cleared ${cleared} pixels`);
}

const inputs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : DEFAULT_FILES.map((f) => path.join(DIR, f));

for (const file of inputs) {
  if (!fs.existsSync(file)) {
    console.warn(`skip ${file} (missing)`);
    continue;
  }
  removeWhite(file);
}
