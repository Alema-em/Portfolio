import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

const PLANTOS_STATIC = path.resolve("C:/Users/Alema/OneDrive/Desktop/plantos/static");
const LOCAL_STATIC = path.resolve("scripts/assets/plantos-static");
const PLANTOS_VIDEO = path.join(PLANTOS_STATIC, "bg.mp4");
const LOCAL_VIDEO = path.join(LOCAL_STATIC, "bg.mp4");
const PREVIEW_VIDEO = path.join(LOCAL_STATIC, "bg-preview.mp4");
const VIDEO_URL = "https://plantos.local/bg.mp4";

const LOGIN_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Poppins", sans-serif; }
    body { height: 100vh; overflow: hidden; }
    .video-bg {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: -1; overflow: hidden;
    }
    .video-bg video {
      width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);
    }
    .video-bg::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45));
    }
    .hero {
      position: absolute; top: 12%; width: 100%; text-align: center; color: white;
    }
    .hero h1 { font-size: 48px; font-weight: 700; }
    .hero p { margin-top: 10px; font-size: 18px; opacity: 0.9; }
    .card {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.85); padding: 35px; border-radius: 18px; width: 340px;
      backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      text-align: center; border: 1px solid rgba(255,255,255,0.3);
    }
    .card h2 { margin-bottom: 20px; color: #2f5d50; }
    input {
      width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px;
      border: 1px solid #ccc; font-size: 14px;
    }
    button {
      width: 100%; padding: 12px; background: #2f5d50; color: white; border: none;
      border-radius: 8px; font-weight: 600; margin-top: 10px;
    }
    .toggle { margin-top: 12px; font-size: 14px; color: #2f5d50; }
    .note { font-size: 12px; margin-top: 10px; opacity: 0.7; }
  </style>
</head>
<body>
  <div class="video-bg">
    <video autoplay muted loop playsinline preload="auto">
      <source src="${VIDEO_URL}" type="video/mp4" />
    </video>
  </div>
  <div class="hero">
    <h1>🌱 Manage Your Plant Inventory Effortlessly</h1>
    <p>Scan • Track • Grow your business</p>
  </div>
  <div class="card">
    <h2>Login</h2>
    <input type="email" placeholder="Email address" />
    <input type="password" placeholder="Password" />
    <button type="button">Login</button>
    <p class="note">🔒 Secure & private • No spam</p>
    <div class="toggle">Don't have an account? <b>Sign Up</b></div>
  </div>
</body>
</html>`;

function ensureLocalPlantosVideo() {
  fs.mkdirSync(LOCAL_STATIC, { recursive: true });

  if (!fs.existsSync(PLANTOS_VIDEO)) {
    throw new Error(
      `PlantOS video not found at ${PLANTOS_VIDEO}. Restore static/bg.mp4 in your PlantOS project.`,
    );
  }

  const needsCopy =
    !fs.existsSync(LOCAL_VIDEO) ||
    fs.statSync(LOCAL_VIDEO).mtimeMs < fs.statSync(PLANTOS_VIDEO).mtimeMs;

  if (needsCopy) {
    fs.copyFileSync(PLANTOS_VIDEO, LOCAL_VIDEO);
  }

  const needsPreview =
    !fs.existsSync(PREVIEW_VIDEO) ||
    fs.statSync(PREVIEW_VIDEO).mtimeMs < fs.statSync(LOCAL_VIDEO).mtimeMs;

  if (needsPreview) {
    const result = spawnSync(
      ffmpegPath,
      [
        "-ss",
        "0",
        "-t",
        "5",
        "-i",
        LOCAL_VIDEO,
        "-vf",
        "scale=1280:-1",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "28",
        "-movflags",
        "+faststart",
        PREVIEW_VIDEO,
        "-y",
      ],
      { stdio: "pipe" },
    );

    if (result.status !== 0) {
      throw new Error(`Failed to build PlantOS preview clip:\n${result.stderr?.toString() ?? ""}`);
    }
  }

  return PREVIEW_VIDEO;
}

export async function capturePlantLoginScreenshot(page, outputPath) {
  const previewVideo = ensureLocalPlantosVideo();
  page.setDefaultTimeout(60_000);

  await page.route(VIDEO_URL, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "video/mp4",
      path: previewVideo,
    });
  });

  await page.setContent(LOGIN_HTML, { waitUntil: "domcontentloaded" });

  await page.evaluate(async () => {
    const video = document.querySelector("video");
    if (!video) return;

    video.muted = true;

    await new Promise((resolve, reject) => {
      const done = () => resolve();
      const fail = () => reject(new Error(`video error code ${video.error?.code ?? "unknown"}`));
      if (video.readyState >= 2) {
        done();
        return;
      }
      video.addEventListener("loadeddata", done, { once: true });
      video.addEventListener("error", fail, { once: true });
    });

    video.currentTime = 1.2;
    await new Promise((resolve) => {
      video.addEventListener("seeked", resolve, { once: true });
    });

    const play = video.play();
    if (play && typeof play.catch === "function") {
      await play.catch(() => {});
    }
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: outputPath });
}

export function getPlantLoginPreviewUrl() {
  return pathToFileURL(ensureLocalPlantosVideo()).href;
}
