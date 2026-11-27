// Turns dist-demo/ into a folder that works as a published Artifact:
// root-absolute links become relative file links (e.g. "/book/" -> "book/index.html").
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, cpSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

const src = process.argv[2], out = process.argv[3];
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });
for (const f of ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt']) rmSync(join(out, f), { force: true });

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));

for (const file of walk(out).filter((f) => f.endsWith('.html'))) {
  const rel = relative(out, file).split('\\').join('/');
  const prefix = posix.relative(posix.dirname(rel), '.') || '.';
  const fix = (p) => {
    const [path, hash = ''] = p.split('#');
    const [pth, query = ''] = path.split('?');
    let target = pth.replace(/^\//, '');
    if (target === '' || target.endsWith('/')) target += 'index.html';
    let r = posix.join(prefix, target);
    return r + (query ? '?' + query : '') + (hash ? '#' + hash : '');
  };
  let html = readFileSync(file, 'utf8');
  // href, src, data-thanks attributes that start with a single slash
  html = html.replace(/\b(href|src|data-thanks)="(\/(?!\/)[^"]*)"/g, (_, a, p) => `${a}="${fix(p)}"`);
  // srcset lists
  html = html.replace(/\bsrcset="([^"]*)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)(\/(?!\/)\S+)/g, (m, s, p) => s + fix(p))}"`);
  // module scripts imported by absolute path inside inline scripts
  html = html.replace(/(import\s*["'])(\/assets\/[^"']+)/g, (_, a, p) => a + fix(p));
  if (rel === 'index.html') {
    // The root page is wrapped in a document skeleton at publish time
    html = html.replace(/<!DOCTYPE html>/i, '').replace(/<html[^>]*>\s*<head>/i, '').replace(/<\/head>\s*<body>/i, '').replace(/<\/body>\s*<\/html>\s*$/i, '');
  }
  writeFileSync(file, html);
}
// JS chunks can import other chunks by absolute path
for (const file of walk(out).filter((f) => f.endsWith('.js'))) {
  let js = readFileSync(file, 'utf8');
  const n = js.replace(/(["'])\/assets\/([^"']+)\1/g, (_, q, p) => `${q}./${p}${q}`);
  if (n !== js) writeFileSync(file, n);
}
console.log('demo ready:', out);
