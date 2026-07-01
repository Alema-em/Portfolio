/**
 * Crop each frame to content, pad to uniform width, re-stitch.
 * Fixes walk/idle "two frames visible" glitch from uneven Figma exports.
 */
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const DIR = path.resolve("public/assets/mascot");

const STRIPS = {
  "idle.png": 4,
  "walk-right.png": 6,
  "walk-left.png": 6,
  "typing.png": 4,
  "wave.png": 4,
  "coffee.png": 3,
  "celebrate.png": 3,
  "peek.png": 2,
  "thinking.png": 2,
};

function colAlpha(png, x) {
  let sum = 0;
  for (let y = 0; y < png.height; y++) sum += png.data[(png.width * y + x) * 4 + 3];
  return sum / png.height;
}

function detectBounds(png, frames) {
  const w = png.width;
  const guess = Math.floor(w / frames);
  const bounds = [0];
  for (let f = 1; f < frames; f++) {
    let best = f * guess;
    let bestScore = Infinity;
    for (let x = Math.max(1, f * guess - 50); x < Math.min(w - 1, f * guess + 50); x++) {
      const score = colAlpha(png, x) + colAlpha(png, x - 1);
      if (score < bestScore) {
        bestScore = score;
        best = x;
      }
    }
    bounds.push(best);
  }
  bounds.push(w);
  return bounds;
}

function cropContent(slice) {
  const { width: w, height: h, data } = slice;
  let minX = w,
    minY = h,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(w * y + x) * 4 + 3] > 8) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (maxX < minX) return slice;
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const out = new PNG({ width: cw, height: ch });
  PNG.bitblt(slice, out, minX, minY, cw, ch, 0, 0);
  return out;
}

function padCenter(img, W, H) {
  const out = new PNG({ width: W, height: H });
  const x = Math.floor((W - img.width) / 2);
  const y = Math.floor((H - img.height) / 2);
  PNG.bitblt(img, out, 0, 0, img.width, img.height, x, y);
  return out;
}

function extractFrame(png, x0, x1) {
  const w = x1 - x0;
  const out = new PNG({ width: w, height: png.height });
  PNG.bitblt(png, out, x0, 0, w, png.height, 0, 0);
  return out;
}

function stitch(frames) {
  const W = frames.reduce((s, f) => s + f.width, 0);
  const H = Math.max(...frames.map((f) => f.height));
  const out = new PNG({ width: W, height: H });
  let x = 0;
  for (const f of frames) {
    PNG.bitblt(f, out, 0, 0, f.width, f.height, x, 0);
    x += f.width;
  }
  return out;
}

const manifestFrames = {};

for (const [file, count] of Object.entries(STRIPS)) {
  const src = path.join(DIR, file);
  const png = PNG.sync.read(fs.readFileSync(src));
  const bounds = detectBounds(png, count);
  const slices = [];
  for (let i = 0; i < count; i++) {
    slices.push(cropContent(extractFrame(png, bounds[i], bounds[i + 1])));
  }
  const maxW = Math.max(...slices.map((s) => s.width));
  const maxH = Math.max(...slices.map((s) => s.height));
  const uniform = slices.map((s) => padCenter(s, maxW, maxH));
  const out = stitch(uniform);
  fs.writeFileSync(src, PNG.sync.write(out));
  const name = file.replace(".png", "");
  manifestFrames[name] = { frames: count, frameWidth: maxW, frameHeight: maxH };
  console.log(`${file} → ${out.width}x${out.height} (${count}×${maxW})`);
}

fs.writeFileSync(path.join(DIR, "_normalized.json"), JSON.stringify(manifestFrames, null, 2));

console.log("\nRun: npm run mascot:manifest");
