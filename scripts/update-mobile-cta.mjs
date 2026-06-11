import fs from 'fs';
import path from 'path';

const replacement =
  '<a class="cx-cta" href="/#cta"><span class="cx-cta__long">REQUEST NIS2 AUDIT</span><span class="cx-cta__short">NIS2 AUDIT</span></a>';
const target = '<a class="cx-cta" href="/#cta">REQUEST NIS2 AUDIT</a>';

for (const file of fs.readdirSync('public/blog')) {
  if (!file.endsWith('.html')) continue;
  const fp = path.join('public/blog', file);
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes(target)) continue;
  html = html.replace(target, replacement);
  fs.writeFileSync(fp, html);
  console.log('updated', file);
}

for (const file of ['public/glossary.html', 'public/404.html']) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes(target)) continue;
  html = html.replace(target, replacement);
  fs.writeFileSync(file, html);
  console.log('updated', file);
}
