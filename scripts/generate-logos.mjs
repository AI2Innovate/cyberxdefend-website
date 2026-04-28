import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const targets = [
  { src: 'public/logo.svg', sizes: [400, 800, 1024], prefix: 'logo' },
  { src: 'public/logo-wordmark.svg', sizes: [800, 1200], prefix: 'logo-wordmark' },
  { src: 'public/logo-mark-light.svg', sizes: [400, 1024], prefix: 'logo-mark-light' },
  { src: 'public/logo-mark-dark.svg', sizes: [400, 1024], prefix: 'logo-mark-dark' },
];

for (const t of targets) {
  const svg = await readFile(resolve(root, t.src));
  for (const size of t.sizes) {
    const out = resolve(root, `public/${t.prefix}-${size}.png`);
    const png = await sharp(svg, { density: 288 }).resize(size).png({ quality: 92 }).toBuffer();
    await writeFile(out, png);
    console.log(`Wrote ${out} (${png.length} bytes)`);
  }
}
