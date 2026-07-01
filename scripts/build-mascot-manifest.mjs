/**
 * Build mascot.manifest.json from PNGs in public/assets/mascot/
 * No Figma API required.
 */

import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("public/assets/mascot");
const MANIFEST_OUT = path.resolve("src/components/mascot/mascot.manifest.json");

/** Known frame counts — must match Figma animation strips. */
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

const ANIMATION_NAMES = {
  "idle.png": "idle",
  "walk-right.png": "walk-right",
  "walk-left.png": "walk-left",
  "typing.png": "typing",
  "wave.png": "wave",
  "coffee.png": "coffee",
  "celebrate.png": "celebrate",
  "peek.png": "peek",
  "thinking.png": "thinking",
  "point.png": "point",
  "sit.png": "sit",
  "sleep.png": "sleep",
};

const NO_LOOP = new Set(["wave", "celebrate", "peek"]);

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function main() {
  const files = (await fs.readdir(OUT_DIR)).filter((f) => f.endsWith(".png")).sort();
  const animations = {};
  let defaultFrameW = 48;
  let defaultFrameH = 48;

  const missing = Object.keys(FRAME_COUNTS).filter((f) => !files.includes(f));

  for (const file of files) {
    const frames = FRAME_COUNTS[file];
    const animation = ANIMATION_NAMES[file];
    if (!frames || !animation) {
      console.warn(`skip ${file} (unknown frame count — add to FRAME_COUNTS)`);
      continue;
    }

    const buf = await fs.readFile(path.join(OUT_DIR, file));
    const { width, height } = pngSize(buf);
    const frameW = Math.round(width / frames);

    animations[animation] = {
      sheet: file,
      frames,
      frameWidth: frameW,
      frameHeight: height,
      loop: !NO_LOOP.has(animation),
    };

    defaultFrameW = frameW;
    defaultFrameH = height;
    console.log(`${animation}: ${file} — ${frames} frames @ ${frameW}x${height}`);
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
  console.log(`\nwrote ${MANIFEST_OUT}`);

  if (missing.length) {
    console.log(`\nStill missing (${missing.length}):`);
    for (const f of missing) console.log(`  - ${f}`);
  } else {
    console.log("\nAll 12 sprite sheets present.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
