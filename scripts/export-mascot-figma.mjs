/**
 * Export mascot sprite strips from Figma into public/assets/mascot/
 * and regenerate src/components/mascot/mascot.manifest.json
 *
 * Usage:
 *   FIGMA_TOKEN=your_token npm run mascot:export
 *   FIGMA_TOKEN=your_token npm run mascot:export -- --force
 *
 * Re-runs skip existing PNGs unless --force is passed.
 * Batches Figma image requests and retries on HTTP 429.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";

const FILE_KEY = "KjPpxhmiqqpQAtJCXqa3Ju";
const TOKEN = process.env.FIGMA_TOKEN;
const FORCE = process.argv.includes("--force");

const OUT_DIR = path.resolve("public/assets/mascot");
const MANIFEST_OUT = path.resolve("src/components/mascot/mascot.manifest.json");

const API_DELAY_MS = 2500;
const MAX_RETRIES = 6;

/** @type {Array<{ animation: string, sheet: string, frames: number, nodeIds: string[], loop?: boolean }>} */
const EXPORTS = [
  { animation: "idle", sheet: "idle.png", frames: 4, nodeIds: ["1:2"] },
  { animation: "walk-right", sheet: "walk-right.png", frames: 6, nodeIds: ["1:7"] },
  { animation: "walk-left", sheet: "walk-left.png", frames: 6, nodeIds: ["1:14"] },
  { animation: "typing", sheet: "typing.png", frames: 4, nodeIds: ["1:28"] },
  { animation: "wave", sheet: "wave.png", frames: 4, nodeIds: ["1:36"], loop: false },
  { animation: "coffee", sheet: "coffee.png", frames: 3, nodeIds: ["2:47"] },
  {
    animation: "celebrate",
    sheet: "celebrate.png",
    frames: 3,
    nodeIds: ["2:54", "2:55", "2:56"],
    loop: false,
  },
  { animation: "peek", sheet: "peek.png", frames: 2, nodeIds: ["2:58"], loop: false },
  { animation: "thinking", sheet: "thinking.png", frames: 2, nodeIds: ["1:42", "1:43"] },
  { animation: "point", sheet: "point.png", frames: 1, nodeIds: ["1:45"] },
  { animation: "sit", sheet: "sit.png", frames: 1, nodeIds: ["2:46"] },
  { animation: "sleep", sheet: "sleep.png", frames: 1, nodeIds: ["2:57"] },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function stitchHorizontal(buffers) {
  if (buffers.length === 1) return buffers[0];
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

async function figma(pathname, attempt = 0) {
  const res = await fetch(`https://api.figma.com/v1${pathname}`, {
    headers: { "X-Figma-Token": TOKEN },
  });

  if (res.status === 429 && attempt < MAX_RETRIES) {
    const wait = API_DELAY_MS * 2 ** attempt + 5000;
    console.warn(
      `Rate limited — waiting ${Math.round(wait / 1000)}s before retry ${attempt + 1}/${MAX_RETRIES}...`,
    );
    await sleep(wait);
    return figma(pathname, attempt + 1);
  }

  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchImageBuffers(nodeIds) {
  const unique = [...new Set(nodeIds)];
  const images = await figma(`/images/${FILE_KEY}?ids=${unique.join(",")}&format=png`);
  await sleep(API_DELAY_MS);

  const buffers = [];
  for (const id of nodeIds) {
    const url = images.images[id];
    if (!url) throw new Error(`No image URL for node ${id}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Download failed for ${id}`);
    buffers.push(Buffer.from(await res.arrayBuffer()));
    await sleep(400);
  }

  return buffers;
}

async function exportAnimation(entry) {
  const dest = path.join(OUT_DIR, entry.sheet);

  try {
    await fs.access(dest);
    if (!FORCE) {
      const existing = await fs.readFile(dest);
      const { width, height } = pngSize(existing);
      const frameW = Math.round(width / entry.frames);
      console.log(`skip ${entry.sheet} (already exists)`);
      return {
        animation: entry.animation,
        sheet: entry.sheet,
        frames: entry.frames,
        frameWidth: frameW,
        frameHeight: height,
        loop: entry.loop ?? !["wave", "celebrate", "peek"].includes(entry.animation),
      };
    }
  } catch {
    // file missing — export below
  }

  const buffers = await fetchImageBuffers(entry.nodeIds);
  const stitched = stitchHorizontal(buffers);
  await fs.writeFile(dest, stitched);

  const { width, height } = pngSize(stitched);
  const frameW = Math.round(width / entry.frames);
  console.log(`exported ${entry.sheet} (${entry.frames} frames @ ${frameW}x${height})`);

  return {
    animation: entry.animation,
    sheet: entry.sheet,
    frames: entry.frames,
    frameWidth: frameW,
    frameHeight: height,
    loop: entry.loop ?? !["wave", "celebrate", "peek"].includes(entry.animation),
  };
}

async function main() {
  if (!TOKEN) {
    console.error("Set FIGMA_TOKEN to a personal access token with file read access.");
    process.exit(1);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const animations = {};
  let defaultFrameW = 48;
  let defaultFrameH = 48;

  for (const entry of EXPORTS) {
    const clip = await exportAnimation(entry);
    animations[clip.animation] = {
      sheet: clip.sheet,
      frames: clip.frames,
      frameWidth: clip.frameWidth,
      frameHeight: clip.frameHeight,
      loop: clip.loop,
    };
    defaultFrameW = clip.frameWidth;
    defaultFrameH = clip.frameHeight;
  }

  const manifest = {
    frameWidth: defaultFrameW,
    frameHeight: defaultFrameH,
    defaultFps: 8,
    defaultScale: 0.1,
    animations,
  };

  const json = `${JSON.stringify(manifest, null, 2)}\n`;
  await fs.writeFile(MANIFEST_OUT, json);
  await fs.writeFile(path.join(OUT_DIR, "manifest.json"), json);
  console.log(`wrote ${MANIFEST_OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
