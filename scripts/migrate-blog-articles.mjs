import fs from 'fs';
import path from 'path';

const dir = 'public/blog';
const footer = `    <footer class="site-footer">
      <div class="site-footer__bar">
        <p class="site-footer__copy">© 2026 <a href="https://ai2innovate.io" target="_blank" rel="noopener noreferrer">AI2Innovate</a>. All rights reserved.</p>
        <nav class="site-footer__nav" aria-label="Footer">
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="/terms-and-conditions.html">Terms &amp; Conditions</a>
          <a href="/blog/">Insights</a>
          <a href="/#cta">Contact</a>
        </nav>
      </div>
    </footer>`;

const backdrop = `    <div class="attack-sim__vignette" aria-hidden="true"></div>
    <div class="attack-sim__scanlines" aria-hidden="true"></div>
    <div class="attack-sim__grid" aria-hidden="true"></div>
`;

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  html = html.replace(
    '<link rel="stylesheet" href="/blog/_styles.css" />',
    '<link rel="stylesheet" href="/blog-sub-page.css" />',
  );

  html = html.replace('<body class="cx-chrome">', '<body class="attack-sim attack-sim--sub">');

  if (!html.includes('attack-sim__vignette')) {
    html = html.replace(/(<body class="attack-sim attack-sim--sub">)\s*/, `$1\n${backdrop}\n`);
  }

  html = html.replace(
    /\s*<p class="cx-back"><a href="\/blog">← Back to Insights<\/a><\/p>\s*/,
    '\n',
  );

  html = html.replace(
    /<main class="article">([\s\S]*?)<\/main>/,
    (_, inner) => {
      const cleaned = inner
        .replace(/\s*<div class="article-prose">\s*/g, '\n        <div class="article-body">')
        .replace(/\s*<\/div>\s*(?=\s*<\/main>)/, '\n        </div>');

      const headerMatch = cleaned.match(
        /(\s*<p class="eyebrow">[\s\S]*?<\/p>\s*<h1>[\s\S]*?<\/h1>\s*<p class="meta">[\s\S]*?<\/p>)\s*(<div class="article-body">)/,
      );

      if (!headerMatch) {
        console.warn('header not matched', file);
        return `<main class="sub-page">${inner}</main>`;
      }

      const header = headerMatch[1].trim();
      const bodyStart = headerMatch[2];
      const bodyContent = cleaned.slice(cleaned.indexOf(bodyStart) + bodyStart.length);

      return `<main class="sub-page">
      <div class="wrap">
        <p class="page-back"><a href="/blog">← Back to Insights</a></p>
        <div class="sub-page__content blog-article">
          ${header}
          ${bodyStart}${bodyContent}
        </div>
      </div>
    </main>`;
    },
  );

  html = html.replace(/<footer class="site">[\s\S]*?<\/footer>/, footer);

  fs.writeFileSync(fp, html);
  console.log('updated', file);
}
