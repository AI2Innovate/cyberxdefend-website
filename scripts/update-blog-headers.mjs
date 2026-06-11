import fs from 'fs';
import path from 'path';

const dir = 'public/blog';
const headInsert = `    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/site-chrome.css" />
`;
const oldHeader =
  /    <header class="site">[\s\S]*?    <\/header>\s*<main class="article">/;
const newHeader = `    <header class="cx-header">
      <a class="cx-brand" href="/"><span class="cx-brand-mark">XF</span><span class="cx-brand-name">CYBER<b>X</b>DEFEND</span></a>
      <div class="cx-ticker" aria-live="off">
        <span><i class="cx-dot"></i> PHISHING EMAILS SINCE YOU OPENED THIS PAGE: <b id="tick-phish">0</b></span>
        <span>EST. RANSOMWARE ATTACKS: <b id="tick-ransom">0</b></span>
      </div>
      <a class="cx-cta" href="/#cta">REQUEST NIS2 AUDIT</a>
    </header>

    <p class="cx-back"><a href="/blog">← Back to Insights</a></p>

    <main class="article">`;

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (!oldHeader.test(html)) {
    console.log('skip', file);
    continue;
  }
  html = html.replace('<body>', '<body class="cx-chrome">');
  if (!html.includes('/site-chrome.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="/blog/_styles.css" />',
      `<link rel="stylesheet" href="/blog/_styles.css" />\n${headInsert}`,
    );
  }
  html = html.replace(oldHeader, newHeader);
  if (!html.includes('site-ticker.js')) {
    html = html.replace(
      '<script src="/analytics.js" defer></script>',
      '<script src="/site-ticker.js" defer></script>\n    <script src="/analytics.js" defer></script>',
    );
  }
  fs.writeFileSync(fp, html);
  console.log('updated', file);
}
