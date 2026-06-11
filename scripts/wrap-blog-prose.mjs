import fs from 'fs';
import path from 'path';

const dir = 'public/blog';

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('class="article-prose"')) {
    console.log('skip', file);
    continue;
  }
  html = html.replace(/(<p class="meta">[\s\S]*?<\/p>\s*\n)/, '$1\n      <div class="article-prose">\n');
  html = html.replace(/\s*<\/main>/, '\n      </div>\n    </main>');
  html = html.replace(/<span style="color: var\(--muted\); font-size: 13px;">/, '<span>');
  fs.writeFileSync(fp, html);
  console.log('updated', file);
}
