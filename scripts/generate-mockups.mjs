/**
 * generate-mockups.mjs
 *
 * Interactive script that:
 * 1. Opens a visible Chrome browser at localhost:3000
 * 2. Lets you log in and navigate to the right page
 * 3. Prompts you per screenshot (you navigate, then press Enter to capture)
 * 4. Composites each screenshot into a laptop frame with transparent background
 * 5. Saves final PNGs to public/devices/
 *
 * Usage:
 *   node scripts/generate-mockups.mjs
 *
 * Prerequisites:
 *   - VidBolt dashboard running at localhost:3000
 *   - npm install --save-dev puppeteer sharp
 */

import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import readline from "readline";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "devices");

// ── CONFIG ─────────────────────────────────────────────────────────────────
const VIEWPORT = { width: 1920, height: 1200, deviceScaleFactor: 2 };
const OUTPUT_SIZE = 1024;

// The screenshots to capture — user navigates, then presses Enter
const CAPTURES = [
  {
    name: "hero-editor",
    description: "Video Editor (for the hero section — front-facing laptop)",
    outputFile: "hero-editor.png",
  },
  {
    name: "feature-command-center",
    description: "Command Center / Dashboard (for the features section)",
    outputFile: "feature-command-center.png",
  },
  {
    name: "feature-editor",
    description: "Video Editor alternate view (for the features section)",
    outputFile: "feature-editor.png",
  },
];

// ── LAPTOP FRAME GENERATOR ────────────────────────────────────────────────

function createLaptopFrameSvg(width, height, screenRect) {
  const { sx, sy, sw, sh } = screenRect;
  const bodyBottomH = Math.round(height * 0.08);
  const bodyY = height - bodyBottomH;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#888888"/>
      <stop offset="40%" stop-color="#666666"/>
      <stop offset="100%" stop-color="#333333"/>
    </linearGradient>
    <linearGradient id="glassReflect" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.04)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)"/>
    </linearGradient>
  </defs>

  <!-- Screen bezel -->
  <rect x="${sx - 14}" y="${sy - 14}" width="${sw + 28}" height="${sh + 20}" rx="10" ry="10" fill="url(#lidGrad)" />
  
  <!-- Subtle bezel edge highlight -->
  <rect x="${sx - 14}" y="${sy - 14}" width="${sw + 28}" height="${sh + 20}" rx="10" ry="10" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>

  <!-- Camera notch -->
  <circle cx="${width / 2}" cy="${sy - 5}" r="2.5" fill="#333"/>
  <circle cx="${width / 2}" cy="${sy - 5}" r="1.2" fill="#1a1a1a"/>

  <!-- Screen area - filled black (screenshot goes behind this layer) -->
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="3" ry="3" fill="rgba(0,0,0,0)"/>

  <!-- Glass reflection -->
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="3" ry="3" fill="url(#glassReflect)"/>

  <!-- Screen border glow -->
  <rect x="${sx - 0.5}" y="${sy - 0.5}" width="${sw + 1}" height="${sh + 1}" rx="3.5" ry="3.5" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>

  <!-- Hinge -->
  <rect x="${width * 0.18}" y="${bodyY - 3}" width="${width * 0.64}" height="5" rx="1.5" ry="1.5" fill="#444"/>
  <rect x="${width * 0.18}" y="${bodyY - 3}" width="${width * 0.64}" height="2" rx="1" ry="1" fill="rgba(255,255,255,0.05)"/>

  <!-- Base / keyboard deck -->
  <path d="
    M ${width * 0.06} ${bodyY + 1}
    L ${width * 0.94} ${bodyY + 1}
    L ${width * 0.97} ${height - 6}
    Q ${width * 0.97} ${height - 2} ${width * 0.95} ${height - 2}
    L ${width * 0.05} ${height - 2}
    Q ${width * 0.03} ${height - 2} ${width * 0.03} ${height - 6}
    Z
  " fill="url(#baseGrad)"/>

  <!-- Base top edge highlight -->
  <line x1="${width * 0.06}" y1="${bodyY + 1}" x2="${width * 0.94}" y2="${bodyY + 1}" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <!-- Trackpad -->
  <rect x="${width * 0.39}" y="${bodyY + bodyBottomH * 0.3}" width="${width * 0.22}" height="${bodyBottomH * 0.5}" rx="4" ry="4" fill="rgba(0,0,0,0.15)" stroke="rgba(255,255,255,0.04)" stroke-width="0.3"/>

  <!-- Bottom shadow -->
  <ellipse cx="${width / 2}" cy="${height}" rx="${width * 0.4}" ry="6" fill="rgba(0,0,0,0.15)"/>
</svg>`;
}

// ── COMPOSITE FUNCTION ────────────────────────────────────────────────────

async function compositeScreenshotIntoLaptop(screenshotBuffer, outputPath) {
  const canvasW = OUTPUT_SIZE;
  const canvasH = OUTPUT_SIZE;

  // Screen area positioning
  const screenPadX = Math.round(canvasW * 0.08);
  const screenTopY = Math.round(canvasH * 0.06);
  const screenW = canvasW - screenPadX * 2;
  const screenH = Math.round(canvasH * 0.72);

  const screenRect = { sx: screenPadX, sy: screenTopY, sw: screenW, sh: screenH };

  // 1. Resize screenshot to fit screen area
  const resizedScreenshot = await sharp(screenshotBuffer)
    .resize(screenW, screenH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  // 2. Round the corners of the screenshot to match the screen area
  const roundedMask = Buffer.from(
    `<svg width="${screenW}" height="${screenH}">
      <rect width="${screenW}" height="${screenH}" rx="3" ry="3" fill="white"/>
    </svg>`
  );

  const roundedScreenshot = await sharp(resizedScreenshot)
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 3. Generate laptop frame SVG
  const frameSvg = createLaptopFrameSvg(canvasW, canvasH, screenRect);
  const frameBuffer = Buffer.from(frameSvg);

  // 4. Composite: transparent canvas → screenshot → frame overlay
  const result = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, a: 0 },
    },
  })
    .composite([
      { input: roundedScreenshot, left: screenRect.sx, top: screenRect.sy },
      { input: frameBuffer, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();

  await sharp(result).toFile(outputPath);
  console.log(`  ✓ Saved: ${outputPath}`);

  const meta = await sharp(outputPath).metadata();
  return meta;
}

// ── HELPERS ───────────────────────────────────────────────────────────────

function waitForEnter(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

// ── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  VidBolt Laptop Mockup Generator                        ║");
  console.log("║  Screenshots → Laptop Frames (Transparent Background)   ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("");

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Launch a VISIBLE browser so the user can interact
  console.log("→ Launching browser...\n");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: VIEWPORT,
    args: [
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      "--disable-features=TranslateUI",
    ],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });

  await waitForEnter(
    "  ┌─────────────────────────────────────────────────────┐\n" +
    "  │  Browser is open at localhost:3000.                  │\n" +
    "  │  Log in if needed. Press ENTER when ready.           │\n" +
    "  └─────────────────────────────────────────────────────┘\n"
  );

  // Capture each screenshot interactively
  const screenshots = [];

  for (let i = 0; i < CAPTURES.length; i++) {
    const cap = CAPTURES[i];
    console.log(`\n━━━ Screenshot ${i + 1}/${CAPTURES.length}: ${cap.description} ━━━`);

    await waitForEnter(
      `  Navigate the browser to show: "${cap.description}"\n` +
      `  Press ENTER when the page looks right to capture...\n`
    );

    // Wait a beat for any final rendering
    await new Promise((r) => setTimeout(r, 1000));

    const screenshotBuffer = await page.screenshot({ type: "png", fullPage: false });
    screenshots.push({ ...cap, buffer: screenshotBuffer });
    console.log(`  ✓ Screenshot captured!`);
  }

  await browser.close();
  console.log("\n→ Browser closed.\n");

  // Composite all screenshots
  console.log("→ Compositing into laptop frames...\n");

  for (const shot of screenshots) {
    const outputPath = path.join(PUBLIC_DIR, shot.outputFile);
    const meta = await compositeScreenshotIntoLaptop(shot.buffer, outputPath);
    console.log(`    ${shot.outputFile}: ${meta.width}×${meta.height}, alpha: ${meta.hasAlpha ? "✓" : "✗"}`);
  }

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║  ✅  All mockups generated in public/devices/            ║");
  console.log("║  Restart your dev server to see the updated images.      ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err);
  process.exit(1);
});
