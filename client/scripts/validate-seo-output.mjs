import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  indexableRoutes,
  productionOrigin,
  seoForPath,
  seoPages,
} from '../src/data/seo.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(scriptDir, '../dist');

const outputPathFor = (pathname) => pathname === '/'
  ? path.join(outputDir, 'index.html')
  : path.join(outputDir, pathname.slice(1), 'index.html');

for (const pathname of Object.keys(seoPages)) {
  const seo = seoForPath(pathname);
  const html = await readFile(outputPathFor(pathname), 'utf8');
  assert.ok(html.includes(`<title>${escapeHtml(seo.title)}</title>`), `${pathname} is missing its title.`);
  assert.ok(html.includes(`content="${seo.description}"`), `${pathname} is missing its description.`);
  assert.ok(html.includes(`href="${seo.canonical}"`), `${pathname} is missing its canonical URL.`);
  assert.ok(html.includes(`content="${seo.robots}"`), `${pathname} has the wrong robots policy.`);
  assert.ok(!html.includes('deploy-preview-'), `${pathname} contains a preview URL.`);
}

const home = await readFile(outputPathFor('/'), 'utf8');
const jsonLd = home.match(/<script type="application\/ld\+json" data-seo-structured>([\s\S]*?)<\/script>/)?.[1];
assert.ok(jsonLd, 'Homepage JSON-LD was not generated.');
const structuredData = JSON.parse(jsonLd);
assert.equal(structuredData['@context'], 'https://schema.org');
assert.ok(structuredData['@graph'].some((item) => item['@type'] === 'LodgingBusiness'));

const sitemap = await readFile(path.join(outputDir, 'sitemap.xml'), 'utf8');
for (const pathname of indexableRoutes) {
  const url = `${productionOrigin}${pathname === '/' ? '/' : pathname}`;
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `Sitemap is missing ${url}.`);
}
assert.ok(!sitemap.includes('/privacy'), 'Privacy must not be included in the sitemap.');
assert.ok(!sitemap.includes('/admin'), 'Admin routes must not be included in the sitemap.');

const robots = await readFile(path.join(outputDir, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`));

const notFound = await readFile(path.join(outputDir, '404.html'), 'utf8');
assert.ok(notFound.includes('content="noindex, follow"'));
assert.ok(!notFound.includes('rel="canonical"'));

const admin = await readFile(path.join(outputDir, 'admin', 'index.html'), 'utf8');
assert.ok(admin.includes('<title>Administration Offline | Villa Cinnamoon Castle</title>'));
assert.ok(admin.includes('content="noindex, nofollow"'));
assert.ok(!admin.includes('rel="canonical"'));

console.log('SEO output validation passed.');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
