/**
 * Resize locker layer PNGs to ~2× max on-screen size and write WebP.
 * Display scene max: height 820px, aspect 1708/1126 → ~1244 CSS px wide.
 */
import sharp from "sharp";
import { readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOCKER_DIR = path.join(ROOT, "public/assets/locker");
const BACKUP_DIR = path.join(ROOT, "public/assets/locker-backup");

const CROP_W = 1708;
const SCENE_MAX_H = 820;
const SCENE_MAX_W = (SCENE_MAX_H * CROP_W) / 1126;
/** 2× retina + 10% buffer */
const PX_PER_FIGMA = (SCENE_MAX_W / CROP_W) * 2 * 1.1;

/** Figma layer widths from LockerWorkspace (used to size each asset). */
const FIGMA_W = {
  "locker.png": 1688,
  "lockerdoor.png": 751,
  "current-builds.png": 613,
  "stickynote.png": 376,
  "portrait.png": 363,
  "potrait.png": 363,
  "lamp.png": 535,
  "laptop.png": 521,
  "bottle.png": 385,
  "penholder.png": 267,
  "notepad.png": 326,
  "plant.png": 384,
  "camera.png": 382,
  "books.png": 376,
  "headphone.png": 363,
  "mug.png": 363,
  "calculator.png": 329,
  "duck.png": 287,
  "mini-tv.png": 333,
  "airpodes.png": 180,
  "keyboard.png": 400,
};

function targetWidth(filename) {
  const figmaW = FIGMA_W[filename] ?? 400;
  return Math.min(1536, Math.max(280, Math.ceil(figmaW * PX_PER_FIGMA)));
}

async function optimizeOne(file) {
  const src = path.join(LOCKER_DIR, file);
  const base = file.replace(/\.png$/i, "");
  const out = path.join(LOCKER_DIR, `${base}.webp`);
  const tw = targetWidth(file);
  const meta = await sharp(src).metadata();
  const ow = meta.width ?? 1536;
  const oh = meta.height ?? 1024;

  let pipeline = sharp(src).rotate();
  // Fit inside target box without upscaling
  if (ow > tw || oh > tw) {
    pipeline = pipeline.resize({
      width: tw,
      height: tw,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(out);

  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  const outMeta = await sharp(out).metadata();
  return {
    file,
    before,
    after,
    from: `${ow}x${oh}`,
    to: `${outMeta.width}x${outMeta.height}`,
  };
}

async function main() {
  const files = (await readdir(LOCKER_DIR)).filter((f) => f.toLowerCase().endsWith(".png"));
  if (!files.length) throw new Error("No PNG files in locker dir");

  const results = [];
  for (const file of files) {
    results.push(await optimizeOne(file));
  }

  let before = 0;
  let after = 0;
  for (const r of results) {
    before += r.before;
    after += r.after;
    console.log(
      `${r.file.padEnd(22)} ${r.from} → ${r.to.padEnd(9)} ${(r.before / 1e6).toFixed(2)}MB → ${(r.after / 1e3).toFixed(0)}KB`,
    );
    await rm(path.join(LOCKER_DIR, r.file));
  }

  // Drop unused typo duplicate if both portrait.webp and potrait.webp exist
  try {
    await rm(path.join(LOCKER_DIR, "potrait.webp"));
    console.log("removed unused potrait.webp");
  } catch {
    /* ignore */
  }

  // Remove duplicate backup tree from deploy
  await rm(BACKUP_DIR, { recursive: true, force: true });
  console.log("removed public/assets/locker-backup");

  console.log(
    `\nTotal: ${(before / 1e6).toFixed(1)}MB PNG → ${(after / 1e6).toFixed(2)}MB WebP (${((1 - after / before) * 100).toFixed(1)}% smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
