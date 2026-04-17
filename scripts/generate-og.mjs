import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const src = resolve(root, 'public/og-source.svg');
const out = resolve(root, 'public/og-image.png');

const svg = await readFile(src);
const png = await sharp(svg, { density: 144 }).resize(1200, 630).png({ quality: 90 }).toBuffer();
await writeFile(out, png);
console.log(`Wrote ${out} (${png.length} bytes)`);
