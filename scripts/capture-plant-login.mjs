import { chromium } from "playwright";
import path from "node:path";
import { capturePlantLoginScreenshot } from "./plant-login-html.mjs";

const outputPath = path.resolve("public/assets/projects/plant-inventory.png");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await capturePlantLoginScreenshot(page, outputPath);
console.log("saved plant-inventory login (video background)");
await browser.close();
