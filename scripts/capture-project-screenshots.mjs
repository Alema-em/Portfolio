import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { capturePlantLoginScreenshot } from "./plant-login-html.mjs";

const outDir = path.resolve("public/assets/projects");
fs.mkdirSync(outDir, { recursive: true });

/** User-provided screenshots live in public/assets/projects/ — only regenerate PlantOS login here. */
const browser = await chromium.launch({ headless: true });
const plantPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await capturePlantLoginScreenshot(plantPage, path.join(outDir, "plant-inventory.png"));
console.log("saved plant-inventory (login, video background)");
await plantPage.close();
await browser.close();
