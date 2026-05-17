/**
 * Regenerates raster favicons from public/brand/amc-favicon.svg.
 * Run after updating the source SVG: npm run generate:favicon
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public/brand/amc-favicon.svg");
const svg = await fs.readFile(source);

async function writePng(outPath, size, density) {
  await sharp(svg, { density })
    .resize(size, size)
    .png()
    .toFile(path.join(root, outPath));
}

await writePng("app/icon.png", 32, 192);
await writePng("app/apple-icon.png", 180, 384);

// Keep app/icon.svg in sync with the brand source.
await fs.copyFile(source, path.join(root, "app/icon.svg"));

console.log("Favicon assets updated from public/brand/amc-favicon.svg");
